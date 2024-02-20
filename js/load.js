var loadingLabel,progressBar;

var loadState = {
    preload: function () {
        // Add a 'loading...' label on the screen
        game.add.image(0,0,'menuBack');

        loadingLabel = game.add.text(game.width / 2, 250,
            'loading...', { font: '30px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);
        // Display the progress bar
        progressBar = game.add.sprite(game.width / 2, 300, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);
        // Load all game assets
        
        game.load.image('whiteball', 'assets/whiteball.png');
        game.load.image('blackball', 'assets/blackball.png');
        game.load.image('blueball', 'assets/blueball.png');
        game.load.image('redball', 'assets/redball.png');
        game.load.image('table','assets/table.png');
        game.load.image('stick','assets/stick.png');
        game.load.audio('collide', [ 'assets/hitWhiteBall.mp3', 'assets/hitWhiteBall.ogg' ]);
        game.load.audio('goal', [ 'assets/goal.mp3', 'assets/goal.ogg' ]);
        game.load.audio('bgmusic', [ 'assets/bgmusic.mp3', 'assets/bgmusic.ogg' ]);
        
       // Load a new asset that we will use in the menu state
        game.load.image('menuTitle', 'assets/menuTitle.png');
        game.load.image('8ballpool', 'assets/8ballpool.png');
        game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
    },
    update: function(){
        game.state.start('menu');
    }
}; 