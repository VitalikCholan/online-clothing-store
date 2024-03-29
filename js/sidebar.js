const toggleBtn = document.querySelector('.sidebar-toggle');
const closeBtn = document.querySelector('.close-btn');
const sidebar = document.querySelector('.sidebar');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('hide-sidebar');
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.add('hide-sidebar');
});
