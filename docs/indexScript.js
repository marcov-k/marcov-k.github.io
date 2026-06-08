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

const infoTexts = Array.from(document.querySelectorAll('.infoLabel')).concat(Array.from(document.querySelectorAll('.infoText')));

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

const transformTrans1000ms = `transform 1s ease`;
const transformTrans660ms = `transform 0.66s ease`;
const infoTrans = `opacity 0.5s ease-out`;
const transformTrans500ms = `transform 0.5s ease-in`;
const transformTrans400ms = `transform 0.4s ease-in`;
const transformTrans1000msIn = `transform 1s ease-in`;
const transformTrans1000msOut = `transform 1s ease-out`;
const transformTrans0ms = `transform 0s ease`;
const infoTrans0ms = `opacity 0s ease`;

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
    titleText.style.transition = transformTrans1000ms;
    profileLink.style.transition = transformTrans1000ms;
    titleText.style.transform = `scale(${targetTitleScale})`;
    profileLink.style.transform = `scale(1)`;
}

async function moveSideBlocks() {
    let leftPos = -horizBlockEnd + '%';
    let rightPos = horizBlockEnd + '%';

    leftBlock.style.transition = transformTrans1000ms;
    rightBlock.style.transition = transformTrans1000ms;
    leftBlock.style.transform = `translateX(${leftPos})`;
    rightBlock.style.transform = `translateX(${rightPos})`;

    await wait(animTime);

    leftBlock.style.width = 0;
    rightBlock.style.width = 0;
}

async function moveBottomBlock() {
    let downPos = downBlockEnd + '%';

    downBlock.style.transition = transformTrans1000ms;
    downBlock.style.transform = `translateY(${downPos})`;

    await wait(animTime);

    downBlock.style.height = 0;
}

async function showTopOutline() {
    topBarOutlines.forEach(outline => {
        outline.style.transition = transformTrans660ms;
        outline.style.transform = `translateY(${0}%)`;
    });

    await wait(animTime * 0.66);
}

async function showSideBar() {
    let leftPos = -sideBarEnd + '%';
    let rightPos = sideBarEnd + '%';

    leftBar.style.transition = transformTrans1000ms;
    rightBar.style.transition = transformTrans1000ms;
    leftBar.style.transform = `translateX(${leftPos})`;
    rightBar.style.transform = `translateX(${rightPos})`;

    await wait(animTime);
}

async function unlock() {
    await launchButton();
    openUnlock();
    await showInfoText();
    scrollUnlock();
}

async function launchButton() {
    unlockButton.style.transition = transformTrans400ms;
    unlockButton.style.transform = `translateY(${unlockBEnd}) rotate(${unlockBRot})`;
    await wait(animTime * 0.3);
}

async function openUnlock() {
    let leftPos = -unlockBGEnd + '%';
    let rightPos = unlockBGEnd + '%';

    unlockBGLeft.style.transition = transformTrans500ms;
    unlockBGRight.style.transition = transformTrans500ms;
    unlockBGLeft.style.transform = `translateX(${leftPos})`;
    unlockBGRight.style.transform = `translateX(${rightPos})`;

    await wait(animTime * 0.5);

    unlockBGMain.style.transition = transformTrans500ms;
    unlockBGMain.style.width = 0;
    unlockBGMain.style.height = 0;
    bodyLockCont.style.pointerEvents = 'none';
}

async function showInfoText() {
    infoTexts.forEach(text => {
        text.style.transition = infoTrans;
        text.style.opacity = '1';
    });
    await wait(animTime * 0.5);
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
    sessionStorage.setItem('lastProject', projName);

    let href = "Projects/" + projName + "/" + projName + ".html";
    let colors = getProjColors(projName);

    if (colors) await loadCover(colors[0], colors[1]);
    else if (projName == 'unc') href = "UncertaintySolver/index.html";

    window.location.href = href;
}

async function loadCover(bgColor, outlineColor) {
    loadingCover.style.backgroundColor = bgColor;
    loadingCover.style.outlineColor = outlineColor;

    let time = 0;
    let timeStep = 10;
    loadingCover.style.transition = transformTrans1000msIn;
    loadingCover.style.transform = `scale(1)`;
    while (time < coverTime) {
        loadingCover.style.outlineWidth = lerp(0, coverOutlineWidth, time / coverTime) + 'vw';

        time += timeStep;
        await wait(timeStep);
    }
}

