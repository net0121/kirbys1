document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');

    // Scene 1: Nintendo and HAL Laboratory logos
    const scene1 = () => {
        const nintendoLogo = createAndAppendSprite('blue', '150px', '50%', 'center', '30%', '40%');
        const halLogo = createAndAppendSprite('green', '150px', '50%', 'center', '50%', '60%');

        animateSequence([
            { element: nintendoLogo, delay: 500, duration: 1000, props: { opacity: 1 } },
            { element: halLogo, delay: 1500, duration: 1000, props: { opacity: 1 } },
            { elements: [nintendoLogo, halLogo], delay: 3500, duration: 500, props: { opacity: 0 } }
        ], scene2);
    };

    // Scene 2: Kirby flying in the sky
    const scene2 = () => {
        const kirby = createAndAppendSprite('pink', '50px', '20%', '80%', '40%', '40%');
        const star = createAndAppendSprite('yellow', '20px', '10%', '10%', '5%', '5%');

        animateSequence([
            { element: kirby, delay: 500, duration: 2000, props: { top: '50%', left: '50%' } },
            { element: star, delay: 1000, duration: 1500, props: { top: '20%', left: '70%', transform: 'scale(1.5)' } },
            { elements: [kirby, star], delay: 3000, duration: 500, props: { opacity: 0 } }
        ], scene3);
    };

    // Scene 3: The ground and logo reveal
    const scene3 = () => {
        const ground = createAndAppendSprite('green', '100%', '0', '0', '50%', '50%');
        ground.style.height = '50%';
        ground.style.top = '50%';

        const kirbySuperStarLogo = createAndAppendSprite('white', '400px', '50%', 'center', '50%', '50%');
        kirbySuperStarLogo.style.backgroundColor = 'transparent';
        kirbySuperStarLogo.style.border = '2px solid gold';

        animateSequence([
            { element: kirbySuperStarLogo, delay: 1000, duration: 1000, props: { opacity: 1, transform: 'scale(1.2)' } },
            { element: ground, delay: 0, duration: 1000, props: { top: '50%' } }, // Ground animates in
        ], () => {
            // End of intro sequence
            console.log('Intro complete!');
        });
    };

    // Utility function to create and style a sprite placeholder
    function createAndAppendSprite(color, size, x, xAnchor, y, yAnchor) {
        const sprite = document.createElement('div');
        sprite.classList.add('sprite');
        sprite.style.backgroundColor = color;
        sprite.style.width = size;
        sprite.style.height = size;
        sprite.style.left = x;
        sprite.style.top = y;
        sprite.style.transform = `translate(-${xAnchor}, -${yAnchor})`;
        sprite.style.opacity = 0; // Start with opacity 0
        gameContainer.appendChild(sprite);
        return sprite;
    }

    // Utility function for animating a sequence of elements
    function animateSequence(animations, callback) {
        let currentDelay = 0;

        animations.forEach(anim => {
            currentDelay += anim.delay;
            const elements = anim.elements || [anim.element];

            elements.forEach(el => {
                setTimeout(() => {
                    el.style.transition = `all ${anim.duration}ms ease-in-out`;
                    Object.assign(el.style, anim.props);
                }, currentDelay);
            });
            currentDelay += anim.duration;
        });

        setTimeout(callback, currentDelay + 500); // Small delay before next scene
    }

    // Start the intro sequence
    scene1();
});
