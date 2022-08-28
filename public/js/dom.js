/* eslint-disable no-restricted-syntax */
const main = document.querySelector('main');

/// ========= Showing a message for the user ==========

const message = document.querySelector('.message');
const msgText = document.querySelector('.message p');
const messageSpan = document.querySelector('.message span');

function showMessage(msg) {
  msgText.textContent = msg;
  messageSpan.classList.add('vanishspan');
  message.classList.add('vanish');

  setTimeout(() => {
    message.classList.remove('vanish');
    messageSpan.classList.remove('vanishspan');
  }, 3000);
}

// ========== fetching all tasks from the DB ===========

function getAllTasks() {
  fetch('/tasks')
    .then((res) => res.json())
    .then((data) => {
      const sorted = data.data.sort((a, b) => new Date(b.task_date) - new Date(a.task_date));
      handleTasksDom(sorted);
    });
}

getAllTasks();

// =========== get an obj for the tasks ============

function objectifyTasks(tasks) {
  return tasks.reduce((acc, e) => {
    if (acc[e.task_date]) acc[e.task_date].push(e);
    else acc[e.task_date] = [e];
    return acc;
  }, {});
}

// ========== handling the dom for all tasks ============

function handleTasksDom(tasks) {
  main.textContent = '';
  const obj = objectifyTasks(tasks);

  for (const key in obj) {
    if (key) {
      const container = document.createElement('section');
      const h1 = document.createElement('h1');

      h1.textContent = key.split('-').reverse().join('-');

      container.classList = 'container';
      container.appendChild(h1);

      let noteTasks = [];

      obj[key].forEach((el, i) => {
        noteTasks.push(el);

        if (noteTasks.length === 4 || (i + 1) === obj[key].length) {
          const note = createCard(noteTasks);
          container.appendChild(note);
          noteTasks = [];
        }
      });

      main.appendChild(container);
    }
  }
}

// ============== create one sticky note =================

function createCard(tasks) {
  const card = document.createElement('div');
  const trash = document.createElement('i');
  const span = document.createElement('span');
  const list = document.createElement('ol');

  card.classList = 'card';
  trash.classList = 'fa-solid fa-trash';
  span.classList = 'pin';

  card.appendChild(trash);
  card.appendChild(span);
  card.appendChild(list);

  trash.addEventListener('click', deleteNote);

  tasks.forEach((e) => {
    const p = document.createElement('p');
    const li = document.createElement('li');

    if (e.done) p.classList.add('done');
    li.id = e.id;
    p.textContent = e.task;

    p.addEventListener('click', crossOff);

    li.appendChild(p);
    list.appendChild(li);
  });

  return card;
}

// ============= adding a new task ================

const addTaskBtn = document.querySelector('form button');
const textArea = document.querySelector('form textarea');
const dateInput = document.querySelector('form input');

addTaskBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const task = textArea.value;
  const date = dateInput.value;
  if (task && date) {
    fetch('/tasks/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task, date }),
    })
      .then((res) => res.json())
      .then((data) => {
        getAllTasks();
        showMessage(data.message);
      });
  } else {
    showMessage('please fill in all fields');
  }
});

// ======= Delete the whole sticky note => used in the createCard function line 93

function deleteNote(e) {
  const ts = e.target.parentElement.children[2].childNodes;

  ts.forEach((el) => {
    fetch(`/tasks/delete/${el.id}`)
      .then((res) => res.json())
      .then((data) => {
        getAllTasks();
        showMessage(data.message);
      });
  });
}

// ======== cross off the task => used in the createCard function line 103

function crossOff(e) {
  const { id } = e.target.parentElement;

  fetch(`/tasks/check/${id}`)
    .then((res) => res.json())
    .then((data) => {
      getAllTasks();
      showMessage(data.message);
    });
}

// ========== click events on the sidebar and main =========
const sideBar = document.querySelector('aside');
const plusIcon = document.querySelector('aside i');
const form = document.querySelector('form');
const copyRight = document.querySelector('aside div');

plusIcon.addEventListener('click', () => {
  if (plusIcon.className === 'fa-solid fa-square-plus') {
    sideBar.style.width = '300px';
    form.style.display = 'flex';
    plusIcon.classList = 'fa-solid fa-rectangle-xmark';
    copyRight.style.display = 'block';
  } else {
    plusIcon.classList = 'fa-solid fa-square-plus';
    sideBar.style.width = 'auto';
    form.style.display = 'none';
    copyRight.style.display = 'none';
  }
});

main.addEventListener('click', () => {
  sideBar.style.width = 'auto';
  form.style.display = 'none';
  copyRight.style.display = 'none';
  plusIcon.classList = 'fa-solid fa-square-plus';
});
