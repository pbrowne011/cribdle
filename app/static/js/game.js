class Game {
    constructor(gameData) {
        this.playerHand = gameData.player_hand.map(card => ({
            ...card,
            rank: card.rank === '10' ? 'T' : card.rank
        }));
        this.solution = gameData.soln_player.map(card => ({
            ...card,
            rank: card.rank === '10' ? 'T' : card.rank
        }));
        this.selectedCards = [];
        this.guesses = [];
        this.maxGuesses = 6;
        this.currentPhase = 1;
    }
    
    renderHand() {
        const handContainer = document.querySelector('.hand-container');
        handContainer.innerHTML = '';
        this.playerHand.forEach(card => {
            const cardElement = document.createElement('img');
            cardElement.className = 'card';
            cardElement.src = `/static/img/cards/${card.rank}${card.suit}.svg`;
            cardElement.addEventListener('click', () => this.selectCard(card, cardElement));
            handContainer.appendChild(cardElement);
        });
    }

    selectCard(card, cardElement) {
        const maxSelections = this.currentPhase === 1 ? 2 : 1;
        const index = this.selectedCards.findIndex(c => c.rank === card.rank && c.suit === card.suit);
        
        if (index > -1) {
            this.selectedCards.splice(index, 1);
            cardElement.classList.remove('selected');
        } else if (this.selectedCards.length < maxSelections) {
            this.selectedCards.push(card);
            cardElement.classList.add('selected');
        }

        this.updateSubmitButton();
    }

    updateSubmitButton() {
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.disabled = this.selectedCards.length !== (this.currentPhase === 1 ? 2 : 1);
    }

    submitGuess() {
        if (this.selectedCards.length !== (this.currentPhase === 1 ? 2 : 1)) {
            return false;
        }

        const guess = {
            cards: this.selectedCards,
            result: this.checkGuess()
        };

        this.guesses.push(guess);
        this.selectedCards = [];

        if (guess.result.every(r => r === 'correct') || this.guesses.length >= this.maxGuesses) {
            return 'gameOver';
        }

        if (this.currentPhase === 1 && this.guesses.length === 3) {
            this.currentPhase = 2;
            // TODO: Fetch new hand for phase 2
        }

        return true;
    }

    checkGuess() {
        return this.selectedCards.map(card => 
            this.solution.some(s => s.rank === card.rank && s.suit === card.suit) ? 'correct' : 'incorrect'
        );
    }
}
