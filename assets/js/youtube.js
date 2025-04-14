// Chave da API do YouTube 
const apiKey = 'AIzaSyC3S1J2obcy_z2nilw_VodzxG1NjQElmLQ';

async function buscarVideos() {
  // Pega o termo digitado pelo usuário e adiciona "aula" para melhorar a busca
  const userQuery = document.getElementById('searchInput').value;
  const query = `${userQuery} aula`;

  // Monta a URL para buscar vídeos no YouTube
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=10&order=viewCount&regionCode=BR&relevanceLanguage=pt&key=${apiKey}`;
  const searchResponse = await fetch(searchUrl);
  const searchData = await searchResponse.json();

  // Extrai os IDs dos vídeos retornados
  const videoIds = searchData.items.map(item => item.id.videoId).join(',');

  // Busca mais detalhes dos vídeos (como duração e título)
  const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoIds}&key=${apiKey}`;
  const detailsResponse = await fetch(detailsUrl);
  const detailsData = await detailsResponse.json();

  // Limpa o container antes de adicionar os novos vídeos
  const container = document.getElementById('videosContainer');
  container.innerHTML = '';

  // Para cada vídeo, cria um card com título, vídeo incorporado e botão de salvar
  detailsData.items.forEach(video => {
    const videoId = video.id;
    const title = video.snippet.title;

    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.allowFullscreen = true;

    const titleElem = document.createElement('p');
    titleElem.textContent = title;

    const saveBtn = document.createElement('button');
    saveBtn.textContent = '⭐ Salvar';
    saveBtn.onclick = () => salvarVideo({ id: videoId, title });

    // Monta o card e adiciona ao container
    videoCard.appendChild(titleElem);
    videoCard.appendChild(iframe);
    videoCard.appendChild(saveBtn);
    container.appendChild(videoCard);
  });
}

function salvarVideo(video) {
  // Busca os vídeos salvos no localStorage
  const salvos = JSON.parse(localStorage.getItem('videosSalvos') || '[]');

  // Só salva se ainda não estiver salvo
  if (!salvos.some(v => v.id === video.id)) {
    salvos.push(video);
    localStorage.setItem('videosSalvos', JSON.stringify(salvos));
    alert('Vídeo salvo!');
  } else {
    alert('Este vídeo já está salvo!');
  }
}

function mostrarVideosSalvos() {
  // Pega o container e limpa
  const container = document.getElementById('videosContainer');
  container.innerHTML = '';

  // Pega os vídeos salvos no localStorage
  const lista = JSON.parse(localStorage.getItem('videosSalvos') || '[]');

  if (lista.length === 0) {
    container.innerHTML = '<p>Nenhum vídeo salvo ainda.</p>';
    return;
  }

  // Mostra os vídeos salvos em cards
  lista.forEach(video => {
    const card = document.createElement('div');
    card.className = 'video-card';

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.id}`;
    iframe.allowFullscreen = true;

    const title = document.createElement('p');
    title.textContent = video.title;

    card.appendChild(title);
    card.appendChild(iframe);
    container.appendChild(card);
  });
}
