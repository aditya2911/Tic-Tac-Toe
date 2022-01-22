// module to store private game objects
const game_private_objects = () => {
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [3, 4, 5]
    ];

    const X_marker = 'X';
    const O_marker = 'O';

    return {
        game_private_objects, X_marker, O_marker
        , WINNING_COMBINATIONS
    }
}

// IIFE function that start instaneously
const startGame = (() => {

    // get all the cell 
    const cellsGrp = document.querySelectorAll('.cells');
    let gamePrivateVaraible = game_private_objects();

    // set the current marker to  'X'
    let currentTurn = true;


    cellsGrp.forEach((cells) => {
        cells.addEventListener('click', handleClick, { once: true })
    }
    )

    // handles the click
    function handleClick(e) {
        let cell = e.target;
        // changes the marker based on the boolen currentTurn variable 
        let currentMarker = currentTurn ? gamePrivateVaraible.X_marker : gamePrivateVaraible.O_marker;

        // places the marker on the cells
        placeMarker(cell, currentMarker);

        // changes the marker
        swapTurns();
    }

    function placeMarker(selectedCell, marker) {
        // animation for markup 
        selectedCell.classList.add('animatedMarkup');
        selectedCell.textContent = marker;

        showingCurrentPLayer();

        // check if by placing the marker , did any one of the player won
        if (checkWin(marker)) {
            // if won end game
            endGame();
            console.log('winner is ' + marker);
        }

        // checks if the game was Draw
        if (checkDraw()) {
            console.log('Draw');
        }
    }


    // changes the marker
    function swapTurns() {
        currentTurn = !currentTurn;
    }

    function showingCurrentPLayer(){
        if(currentTurn){
            privy.game_playertwo.classList.remove('currentPlayer')
            privy.game_playerone.classList.add('currentPlayer')
        }
        else{
            privy.game_playerone.classList.remove('currentPlayer')
            privy.game_playertwo.classList.add('currentPlayer')
        }
    }

    // check if by placing the marker , did any one of the player won

    // array WINNING_COMBINATION IS created which contains all the possible winning Combination
    // this function check  each cells to see if there textContent is same as the marker
    // if it is same does it the follow the pattern for winning combination
    function checkWin(marked) {
        return gamePrivateVaraible.WINNING_COMBINATIONS.some((element) => {
            return element.every((index) => {
                return cellsGrp[index].textContent == marked;
            })

        })
    }

    // ends game and remove the click eventListener
    function endGame() {
        cellsGrp.forEach(cells => cells.removeEventListener('click', handleClick));

    }

    // check if all the celss contains the X or O markup
    function checkDraw() {
        return [...cellsGrp].every((cells) => {
            if (cells.textContent == gamePrivateVaraible.X_marker) {
                return true
            }
            if (cells.textContent == gamePrivateVaraible.O_marker) return true;
            else { return false; }

        })
    }

})()


// private object holder
const private_object = () => {
    let startButton = document.querySelector('.start-button');
    let mainContainer = document.querySelector('.main-container');
    let header = document.querySelector('.header');
    let splashscreen = document.querySelector('.splash-screen');
    let cont1 = document.querySelector('.cont1');
    let cont2 = document.querySelector('.cont2');
    let vers = document.querySelector('.Vs');
    let startTimer = document.querySelector('.start-timer')
    let playContainer = document.querySelector('.play-container');
    let game_playerone = document.querySelector('.player-one');
    let game_playertwo = document.querySelector('.player-two');
    let aditya = '123'
    let playerOrBotOptions = document.querySelectorAll('.playerOrBot');
    let X_gif = document.querySelector('#x-gif');
    let O_gif = document.querySelector('#o-gif');

    let x_gif_src = "https://giphy.com/embed/l41lGnxllmN3YqOyI";
    let o_gif_src = "https://giphy.com/embed/xT77XUw1XMVGIxgove"

    let X_PLAYER = 'xplayer';
    let X_BOT = 'xbot';
    let O_PLAYER = 'oplayer';
    let O_BOT = 'obot';

    let x;
    let o;
    console.log(playerOrBotOptions);


    return {
        startButton, mainContainer, header, splashscreen,
        playContainer, startTimer, cont1, cont2, vers,
        playerOrBotOptions, X_BOT, X_PLAYER, O_BOT,
        O_PLAYER, game_playerone, game_playertwo,
        X_gif, O_gif, x_gif_src, o_gif_src, x, o
    }

};


//  created a object that will used by other function to access the html 
//  elements
const privy = private_object();


