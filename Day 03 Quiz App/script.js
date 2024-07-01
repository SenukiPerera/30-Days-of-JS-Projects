const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            {text:"Home Tool Markup Language", correct: false},
            {text:"Hyperlinks and Text Markup Language", correct: false},
            {text:"Hyper Text Markup Language", correct: true},
            {text:"Home Text Management Language", correct: false}
        ]
    },
    {
        question: "What is the main function of a router in a network?",
        answers: [
            {text:"To store data permanently", correct: false},
            {text:"To manage the power supply", correct: false},
            {text:"To direct data traffic between devices", correct: true},
            {text:"To provide antivirus protection", correct: false}
        ] 
    },
    {
        question: "Which programming language is primarily used for developing Android apps?",
        answers: [
            {text:"Java", correct: true},
            {text:"Swift", correct: false},
            {text:"JavaScript", correct: false},
            {text:"Ruby", correct: false}
        ] 
    },
    {
        question: "What does CPU stand for in computer terminology?",
        answers: [
            {text:"Computer Peripheral Unit", correct: false},
            {text:"Central Print Unit", correct: false},
            {text:"Core Programming Unit", correct: false},
            {text:"Central Processing Unit", correct: true}
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("wrong");
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();