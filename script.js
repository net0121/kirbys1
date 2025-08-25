// Get the canvas and its 2D context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions (4:3 aspect ratio like the SNES)
canvas.width = 640;
canvas.height = 480;

// Game variables
let frameCount = 0;
let currentState = 'initial';
const stateDurations = {
    'initial': 180, // ~3 seconds at 60fps
    'logos': 120, // ~2 seconds
    'sky': 180, // ~3 seconds
    'grass': 180, // ~3 seconds
    'flyAway': 120, // ~2 seconds
    'titleScreen': 180, // ~3 seconds
    'springBreeze': 120 // ~2 seconds
};
let stateTimer = 0;

// Sprite placeholders (simple blocks)
const sprites = {
    nintendo: { x: 250, y: 150, width: 140, height: 40, color: '#6A9CF3', text: 'Nintendo' },
    hal: { x: 270, y: 220, width: 100, height: 80, color: '#3A7029', text: 'HALKEN' },
    kirby: { x: 0, y: 240, width: 40, height: 40, color: 'pink' },
    kirbyStar: { x: 0, y: 260, width: 60, height: 30, color: '#FFD700' },
    cloud: { width: 80, height: 40, color: 'white' },
    stars: { width: 10, height: 10, color: 'yellow' },
    titleLogo: { width: 400, height: 100, color: '#FFB8C1', text: 'Kirby Super Star' },
    titleKirby: { width: 80, height: 80, color: 'pink' },
    springBreeze: { width: 250, height: 40, color: 'gray', text: 'SPRING BREEZE' }
};

// Initial positions and velocities
let kirbyY = 150;
let kirbyVelocity = 0;
let kirbyX = -100;
const kirbySpeed = 2;

// Arrays for multiple moving sprites
const clouds = [];
const stars = [];

// Functions to draw sprites
function drawRect(sprite) {
    ctx.fillStyle = sprite.color;
    ctx.fillRect(sprite.x, sprite.y, sprite.width, sprite.height);
}

function drawText(sprite) {
    ctx.fillStyle = '#fff';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(sprite.text, sprite.x + sprite.width / 2, sprite.y + sprite.height / 2);
}

function drawKirby() {
    drawRect({ ...sprites.kirbyStar, x: kirbyX, y: kirbyY });
    drawRect({ ...sprites.kirby, x: kirbyX + 10, y: kirbyY - 20 });
}

// State transition and logic
function changeState(newState) {
    currentState = newState;
    stateTimer = 0;
    frameCount = 0; // Reset frame count for the new state
}

// The main game loop
function update() {
    frameCount++;
    stateTimer++;

    // State machine
    switch (currentState) {
        case 'initial':
            if (stateTimer >= stateDurations.initial) {
                changeState('logos');
            }
            break;

        case 'logos':
            if (stateTimer >= stateDurations.logos) {
                changeState('sky');
                kirbyX = -100; // Reset Kirby's position for the new scene
                kirbyY = 150;
            }
            break;

        case 'sky':
            if (kirbyX < canvas.width / 2) {
                kirbyX += kirbySpeed;
            } else {
                kirbyX = canvas.width / 2;
            }
            if (stateTimer >= stateDurations.sky) {
                changeState('grass');
                kirbyX = 200; // Place Kirby in the middle for landing
                kirbyY = 150;
                kirbyVelocity = 2; // Start Kirby moving down
            }
            break;

        case 'grass':
            if (kirbyY < 320) {
                kirbyY += kirbyVelocity;
                kirbyVelocity += 0.1; // Simple gravity
            } else {
                kirbyY = 320;
                if (frameCount % 30 === 0) { // Hop animation
                    kirbyVelocity = -2;
                }
            }
            if (stateTimer >= stateDurations.grass) {
                changeState('flyAway');
            }
            break;

        case 'flyAway':
            kirbyY -= kirbySpeed * 2;
            kirbyX += kirbySpeed;
            if (stateTimer >= stateDurations.flyAway) {
                changeState('titleScreen');
            }
            break;

        case 'titleScreen':
            if (stateTimer >= stateDurations.titleScreen) {
                changeState('springBreeze');
            }
            break;

        case 'springBreeze':
            // Final screen, can add more logic here later
            break;
    }

    requestAnimationFrame(render);
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw based on the current state
    switch (currentState) {
        case 'initial':
            // Black screen, nothing to draw
            break;

        case 'logos':
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawRect(sprites.nintendo);
            drawText(sprites.nintendo);
            drawRect(sprites.hal);
            drawText(sprites.hal);
            break;

        case 'sky':
            ctx.fillStyle = '#4993C5';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawKirby();
            break;

        case 'grass':
            ctx.fillStyle = '#4993C5';
            ctx.fillRect(0, 0, canvas.width, 240); // Sky
            ctx.fillStyle = '#5A753B';
            ctx.fillRect(0, 240, canvas.width, 240); // Grass
            drawKirby();
            break;

        case 'flyAway':
            ctx.fillStyle = '#1D2571';
            ctx.fillRect(0, 0, canvas.width, canvas.height); // Darker blue sky
            drawKirby();
            break;

        case 'titleScreen':
            ctx.fillStyle = '#FFB8C1';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 60px "Comic Sans MS"'; // Placeholder font
            ctx.textAlign = 'center';
            ctx.fillText('KIRBY', canvas.width / 2, 100);
            ctx.fillText('SUPER STAR', canvas.width / 2, 160);
            drawRect({ ...sprites.titleKirby, x: canvas.width / 2 - 40, y: 200, color: 'pink' });
            break;

        case 'springBreeze':
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#000';
            ctx.font = '36px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(sprites.springBreeze.text, canvas.width / 2, canvas.height / 2);
            break;
    }

    // Call the next frame
    requestAnimationFrame(update);
}

// Start the animation loop
update();
