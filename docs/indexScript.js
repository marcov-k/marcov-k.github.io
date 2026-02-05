const body = document.body;
const titleText = document.getElementById('titleText');
const leftBlock = document.getElementById('leftBlock');
const rightBlock = document.getElementById('rightBlock');
const downBlock = document.getElementById('downBlock');
const targetTitleScale = 0.5;
const horizBlockEnd = 150;
const downBlockEnd = 100;
const animTime = 1000;

async function animateTitle() {
    await wait(500);
    enlargeTitle();
    moveBlocks();
}

function enlargeTitle() {
    titleText.style.transform = `scale(${targetTitleScale})`;
}

async function moveBlocks() {
    let leftPos = -horizBlockEnd + '%';
    let rightPos = horizBlockEnd + '%';
    let downPos = downBlockEnd + '%';
    leftBlock.style.transform = `translateX(${leftPos})`;
    rightBlock.style.transform = `translateX(${rightPos})`;
    await wait(animTime);
    body.style.overflowY = 'hidden';
    downBlock.style.transform = `translateY(${downPos})`;
    await wait(animTime);
    downBlock.style.height = 0;
    body.style.overflowY = 'auto';
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = () => {
    animateTitle();
};