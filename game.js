{
    const pname1 = document.querySelector("[player='one']"); // get input1 element
    const pname2 = document.querySelector("[player='two']"); // get input2 element
    const play = document.querySelector(".start");     // get play button element
    const banner = document.querySelector(".notification"); // get notification div element
    const resetBtn = document.querySelector(".reset");     // get reset button element
    let  btnArr =  document.querySelectorAll(".small_box"); // get all playable small button element array or nodelist  
    let start = false;  // initially kept the start button off (means user will click start button to start game)
    let count=0;      // initially kept the count value = 0 (means user has not input player's name)
    let action = 'X';  // initially kept playable button value is X (means first action will print X and second O and so on)
    let chances = 0;  //  initially kept chances is 0 (means chances >=5 then check the winner pattern)

    // Array of winner pattern (2D Array)
    let winnerPattern = [
            [1, 2,  3],  //Pattern 1
            [1, 4,  7],
        	[1,	5,	9],
        	[2,	5,	8],
        	[3,	6,	9],
         	[3,	5,	7],
        	[4,	5,	6],
       	    [7,	8,  9],  // Pattern 8
        ]

    
        // Click play button to perform below action means actual start the game
    const playGame = ()=>{     // perform action after click on play button element

        if(count==0){   // first time click on play button
            const player1= pname1.value;
            const player2= pname2.value;

            if(player1==="" || player2===""){
                if(player1===""){
                        alert("please enter player1 name.");
                    }
                else{
                        alert("please enter player2 name.");
                    }
                }
            else{
                 pname1.disabled=true;
                 pname2.disabled=true;
                 pname1.classList.add("disable");
                 pname2.classList.add("disable");
        
                {
                    play.innerText = "STOP";
                    play.classList.add("stop");
                }

                start=true;
                count=1;
                btnArr.forEach(resumeGame);
            }

        }

        else if(count==1 && start===true){ // click on Stop button
            btnArr.forEach(stopGame);
            start=false;
            {
                play.innerText = "Resume";
                play.classList.remove("stop");
                play.classList.add("resume");
            }
        }
        else{   // click on resume button
            btnArr.forEach(resumeGame);
            start=true;
            {
                play.innerText = "STOP";
                play.classList.add("stop");
                play.classList.remove("resume");
            }
        }
    }

    // stop the game and disabled all small box button
    const stopGame = (btn)=>{
        btn.disabled=true;
        btn.classList.add("disabled_btn");
    }

    // resume the game and enable the small box button
    const resumeGame = (btn)=>{
        btn.classList.remove("disabled_btn");
        if(btn.innerText===""){
            btn.disabled=false;
        }
    }

    // Click reset button to reset the game (means enable input box and enable play button same as begining position)
    const resetGame= ()=>{

        action="X";

        count=0;

        for(let btn of btnArr){
            btn.innerText="";
            btn.disabled=true;
            btn.classList.remove("btn");
            btn.classList.add("disabled_btn");
            btn.classList.remove("winner");
        }
        play.innerText="Play";
        play.classList.remove("stop");
        play.classList.remove("resume");
        pname1.disabled=false;
        pname2.disabled=false;
        pname1.classList.remove("disable");
        pname2.classList.remove("disable");
        play.disabled=false;
        banner.innerText="";
        banner.classList.remove("display_banner");

    }

    
    // function to check winner
    const winnerCheck = ()=>{

        let posVal1;
        let posVal2;
        let posVal3;
        
        let winBtn1;
        let winBtn2;
        let winBtn3;

        for(let winner of winnerPattern){

            posVal1 = btnArr[winner[0]-1].innerText;
            posVal2 = btnArr[winner[1]-1].innerText;
            posVal3 = btnArr[winner[2]-1].innerText;

            winBtn1 = btnArr[winner[0]-1];
            winBtn2 = btnArr[winner[1]-1];
            winBtn3 = btnArr[winner[2]-1];
            
            if(posVal1 !== "" && posVal2 !=="" && posVal3 !==""){
                if(posVal1===posVal2 && posVal2 === posVal3){
                    console.log(`Winner is ${posVal1}`);
                    winBtn1.classList.add("winner");
                    winBtn2.classList.add("winner");
                    winBtn3.classList.add("winner");


                    btnArr.forEach(stopGame);
                    play.disabled=true;

                    if(posVal1==="X"){
                        banner.innerText = `Congratulation!! ${pname1.value}, You are the Winner.`;
                        banner.classList.add("display_banner");
                    }

                    else{
                        banner.innerText = `Congratulation!! ${pname2.value}, You are the Winner.`;
                        banner.classList.add("display_banner");
                    }

                }
            }
            
        }
    }


    // Initial Page load kept disbale the small box button
    btnArr.forEach(stopGame);

    // Mouse click function on Play/Start/Resume button
    {
    play.addEventListener("click",playGame);
    }


    // Apply event listner to all small_box button using forEach array method
    {

        btnArr.forEach((btn)=>{
            btn.addEventListener("click",()=>{
                btn.classList.add("btn");
                if(action==='X'){
                    btn.innerText='X';
                    btn.disabled=true;
                    action='O'
                }
                else{
                    btn.innerText='O';
                    btn.disabled=true;
                    action='X'
                }
                //console.log("RU");
                chances++;
                if(chances>=5){
                    winnerCheck();
                }
                
            });
            //index = Number(btn.getAttribute("index"));
        })
     }

     // reset button event
     resetBtn.addEventListener("click",resetGame);
    
}