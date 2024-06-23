// contentScript.js

function checkForWatchPage() {
    if (window.location.href.includes('youtube.com/watch')) {
        const intervalId = setInterval(() => {
            const rightControls = document.getElementsByClassName("ytp-right-controls")[0];
            if (rightControls && !document.getElementById("customPipButton")) {
                const pipButton = document.createElement("button");
                pipButton.id = "customPipButton";
                pipButton.innerHTML = "PIP";
                pipButton.style.marginRight = "10px";
                pipButton.onclick = () => {
                    const video = document.querySelector('video');
                    if (video) {
                        video.requestPictureInPicture();
                    }
                };
                rightControls.insertBefore(pipButton, rightControls.children[rightControls.children.length - 1]);
                clearInterval(intervalId); // Stop checking once the button is added
            }
        }, 500);
    }
}

// Check the URL initially when the script loads
checkForWatchPage();

// Observe changes to the URL
let lastUrl = window.location.href;
new MutationObserver(() => {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        checkForWatchPage();
    }
}).observe(document, { subtree: true, childList: true });