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

    let game_player_parent1 = document.querySelector('.player-parent1');
    let game_player_parent2 = document.querySelector('.player-parent2');
    let aditya = '123'
    let playerOrBotOptions = document.querySelectorAll('.playerOrBot');
    let X_gif = document.querySelector('#x-gif');
    let O_gif = document.querySelector('#o-gif');
    let round_end_container = document.querySelector('.round-end-container');

    let X_score = document.getElementById('X_score');
    let O_score = document.getElementById('O_score');

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
        X_gif, O_gif, x_gif_src, o_gif_src, x, o,
        round_end_container,game_player_parent1,game_player_parent2
        ,X_score,O_score
    }

};
function endGameReload(){
    window.location = "index.html";
}
let returnButton = document.querySelector(".return-button");
let endGameButton  = document.querySelector(".replay");
let winnerTextContainer  = document.querySelector(".winner");


returnButton.addEventListener('click', endGameReload, { once: true })

endGameButton.addEventListener("click",()=>{endGameReload()});

//  created a object that will used by other function to access the html 
//  elements
const privy = private_object();



// IIFE function that start instaneously
const startGame = (player1,player2) => {

    
    
    // get all the cell 
    const cellsGrp = document.querySelectorAll('.cells');
    let gamePrivateVaraible = game_private_objects();

    let humanPlayer = false;
    let currentPlayer = true
    let HighlightPLayerVar = true;
     let scoreOfX = 0;
     let scoreOfO = 0;
     let winnerText ;
     let bestMoveHolder ;
     let isBestMoveEmpty = false;
   
    showingCurrentPLayer(false);

    // set the current marker to  'X'
    let currentTurn = true;

 
    console.log(player1,player2);

    // let aChecker = checkEmptySpace();
    // console.log(aChecker);
    let timerA = 1000;
    let timerB = 2000;
    let checkWinmarker = 'X';
    let globalResultValue = 1;
    let index ;
function AI_bots(){
   let res = checkIfWinOrTie();
  if(res){
    if(currentPlayer){
        console.log('you there in BOT?')
        
    if(player1 == 'Bot'){
        currentPlayer = false;

        if(player2=='Player'){
           

        window.setTimeout(()=>{
           
            AI_move('X','O','Xplayer'); showingCurrentPLayer(true);},500) 
        
         checkWinmarker = 'X'
        

        }
        else if(player2=='Bot'){
           

        setTimeout(()=>{ 
            // showingCurrentPLayer(true);
            AI_move('X','O','Xplayer'); showingCurrentPLayer(true);},timerA)
        timerA = timerA +1000;
        checkWinmarker = 'X'
        //  showingCurrentPLayer(true);

        }
      
    }
    else{
        cellsGrp.forEach((cells) => {

            if(cells.textContent ==""){
            cells.addEventListener('click', handleClick, { once: true })
            }
            else{
                cells.removeEventListener('click', handleClick);
            }
       
       })
       checkWinmarker = 'X'
    }
}
    if(!currentPlayer){
    if(player2 == 'Bot'){
        console.log('you there in BOT 222?')
        currentPlayer = true;
        if(player1 == 'Player'){
           

       setTimeout(()=>{
     
        AI_move('O','X','Oplayer');showingCurrentPLayer(false); },500) ;
         
       checkWinmarker = 'O';
        }
        else if(player1=='Bot'){
          

        setTimeout(()=>{ 
        
            AI_move('O','X','Oplayer');showingCurrentPLayer(false); },timerB) ;
       timerB = timerB+1000
       checkWinmarker = 'O';
        }
        
    } else{
        cellsGrp.forEach((cells) => {
            if(cells.textContent ==""){
                cells.addEventListener('click', handleClick, { once: true })
                }
             else{
                    cells.removeEventListener('click', handleClick);
                }
       })

       checkWinmarker = 'O';
    //    currentPlayer = !currentPlayer;
    }
}

  }
}

AI_bots();

function Cell_Stalemate(){
    [...cellsGrp].forEach((cell)=>{
        // console.log(cell);
        // cell.classList.remove('.animatedMarkup')
        cell.classList.add('stalemate');
    })
}

function ResetGame(){
[...cellsGrp].forEach(cell => {
    cell.classList.add('fadeMarkersOut');
    cell.classList.remove('stalemate');
    cell.classList.remove('.animatedMarkup')
    cell.classList.remove('highlightWinMark');
    cell.style='';

    window.setTimeout(()=>{
        cell.classList.remove('fadeMarkersOut');
        cell.textContent= '';
    })
});

}

function checkIfWinOrTie(){
    let cellGrpTextContent =[];
    cellsGrp.forEach((cells)=>cellGrpTextContent.push(cells.textContent));
    let result = true;
    if(checkTieMiniMax(cellGrpTextContent)){
        console.log('tied??')
        Cell_Stalemate();
        // ResetGame();
        winnerText = "Tie"
        result = 'Tie'
    }
    if(checkOwon(cellGrpTextContent)){
        result = 'O';
        HighlightWinningCells(index)
        // ResetGame();
        winnerText = "O won";
        privy.O_score.textContent = scoreOfO+1;
    }

    if(checkXwon(cellGrpTextContent)){
        privy.X_score.textContent = scoreOfX+1;
        HighlightWinningCells(index)
        // ResetGame();
        result = 'X'
        winnerText = "X won";

    }

    if(result!=true){ 
        result= false;
        endGame()}
    return result;
}


 
    function HighlightWinningCells(arr){
            arr.map((item)=>{
                cellsGrp[item].classList.add('highlightWinMark');
            })
    }

    function checkOwon(arr) {
        let tempArray = Array.from(arr);
    
        let winner = false
        let storedArr = gamePrivateVaraible.WINNING_COMBINATIONS;

        winner = storedArr.some((element) => {
            let result = element.every((index) => {
                return tempArray[index] == 'O'; 
                
            }
            )
            if(result == true) {index = element;
                // console.log(index);
          };
            
            return result;

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
            let result = element.every((index) => {
                return tempArray[index] == 'X';
            })
            if(result == true) {
                index = element;
                // console.log(index);
                
            // HighlightWinningCells(index)};
            }
            return result;
            

        })
  
        return winner;
    }

    function AI_move(mark1,mark2,XorObot) {
        let bestScore = -1000;
        let marker1 = mark1;
        let marker2 = mark2;
        let bestMove = -1;
        let XorObotVar =  XorObot;
        let convertedArr = [];

        [...cellsGrp].forEach((cells) => {

            let tempVar = cells.textContent;
            convertedArr.push(tempVar)
 

        });
   

        for ( let elements = 0; elements < convertedArr.length; elements++) {

            if (convertedArr[elements] == '') {

                convertedArr[elements] = marker1;

             

                let score = minimax(convertedArr, 0, false,marker1,marker2,XorObotVar);

                convertedArr[elements] = "";

                if (score > bestScore) {
           
                    bestScore = score;
                    bestMove = elements;
                }
            }
   
        }



        bestMoveHolder =  bestMove;
        isBestMoveEmpty = true;
        cellsGrp[bestMove].removeEventListener('click',()=>{handleClick});
        cellsGrp[bestMove].textContent = marker1;
        cellsGrp[bestMove].classList.add('animatedMarkup');
            
    
           
    humanPlayer = true;
    let result = checkIfWinOrTie();
    if(result){
      AI_bots()
    }
        swapTurns();

    }
    let resultWinner;
    function checkMiniMaxWinner(arr, depth,XorO_bot) {
        let winner = null

        if (checkTieMiniMax(arr)) {
            winner = 0;
        }


        if (checkXwon(arr)) {
            if(XorO_bot == 'Xplayer'){
                winner = 10-depth
            }
            else{ 
                 winner = depth - 10;
                }
          

            
            //  winner = -10;
        }
   
        if (checkOwon(arr)) {
       
            if(XorO_bot == 'Xplayer'){winner = depth -10}
            else{
            winner = 10 - depth;
            }
            // winner = 10;
        }
      

       
        
        return winner;
    }

    function minimax(cell_grp, depth, isMaximizing,mark1,mark2,XorO_bot) {
 
        let convertedToArr = Array.from(cell_grp);
     
        let checker = checkMiniMaxWinner(convertedToArr, depth,XorO_bot)
        if (checker != null) {
          
            return checker;

        }

        if (isMaximizing) {


            let bestScore = -1000;


            for (let cells = 0; cells < convertedToArr.length; cells++) {

         

                if (convertedToArr[cells] == '') {

               

                    convertedToArr[cells] = mark1;

              

        

                    bestScore = Math.max(bestScore, minimax(convertedToArr, depth + 1, false,mark1,mark2,XorO_bot));
                    convertedToArr[cells] = '';
              
                }
            }

            return bestScore;
        }

        else {

            let bestScore = +1000;

        

            for (let cells = 0; cells < convertedToArr.length; cells++) {
                if (convertedToArr[cells] == '') {

                    convertedToArr[cells] = mark2;
              
                    // let score = minimax(convertedToArr, depth + 1, true);
                   

                    bestScore = Math.min(bestScore, minimax(convertedToArr, depth + 1, true,mark1,mark2,XorO_bot));
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
        currentPlayer = !currentPlayer;
        showingCurrentPLayer(!currentPlayer);
        AI_bots();

    }

    function placeMarker(selectedCell, marker) {
        // animation for markup  
        selectedCell.classList.add('animatedMarkup');
        selectedCell.textContent = marker;


        if(player1 == 'Bot'|| player2 == 'Bot'){ showingCurrentPLayer(!HighlightPLayerVar); }

         HighlightPLayerVar = !HighlightPLayerVar
        showingCurrentPLayer(HighlightPLayerVar);

        if (!humanPlayer) {
            //  AI_move('O','X');
        }

         // checks if the game was Draw
         if (checkDraw()) {
            console.log('draw');
           }

        // check if by placing the marker , did any one of the player won
        if (checkWin(marker)) {
            // if won end game
            console.log(marker+'wins')
            endGame();
    
        }

       
        humanPlayer = false;
    }


    // changes the marker
    function swapTurns() {
        currentTurn = !currentTurn;
    }

    // illumanites the banner that show the current player
    function showingCurrentPLayer(currentPlayer) {
        if (!currentPlayer) {
            privy.game_player_parent2.classList.remove('currentPlayer')
            privy.game_player_parent1.classList.add('currentPlayer')
        }
        else {
            privy.game_player_parent1.classList.remove('currentPlayer')
            privy.game_player_parent2.classList.add('currentPlayer')
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
        winnerTextContainer.textContent = winnerText;
        window.setTimeout(()=>{
            // privy.playContainer.style.display = 'none'
            privy.round_end_container.style.display = 'flex';
            privy.round_end_container.classList.add('popin1');

        },2000)

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

}




//setting the 2nd layer and 3rd layer to not display as default
privy.splashscreen.style.display = 'none';
privy.playContainer.style.display = 'none'
privy.startButton.style.display = 'none';
privy.round_end_container.style.display = 'none';



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

    window.setTimeout(() => { privy.vers.classList.add('popin1') }, 1000);
    window.setTimeout(() => { privy.cont2.classList.add('popin1') }, 2000);
    window.setTimeout(() => { privy.startTimer.classList.add('popin1') }, 3000);

    window.setTimeout(() => theCountDown(3), 4000);
    window.setTimeout(() => theCountDown(2), 5000);
    window.setTimeout(() => theCountDown(1), 6000);
    window.setTimeout(() => theCountDown("Start-Game"), 6500);

    window.setTimeout(() => { privy.splashscreen.classList.add('pop-out') }, 7000);
    window.setTimeout(() => { privy.splashscreen.style.display = 'none' }, 8000);
    window.setTimeout(() => { privy.playContainer.style.display = 'flex' ;}, 8500);
    window.setTimeout(() => { privy.playContainer.classList.add('popin1') }, 8500);
    window.setTimeout(()=>{startGame(privy.x,privy.o)},9500);
    




})

// const startUp = () =>{
//     let startGameVar = startGame();
// }

// if((privy.x != undefined) && (privy.o != undefined)){

// }