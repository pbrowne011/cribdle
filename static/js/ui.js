class UI {
    constructor(game) {
        this.game = game;
        this.submitBtn = document.getElementById('submit-btn');
        this.submitBtn.addEventListener('click', () => this.onSubmit());
        document.getElementById('shareButton').addEventListener('click', () => this.game.shareResult());
        document.getElementById('closePopup').addEventListener('click', () => this.hideEndGamePopup());
    }

    renderScoreboard() {
        const scoreboard = document.querySelector('.scoreboard');
        const newRow = document.createElement('div');
        newRow.className = 'scoreboard-row';

        const lastGuess = this.game.guesses[this.game.guesses.length - 1];
        const correctCount = lastGuess.result.filter(r => r === 'correct').length;
        
        let rowClass;
        if (correctCount === 2) {
            rowClass = 'both-correct';
        } else if (correctCount === 1) {
            rowClass = 'one-correct';
        } else {
            rowClass = 'none-correct';
        }
        
        newRow.classList.add(rowClass);
        
        lastGuess.cards.forEach((card, index) => {
            const scoreCard = document.createElement('div');
            scoreCard.className = 'score-card';
            const cardImg = document.createElement('img');
            cardImg.className = 'card';
            cardImg.src = `/static/img/cards/${card.rank}${card.suit}.svg`;
            scoreCard.appendChild(cardImg);
            newRow.appendChild(scoreCard);
        });
        
        scoreboard.appendChild(newRow);
    }

    onSubmit() {
        const result = this.game.submitGuess();
        if (result === 'gameOver') {
            this.showEndGamePopup();
        } else if (result === 'continue' || result === 'nextPhase') {
            this.renderScoreboard();
            this.game.renderHand();
            if (result === 'nextPhase') {
                // Implement any necessary UI changes for phase 2
            }
        }
    }
    
    showEndGamePopup() {
        const popup = document.getElementById('endGamePopup');
        const title = document.getElementById('endGameTitle');
        const message = document.getElementById('endGameMessage');

        const isWin = this.game.guesses[this.game.guesses.length - 1].result.every(r => r === 'correct');
        
        title.textContent = isWin ? 'Congratulations!' : 'Game Over';
        message.textContent = this.game.generateEndGameMessage(isWin);

        popup.style.display = 'block';
    }

    hideEndGamePopup() {
        document.getElementById('endGamePopup').style.display = 'none';
    }

    updateUI() {
        this.game.renderHand();
        this.renderScoreboard();
        this.game.updateSubmitButton();
    }
}
