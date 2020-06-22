var character = document.getElementById("character");   
var enemy = document.getElementById("enemy");          
let score = 0                                                
const scoreDisplay = document.getElementById('score');         

function jump(){  //function jump for the zombie
    if(character.classList != "animate"){
        character.classList.add("animate");
    }
    setTimeout(function(){                                     
        character.classList.remove("animate");
    }, 500);
}

var checkDead = setInterval(function(){  //checks when the zombie is dead  
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));    
    var enemyLeft = parseInt(window.getComputedStyle(enemy).getPropertyValue("left"));
    if(enemyLeft<150 && enemyLeft>0 && characterTop >=470){     //how fast the enemy goes and how high the character goes 
        enemy.style.animation = "none";
        enemy.style.display = "none";
        setTimeout(function(){location.replace("fail.html");}); //when the character the enemy damage you are going to the fail page for retry 
    } else {                                                    //if the character don't thouche the enemy the score is going up
        score++
        scoreDisplay.innerHTML = score

        if (score >= 2100){                                     //if the score is higher or equals to 2100 seconds you win the level 
            setTimeout(function(){location.replace("pass.html");}); //and you are going to the pass file
        }
    }
});
