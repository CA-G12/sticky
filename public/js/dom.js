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

  trash.addEventListener('click', (e) => {
    const ts = e.target.parentElement.children[2].childNodes;

    ts.forEach((el) => {
      fetch(`/tasks/delete/${el.id}`)
        .then((res) => res.json())
        .then((data) => console.log(data));
    });
    e.target.parentElement.remove();
  });

  tasks.forEach((e) => {
    const p = document.createElement('p');
    const li = document.createElement('li');

    li.id = e.id;
    p.textContent = e.task;

    li.appendChild(p);
    list.appendChild(li);
  });

  return card;
};

const handleTasksDom = (tasks) => {
  const obj = {};

  tasks.forEach((ele) => {
    if (obj[ele.task_date]) {
      obj[ele.task_date].push(ele);
    } else {
      obj[ele.task_date] = [ele];
    }
  });
  
  for (let key in obj) {
    const container = document.createElement('section');
    const h1 = document.createElement('h1');
    h1.textContent = key;
    container.classList = `container`
    container.appendChild(h1);
    container.appendChild(createCard(obj[key]));
    main.appendChild(container);
  }
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
