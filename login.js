function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
  document.getElementById("navBtns").classList.toggle("show");
  document.querySelector(".navbar").classList.toggle("no-shadow")
}

// Select elements
const container = document.querySelector('.container');
const show_Login = document.getElementById('show_Login');
const show_register = document.getElementById('show_register');
// Event: Show Register Form
show_register.addEventListener('click', (e) => {
  e.preventDefault(); // prevent default anchor behavior
  container.classList.add('active');
});

// Event: Show Login Form
show_Login.addEventListener('click', (e) => {
  e.preventDefault();
  container.classList.remove('active');
});
const params = new URLSearchParams(window.location.search);
if (params.get('mode') === 'register') {
  container.classList.add('active');
}



