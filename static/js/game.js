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
        this.updateSubmitButton();

        if (guess.result.every(r => r === 'correct')) {
            return 'gameOver';
        } else if (this.guesses.length >= this.maxGuesses) {
            return 'gameOver';
        }

        /*
        if (this.currentPhase === 1 && this.guesses.length === 3) {
            this.currentPhase = 2;
            // TODO: Fetch new hand for phase 2
        }*/

        return 'continue';
    }

    checkGuess() {
        return this.selectedCards.map(card => 
            this.solution.some(s => s.rank === card.rank && s.suit === card.suit) ? 'correct' : 'incorrect'
        );
    }

    endGame(isWin) {
        const popup = document.getElementById('endGamePopup');
        const title = document.getElementById('endGameTitle');
        const message = document.getElementById('endGameMessage');
        const shareButton = document.getElementById('shareButton');
        const closeButton = document.getElementById('closePopup');

        title.textContent = isWin ? 'Congratulations!' : 'Game Over';
        message.textContent = this.generateEndGameMessage(isWin);

        popup.style.display = 'block';

        shareButton.onclick = () => this.shareResult();
        closeButton.onclick = () => popup.style.display = 'none';
    }

    generateEndGameMessage(isWin) {
        const guessCount = this.guesses.length;
        if (isWin) {
            return `You won in ${guessCount} ${guessCount === 1 ? 'guess' : 'guesses'}!`;
        } else {
            return `Better luck next time! The correct cards were: ${this.solution.map(card => card.rank + card.suit).join(', ')}`;
        }
    }

    shareResult() {
        const guessCount = this.guesses.length;
        const maxGuesses = this.maxGuesses;
        let shareText = `Cribdle ${guessCount}/${maxGuesses}\n`;

        for (let i = 0; i < maxGuesses; i++) {
            if (i < guessCount) {
                shareText += this.guesses[i].result.map(r => r === 'correct' ? '🟩' : '🟥').join('');
            } else {
                shareText += '⬜⬜';
            }
            shareText += '\n';
        }

        if (navigator.share) {
            navigator.share({
                title: 'My Cribdle Result',
                text: shareText
            }).catch(console.error);
        } else {
            // Fallback for browsers that don't support the Web Share API
            const textArea = document.createElement('textarea');
            textArea.value = shareText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Result copied to clipboard!');
        }
    }
}
