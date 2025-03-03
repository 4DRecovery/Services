let deferredPrompt;

// Listen for the beforeinstallprompt event
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault(); // Prevent the default browser prompt
    deferredPrompt = e; // Store the event for later
    console.log("✅ beforeinstallprompt event fired!");

    showInstallOverlay(); // Show custom install overlay
});

function showInstallOverlay() {
    console.log("📢 Showing install overlay");

    const overlay = document.getElementById("install-overlay");
    if (overlay) {
        overlay.style.display = "flex"; // Show overlay
    }
}

// Handle the install button click
document.getElementById("install-button").addEventListener("click", async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === "accepted") {
            console.log("🎉 App installed successfully!");
        } else {
            console.log("❌ Installation declined.");
        }
        deferredPrompt = null;
    }
    document.getElementById("install-overlay").style.display = "none"; // Hide overlay
});

// Handle the "Maybe Later" button
document.getElementById("dismiss-button").addEventListener("click", () => {
    document.getElementById("install-overlay").style.display = "none"; // Hide overlay
});
