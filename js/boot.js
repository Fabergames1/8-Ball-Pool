var bootState = {
    preload: function () {
        // Load the progress bar image.
        game.load.image('progressBar', 'assets/bar.png');
        game.load.image('menuBack', 'assets/menuBack.png');
    },
    create: function () {
        // Set some game settings.
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;
        // Start the load state.
        game.state.start('load');
    } 
}; 