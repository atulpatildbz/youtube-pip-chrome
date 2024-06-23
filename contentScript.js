function checkForWatchPage() {
    const observer = new MutationObserver(() => {
        if(!window.location.href.includes('youtube.com/watch')) {
            return;
        }
        const rightControls = document.getElementsByClassName("ytp-right-controls")[0];
        if (rightControls && !document.getElementById("customPipButton")) {
            const pipButton = document.createElement("button");
            pipButton.id = "customPipButton";
            pipButton.innerHTML = `<svg width="100%" height="100%" viewBox="-3.6 -3.6 31.20 31.20" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff" stroke-width="0.00024000000000000003" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.336"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="none" d="M0 0h24v24H0z"></path> <path fill-rule="nonzero" d="M21 3a1 1 0 0 1 1 1v7h-2V5H4v14h6v2H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zm0 10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h8zm-1 2h-6v4h6v-4zM6.707 6.293l2.25 2.25L11 6.5V12H5.5l2.043-2.043-2.25-2.25 1.414-1.414z"></path> </g> </g></svg>`;
            pipButton.title = "Picture-in-Picture";
            pipButton.className = "ytp-button";
            pipButton.onclick = () => {
                const video = document.querySelector('video');
                if (video) {
                    if (document.pictureInPictureElement) {
                        document.exitPictureInPicture();
                    } else {
                        video.requestPictureInPicture();
                    }
                }
            };
            rightControls.insertBefore(pipButton, rightControls.children[rightControls.children.length - 1]);
            observer.disconnect(); // Stop observing once the button is added
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

checkForWatchPage();