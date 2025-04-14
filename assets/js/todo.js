let botao = document.getElementById("btn");
let tarefa = document.getElementById("input-tarefa");
let lista = document.getElementById("list");
let shadow = document.getElementById("shadow"); // tiramos o "#" aqui!

botao.addEventListener("click", function () {
  if (tarefa.value.trim() === "") return;

  let paragrafo = document.createElement("p");
  paragrafo.innerText = tarefa.value;
  paragrafo.classList.add("estilo-paragrafo");
  lista.appendChild(paragrafo);
  tarefa.value = ""; // limpa o input

  // Clique simples: sublinhar
  paragrafo.addEventListener("click", function () {
    paragrafo.style.textDecoration = "underline";
  });

  // Duplo clique: remover
  paragrafo.addEventListener("dblclick", function () {
    lista.removeChild(paragrafo);
  });
});

// Animação de sombra no mouse
document.body.addEventListener("mousemove", function (event) {
  shadow.style.top = event.pageY + "px";
  shadow.style.left = event.pageX + "px";
});
