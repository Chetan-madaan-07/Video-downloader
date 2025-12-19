document.addEventListener("DOMContentLoaded", function() {

    const h1Element = document.querySelector('.hero h1');
    if (!h1Element) return;

    const originalHTML = h1Element.innerHTML;
    h1Element.innerHTML = '';

    // --- Animation Ki Alag-Alag Speed Settings ---
   const normalTypingSpeed = 70;
    const fastTypingSpeed = 5;
    const normalDeletingSpeed = 50;  // Normal delete speed
    const fastDeletingSpeed = 0;     // HTML tags ke liye fast delete speed
    const loopPauseTime = 4000;

    // --- HTML Tag Ki Position Pata Karo ---
    const tagStartIndex = originalHTML.indexOf('<');
    const tagEndIndex = originalHTML.indexOf('>') + 1; // '>' character ko bhi include karna hai
    let charIndex = 0;
    let isDeleting = false;

    // --- Helper functions for each action ---

function handleTyping() {
    // Check karo ki kya hum invisible tag wale hisse me hain
    const isInsideTag = charIndex >= tagStartIndex && charIndex < tagEndIndex;
    const currentSpeed = isInsideTag ? fastTypingSpeed : normalTypingSpeed;

    charIndex++;
    setTimeout(typeWriterLoop, currentSpeed);
}

function handleDeleting() {
    // Check karo ki kya hum invisible tag wale hisse me hain
    const isInsideTag = charIndex > tagStartIndex && charIndex <= tagEndIndex;
    const currentSpeed = isInsideTag ? fastDeletingSpeed : normalDeletingSpeed;
    
    charIndex--;
    setTimeout(typeWriterLoop, currentSpeed);
}

function handleReversing() {
    isDeleting = !isDeleting;
    
    // Agle loop se pehle rukne ka time decide karo
    const pauseTime = (charIndex === 0) ? 500 : loopPauseTime;
    setTimeout(typeWriterLoop, pauseTime);
}

// --- MAIN LOOP FUNCTION (Ab bahut saaf ho gaya hai) ---
function typeWriterLoop() {
    // Ye line waise hi rahegi
    const currentHTML = originalHTML.substring(0, charIndex);
    h1Element.innerHTML = currentHTML + '<span class="typewriter-cursor">|</span>';

    // Ab ye bas sahi helper function ko bulayega
    if (!isDeleting && charIndex < originalHTML.length) {
        handleTyping();
    } else if (isDeleting && charIndex > 0) {
        handleDeleting();
    } else {
        handleReversing();
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

var progressInterval; // progress polling ka interval store karne ke liye

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
// ================================= //
// ========= FAQ ACCORDION ========= //
// ================================= //

document.addEventListener("DOMContentLoaded", function() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {
            const currentlyActive = document.querySelector(".faq-question.active");
            
            // Agar pehle se koi aur question khula hai, to use band kar do
            if (currentlyActive && currentlyActive !== question) {
                currentlyActive.classList.remove("active");
                currentlyActive.nextElementSibling.style.maxHeight = 0;
                currentlyActive.nextElementSibling.querySelector('p').style.padding = "0 20px";
            }
            
            // Current question ko toggle karo
            question.classList.toggle("active");
            const answer = question.nextElementSibling;
            
            if (question.classList.contains("active")) {
                // Answer ko kholo
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.querySelector('p').style.padding = "0 20px 20px";
            } else {
                // Answer ko band karo
                answer.style.maxHeight = 0;
                answer.querySelector('p').style.padding = "0 20px";
            }
        });
    });
});