async function unloadCover(bgColor, outlineColor) {
    loadingCover.style.transition = transformTrans0ms;
    loadingCover.style.transform = `scale(1)`;
    loadingCover.style.outlineWidth = coverOutlineWidth;
    loadingCover.style.backgroundColor = bgColor;
    loadingCover.style.outlineColor = outlineColor;

    await wait(50);

    let time = 0;
    let timeStep = 10;
    loadingCover.style.transition = transformTrans1000msOut;
    loadingCover.style.transform = `scale(0)`;
    while (time < coverTime) {
        loadingCover.style.outlineWidth = lerp(coverOutlineWidth, 0, time / coverTime) + 'vw';

        time += timeStep;
        await wait(timeStep);
    }
    loadingCover.style.outlineWidth = '0vw';
}

function skipUnloadCover() {
    loadingCover.style.outlineWidth = 0;
    loadingCover.style.transition = transformTrans0ms;
    loadingCover.style.transform = `scale(0)`;
}

function skipLoad() {
    titleText.style.transition = transformTrans0ms;
    profileLink.style.transition = transformTrans0ms;
    titleText.style.transform = `scale(${targetTitleScale})`;
    profileLink.style.transform = `scale(1)`;

    let leftPos = -horizBlockEnd + '%';
    let rightPos = horizBlockEnd + '%';

    leftBlock.style.transition = transformTrans0ms;
    rightBlock.style.transition = transformTrans0ms;
    leftBlock.style.transform = `translateX(${leftPos})`;
    rightBlock.style.transform = `translateX(${rightPos})`;
    leftBlock.style.width = 0;
    rightBlock.style.width = 0;

    let downPos = downBlockEnd + '%';

    downBlock.style.transition = transformTrans0ms;
    downBlock.style.transform = `translateY(${downPos})`;
    downBlock.style.height = 0;

    topBarOutlines.forEach(outline => {
        outline.style.transition = transformTrans0ms;
        outline.style.transform = `translateY(${0}%)`;
    });

    leftPos = -sideBarEnd + '%';
    rightPos = sideBarEnd + '%';

    leftBar.style.transition = transformTrans0ms;
    rightBar.style.transition = transformTrans0ms;
    leftBar.style.transform = `translateX(${leftPos})`;
    rightBar.style.transform = `translateX(${rightPos})`;

    unlockButton.style.transition = transformTrans0ms;
    unlockButton.style.transform = `translateY(${unlockBEnd}) rotate(${unlockBRot})`;

    leftPos = -unlockBGEnd + '%';
    rightPos = unlockBGEnd + '%';

    unlockBGLeft.style.transition = transformTrans0ms;
    unlockBGRight.style.transition = transformTrans0ms;
    unlockBGLeft.style.transform = `translateX(${leftPos})`;
    unlockBGRight.style.transform = `translateX(${rightPos})`;

    unlockBGMain.style.transition = transformTrans0ms;
    unlockBGMain.style.width = 0;
    unlockBGMain.style.height = 0;
    bodyLockCont.style.pointerEvents = 'none';

    infoTexts.forEach(text => {
        text.style.transition = infoTrans0ms;
        text.style.opacity = '1';
    });

    scrollUnlock();
}

function getProjColors(projName) {
    switch (projName) {
        case 'vec2': return [projColors[0], projColors[1]];
        case 'nnn': return [projColors[2], projColors[3]];
        case 'imdef': return [projColors[4], projColors[5]];
        case 'first': return [projColors[6], projColors[7]];
        case 'ch': return [projColors[8], projColors[9]];
        case 'cs': return [projColors[10], projColors[11]];
        case 'pm': return [projColors[12], projColors[13]];
        default: return null;
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener('pageshow', (event) => {
    let navEntry = performance.getEntriesByType('navigation')[0];
    let isReload = navEntry && navEntry.type === 'reload';

    if (event.persisted || sessionStorage.getItem('visited')) {
        if (history.scrollRestoration) {
            history.scrollRestoration = 'manual';
        }

        skipLoad();

        let lastProj = sessionStorage.getItem('lastProject');
        let colors = getProjColors(lastProj);
        if (!event.persisted && !isReload && colors) {
            unloadCover(colors[0], colors[1]);
        }
        else {
            skipUnloadCover();
        }
    }
    else {
        sessionStorage.setItem('visited', true);
        windowLoad();
    }
});