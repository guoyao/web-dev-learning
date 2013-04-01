/**
 * User: wuguoyao
 * Time: 12/20/11 10:05 PM
 */

(function () {
    var canvas = GLOBAL.$("#canvas"),
        startButton = GLOBAL.$("#startButton"),
        pauseButton = GLOBAL.$("#pauseButton"),
        stopButton = GLOBAL.$("#stopButton"),
        taskId,
        canvasWidth = canvas.width,
        canvasHeight = canvas.height,
        context = canvas.getContext("2d"),
        image = new Image(),
        imageWidth = 0,
        imageHeight = 0,
        tileWidth = 32,
        tileHeight = 32,
        bulletWidth = 4,
        bulletHeight = 4,
        columnCount = Math.floor(canvasWidth / tileWidth),
        rowCount = 3,
        player,
        tanks = [],
        bullets = [],
        pressedKeyMap = [];

    function Tank(x, y, width, height) {
        this.x = x;
        this.y = y;
        if (arguments.length < 4) {
            this.width = tileWidth;
            this.height = tileHeight;
        }
        else {
            this.width = width;
            this.height = height;
        }
    }

    function Bullet(x, y, width, height) {
        this.x = x;
        this.y = y;
        if (arguments.length < 4) {
            this.width = bulletWidth;
            this.height = bulletHeight;
        }
        else {
            this.width = width;
            this.height = height;
        }
    }

    document.addEventListener("keydown", function (e) {
        e = e ? e : window.event;
        pressedKeyMap[e.keyCode] = true;
    });

    document.addEventListener("keyup", function (e) {
        e = e ? e : window.event;
        delete pressedKeyMap[e.keyCode];
    });

    image.addEventListener("load", function () {
        imageWidth = image.width;
        imageHeight = image.height;
        drawScreen();
    });

    image.src = "assets/tanks_sheet.png";

    function drawScreen() {
        drawBackground();
        render();
        collisionTest();
        pressedKeyAffect();
    }

    function drawBackground() {
        context.fillStyle = "black";
        context.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    function render() {
        renderTanks();
        renderBullets();
    }

    function renderTanks() {
        var tank;
        var i = 0;
        if (tanks.length == 0) {
            for (i = 0; i < rowCount * columnCount; i++) {
                tank = new Tank(tileWidth * (i % columnCount), tileHeight * Math.floor(i / columnCount));
                tanks.push(tank);
            }
        }
        for (i = 0; i < tanks.length; i++) {
            tank = tanks[i];
            context.save();
            context.transform(1, 0, 0, 1, 0, 0);
            context.translate(tank.x + tank.width / 2, tank.y + tank.height / 2);
            context.rotate(Math.PI);
            context.drawImage(image, 32, 0, tank.width, tank.height, -tank.width / 2, -tank.height / 2, tank.width, tank.height);
            context.restore();
        }
        if (player == null) {
            player = new Tank((canvasWidth - tileWidth) / 2, canvasHeight - tileHeight);
        }
        context.drawImage(image, 32, 0, player.width, player.height, player.x, player.y, player.width, player.height);
    }

    function renderBullets() {
        var bullet;
        for (var i = 0; i < bullets.length; i++) {
            bullet = bullets[i];
            bullet.y -= 5;
            if (bullet.y < 0) {
                bullets.splice(i, 1);
                i--;
            }
            context.drawImage(image, tileWidth * 5 + (tileWidth - bullet.width) / 2, tileHeight * 2 + (tileHeight - bullet.height) / 2, bullet.width, bullet.height, bullet.x, bullet.y, bullet.width, bullet.height);
        }
    }

    function collisionTest() {
        collisionTestBetweenEnemyAndBullet();
    }

    function collisionTestBetweenEnemyAndBullet() {
        var tank;
        var bullet;
        for (var i = 0; i < tanks.length; i++) {
            tank = tanks[i];
            for (var j = 0; j < bullets.length; j++) {
                bullet = bullets[j];
                if (GAME.collision(tank, bullet)) {
                    tanks.splice(i, 1);
                    bullets.splice(j, 1);
                    i--;
                    break;
                }
            }
        }
    }

    function pressedKeyAffect() {
        if (pressedKeyMap[GLOBAL.keyboard.LEFT]) {
            player.x = Math.max(0, player.x - 5);
        }
        if (pressedKeyMap[GLOBAL.keyboard.UP]) {
            player.y = Math.max(0, player.y - 5);
        }
        if (pressedKeyMap[GLOBAL.keyboard.RIGHT]) {
            player.x = Math.min(canvas.width - player.width, player.x + 5);
        }
        if (pressedKeyMap[GLOBAL.keyboard.DOWN]) {
            player.y = Math.min(canvas.height - player.height, player.y + 5);
        }
        if (pressedKeyMap[GLOBAL.keyboard.A]) {
            var bullet = new Bullet(player.x + (player.width - bulletWidth) / 2, player.y);
            if (bullets.length > 0 && bullet.y - bullets[bullets.length - 1].y < tileHeight - 2)
                return;
            bullets.push(bullet);
        }
    }

    startButton.onclick = function () {
        startButton.disabled = true;
        pauseButton.disabled = false;
        stopButton.disabled = false;
        taskId = setInterval(drawScreen, 1000 / 24);
    };

    pauseButton.onclick = function () {
        clearInterval(taskId);
        startButton.disabled = false;
        pauseButton.disabled = true;
        stopButton.disabled = false;
    };

    stopButton.onclick = function () {
        clearInterval(taskId);
        startButton.disabled = false;
        pauseButton.disabled = true;
        stopButton.disabled = true;
        player = null;
        tanks = [];
        bullets = [];
        drawScreen();
    };

}) ();