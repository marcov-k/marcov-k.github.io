const body = document.body;
const titleText = document.getElementById('titleText');
const leftBlock = document.getElementById('leftBlock');
const rightBlock = document.getElementById('rightBlock');
const downBlock = document.getElementById('downBlock');
const leftBar = document.getElementById('leftBar');
const rightBar = document.getElementById('rightBar');
const targetTitleScale = 0.5;
const horizBlockEnd = 150;
const downBlockEnd = 100;
const sideBarEnd = 200;
const animTime = 1000;

async function windowLoad() {
    body.style.overflowY = 'hidden';
    await animateTitle();
    body.style.overflowY = 'auto';
}

async function animateTitle() {
    await wait(500);
    enlargeTitle();
    moveSideBlocks();
    await wait(animTime * 0.33);
    await showSideBar();
    moveBottomBlock();
}

function enlargeTitle() {
    titleText.style.transform = `scale(${targetTitleScale})`;
}

async function moveSideBlocks() {
    let leftPos = -horizBlockEnd + '%';
    let rightPos = horizBlockEnd + '%';

    leftBlock.style.transform = `translateX(${leftPos})`;
    rightBlock.style.transform = `translateX(${rightPos})`;

    await wait(animTime);

    leftBlock.style.width = 0;
    rightBlock.style.width = 0;
}

async function moveBottomBlock() {
    let downPos = downBlockEnd + '%';

    downBlock.style.transform = `translateY(${downPos})`;

    await wait(animTime);

    downBlock.style.height = 0;
}

async function showSideBar() {
    let leftPos = -sideBarEnd + '%';
    let rightPos = sideBarEnd + '%';

    leftBar.style.transform = `translateX(${leftPos})`;
    rightBar.style.transform = `translateX(${rightPos})`;

    await wait(animTime);
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = windowLoad;