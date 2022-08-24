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
  const date = dateInput.value;
  if (task && date) {
    form.style.display = 'none';
    sideBar.style.width = 'auto';
  } else {
    alert('please fill in all feilds');
  }
});
