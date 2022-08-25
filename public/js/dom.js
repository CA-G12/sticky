/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
const sideBar = document.querySelector('aside');
const plusIcon = document.querySelector('aside i');
const form = document.querySelector('form');
const textArea = document.querySelector('form textarea');
const dateInput = document.querySelector('form input');
const addTaskBtn = document.querySelector('form button');
const main = document.querySelector('main');
const copyRight = document.querySelector('aside div');

////

let message = document.querySelector(`.message`);
let msgp = document.querySelector('.message p');
let messageSpan = document.querySelector(`.message span`);


/// create one sticky note
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

  trash.addEventListener('click', (e) => {
    const ts = e.target.parentElement.children[2].childNodes;

    ts.forEach((el) => {
      fetch(`/tasks/delete/${el.id}`)
        .then((res) => res.json())
        .then((data) => {
          getAllTasks();
          msgp.textContent = data.message;
          messageSpan.classList.add(`vanishspan`);
          message.classList.add(`vanish`);
          setTimeout (() => {
            message.classList.remove(`vanish`);
            messageSpan.classList.remove(`vanishspan`);
          }, 3000);
        });
    });
    e.target.parentElement.remove();
  });

  tasks.forEach((e) => {
    const p = document.createElement('p');
    const li = document.createElement('li');

    if (e.done) p.classList.add('done');
    li.id = e.id;
    p.textContent = e.task;

    p.addEventListener('click', () => {
      fetch(`/tasks/check/${e.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.state === 'fail') {
            alert(data.message)
          } else {
            getAllTasks();
          }
        });
    });

    li.appendChild(p);
    list.appendChild(li);
  });

  return card;
}

/// handling the dom for all tasks
function handleTasksDom(tasks) {
  main.textContent = '';
  const obj = {};

  tasks.forEach((ele) => {
    if (obj[ele.task_date]) {
      obj[ele.task_date].push(ele);
    } else {
      obj[ele.task_date] = [ele];
    }
  });

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

function getAllTasks() {
  fetch('/tasks')
    .then((res) => res.json())
    .then((data) => {
      const sorted = data.data.sort((a, b) => new Date(b.task_date) - new Date(a.task_date));
      handleTasksDom(sorted);
    });
}

getAllTasks();

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

/// adding new task
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
        msgp.textContent = data.message;
        messageSpan.classList.add(`vanishspan`);
          message.classList.add(`vanish`);
      setTimeout (() => {
        message.classList.remove(`vanish`);
        messageSpan.classList.remove(`vanishspan`);
  }, 3000);
      });
  } else {
    alert('please fill in all feilds');
  }
});

main.addEventListener('click', () => {
  sideBar.style.width = 'auto';
  form.style.display = 'none';
  copyRight.style.display = 'none';
  plusIcon.classList = 'fa-solid fa-square-plus';
});
