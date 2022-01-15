startButton = document.querySelector('.start-button');
mainContainer = document.querySelector('.main-container');
header = document.querySelector('.header');
splashscreen = document.querySelector('.splash-screen');
let cont1 = document.querySelector('.cont1');
let cont2 = document.querySelector('.cont2');
let vers = document.querySelector('.Vs');
let startTimer = document.querySelector('.start-timer')
let playContainer = document.querySelector('.play-container');
let arr;
let time = 1000;

splashscreen.style.display = 'none';
playContainer.style.display = 'none'

function addPopin(obj) {
    this.target.classList.add('popin');
}

const theCountDown = (count) => {


    startTimer.classList.remove('popin1');


    window.setTimeout(() => {
        startTimer.classList.add('pop-out');
        if (typeof (count == 'number')) startTimer.classList.add('numberFont');
        else { startTimer.classList.remove('numberFont'); }
        startTimer.textContent = count
        startTimer.classList.add('popin1');
        startTimer.classList.remove('pop-out');;
    }, 100)
}



startButton.addEventListener('click', () => {
    mainContainer.classList.add('fade');
    header.classList.add('fade');

    window.setTimeout(() => {
        mainContainer.style.display = 'none'
        header.style.display = 'none'

    }, 1000);


    window.setTimeout(loadingScreen, 2000);




})


const loadingScreen = (() => {

    splashscreen.style.display = 'flex';
    splashscreen.classList.add('splash')


    cont1.classList.add('popin1');

    window.setTimeout(() => { vers.classList.add('popin1') }, 1000);
    window.setTimeout(() => { cont2.classList.add('popin1') }, 2000);
    window.setTimeout(() => { startTimer.classList.add('popin1') }, 3000);
    window.setTimeout(() => theCountDown(3), 4000);
    window.setTimeout(() => theCountDown(2), 5000);
    window.setTimeout(() => theCountDown(1), 6000);
    window.setTimeout(() => theCountDown('Start Game'), 7000);
    window.setTimeout(() => { splashscreen.classList.add('pop-out') }, 8000);
    window.setTimeout(() => { splashscreen.style.display = 'none' }, 9000);
    window.setTimeout(() => { playContainer.style.display = 'block' }, 9500);




})