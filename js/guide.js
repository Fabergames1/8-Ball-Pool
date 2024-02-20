var textTitle,text,text1,text11;
var text2;
var text2alpha;
var logoimg;
var logopic;

var guideState = {
    preload: function(){
    },

    create: function() {
        //background
        game.add.image(0,0,'menuBack');
        //pic
        logopic = game.add.image(game.width/2,game.height/2+120,'8ballpool');
        logopic.anchor.setTo(0.5,0.5);

        // logo
        logoimg = game.add.image(game.width/2, game.height/2-100, 'menuTitle');
        logoimg.anchor.setTo(0.5,0.5);

        //text
        textTitle = game.add.text(250,game.height/2-70,'-How to Play-',{font: '28px Arial', fill: 'white'});
        textTitle.alpha = 0;
        textTitle.anchor.setTo(0.5,0.5);

        text = game.add.text(230,game.height/2-30,'Use Mouse to control the cue stick,',{font: '28px Arial', fill: 'white', align: "center"});
        text.alpha = 0;
        text.anchor.setTo(0.5,0.5);
        text.addColor('#ffff00', 4);
        text.addColor('white', 10);

        text1 = game.add.text(210,game.height/2+10,'and hit your balls into holes',{font: '28px Arial', fill: 'white', align: "center"});
        text1.alpha = 0;
        text1.anchor.setTo(0.5,0.5);

        text11 = game.add.text(190,game.height/2+50,'until all of your balls are in the holes.',{font: '28px Arial', fill: 'white', align: "center"});
        text11.alpha = 0;
        text11.anchor.setTo(0.5,0.5);

        
        text2 = game.add.text(game.width/2,game.height/2+200,'PRESS SPACE TO START',{font: '18px Arial', fill: 'white'});
        text2.anchor.setTo(0.5,0.5);
        text2alpha = 1;

        // SPACE
        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.add(this.start, this);

    },
    update:function(){
        //title
        if(logoimg.x >300){
            logoimg.x -= 4;
            logoimg.y -= 2;
            logopic.x += 5;
            logopic.y += 1;
        }
        else{
           //text
           var speed = 3;
            if(textTitle.x<game.width/2)
                textTitle.x += speed;
            if(text.x<game.width/2)
                text.x += speed;
            if(text1.x<game.width/2)
                text1.x += speed;
            if(text11.x<game.width/2)
                text11.x += speed;

            if(textTitle.alpha<1)
                textTitle.alpha +=0.01;
            if(text.alpha<1)
                text.alpha +=0.01;
            if(text1.alpha<1)
                text1.alpha +=0.01;
            if(text11.alpha<1)
                text11.alpha +=0.01;
        }

        if(text2alpha == 1){
            if(text2.alpha>0)
                text2.alpha -=0.02;
            else
                text2alpha = 0;
        }
        else{
            if(text2.alpha<1)
                text2.alpha +=0.02;
            else
                text2alpha = 1;
        }
        

        game.input.mouse.capture = true;
        if(game.input.activePointer.leftButton.isDown){
            this.start();
        }
    },
    start: function() {
        game.state.start('play');
    },
};