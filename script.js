const questions = [
  {
    question:"What is the largest mammal in the world?" ,
    answers: [
      { text: "African Elephant", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Giraffe", correct: false },
      { text: "Polar Bear", correct: false },
    ]
  },
  {
    question:"What is the fastest land animal?" ,
    answers: [
      { text: "Cheetah", correct: true },
      { text: "Lion", correct: false },
      { text: "Horse", correct: false },
      { text: "Falcon", correct: false },
    ]
  },
  {
    question:"Which bird is known for its ability to mimic human speech?" ,
    answers: [
      { text: "Parrot", correct: true },
      { text: "Eagle", correct: false },
      { text: "Penguin", correct: false },
      { text: "Swan", correct: false },
    ]
  },
  {
    question:"Which animal is known as the 'King of the Jungle' and can be seen at the Singapore Zoo?" ,
    answers: [
      { text: "Tiger", correct: false },
      { text: "Lion", correct: true },
      { text: "Elephant", correct: false },
      { text: "Gorilla", correct: false },
    ]
  },
  {
    question:"Which of the following animals is native to Singapore and can be seen at the Singapore Zoo?" ,
    answers: [
      { text: "Koala", correct: false },
      { text: "Komodo Dragon", correct: false },
      { text: "Malayan Tapir", correct: true },
      { text: "Polar Bear", correct: false },
    ]
  }
];

const questionElement = document.getElementById("question")
const answerButton = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion (){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question; 

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button)
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}


function resetState(){
  nextButton.style.display = "none";
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
}
} 

function selectAnswer(e){
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if(isCorrect){
    selectedButton.classList.add("correct");
    score++;
  }else{
    selectedButton.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach(button => {
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
  }else{
    showScore();
  }
  }



nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
})


startQuiz();