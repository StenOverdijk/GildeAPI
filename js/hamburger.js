const menuIcon = document.getElementById('menuIcon');
const dropdownMenu = document.getElementById('dropdownMenu');

menuIcon.addEventListener('mouseenter', () => {
  dropdownMenu.style.display = 'block';
  menuIcon.style.transform = 'scale(1.2)';
});

menuIcon.addEventListener('mouseleave', () => {
  // Check if the mouse is not over the dropdown
  if (!dropdownMenu.matches(':hover')) {
    dropdownMenu.style.display = 'none';
    menuIcon.style.transform = 'scale(1)';
  }
});

dropdownMenu.addEventListener('mouseleave', () => {
  dropdownMenu.style.display = 'none';
  menuIcon.style.transform = 'scale(1)';
});

dropdownMenu.addEventListener('mouseenter', () => {
  dropdownMenu.style.display = 'block';
  menuIcon.style.transform = 'scale(1.2)';
});