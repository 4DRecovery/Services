let deferredPrompt;

document.addEventListener("DOMContentLoaded", () => {
    const installOverlay = document.getElementById("install-overlay");
    const installButton = document.getElementById("install-button");
    const dismissButton = document.getElementById("dismiss-button");

    if (!installOverlay || !installButton || !dismissButton) {
        console.error("Install elements not found in the DOM.");
        return;
    }

    // Capture the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", (event) => {
        console.log("beforeinstallprompt event triggered");
        event.preventDefault();
        deferredPrompt = event;
        installOverlay.style.display = "flex"; // Show overlay
    });

    // Handle install button click
    installButton.addEventListener("click", async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const choiceResult = await deferredPrompt.userChoice;
            console.log(choiceResult.outcome === "accepted" ? "User accepted install" : "User dismissed install");
            deferredPrompt = null;
        }
        installOverlay.style.display = "none";
    });

    // Handle "Maybe Later" button
    dismissButton.addEventListener("click", () => {
        installOverlay.style.display = "none";
    });

    // Listen for successful install
    window.addEventListener("appinstalled", () => {
        console.log("PWA was installed successfully!");
        installOverlay.style.display = "none"; // Ensure overlay hides after install
    });
});
