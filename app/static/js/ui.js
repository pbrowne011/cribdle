class UI {
    constructor(game) {
        this.game = game;
        this.submitBtn = document.getElementById('submit-btn');
        this.submitBtn.addEventListener('click', () => this.onSubmit());
    }

    renderScoreboard() {
        const scoreboard = document.querySelector('.scoreboard');
        const newRow = document.createElement('div');
        newRow.className = 'scoreboard-row';
        
        this.game.guesses[this.game.guesses.length - 1].cards.forEach((card, index) => {
            const scoreCard = document.createElement('div');
            scoreCard.className = `score-card ${this.game.guesses[this.game.guesses.length - 1].result[index]}`;
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
            this.endGame();
        } else if (result) {
            this.renderScoreboard();
            this.game.renderHand();
        }
    }

    endGame() {
        // TODO: Implement end game logic (show solution, final score, etc.)
        console.log('Game Over');
    }
}
