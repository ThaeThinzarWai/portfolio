const gameModel = {
    currentPlayer: 1, //1 or 2 
    player1Name: '',
    player2Name: '',
    positionsOfPlayer1: [],
    positionsOfPlayer2: [],
    markStyle: ['X', 'O'],
    completeMoves: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ],
    diagonal_points: [
        [0,1,2],
        [2,1,0]
    ]
};

const gameController = {
    init: function () {
        scoreView.init();
        gameView.init();
        registerView.init();
        registerView.render();
    },
    restartGame: function () {
        //reset game Model
        gameModel.currentPlayer = 1;
        gameModel.player1Name = '';
        gameModel.player2Name = '';
        gameModel.positionsOfPlayer1 = [];
        gameModel.positionsOfPlayer2 = [];
    },
    isComplete: function (positions) {  

        const sortedPositions = positions.sort();

        //Array parameters must be numbers
        for(const position of sortedPositions){
            if(typeof position !== 'number') {
                throw new Error('Parameters must be a number array');
            }
        }    

        //Match with predefined answer and return boolean
        for (const completeMove of gameModel.completeMoves) {
            if (completeMove.every(r => sortedPositions.includes(r))) {
                return true;
            }
        }

        for (var i = 0; i < gameModel.completeMoves.length; i++) {
            let isComplete = true;
            for (const move of gameModel.completeMoves) {
                if(!sortedPositions.includes(move[i])) {
                    isComplete = false;
                }
            }
            if(isComplete){
                return true;
            }
        }

        for(points of gameModel.diagonal_points){
            if(this.randomPointCheck(points, sortedPositions)){
                return true;
            }
        }

        return false;
    },
    randomPointCheck : function(input_array, player_position){
        let is_complete = true;
        for (var i = 0; i < gameModel.completeMoves.length; i++) {
            if(!player_position.includes(gameModel.completeMoves[i][input_array[i]])) {
                is_complete = false;
            }
        }
        return is_complete;
    },
    changePlayer: function () {
        if(this.getCurrentPlayer() === 1) {
            gameModel.currentPlayer = 2;
        }
        else {
            gameModel.currentPlayer = 1;
        }
    },
    getCurrentPlayer: function () {
        return gameModel.currentPlayer;
    },
    getCurrentPlayerName: function(){
        if(this.getCurrentPlayer() === 1) {
            return gameModel.player1Name;
        }
        else {
            return gameModel.player2Name;
        } 
    },
    getCurrentMarkStyle: function () {
        //player one for X and player 2 for O
        return gameModel.markStyle[this.getCurrentPlayer()-1];
    },
    setPosition: function (index) {
        //throw error if input is smaller than 1 or larger than 9
        if((index < 1) || (index > 9)){
            throw new Error('Parameters must be between 1 or larger than 9');
        }

        //throw error if input position is already selected by current user or opposition 
        if(gameModel.positionsOfPlayer1.includes(index) || gameModel.positionsOfPlayer2.includes(index)) {
            throw new Error('Position already selected');
        }

        //add a position to current player  
        if(this.getCurrentPlayer() === 1) {
            gameModel.positionsOfPlayer1.push(index);
        }
        else {
            gameModel.positionsOfPlayer2.push(index);
        }
    },
    selectPosition: function (index) {
        const convertedValue = parseInt(index);

        this.setPosition(convertedValue);

        //check is complete
        let is_complete = false;
        if(this.getCurrentPlayer() === 1) {
            is_complete = this.isComplete(gameModel.positionsOfPlayer1);
        }
        else {
            is_complete = this.isComplete(gameModel.positionsOfPlayer2);
        }

        if(is_complete) {
            // Game Win
            this.saveWinnerName(this.getCurrentPlayerName());
            alert(`Player ${this.getCurrentPlayerName()} win!!!`);
        }

        //change player
        this.changePlayer();
    },
    saveWinnerName: function(winnerName){
        if(!localStorage.getItem(winnerName)){
            localStorage.setItem(winnerName, 1);
        }
        else {
            let totalscore = parseInt(localStorage.getItem(winnerName)) + 1;
            localStorage.setItem(winnerName, totalscore);
        }
    },
    setPlayerName: function(player1Name, player2Name){
        gameModel.player1Name = player1Name;
        gameModel.player2Name = player2Name;
    },
    getScoreData: function(){
        let score_arr = [];
        for (i=0 ; sKey = window.localStorage.key(i); i++) {
            score_arr[i] = [sKey, window.localStorage.getItem(sKey)];
        }
        return score_arr;
    }
};

const gameView = {
    init: function () {
        this.viewport = document.querySelector('#playView');
        this.restartGameBtn = document.querySelector("#btnRestart");
        this.currentPlayerLabel = document.querySelectorAll('.currentPlayer');
        this.inputs = document.querySelectorAll('#board input');

        this.inputs.forEach(element => {
            element.addEventListener('click', function(e){
                e.target.setAttribute('disabled', 'disabled');
                e.target.nextSibling.textContent = gameController.getCurrentMarkStyle();
                gameController.selectPosition(e.target.value);
                gameView.render();
            });
        });

        this.restartGameBtn.addEventListener('click', function(e){
            console.log("Restart");
            gameController.restartGame();
            console.log(gameModel.positionsOfPlayer1);
            console.log(gameModel.positionsOfPlayer2);
            gameView.resetDisplay();
            console.log("HELLO");
            gameView.render();
        });
    },
    resetDisplay : function() {
        this.inputs.forEach(element => {
            element.removeAttribute("disabled");
            element.nextSibling.textContent = "";
        });
        scoreView.render();
        registerView.render();
    },
    render : function() {
        this.viewport.style.display = "block";
        registerView.hideView();
        this.currentPlayerLabel.forEach(element => {
            element.innerHTML = gameController.getCurrentPlayerName();
        });
    },
    hideView: function(){
        this.viewport.style.display = "none";
        registerView.render();
    }
}

const registerView = {
    init: function() {
        this.viewport = document.querySelector('#registerView');
        this.player1Name = document.querySelector('#Player1Name');
        this.player2Name = document.querySelector('#Player2Name');
        this.btnStart = document.querySelector('#btnStart');

        this.btnStart.addEventListener('click', function(e){
            if(registerView.player1Name.value !== '' && registerView.player2Name.value !== '') {
                gameController.setPlayerName(registerView.player1Name.value, registerView.player2Name.value);
                gameView.render();
            }
            else {
                alert("Please add both players name");
            }
        });
    },
    render : function(){
        this.viewport.style.display = "block";
        gameView.hideView();
    },
    hideView: function(){
        this.viewport.style.display = "none";
    }
}

const scoreView = {
    init: function() {
        this.score_table = document.querySelector('#scorelist');
        scoreView.render();
    },
    render: function() {

        for(var i = scoreView.score_table.rows.length - 1; i > 0; i--)
        {
            scoreView.score_table.deleteRow(i);
        }

        gameController.getScoreData().forEach(function(score, i){
            let row = scoreView.score_table.insertRow(i+1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.innerHTML = score[0];
            cell2.innerHTML = score[1];
        });
    }
}

