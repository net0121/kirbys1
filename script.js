document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('background-music');
    const playButton = document.getElementById('play-button');

    playButton.addEventListener('click', () => {
        music.play();
        playButton.style.display = 'none'; // Hide the button after it's clicked
    });
});
