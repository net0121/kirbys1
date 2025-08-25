document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const logoContainer = document.getElementById('logo-container');
    const kirbyContainer = document.getElementById('kirby-container');
    const backgroundContainer = document.getElementById('background-container');
    const foregroundContainer = document.getElementById('foreground-container');
    const textContainer = document.getElementById('text-container');

    // Sprite placeholder creation
    function createBlock(className, x, y) {
        const block = document.createElement('div');
        block.classList.add('sprite-block', className);
        block.style.left = `${x}px`;
        block.style.top = `${y}px`;
        return block;
    }

    // -- Intro Sequence --

    // Stage 1: Nintendo / HAL Logos
    setTimeout(() => {
        gameContainer.style.backgroundColor = 'black';
        logoContainer.innerHTML = '<h2>Nintendo</h2><h2><span style="color: lightblue;">H</span><span style="color: green;">ALKEN</span></h2>';
        logoContainer.classList.add('fade-in');
    }, 1000);

    // Stage 2: Parallax flying
    setTimeout(() => {
        logoContainer.innerHTML = '';
        gameContainer.style.backgroundColor = '#4A8FE4'; // Blue sky
        
        // Create parallax elements
        // Kirby
        const kirby = createBlock('kirby-block', 300, 200);
        kirbyContainer.appendChild(kirby);
        
        // Foreground elements (ground)
        const ground = createBlock('ground-block', 0, 300);
        ground.classList.add('scrolling');
        foregroundContainer.appendChild(ground);

        // Background elements (mountains, clouds, stars)
        const mountains = createBlock('mountain-block', 0, 250);
        mountains.classList.add('scrolling');
        backgroundContainer.appendChild(mountains);

        backgroundContainer.appendChild(createBlock('cloud-block', 50, 50));
        backgroundContainer.appendChild(createBlock('cloud-block', 200, 100));
        backgroundContainer.appendChild(createBlock('star-block', 400, 20));

    }, 3000);

    // Stage 3: Title Screen
    setTimeout(() => {
        gameContainer.style.backgroundColor = 'white';
        kirbyContainer.innerHTML = '';
        backgroundContainer.innerHTML = '';
        foregroundContainer.innerHTML = '';

        logoContainer.style.position = 'relative';
        logoContainer.style.top = 'unset';
        logoContainer.style.left = 'unset';
        logoContainer.style.transform = 'unset';
        logoContainer.style.textAlign = 'center';
        logoContainer.style.paddingTop = '100px';

        logoContainer.innerHTML = `
            <h1 style="font-size: 60px; color: black; font-weight: bold;">KIRBY SUPER STAR</h1>
            <p style="font-size: 12px; color: black;">© 1995, 1996 HAL Laboratory, inc.</p>
            <p style="font-size: 12px; color: black;">© 1995, 1996 Nintendo</p>
        `;
    }, 10000);

    // Stage 4: Spring Breeze
    setTimeout(() => {
        gameContainer.style.backgroundColor = 'black';
        logoContainer.innerHTML = '';
        textContainer.innerHTML = '<h2>SPRING BREEZE</h2>';
        textContainer.style.color = '#888';
        textContainer.style.position = 'absolute';
        textContainer.style.top = '50%';
        textContainer.style.left = '50%';
        textContainer.style.transform = 'translate(-50%, -50%)';
        textContainer.style.fontSize = '32px';
    }, 15000);

    // Fade out or loop
    setTimeout(() => {
        gameContainer.innerHTML = '';
        // Intro complete, can loop or move to next screen
        console.log("Intro complete.");
    }, 20000);
});
