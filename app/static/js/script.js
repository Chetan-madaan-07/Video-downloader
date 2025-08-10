document.addEventListener("DOMContentLoaded", function() {

    const h1Element = document.querySelector('.hero h1');
    if (!h1Element) return;

    const originalHTML = h1Element.innerHTML;
    h1Element.innerHTML = '';

    // --- Animation Ki Alag-Alag Speed Settings ---
    const normalTypingSpeed = 120;  // Dikhne wale text ki speed
    const fastTypingSpeed = 20;     // Invisible HTML tag ki speed
    const deletingSpeed = 60;
    const loopPauseTime = 2000;

    // --- HTML Tag Ki Position Pata Karo ---
    const tagStartIndex = originalHTML.indexOf('<');
    const tagEndIndex = originalHTML.indexOf('>') + 1; // '>' character ko bhi include karna hai

    let charIndex = 0;
    let isDeleting = false;

    function typeWriterLoop() {
        const currentHTML = originalHTML.substring(0, charIndex);
        h1Element.innerHTML = currentHTML + '<span class="typewriter-cursor">|</span>';

        // --- TYPE KARNE WALI LOGIC ---
        if (!isDeleting && charIndex < originalHTML.length) {
            
            let currentSpeed; // Har character ke liye speed alag ho sakti hai

            // Check karo ki kya hum invisible tag wale hisse me hain?
            if (charIndex >= tagStartIndex && charIndex < tagEndIndex) {
                // Agar haan, to fast speed use karo
                currentSpeed = fastTypingSpeed;
            } else {
                // Warna normal speed use karo
                currentSpeed = normalTypingSpeed;
            }

            charIndex++;
            setTimeout(typeWriterLoop, currentSpeed);

        } 
        // --- BAAKI LOGIC WAISA HI HAI ---
        else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeWriterLoop, deletingSpeed);
        } else {
            isDeleting = !isDeleting;
            setTimeout(typeWriterLoop, loopPauseTime);
        }
    }

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

    const linkInput = document.querySelector('.link-input');
    const url = linkInput.value;
    const format = document.querySelector('input[name="format"]:checked').value;
    const downloadBtn = document.querySelector('.download-btn');

    // Button ko disable kardo aur text badal do
    downloadBtn.disabled = true;
    downloadBtn.innerText = "Downloading...";

    try {
        const response = await fetch("/api/download", { // <-- Relative URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: url, format: format })
        });

        if (!response.ok) {
            // Server se error message lene ki koshish karo
            const errorData = await response.json();
            alert("Download failed: " + (errorData.message || "Unknown error"));
            return; // Yahan se bahar nikal jao
        }

        const blob = await response.blob();
        const objectUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = objectUrl;

        const contentDisposition = response.headers.get("Content-Disposition");
        let filename = "downloaded_file";
        if (contentDisposition && contentDisposition.includes("filename=")) {
            filename = contentDisposition.split("filename=")[1].replace(/"/g, "");
        }
        a.download = filename;

        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        a.remove();
        window.URL.revokeObjectURL(objectUrl);

    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please check the link or try again.");
    } finally {
        // Chahe success ho ya error, button ko wapas theek kar do
        downloadBtn.disabled = false;
        downloadBtn.innerText = "Download";
    }
}




