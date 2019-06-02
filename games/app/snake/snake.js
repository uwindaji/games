class Snake {

    constructor() {


        this.colorScore = "rgb(255, 189, 66)";
        this.colorOver = "rgb(255, 189, 66)";
        this.colorStart = "rgb(255, 189, 66)";
        this.colonneW = 40;
        this.colonneH = 20;

        this.vitesse = 250;
        this.block = 25;
        this.id = null;
        this.scoreValue = 0;
        this.scoreVitesse = 0;

        this.containerW = this.block * this.colonneW;
        this.containerH = this.block * this.colonneH;
        this.anneau = null;
        this.meal = null;
        this.top = -this.block;
        this.left = 0;
        this.key = null;

        this.arrL = [];
        this.arrT = [];

        this.plan = document.querySelector('.div-plan');
        this.plan.style.position = "relative";
        this.plan.style.width = this.containerW + 20 + "px";
        this.plan.style.height = this.containerH + 20 + "px";
        this.plan.style.borderRadius = "20px";
        this.plan.style.backgroundColor = "white";

        this.container = document.querySelector('.container-snake');
        this.container.style.position = "absolute";
        this.container.style.left = 10 + "px";
        this.container.style.top = 10 + "px";
        this.container.style.width = this.containerW + "px";
        this.container.style.height = this.containerH + "px";
        this.container.style.borderRadius = "16px";
        this.container.style.backgroundColor = "#fad6a4";
        


        this.containerScore = document.querySelector('.container-score');

        this.containerScore.style.position = "absolute";
        this.containerScore.style.left = 0 + "px";
        this.containerScore.style.bottom = -120 + "px";
        this.containerScore.style.width = this.containerW + 20 + "px";
        this.containerScore.style.height = 100 + "px";
        this.containerScore.style.color = this.colorScore;
        this.containerScore.style.padding = "20px 0px";
        this.containerScore.style.textAlign = "center";
        this.containerScore.style.fontFamily = "digi";
        this.containerScore.style.border = "solid 10px white";
        this.containerScore.style.borderRadius = "20px";
        this.containerScore.style.backgroundColor = "#333";

        this.start();
        
    }

    init() {



        var _this = this;

        var divInit = document.createElement('div');
        divInit.style.position = "absolute";
        divInit.setAttribute('id', 'init')
        divInit.style.width = 300 + "px";
        divInit.style.height = 150 + "px";
        divInit.style.left = (this.plan.offsetWidth - 300) / 2 + "px";
        divInit.style.top =  (this.plan.offsetHeight - 200) / 2  + "px";
        divInit.style.textAlign =  "center";
        divInit.style.padding =  "30px 40px";
        divInit.style.borderRadius =  "20px";
        divInit.style.color =  this.colorOver;
        divInit.style.fontFamily =  "digi";
        divInit.innerHTML = "<h2>GAME OVER</h2> <h3>SCORE : " + this.scoreValue +"</h3>";
        divInit.style.backgroundColor = "#333";
        divInit.style.cursor= "pointer";
        _this.container.style.cursor = "pointer";
        this.container.appendChild(divInit);
        

        setTimeout(function () {

            var _init = document.querySelector('#init');
            _init.remove();


            _this.vitesse = 250;
            _this.scoreValue = 0;
            _this.scoreVitesse = 0;
            _this.top = -_this.block;
            _this.left = 0;
            

            
            _this.start();

        }, 5000);
    }

    score() {


        this.scoreValue += 10;
        this.scoreVitesse += 1;

        if(this.scoreVitesse == 2 ){

            this.vitesse -= 10;
            this.scoreVitesse = 0;

        }

        this.containerScore.innerHTML = "<h2>SCORE : " + this.scoreValue + "</h2>";

        clearInterval(this.id);
        this.move();
    }



    start() {

        

        var _this = this;

        var divStart = document.createElement('div');
        divStart.style.position = "absolute";
        divStart.setAttribute('id', 'start')
        divStart.style.width = 200 + "px";
        divStart.style.height = 70 + "px";
        divStart.style.left = (this.container.offsetWidth - 200) / 2 + "px";
        divStart.style.top =  (this.container.offsetHeight - 100) / 2  + "px";
        divStart.style.textAlign =  "center";
        divStart.style.padding =  "15px 0px";
        divStart.style.color =  this.colorStart;
        divStart.style.borderRadius =  "20px";
        divStart.style.fontFamily =  "digi";
        divStart.innerHTML = "<h2>START</h2>";
        divStart.style.backgroundColor = "#333";
        
        this.container.appendChild(divStart);

        divStart.addEventListener('click', function () {

            _this.snake();
            _this.container.style.cursor = "none";

            var _start = document.querySelector('#start');
            _start.remove();

        });


    }

    snake () {

        this.anneau = document.createElement('div');
        this.anneau.style.position = "absolute";
        this.anneau.style.width = this.block + "px";
        this.anneau.style.height = this.block + "px";
        this.anneau.style.left = this.block * 20 + "px";
        this.anneau.style.top = this.block * 19 + "px";
        this.anneau.style.zIndex = 1;

        this.head = document.createElement('img');
        this.head.src = "./ressources/img/snake.png";
        this.head.style.width = "100%";
        this.head.style.height = "100%";
        this.head.style.transform = "rotate(180deg)";
        this.anneau.appendChild(this.head);
        this.container.appendChild(this.anneau);

        this.fruit();
        this.joystick();
        this.move();
        

    }

    fruit () {

        var top = Math.floor(Math.random() * (this.colonneH )) * this.block;
        var left = Math.floor(Math.random() * (this.colonneW )) * this.block;

        this.meal = document.createElement('div');
        this.meal.style.position = "absolute";
        this.meal.style.width = this.block + "px";
        this.meal.style.height = this.block + "px";
        this.meal.style.left = left + "px";
        this.meal.style.top = top  + "px";
        this.meal.style.backgroundImage = "url('./ressources/img/frog.png')";
        this.meal.style.backgroundSize = "cover";
        this.container.appendChild(this.meal);

    }

    joystick () {

        

        document.addEventListener('keydown', (event)=> {

            var key = event.keyCode;

            // top

            if(this.top == -this.block && key == 37){

                this.head.style.transform = "rotate(90deg)";

            }             
            
            if(this.top == -this.block && key == 39){

                this.head.style.transform = "rotate(270deg)";
            }            
            
            if(this.top == this.block && key == 37){

                this.head.style.transform = "rotate(90deg)";
            }  

            if(this.top == this.block && key == 39){

                this.head.style.transform = "rotate(270deg)";
            } 

            // left 
            
            if(this.left == -this.block && key == 38){

                this.head.style.transform = "rotate(180deg)";
            }
            
            if(this.left == this.block && key == 38){

                this.head.style.transform = "rotate(180deg)";
            }

            if(this.left == -this.block && key == 40){

                this.head.style.transform = "rotate(0deg)";
            }

            if(this.left == this.block && key == 40){

                this.head.style.transform = "rotate(0deg)";
            }

            switch(key){

                case 37:

                    this.left = -this.block;
                    this.top = 0;
                    break;

                case 38:

                    this.top = -this.block;
                    this.left = 0;
                    break;

                case 39:

                    this.left = this.block;
                    this.top = 0;
                    break;

                case 40:

                    this.top = this.block;
                    this.left = 0;
                    break;
            }

            
        })
    }

    move () {

        this.id = setInterval(()=>{

            var myAudio = new Audio("./ressources/wave/kin.wav");
            myAudio.volume = 0.5;
            myAudio.play();

            this.anneau.style.top = this.anneau.offsetTop + this.top + 'px';
            this.anneau.style.left = this.anneau.offsetLeft + this.left + 'px';

            this.anneau.style.transform = "scale(1)";

            var  tail = document.querySelectorAll('.meal');
            var i = 0;

            for(i = 1; i < tail.length; i++){

                tail[i].style.top = this.arrT[i-1]+ "px";
                tail[i].style.left = this.arrL[i-1] + "px";
                
            }

            
            var die =  this.checkDie();

            if(die == false){


                this.checkMeal();
                this.queue();
            }else if(die == true){

                this.endGame();
            }
            

        }, this.vitesse);
    }

    checkDie() {

        var anneauL = this.anneau.offsetLeft;
        var anneauT = this.anneau.offsetTop;
        var anneauH = this.anneau.offsetHeight;
        var anneauW = this.anneau.offsetWidth;
        var containerW = this.container.offsetWidth;
        var containerH = this.container.offsetHeight;
        var state = false;
        if(anneauL < 0){

            state = true;

        }else if(anneauT < 0){

            state = true;

        }else if((anneauT + anneauH) > containerH){

            state = true;
        }else if((anneauL + anneauW) > containerW){

            state = true;
        }

        var  tail = document.querySelectorAll('.meal');
        var i = 0;
        

        for(i = 0; i < tail.length; i++){

            if(anneauL == tail[i].offsetLeft   && anneauT == tail[i].offsetTop ){

                state = true;
                break;
            
            }
        }

        return state;

    }

    checkMeal() {

        var mealT = this.meal.offsetTop ;
        var mealL = this.meal.offsetLeft;
        var anneauT = this.anneau.offsetTop;
        var anneauL = this.anneau.offsetLeft;



            if(mealT == anneauT && mealL == anneauL){

                this.anneau.style.transform = "scale(1.8)";
                this.meal.setAttribute('class', 'meal');
                this.meal.style.backgroundImage = "url('./ressources/img/tail.png')";


                this.fruit();
                this.score();

                var myAudio = new Audio("./ressources/wave/eat.wav");
                    myAudio.volume = 0.2;
                    myAudio.play();
            }


        

    }

    queue () {

        var  tail = document.querySelectorAll('.meal');
        var i = 0;

        if(tail[0]){

            tail[0].style.backgroundImage = "url('./ressources/img/grass.png')"

            if(this.top == -this.block){

                tail[0].style.top = this.anneau.offsetTop + this.block + "px";
                tail[0].style.left = this.anneau.offsetLeft + "px";


            }
            
            if(this.top == this.block){

                tail[0].style.top = this.anneau.offsetTop - this.block + "px";
                tail[0].style.left = this.anneau.offsetLeft + "px";

                
            }

            if(this.left == -this.block){

                tail[0].style.left = this.anneau.offsetLeft + this.block + "px";
                tail[0].style.top = this.anneau.offsetTop + "px";


            }
            
            if(this.left == this.block){

                tail[0].style.left = this.anneau.offsetLeft - this.block + "px";
                tail[0].style.top = this.anneau.offsetTop + "px";

            }

        }

        this.arrL = [];
        this.arrT = [];

        for (i = 0; i< tail.length; i++){

            this.arrL.push(tail[i].offsetLeft)
            this.arrT.push(tail[i].offsetTop)
        }

    }

    endGame () {

        clearInterval(this.id);
        this.container.innerHTML = "";

        this.init();

    }
}

var snake = new Snake();



