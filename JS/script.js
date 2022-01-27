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



// IIFE function that start instaneously
const startGame = (() => {

    // get all the cell 
    const cellsGrp = document.querySelectorAll('.cells');
    let gamePrivateVaraible = game_private_objects();
    let humanPlayer = false;

    // set the current marker to  'X'
    let currentTurn = true;


    cellsGrp.forEach((cells) => {
        cells.addEventListener('click', handleClick, { once: true })
    }
    )

    function checkOwon(arr) {

        let tempArray = Array.from(arr);
    
        let winner = false
        let storedArr = gamePrivateVaraible.WINNING_COMBINATIONS;

        winner = storedArr.some((element) => {
            return element.every((index) => {
                return tempArray[index] == 'O';
            })

        })

     
        return winner;
    }

    function checkTieMiniMax(arr) {
        let tempArray = Array.from(arr);
        let result = false;

        result = tempArray.every((cell) => {
            return cell == 'X' || cell == 'O';
        })
        return result;
    }



    function checkXwon(arr) {
    
        let winner = false;
        let tempArray = Array.from(arr);
        let storedArr = gamePrivateVaraible.WINNING_COMBINATIONS;

        winner = storedArr.some((element) => {
            return element.every((index) => {
                return tempArray[index] == 'X';
            })

        })
  
        return winner;
    }

    function AI_move() {
        let bestScore = -1000;
        let cell_container = privy.cellsGrp;
        const BOT = 'O';
        const HUMAN = 'X';
        let bestMove = -1;
        let convertedArr = [];

        [...cellsGrp].forEach((cells) => {

            let tempVar = cells.textContent;
            convertedArr.push(tempVar)


            //    let score =  minimax(cellsGrp,cellsGrp.length,false);

            // cells.textContent = '';
            // if(score>bestScore){
            //     bestScore = score;
            //     bestMove = cells;
            // }

        });
   

        for (elements = 0; elements < convertedArr.length; elements++) {

            if (convertedArr[elements] == '') {

                convertedArr[elements] = BOT;

             

                let score = minimax(convertedArr, 0, false);

                convertedArr[elements] = "";

                if (score > bestScore) {
           
                    bestScore = score;
                    bestMove = elements;
                }
            }
   
        }



   
        cellsGrp[bestMove].textContent = BOT;
        cellsGrp[bestMove].classList.add('animatedMarkup');
        cellsGrp[bestMove].removeEventListener('click',handleClick);
        humanPlayer = true;
        swapTurns();

    }
    let resultWinner;
    function checkMiniMaxWinner(arr, depth) {
        let winner = null
   
        if (checkOwon(arr)) {
       

            winner = 10 - depth;
            // winner = 10;
        }
        if (checkXwon(arr)) {
       
            winner = depth - 10;
            //  winner = -10;
        }

        if (checkTieMiniMax(arr)) {
            winner = 0;
        }

   
        return winner;
    }

    function minimax(cell_grp, depth, isMaximizing) {
 
        let convertedToArr = Array.from(cell_grp);
     
        let checker = checkMiniMaxWinner(convertedToArr, depth)
        if (checker != null) {
          
            return checker;

        }

        if (isMaximizing) {


            let bestScore = -1000;


            for (let cells = 0; cells < convertedToArr.length; cells++) {

         

                if (convertedToArr[cells] == '') {

               

                    convertedToArr[cells] = 'O';

              

        

                    bestScore = Math.max(bestScore, minimax(convertedToArr, depth + 1, false));
                    convertedToArr[cells] = '';
              
                }
            }

            return bestScore;
        }

        else {

            let bestScore = +1000;

        

            for (let cells = 0; cells < convertedToArr.length; cells++) {
                if (convertedToArr[cells] == '') {

                    convertedToArr[cells] = 'X';
              
                    // let score = minimax(convertedToArr, depth + 1, true);
                   

                    bestScore = Math.min(bestScore, minimax(convertedToArr, depth + 1, true));
                    convertedToArr[cells] = '';
                  
                }
            }

       
            return bestScore;
        }


    }

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

        if (!humanPlayer) {
            AI_move();
        }

        // check if by placing the marker , did any one of the player won
        if (checkWin(marker)) {
            // if won end game
            endGame();
    
        }

        // checks if the game was Draw
        if (checkDraw()) {
         
        }
        humanPlayer = false;
    }


    // changes the marker
    function swapTurns() {
        currentTurn = !currentTurn;
    }

    // illumanites the banner that show the current player
    function showingCurrentPLayer() {
        if (!currentTurn) {
            privy.game_playertwo.classList.remove('currentPlayer')
            privy.game_playerone.classList.add('currentPlayer')
        }
        else {
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
        else { privy.startTimer.classList.remove('numberFont'); }
        privy.startTimer.textContent = count
        privy.startTimer.classList.add('popin1');
        privy.startTimer.classList.remove('pop-out');;
    }, 100)
}


privy.startButton.addEventListener('click', () => {

    privy.mainContainer.classList.add('fade');
    privy.header.classList.add('fade');

    window.setTimeout(() => {
        privy.mainContainer.style.display = 'none'
        privy.header.style.display = 'none'

    }, 1000);


    window.setTimeout(loadingScreen, 2000);




})

privy.playerOrBotOptions.forEach(item => {
    item.addEventListener('click', () => { PorBoptionSelected(item) })
})


function resetBackgroundColorOfOptions(flag) {
    privy.playerOrBotOptions.forEach(item => {
        if ((item.dataset.options == privy.X_BOT) && (flag == 1)) {
            item.style.backgroundColor = '#fff';

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







    privy.cont1.textContent = x;
    privy.cont2.textContent = o;

    privy.game_playerone.textContent = x;
    privy.game_playertwo.textContent = o;

}


function PorBoptionSelected(item1) {


    let item_classlist = item1.dataset.options;


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

    window.setTimeout(() => { privy.vers.classList.add('popin1') }, 10);
    window.setTimeout(() => { privy.cont2.classList.add('popin1') }, 20);
    window.setTimeout(() => { privy.startTimer.classList.add('popin1') }, 30);

    window.setTimeout(() => theCountDown(3), 40);
    window.setTimeout(() => theCountDown(2), 50);
    window.setTimeout(() => theCountDown(1), 60);
    window.setTimeout(() => theCountDown("Start-Game"), 6500);

    window.setTimeout(() => { privy.splashscreen.classList.add('pop-out') }, 70);
    window.setTimeout(() => { privy.splashscreen.style.display = 'none' }, 80);
    window.setTimeout(() => { privy.playContainer.style.display = 'flex' }, 85);
    window.setTimeout(() => { privy.playContainer.classList.add('popin1') }, 85);




})