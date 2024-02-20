var customBounds;
var bounds;
var playState = {

    create: function () {
        this.add.image(12, 20, 'table');
        this.bgmusic = game.add.audio('bgmusic');
        this.bgmusic.play();
        this.bgmusic.loop = true;

        bounds = new Phaser.Rectangle(50, 57, 925, 475);
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.restitution = 0.9;

        this.collidesound = game.add.audio('collide');
        this.goalsound = game.add.audio('goal');

        balls = game.add.physicsGroup(Phaser.Physics.P2JS);

        this.whiteball = balls.create(bounds.x + bounds.width / 4 + 5, bounds.y + bounds.height / 2, 'whiteball');
        this.whiteball.anchor.setTo(0.5, 0.5);
        this.whiteball.body.setCircle(12.5);

        this.playerIsSet = false;
        this.textDisplayed = false;
        this.blueball = [];
        this.blueLeft = 7;
        this.redball = [];
        this.redLeft = 7;
        this.redcount = 0;
        this.bluecount = 0;
        this.j = 0;

        ////set balls
        for (var i = 0; i <= this.j; i++) {
            var red_or_blue = game.rnd.pick([0, 1]);

            if (this.j == 2 && i == 1) {
                this.blackball = balls.create(740 + this.j * 25, 293 - 12.5 * this.j + 25 * i, 'blackball');//800,293
                this.blackball.anchor.setTo(0.5, 0.5);
                this.blackball.body.setCircle(12.5);

            } else if (this.j == 4 && i == 0) {
                this.redball[6] = balls.create(740 + this.j * 25, 293 - 12.5 * this.j + 25 * i, 'redball');
                this.redball[6].anchor.setTo(0.5, 0.5);
                this.redball[6].body.setCircle(12.5);

            } else if (this.j == 4 && i == 4) {
                this.blueball[6] = balls.create(740 + this.j * 25, 293 - 12.5 * this.j + 25 * i, 'blueball');
                this.blueball[6].anchor.setTo(0.5, 0.5);
                this.blueball[6].body.setCircle(12.5);

            } else {
                if ((this.redcount < 6 && red_or_blue == 0) || this.bluecount == 6) {

                    this.redball[this.redcount] = balls.create(740 + this.j * 25, 293 - 12.5 * this.j + 25 * i, 'redball');
                    this.redball[this.redcount].anchor.setTo(0.5, 0.5);
                    this.redball[this.redcount].body.setCircle(12.5);
                    this.redcount += 1;
                } else if (this.bluecount < 6 && red_or_blue == 1 || this.redcount == 6) {
                    this.blueball[this.bluecount] = balls.create(740 + this.j * 25, 293 - 12.5 * this.j + 25 * i, 'blueball');
                    this.blueball[this.bluecount].anchor.setTo(0.5, 0.5);
                    this.blueball[this.bluecount].body.setCircle(12.5);
                    this.bluecount += 1;
                }
            }
            if (i == this.j) {
                this.j += 1;
                i = -1;
            }
            if (this.j == 5) break;

        }


        customBounds = { left: null, right: null, top: null, bottom: null };
        this.createPreviewBounds(bounds.x, bounds.y, bounds.width, bounds.height);

        //stick
        this.stick = game.add.sprite(this.whiteball.x, this.whiteball.y, 'stick');
        this.stick.anchor.setTo(1.1, 0.5);
        this.stick.rotation = 0;

        //stick power
        this.power = 0;

        this.text = game.add.text(game.width / 2, game.height / 2 - 120, 'You are REDBALL player!', { font: '28px Arial', fill: 'white', align: "center" });
        this.text.alpha = 0;
        this.text.anchor.setTo(0.5, 0.5);

        this.textTurn = game.add.text(game.width / 2, game.height / 2 , "REDBALL player's turn!", { font: '28px Arial', fill: 'white', align: "center" });
        this.textTurn.alpha = 0;
        this.textTurn.anchor.setTo(0.5, 0.5);

        //  Just to display the bounds
        // var graphics = game.add.graphics(bounds.x, bounds.y);
        // graphics.lineStyle(4, 0xffd900, 1);
        // graphics.drawRect(0, 0, bounds.width, bounds.height);

        // MOUSE
        game.input.mouse.capture = true;

        this.B = game.input.keyboard.addKey(Phaser.Keyboard.B);
        this.B.onDown.add(this.killBlue, this);
        this.R = game.input.keyboard.addKey(Phaser.Keyboard.R);
        this.R.onDown.add(this.killRed, this);
    },
    createPreviewBounds: function (x, y, w, h) {

        var sim = game.physics.p2;

        //  If you want to use your own collision group then set it here and un-comment the lines below
        var mask = sim.boundsCollisionGroup.mask;

        customBounds.left = new p2.Body({ mass: 0, position: [sim.pxmi(x), sim.pxmi(y)], angle: 1.5707963267948966 });
        customBounds.left.addShape(new p2.Plane());
        // customBounds.left.shapes[0].collisionGroup = mask;

        customBounds.right = new p2.Body({ mass: 0, position: [sim.pxmi(x + w), sim.pxmi(y)], angle: -1.5707963267948966 });
        customBounds.right.addShape(new p2.Plane());
        // customBounds.right.shapes[0].collisionGroup = mask;

        customBounds.top = new p2.Body({ mass: 0, position: [sim.pxmi(x), sim.pxmi(y)], angle: -3.141592653589793 });
        customBounds.top.addShape(new p2.Plane());
        // customBounds.top.shapes[0].collisionGroup = mask;

        customBounds.bottom = new p2.Body({ mass: 0, position: [sim.pxmi(x), sim.pxmi(y + h)] });
        customBounds.bottom.addShape(new p2.Plane());
        // customBounds.bottom.shapes[0].collisionGroup = mask;

        sim.world.addBody(customBounds.left);
        sim.world.addBody(customBounds.right);
        sim.world.addBody(customBounds.top);
        sim.world.addBody(customBounds.bottom);

    },
    update: function () {
        this.checkEnd();

        var moving = this.checkmoving();

        // check goal
        if (this.whiteball.alive) var uselsee = this.checkGoal(this.whiteball);
        if (this.blackball.alive) useless = this.checkGoal(this.blackball);
        for (var i = 0; i < 7; i++) {
            if (this.blueball[i].alive) {
                this.bluePotted = this.checkGoal(this.blueball[i]);
                if (this.bluePotted && !this.playerIsSet) {
                    this.playerIsSet = true;
                    this.turn = false;
                }
                if (!this.turn && this.bluePotted) {
                    this.scored = true;
                }
                if(this.bluePotted){
                    this.blueLeft -= 1;
                }
            }
        }
        for (var i = 0; i < 7; i++) {
            if (this.redball[i].alive) {
                this.redPotted = this.checkGoal(this.redball[i]);
                if (this.redPotted && !this.playerIsSet) {
                    this.playerIsSet = true;
                    this.turn = true;
                }
                if (this.turn && this.redPotted) {
                    this.scored = true;
                }
                if(this.redPotted){
                    this.redLeft -= 1;
                }
            }
        }
        this.PIStext();

        var opposite = game.input.y - this.stick.position.y;
        var adjacent = game.input.x - this.stick.position.x;

        if (moving == 0) {

            if(this.turn==this.nextTurn){
                this.turnDisplayed = true;
            }
            
            this.turn = this.nextTurn;
            this.turnText();

            if (this.whiteball.alive) {
                if (game.input.activePointer.leftButton.isDown) {
                    if (this.dir == 1) {
                        if (this.power == 2000) this.dir = 0;
                        this.power += 20;
                        this.stick.anchor.x += 0.004;
                    } else {
                        if (this.power == 0) this.dir = 1;
                        this.power -= 20;
                        this.stick.anchor.x -= 0.004;
                    }

                } else {
                    this.whiteball.body.velocity.x = this.power * Math.cos(this.stick.rotation);
                    this.whiteball.body.velocity.y = this.power * Math.sin(this.stick.rotation);
                    if (this.power != 0) {
                        this.collidesound.play();
                    }
                    this.power = 0;
                    this.stick.anchor.x = 1.048;
                }
            } else {
                this.whiteball.reset(bounds.x + bounds.width / 4 + 5, bounds.y + bounds.height / 2);
            }
            this.stick.rotation = Math.atan2(opposite, adjacent);
            this.stick.x = this.whiteball.x;
            this.stick.y = this.whiteball.y;
            this.stick.alpha = 1;
            this.scored = false;
        } else {
            this.ballmoving();
            this.setnextTurn();
            this.turnDisplayed = false;
        }
    },
    setnextTurn: function() {
        if (!this.playerIsSet) return;
        if (!this.whiteball.alive) this.nextTurn = !this.turn;
        else if (!this.scored) this.nextTurn = !this.turn;
        else this.nextTurn = this.turn;
    },
    checkmoving: function () {
        if (this.whiteball.alive) {
            if (this.whiteball.body.velocity.x != 0 || this.whiteball.body.velocity.y != 0) return 1;
        }
        if (this.blackball.alive) {
            if (this.blackball.body.velocity.x != 0 || this.blackball.body.velocity.y != 0) return 1;
        }

        for (var i = 0; i < 7; i++) {
            if (this.blueball[i].alive) {
                if (this.blueball[i].body.velocity.x != 0 || this.blueball[i].body.velocity.y != 0) return 1;
            }
        }
        for (var i = 0; i < 7; i++) {
            if (this.redball[i].alive) {
                if (this.redball[i].body.velocity.x != 0 || this.redball[i].body.velocity.y != 0) return 1;
            }
        }

        return 0;
    },
    ballmoving: function () {
        //whiteball move when alive
        this.stick.alpha -= 0.02;
        if (this.whiteball.alive) {
            if (this.stopSensor(this.whiteball) == 1) {
                this.whiteball.body.velocity.x = 0;
                this.whiteball.body.velocity.y = 0;
            }
            if (Math.abs(this.whiteball.body.velocity.x) > 0) {
                this.whiteball.body.velocity.x *= 0.99;
            } else {
                this.whiteball.body.velocity.x = 0;
            }
            if (Math.abs(this.whiteball.body.velocity.y) > 0) {
                this.whiteball.body.velocity.y *= 0.99;
            } else {
                this.whiteball.body.velocity.y = 0;
            }
        }
        // blackball
        if (this.blackball.alive) {
            if (this.stopSensor(this.blackball) == 1) {
                this.blackball.body.velocity.x = 0;
                this.blackball.body.velocity.y = 0;
            }
            if (Math.abs(this.blackball.body.velocity.x) > 0) {
                this.blackball.body.velocity.x *= 0.99;
            } else {
                this.blackball.body.velocity.x = 0;
            }
            if (Math.abs(this.blackball.body.velocity.y) > 0) {
                this.blackball.body.velocity.y *= 0.99;
            } else {
                this.blackball.body.velocity.y = 0;
            }
        }

        //blueball
        for (var i = 0; i < 7; i++) {
            if (this.blueball[i].alive) {
                if (this.stopSensor(this.blueball[i]) == 1) {
                    this.blueball[i].body.velocity.x = 0;
                    this.blueball[i].body.velocity.y = 0;
                }
                if (Math.abs(this.blueball[i].body.velocity.x) > 0) {
                    this.blueball[i].body.velocity.x *= 0.99;
                } else {
                    this.blueball[i].body.velocity.x = 0;
                }
                if (Math.abs(this.blueball[i].body.velocity.y) > 0) {
                    this.blueball[i].body.velocity.y *= 0.99;
                } else {
                    this.blueball[i].body.velocity.y = 0;
                }
            }
        }
        //redball
        for (var i = 0; i < 7; i++) {
            if (this.redball[i].alive) {
                if (this.stopSensor(this.redball[i]) == 1) {
                    this.redball[i].body.velocity.x = 0;
                    this.redball[i].body.velocity.y = 0;
                }
                if (Math.abs(this.redball[i].body.velocity.x) > 0) {
                    this.redball[i].body.velocity.x *= 0.99;
                } else {
                    this.redball[i].body.velocity.x = 0;
                }
                if (Math.abs(this.redball[i].body.velocity.y) > 0) {
                    this.redball[i].body.velocity.y *= 0.99;
                } else {
                    this.redball[i].body.velocity.y = 0;
                }
            }
        }

    },
    ballspeedsqr: function (x, y) {
        return Math.pow(x, 2) * Math.pow(y, 2);
    },
    stopSensor: function (ball) {
        var vx = ball.body.velocity.x;
        var vy = ball.body.velocity.y;
        //console.log(this.ballspeedsqr(vx, vy));
        if (this.ballspeedsqr(vx, vy) < 10000) {
            return 1;
        } else return 0;
    },
    checkGoal: function (ball) {
        var dis = 18;
        var disable = 0;
        if (Math.abs(ball.x - bounds.x) <= dis + 11 && Math.abs(ball.y - bounds.y) <= dis + 11) {
            disable = 1;
        }
        else if (Math.abs(ball.x - bounds.x - bounds.width) <= dis + 11 && Math.abs(ball.y - bounds.y) <= dis + 11) {
            disable = 1;
        }
        else if (Math.abs(ball.x - bounds.x - bounds.width) <= dis + 11 && Math.abs(ball.y - bounds.y - bounds.height) <= dis + 11) {
            disable = 1;
        }
        else if (Math.abs(ball.x - bounds.x) <= dis + 11 && Math.abs(ball.y - bounds.y - bounds.height) <= dis + 11) {
            disable = 1;
        }
        else if (Math.abs(ball.x - bounds.x - bounds.width / 2) <= dis && Math.abs(ball.y - bounds.y) <= dis) {
            disable = 1;
        }
        else if (Math.abs(ball.x - bounds.x - bounds.width / 2) <= dis && Math.abs(ball.y - bounds.y - bounds.height) <= dis) {
            disable = 1;
        }

        if (disable == 1) {
            ball.kill();
            this.goalsound.play();
            return true;
        }
        return false;
    },
    checkEnd: function () {
        var moving = this.checkmoving();
        // turn false == blue turn, turn true == red turn
        if (!this.turn) {
            if (this.blueLeft == 0) {
                if (!this.blackball.alive && moving == 0) {
                    this.bgmusic.destroy();
                    if (this.whiteball.alive) {
                        game.state.start('bluewin');
                    } else game.state.start('redwin');
                }
            } else {
                if (!this.blackball.alive && moving == 0) {
                    this.bgmusic.destroy();
                    if (this.whiteball.alive) {
                        game.state.start('redwin');
                    } else game.state.start('bluewin');
                }
            }
        } else {
            if (this.redLeft == 0) {
                if (!this.blackball.alive && moving == 0) {
                    this.bgmusic.destroy();
                    if (this.whiteball.alive) {
                        game.state.start('redwin');
                    } else game.state.start('bluewin');
                }
            } else {
                if (!this.blackball.alive && moving == 0) {
                    this.bgmusic.destroy();
                    if (this.whiteball.alive) {
                        game.state.start('bluewin');
                    } else game.state.start('redwin');
                }
            }
        }
    },
    PIStext: function () {
        // player is set text
        if (this.playerIsSet) {
            if (this.textDisplayed) {
                if (this.text.alpha > 0) {
                    this.text.alpha -= 0.005;
                }
            }
            else {
                this.textDisplayed = 1;
                if (!this.turn) {
                    this.text.setText('You are BLUEBALL player!');
                    this.text.alpha = 1;
                }
                else {
                    this.text.setText('You are REDBALL player!');
                    this.text.alpha = 1;
                }
            }
        }
    },
    turnText: function () {
        if (this.playerIsSet) {
            if (this.turnDisplayed) {
                if (this.time > 0) {
                    this.time -= 0.02;
                }
                else{
                    this.textTurn.alpha = 0;
                }
            }
            else{
                this.turnDisplayed = true;
                if (!this.turn) {
                    this.textTurn.setText("BLUEBALL player's turn!");
                    this.textTurn.alpha = 1;
                    this.time = 1;
                }
                else {
                    this.textTurn.setText("REDBALL player's turn!");
                    this.textTurn.alpha = 1;
                    this.time = 1;
                }
            }
        }
    }, 
    killBlue: function(){
        for(var i = 0; i < 7; i++){
            if(this.blueball[i].alive)this.blueball[i].kill();
        }
        this.blueLeft = 0;
    },
    killRed: function(){
        for(var i = 0; i < 7; i++){
            if(this.redball[i].alive)this.redball[i].kill();
        }
        this.redLeft = 0;
    }
}
