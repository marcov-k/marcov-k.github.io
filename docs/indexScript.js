const body = document.body;

const titleText = document.getElementById('titleText');

const leftBlock = document.getElementById('leftBlock');
const rightBlock = document.getElementById('rightBlock');
const downBlock = document.getElementById('downBlock');

const leftBar = document.getElementById('leftBar');
const rightBar = document.getElementById('rightBar');

const topBarOutlines = Array.from(document.querySelectorAll('.tbOutline'));

const unlockButton = document.getElementById('unlockButton');
const unlockBGMain = document.getElementById('unlockBGMain');
const unlockBGLeft = document.getElementById('unlockBGLeft');
const unlockBGRight = document.getElementById('unlockBGRight');
const bodyLockCont = document.getElementById('bodyLockCont');

const targetTitleScale = 0.5;
const horizBlockEnd = 150;
const downBlockEnd = 100;
const sideBarEnd = 200;
const animTime = 1000;
const unlockBEnd = '-50vh';
const unlockBRot = '540deg';
const unlockBGEnd = 100;

async function windowLoad() {
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    scrollLock();
    await animateTitle();
}

async function animateTitle() {
    await wait(500);
    enlargeTitle();
    moveSideBlocks();
    await wait(animTime * 0.5);
    showTopOutline();
    await showSideBar();
    await moveBottomBlock();
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

async function showTopOutline() {
    topBarOutlines.forEach(outline => {
        outline.style.transform = `translateY(${0}%)`;
    });

    await wait(animTime * 0.66);
}

async function showSideBar() {
    let leftPos = -sideBarEnd + '%';
    let rightPos = sideBarEnd + '%';

    leftBar.style.transform = `translateX(${leftPos})`;
    rightBar.style.transform = `translateX(${rightPos})`;

    await wait(animTime);
}

async function unlock() {
    await launchButton();
    await openUnlock();
    scrollUnlock();
}

async function launchButton() {
    unlockButton.style.transform = `translateY(${unlockBEnd}) rotate(${unlockBRot})`;
    await wait(animTime * 0.3);
}

async function openUnlock() {
    let leftPos = -unlockBGEnd + '%';
    let rightPos = unlockBGEnd + '%';

    unlockBGLeft.style.transform = `translateX(${leftPos})`;
    unlockBGRight.style.transform = `translateX(${rightPos})`;

    await wait(animTime * 0.5);

    unlockBGMain.style.width = 0;
    unlockBGMain.style.height = 0;
    bodyLockCont.style.pointerEvents = 'none';
}

function scrollLock() {
    window.onscroll = () => {
        window.scrollTo(0, 0);
    };
}

function scrollUnlock() {
    window.onscroll = () => { };
}

async function loadProject(projName) {
    switch (projName) {
        case 'vec2':
            break;
        case 'nnn':
            break;
        case 'imdef':
            break;
        case 'first':
            break;
        case 'ch':
            break;
        case 'cs':
            break;
        case 'pm':
            break;
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = windowLoad;