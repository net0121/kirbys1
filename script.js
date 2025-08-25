document.addEventListener('DOMContentLoaded', () => {
    // --- Element References ---
    const gameContainer = document.getElementById('game-container');
    const logoScene = document.getElementById('logo-scene');
    const nintendoLogo = document.getElementById('nintendo-logo');
    const halkenLogo = document.getElementById('halken-logo');
    const skyScene = document.getElementById('sky-scene');
    const groundScene = document.getElementById('ground-scene');
    const titleScene = document.getElementById('title-scene');
    const kirbyContainer = document.getElementById('kirby-container');
    const starBurstContainer = document.getElementById('star-burst-container');
    const blackOverlay = document.getElementById('black-overlay');

    // --- Helper Functions ---
    const sleep = ms => new Promise(res => setTimeout(res, ms));

    function switchScene(activeScene) {
        document.querySelectorAll('.scene').forEach(scene => {
            if (scene !== activeScene) scene.classList.remove('active');
        });
        activeScene.classList.add('active');
    }

    function createClouds(scene) {
        scene.querySelectorAll('.cloud').forEach(c => c.remove());
        for (let i = 0; i < 5; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'sprite cloud';
            cloud.style.top = `${Math.random() * 40}%`;
            cloud.style.left = `${Math.random() * 90}%`;
            scene.insertBefore(cloud, kirbyContainer);
        }
    }

    function createLandingStars() {
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('div');
            star.className = 'landing-star';
            groundScene.appendChild(star);
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 20 + Math.random() * 30;
            const startX = kirbyContainer.offsetLeft + (kirbyContainer.offsetWidth / 2);
            const startY = kirbyContainer.offsetTop + (kirbyContainer.offsetHeight / 2);
            
            star.style.left = `${startX}px`;
            star.style.top = `${startY}px`;
            star.style.transform = 'scale(0.5)';

            setTimeout(() => {
                const endX = Math.cos(angle) * distance;
                const endY = Math.sin(angle) * distance;
                star.style.transform = `translate(${endX}px, ${endY}px) scale(1)`;
                star.style.opacity = '0';
            }, 10);

            setTimeout(() => star.remove(), 400);
        }
    }

    async function createTitleStarburst() {
        for (let i = 0; i < 80; i++) {
            const star = document.createElement('div');
            star.className = 'sprite star';
            
            const angle = i * 0.25; // Increase angle for spiral
            const radius = i * 4.5; // Increase radius for spiral
            const duration = 0.5 + Math.random() * 0.3;

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            star.style.transition = `transform ${duration}s cubic-bezier(0.5, 0, 0.8, 1), opacity ${duration}s ease-out`;
            starBurstContainer.appendChild(star);
            
            await sleep(1); // Tiny delay for transition to register

            star.style.transform = `translate(${x}px, ${y}px) rotate(180deg)`;
            star.style.opacity = '0';
            setTimeout(() => star.remove(), duration * 1000);
        }
    }

    // --- Main Animation Sequence ---
    async function playIntro() {
        // === SCENE 1: Logos (3s) ===
        switchScene(logoScene);
        nintendoLogo.classList.add('squash-in');
        await sleep(200);
        halkenLogo.classList.add('squash-in');
        await sleep(2300);
        logoScene.style.opacity = '0';
        await sleep(500);

        // === SCENE 2: Fly In (3.5s) ===
        createClouds(skyScene);
        switchScene(skyScene);
        kirbyContainer.classList.add('is-flying-in');
        await sleep(3500);
        
        // === SCENE 3: On Ground (4s) ===
        groundScene.appendChild(kirbyContainer);
        kirbyContainer.className = 'sprite'; // Reset classes
        Object.assign(kirbyContainer.style, { animation: '', top: '60%', left: '45%', transform: 'scale(1)' });
        switchScene(groundScene);
        createLandingStars();
        await sleep(1000);

        // Dashing logic
        kirbyContainer.classList.add('is-dashing');
        await sleep(250);
        kirbyContainer.classList.remove('is-dashing');
        await sleep(400);
        kirbyContainer.style.transform = 'scaleX(-1)'; // Flip direction
        kirbyContainer.classList.add('is-dashing');
        await sleep(250);
        kirbyContainer.classList.remove('is-dashing');
        kirbyContainer.style.transform = 'scaleX(1)'; // Flip back
        await sleep(1000);

        // === SCENE 4: Fly Out (3s) ===
        skyScene.appendChild(kirbyContainer);
        createClouds(skyScene);
        switchScene(skyScene);
        kirbyContainer.classList.add('is-flying-out');
        await sleep(3000);
        skyScene.style.backgroundColor = '#002f6c';
        await sleep(1000);
        
        // === SCENE 5: Title Screen ===
        switchScene(titleScene);
        gameContainer.classList.add('is-shaking');
        await createTitleStarburst();
        await sleep(400); // Shake duration
        gameContainer.classList.remove('is-shaking');
        starBurstContainer.style.opacity = '0';
        
        gameContainer.setAttribute('data-state', 'titlescreen');
    }

    // --- Event Listener for Title Screen ---
    document.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter' && gameContainer.getAttribute('data-state') === 'titlescreen') {
            gameContainer.setAttribute('data-state', 'ended');
            titleScene.style.transition = 'opacity 0.8s ease-out';
            titleScene.style.opacity = '0';
            await sleep(800);
            blackOverlay.style.visibility = 'visible';
            blackOverlay.style.opacity = '1';
        }
    });

    playIntro();
});
