const lerp = (x, y, a) => x * (1 - a) + y * a;

const loadingCover = document.getElementById('loadingCover');
const coverTime = 1000;
const animTimeStep = 10;
const coverOutlineWidth = 100;

async function windowLoad() {
    scrollLock();
    await coverLoad();
    scrollUnlock();
}

async function coverLoad() {
    let time = 0;
    loadingCover.style.transition = `transform 1s ease-out`;
    loadingCover.style.transform = `scale(0)`;
    while (time < coverTime) {
        loadingCover.style.outlineWidth = lerp(0, coverOutlineWidth, time / coverTime) + 'vw';

        time += animTimeStep;
        await wait(animTimeStep);
    }
    loadingCover.style.outlineWidth = '0vw';
}

async function coverUnload() {
    let time = 0
    loadingCover.style.transition = `transform 1s ease-in`;
    loadingCover.style.transform = `scale(1)`;
    while (time < coverTime) {
        loadingCover.style.outlineWidth = lerp(coverOutlineWidth, 0, time / coverTime) + 'vw';

        time += animTimeStep;
        await wait(animTimeStep);
    }
}

async function home() {
    await coverUnload();
    window.location.href = "../../index.html";
}

function scrollLock() {
    window.onscroll = () => {
        window.scrollTo(0, 0);
    };
}

function scrollUnlock() {
    window.onscroll = () => { };
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = windowLoad;