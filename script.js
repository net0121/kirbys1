document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('background-music');
    music.play().catch(error => {
        // Autoplay was prevented. User will need to interact with the page to start it.
        console.log("Autoplay was prevented. User interaction is required.");
    });
});
