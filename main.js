document.body.style.overflow = "hidden";
document.body.style.margin = "0";

var cvs = document.createElement("canvas");
document.body.appendChild(cvs);

var ctx = cvs.getContext("2d");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function random(min, max) {

    this.min = Math.ceil(min);
    this.max = Math.floor(max);
    return Math.floor(Math.random() * (this.max - this.min + 1) + this.min);

}

var controller = new function() {

    this.right = false;
    this.left = false;
    this.up = false;
    this.down = false;

}

window.addEventListener("keydown", function(key) {

    if (key.keyCode == 72 && !hitboxes) {

        hitboxes = true;

    }

    else if (key.keyCode == 72 && hitboxes) {

        hitboxes = false;

    }

    switch(key.keyCode) {

        case 68:
            controller.right = true;
            break;
        case 65:
            controller.left = true;
            break;
        case 87:
            controller.up = true;
            break;

    }

}, false);

window.addEventListener("keyup", function(key) {

    switch(key.keyCode) {

        case 68:
            controller.right = false;
            break;
        case 65:
            controller.left = false;
            break;
        case 87:
            controller.up = false;
            break;

    }

}, false);

var sky = new function() {

    this.img = new Image();
    this.img.src = "img/sky.png";

}

var bird = new function() {

    this.width = 111;
    this.height = 72;
    this.x = Math.round(window.innerWidth / 2 - this.width / 2);
    this.y = Math.round(window.innerHeight / 2 - this.height / 2);
    this.img = new Image();
    this.img.src = "img/birdRightWingUp.png";
    this.animationFrame = 1;
    this.animationSpeed = 200;
    this.facing = "right";
    this.speed = 1;
    this.yVel = 0;
    this.gravity = 0.05;
    this.collision = new function() {
        this.right = false;
        this.left = false;
        this.top = false;
        this.bottom = false;
    }
    this.hasBoost = false;

}

var coins = [];
var coinSpawnTick = 500;

if (localStorage.getItem("coins") != null) {

    var coinAmount = parseInt(localStorage.getItem("coins"), 10);

}

else {

    var coinAmount = 0;

}

function coin(x, y, value) {

    this.newCoin = new function() {

        this.x = x;
        this.y = y;
        this.value = value;
        this.width = 54;
        this.height = 54;
        this.img = new Image();
        if (this.value == 1) {
            this.img.src = "img/coinValue1.png";
        }
        if (this.value == 2) {
            this.img.src = "img/coinValue2.png";
        }

    }

    coins.push(newCoin);

}

var boostCoins = [];

function boostCoin(x, y, type) {

    this.newBoostCoin = new function() {

        this.x = x;
        this.y = y;
        this.type = type;
        this.width = 54;
        this.height = 54;
        this.img = new Image();
        if (this.type == 1) {
            this.img.src = "img/boostX2.png";
        }

    }

    boostCoins.push(this.newBoostCoin);

}

var particles = [];

function partice(x, y, type) {

    this.newPartice = new function() {

        this.x = x;
        this.y = y;
        this.type = type;

        if (this.type == "coin1") {

            this.size = random(10, 20);
            this.width = this.size;
            this.height = this.size;
            this.lifeTime = random(10, 20);
            this.xVel = random(-3, 3) / 10;
            this.yVel = random(-3, 3) / 10;

        }

        if (this.type == "coin2") {

            this.size = random(10, 20);
            this.width = this.size;
            this.height = this.size;
            this.lifeTime = random(10, 20);
            this.xVel = random(-3, 3) / 10;
            this.yVel = random(-3, 3) / 10;

        }

        if (this.type == "boostx2") {

            this.size = random(10, 20);
            this.width = this.size;
            this.height = this.size;
            this.lifeTime = random(10, 20);
            this.xVel = random(-3, 3) / 10;
            this.yVel = random(-3, 3) / 10;

        }

    }

    particles.push(this.newPartice);

}

var lastLoop = new Date();
var thisLoop;
var fps;
var deltaTime;

var hitboxes = false;

