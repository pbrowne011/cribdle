document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});

async function initializeGame() {
    try {
        const response = await fetch('/api/game');
        const gameData = await response.json();
        
        await preloadCardImages(gameData.player_hand);
        
        const game = new Game(gameData);
        const ui = new UI(game);

        ui.renderScoreboard();
        game.renderHand();
    } catch (error) {
        console.error('Failed to initialize game:', error);
    }
}

// Preload only the necessary card images
async function preloadCardImages(playerHand) {
    const imagesToLoad = playerHand.map(card => `/static/img/cards/${card.rank}${card.suit}.svg`);
    
    const imagePromises = imagesToLoad.map(src => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
        });
    });

    await Promise.all(imagePromises);
}
