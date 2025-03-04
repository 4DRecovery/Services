const menu = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");
const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);

function toggleMenu() {
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
}

// Close menu when clicking outside
overlay.addEventListener("click", () => {
    menu.classList.remove("active");
    overlay.classList.remove("active");
});
