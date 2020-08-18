const title = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const deleteAllBtn = document.getElementById('delete-all');
const todoList = document.getElementById('todo-list');
const dropdownMessage = document.querySelector('.dropdown-message');

localStorageTodos = JSON.parse(localStorage.getItem('todos'));

let arrTODO = localStorage.getItem('todos') !== null ? localStorageTodos : [];

// Generate ID
function generateID() {
  return Math.floor(Math.random() * 1000000000);
}

// Create TODO
function createTODO() {
  if (title.value.trim() === '') {
    dropdown(dropdownMessage);
  } else {
    const todo = {
      id: generateID(),
      name: title.value,
    };

    arrTODO.push(todo);

    addToDOM(todo);

    updateLocalStorage();

    title.value = '';
  }
}

// Add TODO to the DOM
function addToDOM(el) {
  let div = document.createElement('div');

  div.classList.add('todo');

  div.innerHTML = `
    <p>${el.name}</p>
    <div class="cta-container">
      <input type="checkbox" id="finished" />
      <button class="remove" onclick="removeById(${el.id})"><i class="fas fa-times"></i></button>
    </div>
  `;

  todoList.appendChild(div);
}

// Remove TODO by ID
function removeById(id) {
  arrTODO = arrTODO.filter((item) => item.id !== id);

  updateLocalStorage();

  init();
}

// Update localStorage
function updateLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(arrTODO));
}

// Remove all TODOS
function removeAll() {
  arrTODO = [];

  updateLocalStorage();

  init();
}

// Dropdown message when enter empty TODO
function dropdown(el) {
  setTimeout(() => {
    el.style.transform = 'translateY(0)';

    setTimeout(() => {
      el.style.transform = 'translateY(-80px)';
    }, 3000);
  }, 200);
}

// INIT
function init() {
  todoList.innerHTML = '';

  arrTODO.forEach(addToDOM);
}

init();

// Event Listener
addBtn.addEventListener('click', createTODO);
deleteAllBtn.addEventListener('click', removeAll);
