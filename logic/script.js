

document.addEventListener("DOMContentLoaded", function() {

    // 1. Apne h1 element ko select karo
    const h1Element = document.querySelector('.hero h1');
    
    // Agar h1 element page par na ho to script rok do
    if (!h1Element) {
        return;
    }

    // 2. h1 ke andar ka saara content (HTML ke saath) ek variable me store karo
    const originalHTML = h1Element.innerHTML;

    // 3. h1 ko screen par khaali kar do taaki typing effect shuru ho sake
    h1Element.innerHTML = '';

    // Animation ki settings
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 120;
    const deletingSpeed = 60;
    const pauseTime = 1500; // Type/delete ke baad rukne ka time

    function typeWriterLoop() {
        // 4. Stored kiye gaye original content se type karo
        const currentHTML = originalHTML.substring(0, charIndex);
        h1Element.innerHTML = currentHTML + '<span class="typewriter-cursor">|</span>';

        if (!isDeleting && charIndex < originalHTML.length) {
            // Type ho raha hai
            charIndex++;
            setTimeout(typeWriterLoop, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            // Delete ho raha hai
            charIndex--;
            setTimeout(typeWriterLoop, deletingSpeed);
        } else {
            // Mode badlo (typing se deleting ya ulta)
            isDeleting = !isDeleting;
            setTimeout(typeWriterLoop, pauseTime);
        }
    }

    // Animation ko shuru karo
    typeWriterLoop();
});
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

  if (formatList.classList.contains("show") &&
      !formatList.contains(event.target) &&
      !moreHeader.contains(event.target)) {

    formatList.classList.remove("show");
    document.querySelector(".more-header i").classList.remove("rotated");
  }
});

let progressInterval; // progress polling ka interval store karne ke liye

async function handleDownload(event) {
  event.preventDefault();

  const link = document.querySelector('.link-input').value;
  const format = document.querySelector('input[name="format"]:checked').value;

  // Progress bar UI
  const progressBar = document.getElementById("downloadProgress");
  progressBar.style.width = "0%";
  progressBar.innerText = "0%";
  progressBar.parentElement.style.display = "block";

  // Progress polling start
  progressInterval = setInterval(async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/progress");
      const data = await res.json();
      progressBar.style.width = data.percentage + "%";
      progressBar.innerText = data.percentage + "%";

      if (data.status === "finished") {
        clearInterval(progressInterval);
      }
      if (data.status === "error") {
        clearInterval(progressInterval);
        alert("Download failed!");
      }
    } catch (err) {
      console.error("Progress fetch error:", err);
    }
  }, 1000);

  try {
    const response = await fetch("http://127.0.0.1:5000/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: link, format: format })
    });

    if (!response.ok) {
      alert("Download failed!");
      clearInterval(progressInterval);
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;

    const contentDisposition = response.headers.get("Content-Disposition");
    let filename = "downloaded_file";
    if (contentDisposition && contentDisposition.includes("filename=")) {
      filename = contentDisposition.split("filename=")[1].replace(/"/g, "");
    }
    a.download = filename;

    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
    clearInterval(progressInterval);
    progressBar.style.width = "100%";
    progressBar.innerText = "100%";

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong while downloading.");
    clearInterval(progressInterval);
  }
}




