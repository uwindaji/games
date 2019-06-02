class Break {

    /**
     * contructor method to create plan, container, ping, ball
     * we can set dimensions and colors
     */
    constructor () {

        // dimensions
        this.blockW = 50;
        this.blockH = 20;
        this.containerW = this.blockW * 15;
        this.containerH = this.blockH * 40;
        this.pingWidth = this.blockW * 3;
        this.ballWidth = 40;
        this.ballHeight = 40;

        // colors
        this.planColor = "white";
        this.containerColor = "black";
        this.pingColor = "yellow";
        this.ballColor = "red";
        this.bonusColor = "red";
        this.wall = "url('./ressources/img/wall1.jpg')"

        // move
        this.pingLeft = (this.containerW - this.pingWidth) / 2 ;
        this.ballLeft = (this.containerW - this.pingWidth) / 2  ;
        this.ballBottom = 10 + this.blockH;
        this.pingVitesse = 50;
        this.vitesse = 13;
        this.directionLeft = 5;
        this.directionBottom = 5;
        this.preparePause = true;
        this._pause = false;

        var direction = 5;

        this._left = -direction;
        this._right = direction;
        this._top = direction;
        this._bottom =  -direction;

        
        // other
        this.startId = null; 
        this.bonusId = null;
        this.elemBonus = null;
        this._sortir = false; 
        this.baisseVitesse = false;
        this.bigPing = false;

        // col-div 
        this.colDiv = document.querySelector('.col-div');
        // plan
        this.plan = document.querySelector('.div-plan');
        this.plan.style.position = "relative";
        this.plan.style.left = (this.colDiv.offsetWidth - (this.containerW + 20)) / 2 + "px";
        this.plan.style.width = this.containerW + 20 + "px";
        this.plan.style.height = this.containerH + 20 + "px";
        this.plan.style.borderRadius = "20px";
        this.plan.style.backgroundColor = this.planColor;

        // container
        this.container = document.querySelector('.container-break');
        this.container.style.position = "absolute";
        this.container.style.left = 10 + "px";
        this.container.style.top = 10 + "px";
        this.container.style.width = this.containerW + "px";
        this.container.style.height = this.containerH + "px";
        this.container.style.borderRadius = "14px";
        this.container.style.backgroundImage= this.wall;
        this.container.style.backgroundSize= "cover";

        // ping
        this.ping = document.createElement('div');
        this.ping.style.position = "absolute";
        this.ping.style.left = (this.containerW - this.pingWidth) / 2 + "px";
        this.ping.style.bottom = 10 + "px";
        this.ping.style.width = this.pingWidth + "px";
        this.ping.style.height = this.blockH+ "px";
        this.ping.style.borderRadius = 20 + "px";
        this.ping.style.backgroundColor = this.pingColor;

        // ball
        this.ball = document.createElement('div');
        this.ball.style.position = "absolute";
        this.ball.style.left = (this.containerW - this.ballWidth) / 2 + "px";
        this.ball.style.bottom =  10 + this.blockH + "px";
        this.ball.style.width = this.ballWidth + "px";
        this.ball.style.height = this.ballHeight+ "px";
        this.ball.style.borderRadius = 50 + "%";
        this.ball.style.backgroundColor = this.ballColor;

        this.container.appendChild(this.ping); 
        this.container.appendChild(this.ball); 

        // second etape

        this.breaks();
    }

    /**
     * method to create the breaks
     */
    breaks () {

        // 50 , 20
        var colors = ["red", "blue", "yellow", "green", "purple" , "brown", "orange", "Fuchsia", "lime", "aqua"];
        var bonus = ["10", "0", "5", "1", "-10" , "50", "-1", "100", "20", "fruit"];
        var cols = 15;
        var rows = 10;
        var numberBreak = cols * rows;
        var tempo = -1;
        var left = -this.blockW;
        var top = 0;
        var i = 0;

        for (i = 0; i < numberBreak; i++){

            tempo += 1;
            left += this.blockW;

            if(tempo > (cols -1) ){

                tempo = 0;
                left = 0;
                top += this.blockH;
            }

            this.break = document.createElement('div');
            this.break.setAttribute('bonus', bonus[Math.floor(Math.random() * (bonus.length) )]);
            this.break.setAttribute('class', "breaks");
            this.break.style.position = "absolute";
            this.break.style.left = left + "px";
            this.break.style.top =  top + "px";
            this.break.style.width = this.blockW + "px";
            this.break.style.height = this.blockH+ "px";
            this.break.style.border = "solid 1px black";
            this.break.style.borderRadius = 5 + "px";
            this.break.style.backgroundColor = colors[Math.floor(Math.random() * (colors.length - 1) )];

            this.container.appendChild(this.break);

        }


        // third etape
        this.joystick();
        //this.start();


    }

    //==================================================================================================================

    /**
     * joystich method to listen the keys event
     */
    joystick(){

        document.addEventListener('keydown', (event)=> {

            var key = event.keyCode;

            switch(key){

                case 37:

                    this.move('left');
                    this.callBall();
                    
                    break;

                case 39:

                    this.move('right');
                    this.callBall();


                    break;

                
                case 32:

                    this.play();
                    break;

            }

            
        });
    }

    /**
     * method to move the ping
     * @param {string} dir left or right
     */
    move (dir) {

        if(dir == "left" && this.ping.offsetLeft > 0 ){

            this.pingLeft = this.ping.offsetLeft - this.pingVitesse;
            this.ping.style.left = this.pingLeft +"px";

        }else if (dir == "right" && (this.ping.offsetLeft + this.ping.offsetWidth) < this.containerW ){

            this.pingLeft = this.ping.offsetLeft + this.pingVitesse;
            this.ping.style.left = this.pingLeft +"px";
        }
    }


    /**
     * method to start move of ball with an interval
     */
    start(){

        var _this = this;

        this.startId = setInterval(function() {

            // fifth etape
            _this.methodsCheck();

        }, this.vitesse)

    }


    methodsCheck () {

        this.pause();
        this.moveBall();

    }


    /**
     * method to control the move of ball
     */
    moveBall () {

        if(this.ball.offsetLeft <= 0 ){

            this.directionLeft = this._right;

        }else if(this.ball.offsetLeft >= (this.containerW - this.ballWidth) ){

            this.directionLeft = this._left;

        }else if(this.ball.offsetTop <= 0 ){
            this.directionBottom = this._bottom;

        }else if(this.touchBreak() == true ){

            this.directionBottom = this._bottom;

        }else if(this.touch(this.ping, this.ball) == true ){


            this.directionBottom = this._top;

        }else if(this.ball.offsetTop >= (this.containerH - this.ballHeight )){

            clearInterval(this.startId); //============================================== go to end game

        }

        

        this.ballLeft += this.directionLeft;
        this.ballBottom += this.directionBottom;

        this.ball.style.left = this.ballLeft + "px";
        this.ball.style.bottom = this.ballBottom + "px";


    }




    /**
     * this methode select all breaks and browse theme
     * call method touch to check if the touch is true
     * if it's true it call the method removeElem 
     * to remove the brek how is touchd
     */
    touchBreak(){

        var breaks = document.querySelectorAll('.breaks');
        var i = 0;
        var $return = false;

        for(i = 0; i < breaks.length; i++){

            if(this.touch(breaks[i], this.ball) == true){

                this.removeElem(breaks[i]);
                $return = true;
                break
            }
        }

        return $return;
    }


    /**
     * this method check if this ball touch an element
     * @param {object} elem1 
     * @param {object} elem2 
     * @return boolean
     */
    touch (elem1, elem2) {

       var touchL = elem1.offsetLeft - (elem2.offsetLeft + elem2.offsetWidth);  // from left
        var touchR = elem2.offsetLeft   - (elem1.offsetLeft + elem1.offsetWidth); // from right
        var touchT = elem1.offsetTop - (elem2.offsetTop + elem2.offsetHeight)  ; //
        var touchB = elem2.offsetTop  - (elem1.offsetTop + elem1.offsetHeight); 

        if(touchL < 0 && touchR < 0 && touchT < 0 &&  touchB < 0){

            return true;

        }else {

            return false;
        }

    }    
    
    /**
     * method to remove an element
     * breaks exactely
     * @param {object} elem 
     */
    removeElem(elem){

        elem.style.zIndex = "1";
        elem.style.transform = "scale(0.5)";

        var bonus = elem.getAttribute("bonus");

        //===================================================================== go to the scoreResult

        if(bonus == 'fruit'){

            this.newFruit(elem);
        }

        this.score(bonus);

        setTimeout(function() {
            elem.remove();
        }, 200)
        
    }


    /**
     * this method create the bonus element
     * @param {string} bonus 
     */
    score (bonus) {


        var x = 0;
        var o = 1;

        this.elemBonus = document.createElement('div');
        this.elemBonus.style.position = "absolute";
        this.elemBonus.setAttribute('class', '_bonus')
        this.elemBonus.style.left = (this.containerH - 200) / 2 + "px";
        this.elemBonus.style.top = (this.containerW - 200) / 2 + "px";
        this.elemBonus.style.width = 200 + "px";
        this.elemBonus.style.height = 200 + "px";
        this.elemBonus.style.fontSize = 46 + "px";
        this.elemBonus.style.textAlign = "center";
        this.elemBonus.style.fontWeight = "bold";
        this.elemBonus.style.color = this.bonusColor;
        this.elemBonus.innerHTML = bonus;

        this.container.appendChild(this.elemBonus);

        //this.hideScore(this.elemBonus, x, o);


        var array = [this.elemBonus, x, o]
        this.hideScore(array, "hideScore", 50);
    }

    /**
     * this method to hide the bonus element
     * @param {array} array
     * @param {string} method 
     * @param {int} vitesse 
     */
    hideScore(array, method, vitesse){

            array[1] += 5;
            array[2] -= 0.1;

            if( array[1] >= 50){

                var bonus = document.querySelectorAll('._bonus');
                var i = 0;
                for(i = 0; i < bonus.length; i++){

                    bonus[i].remove();
                }
            }else {

                array[0].style.fontSize = 46 + array[1] + "px";
                array[0].style.opacity = array[2] ;

                this.myTimer(array, method, vitesse);
            }

            

    }


    /**
     * this method create fruit img 
     * annd call moveFruit method to move the fruit
     * @param {object} elem 
     */
    newFruit(elem) {

        var x = elem.offsetTop;
        var arrFruit =['ananas', 'apple', 'cerise'];
        var fruitImg = document.createElement('img');

        var fruit = arrFruit[ Math.floor(Math.random() * (arrFruit.length) ) ]

        fruitImg.src = "./ressources/img/" + fruit + ".png";
        fruitImg.setAttribute('fruit', fruit);
        fruitImg.style.position = "absolute";
        fruitImg.style.left = elem.offsetLeft + "px";
        fruitImg.style.top = elem.offsetTop + "px";
        fruitImg.style.width = this.blockW + "px";
        fruitImg.style.height= this.blockW + "px";

        this.container.appendChild(fruitImg);

        var array = [fruitImg, x]
        this.moveFruit(array, "moveFruit", 50);
    }

    /**
     * this method move an d check if fruit touch the ping
     * and check if fruit go out the container
     * @param {object} elem 
     * @param {int} x  get position of breaks
     */
    moveFruit (array, method, vitesse) {

        array[1] += 5;

        if(array[0].offsetTop > this.container.offsetHeight){

                array[0].remove();

        }else if(this.touch(this.ping, array[0]) == false){

                array[0].style.top = array[1] + "px";

                this.myTimer(array, method, vitesse)

        }else if(this.touch(this.ping, array[0]) == true){

                this.option(array[0].getAttribute('fruit'));
                array[0].remove();

        }

    }


    /**
     * this method is timer to run move fruit method
     * @param {array} array 
     * @param {string} method 
     * @param {int} vitesse 
     */
    myTimer(array, method,  vitesse) {

        var _this = this;

        setTimeout(()=>{

            switch(method){
                
                case 'hideScore':

                    _this.hideScore(array, method, vitesse) 
                    break;

                case 'moveFruit':

                    _this.moveFruit(array, method, vitesse);
                    break;

                case 'returnVitesse':

                    _this.returnVitesse(array, method, vitesse);
                    break;

                case 'makeBig':

                    _this.makeBig(array, method, vitesse);
                    break;

                case 'makeSmall':

                    _this.makeSmall(array, method, vitesse);
                    break;

            }

        }, vitesse)

    }

    /**
     * this method check the fruit and call methods
     * to get options
     * @param {string} fruit 
     */
    option (fruit) {

        switch(fruit){

            case 'ananas':
                
                this.baisseVitesse = true;       // low vitess
                break; 

            case 'apple':
                    this.preparePause = true;     // pause ball
                break;
            
            case 'cerise':
                    this.bigPing = true;         // big ping
                break;
            
        }

    }

    //============= methods of option =========

    /**
     * this method allow to move ball 
     * with ping when the game is pause
     */
    callBall () {

        if(this._pause == true ){

            var left = (this.ping.offsetLeft + (this.ping.offsetWidth / 2) - (this.ball.offsetWidth / 2));
            this.ball.style.left = left + "px";
            this.ballLeft = left;

        }

    }

    /**
     * this method allow to pause game and
     * call methods for raison of pause
     */
    pause () {

        if(this.preparePause == true && this.touch(this.ping, this.ball) == true){

            clearInterval(this.startId);

            this._pause = true;
        }else if(this.baisseVitesse == true && this.touch(this.ping, this.ball) == true){

            clearInterval(this.startId);
            this.vitesse += 5;
            this.start();
            var i = 0;
            this.returnVitesse(i, 'returnVitesse', 1000);
        }else if(this.bigPing == true){

            this.bigPing = false;
            var i = 0;
            this.makeBig(i, 'makeBig', 10);
        }

    }

    makeBig(i, method, vitesse) {

        i += 1;
        var _this = this;

        if(i < 10){


            this.ping.style.width = this.ping.offsetWidth + i + "px";
            clearInterval(this.startId);
            this.start();

            this.myTimer(i, method, vitesse);
        }else {

            setTimeout(function() {

                var l = 0;

                _this.makeSmall(l, 'makeSmall', 10);

            }, 10000)

            
        }
    }

    makeSmall(i, method, vitesse) {

        i -= 1;

        if(i > -10){

            this.ping.style.width = this.ping.offsetWidth + i + "px";
            clearInterval(this.startId);
            this.start();

            this.myTimer(i, method, vitesse);
        }

    }

    returnVitesse(i, method , vitesse) {

        i += 1;

        if(i >= 10){

            clearInterval(this.startId);
            this.vitesse -= 5;
            this.baisseVitesse = false;
            this.start();

        }else {

            this.myTimer (i, method, vitesse);
        }
    }


    /**
     * this method allow to start game
     */
    play() {
        
        if(this.preparePause == true){

            this.preparePause = false;
            this._pause = false;
            this.start();

        }
    }
}

var _break = new Break(); 