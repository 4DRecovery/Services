let deferredPrompt;

// Wait for the beforeinstallprompt event
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault(); // Prevent the default prompt
    deferredPrompt = e; // Store the event

    // Show the install overlay
    showInstallOverlay();
});

// Function to show the install overlay
function showInstallOverlay() {
    // Create the overlay elements
    const overlay = document.createElement("div");
    overlay.id = "install-overlay";
    overlay.innerHTML = `
        <div class="install-popup">
            <h2>Install 4D Youth App</h2>
            <p>Get quick access to our services by installing the app.</p>
            <button id="install-btn">Install</button>
            <button id="dismiss-btn">Maybe Later</button>
        </div>
    `;

    // Append overlay to the body
    document.body.appendChild(overlay);

    // Add event listeners for buttons
    document.getElementById("install-btn").addEventListener("click", () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the install prompt");
                }
                deferredPrompt = null;
                closeInstallOverlay();
            });
        }
    });

    document.getElementById("dismiss-btn").addEventListener("click", () => {
        closeInstallOverlay();
    });
}

// Function to remove the overlay
function closeInstallOverlay() {
    const overlay = document.getElementById("install-overlay");
    if (overlay) {
        overlay.remove();
    }
}
