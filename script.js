const form = document.querySelector("#todoForm");
const addBtn = document.querySelector(".pushable");
let display = document.querySelector("#display");

let list = localStorage.getItem("todoList")
  ? JSON.parse(localStorage.getItem("todoList"))
  : [];

if (list.length) displayShow(list);

form.addEventListener("submit", (e) => e.preventDefault());

const elName = document.querySelector("#property");
const elDate = document.querySelector("#date");

addBtn.addEventListener("click", () => {
  if (elName.value.trim() && elDate.value) {
    const object = {
      name: elName.value.trim(),
      date: elDate.value,
    };
    list.push(object);
    localStorage.setItem("todoList", JSON.stringify(list));
    displayShow(list);
  } else {
    alert("Please fill in both fields correctly!");
  }
});

function displayShow(localeList) {
  display.innerHTML = "";
  localeList.forEach((item, index) => {
    display.innerHTML += `
      <div>
        Name: ${item.name}, Date: ${item.date}
        <button class="deleteBtn" onclick="deleted(${index})">Delete</button>
        <button class="editBtn" onclick="edit(${index})">Edit</button>
      </div>
    `;
  });
}

function deleted(num) {
  list = list.filter((_, index) => index !== num);
  localStorage.setItem("todoList", JSON.stringify(list));
  displayShow(list);
}

// ------------------- EDIT -------------------
let editingIndex = null;
const modal = document.querySelector("#modal");
const editName = document.querySelector("#name");
const editDate = document.querySelector("#editDate");

function edit(index) {
  editingIndex = index;
  modal.style.display = "block";
  editName.value = list[index].name;
  editDate.value = list[index].date;
}

document.querySelector(".cancel").addEventListener("click", () => {
  modal.style.display = "none";
  editName.value = "";
  editDate.value = "";
  editingIndex = null;
});

document.querySelector(".modalForm").addEventListener("submit", (e) => {
  e.preventDefault();
});

document.querySelector("#submit").addEventListener("click", () => {
  if (editingIndex !== null && editName.value.trim() && editDate.value) {
    list[editingIndex].name = editName.value.trim();
    list[editingIndex].date = editDate.value;
    localStorage.removeItem("todoList)");
    localStorage.setItem("todoList", JSON.stringify(list));
    displayShow(list);

    modal.style.display = "none";
    editName.value = "";
    editDate.value = "";
    editingIndex = null;
  } else {
    alert("Please fill in both fields correctly!");
  }
});
