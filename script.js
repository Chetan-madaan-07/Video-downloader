function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
  document.getElementById("navBtns").classList.toggle("show");
  document.querySelector(".navbar").classList.toggle("no-shadow")
}
function toggleDropdown() {
  const list = document.getElementById("formatList");
  const icon = document.querySelector(".more-header i");

  list.classList.toggle("show");
  icon.classList.toggle("rotated");
}

function handleDownload(event) {
    event.preventDefault(); // form submit hone pe page reload na ho
    const link = document.querySelector('.link-input').value;
    const format = document.querySelector('input[name="format"]:checked').value;

    console.log("Link:", link);
    console.log("Format:", format);
    // future: backend call ya download logic yahin ayega
}



