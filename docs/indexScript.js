const body = document.body;
const root = document.documentElement;
const rootStyle = getComputedStyle(root);

const lerp = (x, y, a) => x * (1 - a) + y * a;

const titleText = document.getElementById('titleText');
const profileLink = document.getElementById('profileLink');

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

const loadingCover = document.getElementById('loadingCover');

const projColors = [rootStyle.getPropertyValue('--vec2-primary'), rootStyle.getPropertyValue('--vec2-light'), rootStyle.getPropertyValue('--nnn-primary'),
    rootStyle.getPropertyValue('--nnn-light'), rootStyle.getPropertyValue('--imdef-primary'), rootStyle.getPropertyValue('--imdef-light'), rootStyle.getPropertyValue('--first-primary'),
    rootStyle.getPropertyValue('--first-light'), rootStyle.getPropertyValue('--ch-primary'), rootStyle.getPropertyValue('--ch-light'), rootStyle.getPropertyValue('--cs-primary'),
    rootStyle.getPropertyValue('--cs-light'), rootStyle.getPropertyValue('--pm-primary'), rootStyle.getPropertyValue('--pm-light')];

const targetTitleScale = 0.5;
const horizBlockEnd = 150;
const downBlockEnd = 100;
const sideBarEnd = 200;
const animTime = 1000;
const unlockBEnd = '-50vh';
const unlockBRot = '540deg';
const unlockBGEnd = 100;
const coverTime = 1000;
const coverOutlineWidth = 100;

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
    profileLink.style.transform = `scale(1)`;
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
    let bgColor;
    let outlineColor;
    switch (projName) {
        case 'vec2':
            bgColor = projColors[0];
            outlineColor = projColors[1];
            break;
        case 'nnn':
            bgColor = projColors[2];
            outlineColor = projColors[3];
            break;
        case 'imdef':
            bgColor = projColors[4];
            outlineColor = projColors[5];
            break;
        case 'first':
            bgColor = projColors[6];
            outlineColor = projColors[7];
            break;
        case 'ch':
            bgColor = projColors[8];
            outlineColor = projColors[9];
            break;
        case 'cs':
            bgColor = projColors[10];
            outlineColor = projColors[11];
            break;
        case 'pm':
            bgColor = projColors[12];
            outlineColor = projColors[13];
            break;
    }
    await loadCover(bgColor, outlineColor);
}

async function loadCover(bgColor, outlineColor) {
    loadingCover.style.backgroundColor = bgColor;
    loadingCover.style.outlineColor = outlineColor;

    let time = 0;
    let timeStep = 10;
    loadingCover.style.transform = `scale(1)`;
    while (time < coverTime) {
        loadingCover.style.outlineWidth = lerp(0, coverOutlineWidth, time / coverTime) + 'vw';

        time += timeStep;
        await wait(timeStep);
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = windowLoad;