//setting the 2nd layer and 3rd layer to not display as default
privy.splashscreen.style.display = 'none';
privy.playContainer.style.display = 'none'
privy.startButton.style.display = 'none';



//nifty animation countdown player
const theCountDown = (count) => {

    privy.startTimer.classList.remove('popin1');

    window.setTimeout(() => {
        privy.startTimer.classList.add('pop-out');
        if (typeof (count == 'number')) privy.startTimer.classList.add('numberFont');
        else { privy.startTimer.classList.remove('numberFont'); console.log('removeingFont') }
        privy.startTimer.textContent = count
        privy.startTimer.classList.add('popin1');
        privy.startTimer.classList.remove('pop-out');;
    }, 100)
}


privy.startButton.addEventListener('click', () => {
    console.log(privy.startButton);
    privy.mainContainer.classList.add('fade');
    privy.header.classList.add('fade');

    window.setTimeout(() => {
        privy.mainContainer.style.display = 'none'
        privy.header.style.display = 'none'

    }, 1000);


    window.setTimeout(loadingScreen, 2000);




})

privy.playerOrBotOptions.forEach(item => {
    item.addEventListener('click', () => { console.log('clci'); PorBoptionSelected(item) })
})


function resetBackgroundColorOfOptions(flag) {
    privy.playerOrBotOptions.forEach(item => {
        if ((item.dataset.options == privy.X_BOT) && (flag == 1)) {
            item.style.backgroundColor = '#fff';
            console.log(privy.X_gif)

            privy.X_gif.src = privy.x_gif_src;
        }

        if ((item.dataset.options == privy.X_PLAYER) && (flag == 2)) {
            item.style.backgroundColor = '#fff';
            privy.X_gif.src = privy.o_gif_src
        }

        if ((item.dataset.options == privy.O_PLAYER) && (flag == 3)) {
            item.style.backgroundColor = '#fff';
            privy.O_gif.src = privy.o_gif_src
        }

        if ((item.dataset.options == privy.O_BOT) && (flag == 4)) {
            item.style.backgroundColor = '#fff';
            privy.O_gif.src = privy.x_gif_src;
        }
    })

}
function choiceViewer(x, o) {
    if ((x != undefined) && (o != undefined)) {
        privy.startButton.classList.add('popin1');
        privy.startButton.style.display = 'block';
    }


    console.log("cjo");
    console.log({ x });
    console.log({ o })




    privy.cont1.textContent = x;
    privy.cont2.textContent = o;

    privy.game_playerone.textContent = x;
    privy.game_playertwo.textContent = o;

}


function PorBoptionSelected(item1) {


    let item_classlist = item1.dataset.options;
    console.log(item1);

    switch (item_classlist) {

        case privy.X_PLAYER:
            // resetBackgroundColorOfOptions();
            item1.style.backgroundColor = '#f5c1c1'
            resetBackgroundColorOfOptions(1);
            privy.x = 'Player';

            break;

        case privy.X_BOT:
            resetBackgroundColorOfOptions(2);
            item1.style.backgroundColor = '#f5c1c1'
            privy.x = 'Bot'

            break;

        case privy.O_PLAYER:
            resetBackgroundColorOfOptions(4);
            item1.style.backgroundColor = '#f5c1c1'
            privy.o = 'Player';

            break;


        case privy.O_BOT:
            resetBackgroundColorOfOptions(3);
            item1.style.backgroundColor = '#f5c1c1'
            privy.o = 'Bot';

            break;



    }

    choiceViewer(privy.x, privy.o);


}


const loadingScreen = (() => {



    privy.splashscreen.style.display = 'flex';
    privy.splashscreen.classList.add('splash')
    privy.cont1.classList.add('popin1');

    window.setTimeout(() => { privy.vers.classList.add('popin1') }, 1000);
    window.setTimeout(() => { privy.cont2.classList.add('popin1') }, 2000);
    window.setTimeout(() => { privy.startTimer.classList.add('popin1') }, 3000);

    window.setTimeout(() => theCountDown(3), 4000);
    window.setTimeout(() => theCountDown(2), 5000);
    window.setTimeout(() => theCountDown(1), 6000);
    window.setTimeout(() => theCountDown("Start-Game"), 6500);

    window.setTimeout(() => { privy.splashscreen.classList.add('pop-out') }, 7000);
    window.setTimeout(() => { privy.splashscreen.style.display = 'none' }, 8000);
    window.setTimeout(() => { privy.playContainer.style.display = 'flex' }, 8500);
    window.setTimeout(() => { privy.playContainer.classList.add('popin1') }, 8500);




})