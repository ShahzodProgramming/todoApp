const elAddbtn = document.querySelector(".pushable");
const form = document.querySelector("#todoForm");

let list = [];
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

elAddbtn.addEventListener("click", () => {
  const name = document.querySelector("#property").value;
  const date = document.querySelector("#date").value;
  if (name && date) {
    list.push({ name: name, date: date });
    display();
  }

  document.querySelector("#property").value = "";

  console.log(list);
});

function display() {
  const elDisplay = document.querySelector("#display");
  elDisplay.innerHTML = "";
  list.forEach((item, index) => {
    elDisplay.innerHTML += `<p> Name: ${item.name}, Date: ${item.date} <button class="deleteBtn" onclick="deleteItem(${index})">Delete</button> <button class="editBtn" onclick="editItem(${index})">Edit</button> </p>`;
  });
}

function deleteItem(index) {
  let deletedTodo = list.filter((item, i) => i !== index);

  console.log(deletedTodo);

  list = deletedTodo;
  display();
}

//Modal window

const modal = document.querySelector(".modal");
const elCancel = document.querySelector(".cancel");
const elName = document.querySelector("#name");
const elDate = document.querySelector("#editDate");
const elBtn = document.querySelector("#submit");

function editItem(index) {
  modal.style.display = "block";
  // Pre-fill the modal inputs with current values
  elName.value = list[index].name;
  elDate.value = list[index].date;

  // Define the submit handler
  const handleSubmit = () => {
    modal.style.display = "none";
    list[index].name = elName.value;
    list[index].date = elDate.value;
    display();
  };

  // Remove any existing listener and add a new one
  elBtn.removeEventListener("click", handleSubmit);
  elBtn.addEventListener("click", handleSubmit);
}
//features

document.querySelector(".modalForm").addEventListener("submit", (e) => {
  e.preventDefault();
});

elCancel.addEventListener("click", () => {
  elName.value = "";
  elDate.value = "";
  modal.style.display = "none";
});
