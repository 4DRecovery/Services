let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault(); // Prevent automatic prompt
    deferredPrompt = event; // Store the event for later use
    showInstallOverlay(); // Show custom modal overlay
});

function showInstallOverlay() {
    // Create overlay elements
    const overlay = document.createElement("div");
    overlay.id = "installOverlay";
    overlay.innerHTML = `
        <div class="install-modal">
            <p>Install this app for a better experience.</p>
            <button id="installButton">Install</button>
            <button id="closeButton">Maybe Later</button>
        </div>
    `;

    document.body.appendChild(overlay);

    // Event Listeners
    document.getElementById("installButton").addEventListener("click", () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User installed the app.");
                }
                deferredPrompt = null;
                removeOverlay();
            });
        }
    });

    document.getElementById("closeButton").addEventListener("click", removeOverlay);
}

function removeOverlay() {
    document.getElementById("installOverlay")?.remove();
}
