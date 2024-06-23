function checkForWatchPage() {
    const observer = new MutationObserver(() => {
        if(!window.location.href.includes('youtube.com/watch')) {
            return;
        }
        const rightControls = document.getElementsByClassName("ytp-right-controls")[0];
        if (rightControls && !document.getElementById("customPipButton")) {
            const pipButton = document.createElement("button");
            pipButton.id = "customPipButton";
            pipButton.innerHTML = "PIP";
            pipButton.className = "ytp-button";
            pipButton.style.marginRight = "10px";
            pipButton.onclick = () => {
                const video = document.querySelector('video');
                if (video) {
                    video.requestPictureInPicture();
                }
            };
            rightControls.insertBefore(pipButton, rightControls.children[rightControls.children.length - 1]);
            observer.disconnect(); // Stop observing once the button is added
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

checkForWatchPage();