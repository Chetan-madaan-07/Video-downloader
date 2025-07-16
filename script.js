function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
  document.getElementById("navBtns").classList.toggle("show");
  document.querySelector(".navbar").classList.toggle("no-shadow")
}
function toggleDropdown() {
  const list = document.getElementById("formatList");
  list.style.display = list.style.display === "flex" ? "none" : "flex";

  const icon = document.querySelector(".more-header i");
  icon.style.transform = list.style.display === "flex" ? "rotate(180deg)" : "rotate(0)";
}
