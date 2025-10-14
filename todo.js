const form = document.querySelector(".form");
const input = document.querySelector("input");
const list = document.getElementById("list");

//STORAGE PART

function storeList() {
  window.localStorage.toDoList = list.innerHTML;
}

function getTodos() {
  if (window.localStorage.toDoList) {
    list.innerHTML = window.localStorage.toDoList;
  } else {
    list.innerHTML = `<li> Cliquez sur un TODO pour le supprimer </li>`;
  }
}

window.addEventListener("load", getTodos);

//add Element

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = input.value.trim();

  if (task.length < 1) return; // empêche les entrées vides

  list.innerHTML += `<li>${task}</li>`;
  input.value = "";
  storeList();
});

//Remove Element

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("checked")) {
    e.target.remove();
  } else {
    e.target.classList.add("checked");
  }
  storeList();
});