function loop() {

    requestAnimationFrame(loop);

    thisLoop = new Date()
    fps = 1000 / (thisLoop - lastLoop);
    deltaTime = thisLoop - lastLoop;
    lastLoop = thisLoop;

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    ctx.fillStyle = ctx.createPattern(sky.img, "repeat");
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.drawImage(bird.img, bird.x, bird.y);

    for (var renderCoins = 0; renderCoins < coins.length; renderCoins++) {

        if (coins[renderCoins]) {

            ctx.drawImage(coins[renderCoins].img, coins[renderCoins].x, coins[renderCoins].y);
            if (hitboxes) {

                ctx.strokeStyle = "#ff0000";
                ctx.lineWidth = 2;
                ctx.strokeRect(coins[renderCoins].x, coins[renderCoins].y, coins[renderCoins].width, coins[renderCoins].height);
        
            }

        }

    }

    for(var renderBoostCoins = 0; renderBoostCoins < boostCoins.length; renderBoostCoins++) {

        if (boostCoins[renderBoostCoins]) {

            if (boostCoins[renderBoostCoins].type == 1) {

                ctx.drawImage(boostCoins[renderBoostCoins].img, boostCoins[renderBoostCoins].x, boostCoins[renderBoostCoins].y);
                if (hitboxes) {

                    ctx.strokeStyle = "#ff00e6";
                    ctx.lineWidth = 2;
                    ctx.strokeRect(boostCoins[renderBoostCoins].x, boostCoins[renderBoostCoins].y, boostCoins[renderBoostCoins].width, boostCoins[renderBoostCoins].height);
            
                }

            }

        }

    }

    for (var renderParticles = 0; renderParticles < particles.length; renderParticles++) {

        if (particles[renderParticles]) {
            
            if (particles[renderParticles].type == "coin1") {

                ctx.fillStyle = "#ffbb00";
                ctx.fillRect(particles[renderParticles].x, particles[renderParticles].y, particles[renderParticles].width, particles[renderParticles].height);

            }

            if (particles[renderParticles].type == "coin2") {

                ctx.fillStyle = "#959595";
                ctx.fillRect(particles[renderParticles].x, particles[renderParticles].y, particles[renderParticles].width, particles[renderParticles].height);

            }

            if (particles[renderParticles].type == "boostx2") {

                ctx.fillStyle = "#00ff08";
                ctx.fillRect(particles[renderParticles].x, particles[renderParticles].y, particles[renderParticles].width, particles[renderParticles].height);

            }

        }

    }

    if (hitboxes) {

        ctx.strokeStyle = "#000ff0";
        ctx.lineWidth = 2;

        ctx.strokeRect(bird.x, bird.y, bird.width, bird.height);

        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 2;

        ctx.beginPath();

        if (bird.facing == "left") {

            ctx.moveTo(bird.x, bird.y + bird.height / 2);
            ctx.lineTo(bird.x - 100, bird.y + bird.height / 2);

        }

        if (bird.facing == "right") {

            ctx.moveTo(bird.x + bird.width, bird.y + bird.height / 2);
            ctx.lineTo(bird.x + bird.width + 100, bird.y + bird.height / 2);

        }

        ctx.stroke();

    }

    ctx.fillStyle = "#000000";
    ctx.font = "20px impact";
    ctx.fillText("Coins: " + coinAmount, 0, 20);
    ctx.fillText("FPS: " + Math.round(fps), 0, 40);
    ctx.fillText("Coins in sky: " + coins.length, 0, 60);

    for (var performParticle = 0; performParticle < particles.length; performParticle++) {

        if (particles[performParticle]) {

            particles[performParticle].x += particles[performParticle].xVel * deltaTime;
            particles[performParticle].y += particles[performParticle].yVel * deltaTime;

            particles[performParticle].lifeTime--;

            if (particles[performParticle].lifeTime <= 0) {

                delete particles[performParticle];
                particles = particles.filter(function(el) {return el != null});

            }

        }

    }

    if (bird.x + bird.width >= window.innerWidth) {

        bird.collision.right = true;
        bird.x = window.innerWidth - bird.width;

    }

    if (bird.x <= 0) {

        bird.collision.left = true;
        bird.x = 0;

    }

    if (bird.y <= 0) {

        bird.collision.top = true;
        bird.y = 0;

    }

    if (bird.y + bird.height >= window.innerHeight) {

        bird.collision.bottom = true;
        bird.y = window.innerHeight - bird.height;
        bird.yVel = 0;

    }

    for (var collisionCoins = 0; collisionCoins < coins.length; collisionCoins++) {

        if (coins[collisionCoins]) {

            if (bird.x + bird.width >= coins[collisionCoins].x && bird.x <= coins[collisionCoins].x + coins[collisionCoins].width && bird.y + bird.height >= coins[collisionCoins].y && bird.y <= coins[collisionCoins].y + coins[collisionCoins].height) {

                coinAmount += coins[collisionCoins].value;

                if (coins[collisionCoins].value == 1) {

                    for (var i = 0; i < 30; i++) {

                        partice(Math.round(coins[collisionCoins].x + coins[collisionCoins].width / 2), Math.round(coins[collisionCoins].y + coins[collisionCoins].height / 2), "coin1");
                
                    }

                }

                if (coins[collisionCoins].value == 2) {

                    for (var i = 0; i < 30; i++) {

                        partice(Math.round(coins[collisionCoins].x + coins[collisionCoins].width / 2), Math.round(coins[collisionCoins].y + coins[collisionCoins].height / 2), "coin2");
                
                    }

                }

                delete coins[collisionCoins];
                coins = coins.filter(function(el) {return el != null});
    
            }

        }

    }

    for (var collisionBoostCoins = 0; collisionBoostCoins < boostCoins.length; collisionBoostCoins++) {

        if (boostCoins[collisionBoostCoins]) {

            if (bird.x + bird.width >= boostCoins[collisionBoostCoins].x && bird.x <= boostCoins[collisionBoostCoins].x + boostCoins[collisionBoostCoins].height && bird.y + bird.height >= boostCoins[collisionBoostCoins].y && bird.y <= boostCoins[collisionBoostCoins].y + boostCoins[collisionBoostCoins].height) {
                
                for (var i = 0; i < 30; i++) {

                    partice(Math.round(boostCoins[collisionBoostCoins].x + boostCoins[collisionBoostCoins].width / 2), Math.round(boostCoins[collisionBoostCoins].y + boostCoins[collisionBoostCoins].height / 2), "boostx2");
            
                }

                bird.hasBoost = true;
                bird.speed = 2;
                bird.gravity = 0.2;
                coinSpawnTick = 0;

                setTimeout(function() {

                    bird.hasBoost = false;
                    bird.speed = 1;
                    bird.gravity = 0.05;
                    coinSpawnTick = 500;

                }, 5000);

                delete boostCoins[collisionBoostCoins];
                boostCoins = boostCoins.filter(function(el) {return el != null});

            }

        }

    }

    if (controller.right) {

        if (!bird.collision.right) {

            bird.facing = "right";
            bird.x += bird.speed * deltaTime;

        }

    }

    if (controller.left) {

        if (!bird.collision.left) {

            bird.facing = "left";
            bird.x -= bird.speed * deltaTime;

        }

    }

    if (controller.up) {

        if (!bird.collision.top) {

            bird.yVel = -bird.speed;

        }

    }

    if (!bird.collision.bottom) {

        bird.yVel += bird.gravity;

    }

    bird.y += bird.yVel * deltaTime;

    bird.collision.right = false;
    bird.collision.left = false;
    bird.collision.top = false;
    bird.collision.bottom = false;

    localStorage.setItem("coins", coinAmount);

}

loop();

setInterval(function() {

    if (controller.right || controller.left || controller.up) {

        if (bird.facing == "right") {
            bird.img.src = "img/birdRightWingUp.png";
            setTimeout(function() {
                bird.img.src = "img/birdRightWingDown.png";
            }, bird.animationSpeed / 2);
        }
    
        if (bird.facing == "left") {
            bird.img.src = "img/birdLeftWingUp.png";
            setTimeout(function() {
                bird.img.src = "img/birdLeftWingDown.png";
            }, bird.animationSpeed / 2);
        }

    }

}, bird.animationSpeed);

async function coinSpawnLoop() {

    await sleep(coinSpawnTick);

    requestAnimationFrame(coinSpawnLoop);

    if (random(1, 2) == 1) {

        coin(random(0, window.innerWidth - 54), random(0, window.innerHeight - 54), 1);

    }

    else if (random(1, 3) == 1) {

        coin(random(0, window.innerWidth - 54), random(0, window.innerHeight - 54), 2);

    }

    else if (random(1, 20) == 1 && !bird.hasBoost) {

        boostCoin(random(0, window.innerWidth - 54), random(0, window.innerHeight - 54), 1);

    }

}

coinSpawnLoop();