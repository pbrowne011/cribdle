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
        scoreboard.innerHTML = ''; // Clear existing content

        const leftSection = document.createElement('div');
        leftSection.className = 'scoreboard-left';

        const rightSection = document.createElement('div');
        rightSection.className = 'scoreboard-right';

        this.game.guesses.forEach((guess, index) => {
            const newRow = document.createElement('div');
            newRow.className = 'scoreboard-row';
            
            const correctCount = guess.result.filter(r => r === 'correct').length;
            
            let rowClass;
            if (correctCount === 2) {
                rowClass = 'both-correct';
            } else if (correctCount === 1) {
                rowClass = 'one-correct';
            } else {
                rowClass = 'none-correct';
            }
            
            newRow.classList.add(rowClass);
            
            guess.cards.forEach(card => {
                const scoreCard = document.createElement('div');
                scoreCard.className = 'score-card';
                const cardImg = document.createElement('img');
                cardImg.className = 'card';
                cardImg.src = `/static/img/cards/${card.rank}${card.suit}.svg`;
                scoreCard.appendChild(cardImg);
                newRow.appendChild(scoreCard);
            });
            
            // Add to left section if it's one of the first 3 guesses, otherwise to right section
            if (index < 3) {
                leftSection.appendChild(newRow);
            } else {
                rightSection.appendChild(newRow);
            }
        });

        scoreboard.appendChild(leftSection);
        scoreboard.appendChild(rightSection);
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
