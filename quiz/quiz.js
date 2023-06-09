
let myUsername=document.getElementById("username");
let userPrompt=prompt("Kindly type your Nickname").toUpperCase();
myUsername.innerText=" "+userPrompt;

const startingMinutes=1;
let time=startingMinutes*60;
const countDown=document.querySelector(".count-down");
const myBtn=document.querySelector("#btn");

function myTimer(){
    let timing=setInterval(() => {
        const minutes=Math.floor(time / 60);
        let seconds=time % 60;
        seconds=seconds<10?"0"+seconds : seconds;
        countDown.innerText=`${minutes} : ${seconds}`;
        if(countDown.innerText == "0"+" : "+"00"){
            alert("game over");
            clearInterval(timing);
            scoreButton.classList.add("my-button2");
            myBtn.classList.add("disengage");
            optionContainer.classList.add("disengage");
            viewScore.innerHTML="View Score";
            // viewScore.style.backgroundColor="#0f0f0f";
        }
        time--;
    }, 1000);
}

const quizBox = document.querySelector(".quiz-box");
const countBox = document.querySelector(".count-box");
const customBox = document.querySelector(".custom-box");
const footerBox = document.querySelector(".footer");
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answerIndicatorContainer = document.querySelector(".answer-indicator-container");
const myInput = document.querySelector(".input");
const scoreButton = document.getElementById("my-button2");
const viewScore = document.getElementById("demo");
const myClick = document.getElementsByClassName("button");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers=0;
let attempt=0;

function setAvailableQuestions(){
    for(let i=0; i<quiz.length; i++){
        availableQuestions.push(quiz[i])
        // console.log(totalquestions)
    }
}

console.log(availableQuestions)

function getNewQuestion(){
    questionNumber.innerHTML='Question'+ (questionCounter+1) + ' of ' + quiz.length
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    //let get the index of the question
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    const index1=availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1,1);

    if(currentQuestion.hasOwnProperty("img")){
        const img = document.createElement("img");
        img.src=currentQuestion.img;
        img.id="identity"
        questionText.appendChild(img);
    }

    const optionLen = currentQuestion.options.length;

    for(let i=0; i<optionLen; i++){
        // availableOptions.push(i)
        availableOptions.push(currentQuestion.options[i]);
        // console.log(availableOptions)
    }
    console.log(availableOptions)

    optionContainer.innerHTML = '';
    let animationDelay = 0.2;

    for(let i=0; i<optionLen; i++){
        const optionIndex = availableOptions[Math.floor(Math.random()*availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);
        const option= document.createElement("div");
        option.innerHTML = optionIndex;
        // console.log(currentQuestion.options[i])
        availableOptions.splice(index2,1);
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.2;
        option.className="option";
        optionContainer.appendChild(option);
        console.log(option)
        option.setAttribute("onclick", "getResult(this)")
    }
    questionCounter++
}

function getResult(element){
    if (element.id==currentQuestion.answer){
        element.classList.add("correct");
        updateAnswerIndicator("correct");
        correctAnswers++;
        // attempt++;
    }else{
        element.classList.add("wrong");
        const OptionLength=optionContainer.children.length;
        for(let i=0; i<OptionLength; i++){
            if(optionContainer.children[i].id==currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
        updateAnswerIndicator("wrong");
        // attempt++;
    }
    attempt++;
    console.log(attempt)
    unclickableOptions();
}
function unclickableOptions(){
    const OptionLength=optionContainer.children.length;
    for(let i=0; i<OptionLength; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}
function answerIndicator(){
    // const OptionLength=questionCounter;
    for(let i=0; i<quiz.length; i++){
        const answerIndicator = document.createElement("div");
        answerIndicator.className="indicator"
        answerIndicatorContainer.appendChild(answerIndicator);
        console.log(answerIndicatorContainer);
        // answerIndicatorContainer.innerText+=answerIndicator;
    }
}
function updateAnswerIndicator(marktype){
    answerIndicatorContainer.children[questionCounter-1].classList.add(marktype);
}

function myNext(){
    if(questionCounter===quiz.length){
        console.log("Mad-oh!");
        scoreButton.classList.add("my-button2");
        viewScore.innerHTML="View Score";
        // viewScore.style.backgroundColor="#0f0f0f";
        myBtn.classList.add("disengage");
    }else{
        getNewQuestion();
    }
}

function takeTest(){
    // footerBox.classList.add("fixed");
    footerBox.classList.add("hide");
    myTimer();
    countBox.classList.remove("count-box");
    customBox.classList.add("show");
    customBox.classList.remove("custom-box");
    customBox.classList.add("hide");
    quizBox.classList.remove("quiz-box");
    quizBox.classList.add("show");
    setAvailableQuestions();
    getNewQuestion();
    answerIndicator();
}
function myResult(result){
    footerBox.classList.remove("hide");
    footerBox.classList.add("fixed");
    countBox.classList.add("count-box");
    quizBox.classList.add("hide");
    resultBox.classList.remove("result-box");
    resultBox.classList.add("show");
    console.log('hi');
    resultBox.querySelector(".total-question").innerHTML=quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML=attempt;
    resultBox.querySelector(".total-right").innerHTML=correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML=(attempt-correctAnswers);
    resultBox.querySelector(".total-score").innerHTML=(correctAnswers+"/"+(quiz.length));
    resultBox.querySelector(".percentage").innerHTML=(((correctAnswers/(quiz.length)*100).toFixed()+"%"))
    resultBox.querySelector(".grade-point").innerHTML=((correctAnswers/(quiz.length)*5)).toFixed()+" out of 5.0";
}
/*function retryAll(){
    questionCounter = 0;
    correctAnswers=0;
    attempt=0;
    countBox.classList.remove("count-box");
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvailableQuestions();
    getNewQuestion();
    answerIndicator();
}*/
function retryAll(){
    window.location.reload();
}
function backHome(){
    let stateObj={id:"10"};
    window.history.replaceState(stateObj, "page 2", "../index.html");
    window.location.reload();
}
let menuBar = document.getElementById("menu");
let togglePage = document.getElementById("toggle-page");
let listElement = document.querySelectorAll("ul li")
let times = document.getElementById("times");
menuBar.onclick=function(){
    togglePage.style.right="0";
    // quizBox.classList.add("under");
}
times.onclick=function(){
    togglePage.style.right="-500px";
    // quizBox.classList.remove("under");
    // quizBox.classList.add("over");
}
listElement.forEach(n=>n.onclick=()=>{
    // times.parentElement.remove();
})