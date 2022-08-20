var playing = false;
var score;
var action;
var timeremaining;
var correctans
document.getElementById("startreset").onclick = function(){
    if(playing == true){
        //syntax for reloading page in js
        location.reload();
    }else{
        playing = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        hide("gameover");
        document.getElementById("startreset").innerHTML = "Reset Game";

        startCountdown();

        generateQA();
    }
}

for(i=1 ; i<5 ; i++){
    document.getElementById("box"+i).onclick = function(){
        if(playing == true){
            if(this.innerHTML == correctans){
                score += 1;
                document.getElementById("scorevalue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000)
                generateQA();
            }else{
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000)
            }
        }
    }
}


function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){
            //to stop counter we use clearinterval function
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>game over!</p><p>your score is "+ score +" .</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";

        }
    }, 1000)
}

function stopCountdown(){
    clearInterval(action);
}

function hide(Id){
    document.getElementById(Id).style.display = "none";
}

function show(Id){
    document.getElementById(Id).style.display = "block";
}

function generateQA(){
    var x = 1+Math.round(9*Math.random());
    var y = 1+Math.round(9*Math.random());
    correctans = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3*Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctans;
    var answer = [correctans];
    for(i=1; i<5; i++){
        if(i !== correctPosition){
            var wrongans;
            do{
                wrongans = (1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));
            }while(answer.indexOf(wrongans)>-1);
            document.getElementById("box" + i).innerHTML = wrongans;
            answer.push(wrongans);
        }
        
    }

}