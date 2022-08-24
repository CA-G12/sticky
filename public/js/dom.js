/* eslint-disable no-unused-vars */
const sideBar = document.querySelector('aside');
const plusIcon = document.querySelector('.fa-square-plus');
const form = document.querySelector('form');
const textArea = document.querySelector('form textarea');
const dateInput = document.querySelector('form input');
const addTaskBtn = document.querySelector('form button');

plusIcon.addEventListener('click', () => {
  sideBar.style.width = '300px';
  form.style.display = 'flex';
});

addTaskBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const task = textArea.value;
  const date = dateInput.value.split('-').reverse().join('-');
  if (task && date) {
    form.style.display = 'none';
    sideBar.style.width = 'auto';
    fetch('/tasks/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task, date }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.state === 'fail') alert(data.message);
      });
  } else {
    alert('please fill in all feilds');
  }
});

///
const main = document.querySelector('main');

const createCard = (tasks) => {
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

  tasks.forEach((e) => {
    const p = document.createElement('p');
    const li = document.createElement('li');
    p.textContent = e.task;

    li.appendChild(p);
    list.appendChild(li);
  });

  return card;
};

const handleTasksDom = (tasks) => {
  console.log(tasks);
  let date = tasks[0].task_date;

  const container = document.createElement('section');
  const dateHead = document.createElement('h1');

  container.classList = 'container';

  dateHead.textContent = date;

  container.appendChild(dateHead);
  main.appendChild(container);

  let noteTasks = [];
  tasks.forEach((task, i) => {
    if (task.task_date !== date) {
      const container2 = document.createElement('section');
      const dateHead2 = document.createElement('h1');
      const note = createCard(noteTasks);

      container2.classList = 'container';

      container2.appendChild(dateHead2);
      container2.appendChild(note);
      main.appendChild(container2);

      dateHead2.textContent = date;
      date = task.task_date;

      noteTasks = [];
    }
    noteTasks.push(task);
    if (noteTasks.length === 4) {
      const note = createCard(noteTasks);
      container.appendChild(note);
      noteTasks = [];
    }
  });

  const note = createCard(noteTasks);
  const container3 = document.createElement('section');
  const dateHead3 = document.createElement('h1');

  container3.classList = 'container';

  dateHead3.textContent = date;

  container3.appendChild(dateHead3);
  container3.appendChild(note);

  main.appendChild(container3);
};


// fetch
const getAllTasks = () => {
  fetch('/tasks')
    .then((res)=> res.json())
    .then((data) =>{
      const sorted = data.data.sort((a, b) => new Date(b.task_date) - new Date(a.task_date));
      handleTasksDom(sorted);
    });
};

getAllTasks();
