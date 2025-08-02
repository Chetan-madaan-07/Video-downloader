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
// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
    const formatList = document.getElementById("formatList");
    const moreHeader = document.querySelector(".more-header");

    // Agar dropdown open hai aur click dropdown/buton ke bahar hua
    if (formatList.classList.contains("show") &&
        !formatList.contains(event.target) &&
        !moreHeader.contains(event.target)) {

        formatList.classList.remove("show");
        document.querySelector(".more-header i").classList.remove("rotated");
    }
});


async function handleDownload(event) {
    event.preventDefault(); // Page reload hone se roka

    const link = document.querySelector('.link-input').value;
    const format = document.querySelector('input[name="format"]:checked').value;

    try {
        const response = await fetch("http://127.0.0.1:5000/download", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: link, format: format })
        });

        const data = await response.json();

        if (data.status === "success") {
            alert("Download completed! File saved at: " + data.file_path);
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong while downloading.");
    }
}




