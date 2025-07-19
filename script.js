function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
  document.getElementById("navBtns").classList.toggle("show");
  document.querySelector(".navbar").classList.toggle("no-shadow")
}
function toggleDropdown() {
  const list = document.getElementById("formatList");
  const icon = document.querySelector(".more-header i");

  // Toggle visibility
  if (list.style.display === "flex") {
    list.style.display = "none";
    icon.style.transform = "rotate(0deg)";
  } else {
    list.style.display = "flex";
    icon.style.transform = "rotate(180deg)";
  }
}


