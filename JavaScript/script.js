let currentQuestionIndex = 0;
let score = {
  correct: 0,
  incorrect: 0
};

let selectedQuizQuestions = [];

const secondsRemaining = 15;
let timeLeft = secondsRemaining;
let timeIntervalId;

const startScreen = document.getElementById("start-screen");
const startGeographyQuizButton = document.getElementById("start-geo-quiz");
const startScienceQuizButton = document.getElementById("start-sci-quiz");
const startHistoryQuizButton = document.getElementById("start-history-quiz");
const startMathQuizButton = document.getElementById("start-math-quiz");
const quizContainer = document.getElementById("quiz-container");
const questionTextElement = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const scoreDisplay = document.getElementById("score-display");
const resetButton = document.getElementById("reset-button");
const questionProgressElement = document.getElementById("question-progress");
const timerDisplayElement = document.getElementById("timer-display");
const timeElement = document.getElementById("time");

function startQuiz(category) {
  selectedQuizQuestions = allQuizData[category];
  shuffleArray(selectedQuizQuestions);
  currentQuestionIndex = 0;
  score = {correct: 0, incorrect: 0};

  startScreen.style.display = "none";
  quizContainer.style.display = "block";
  timerDisplayElement.style.display = "block";

  displayQuestion(currentQuestionIndex);
  updateProgressDisplay();
  updateScoreDisplay();
}

function displayQuestion(index){
  optionsContainer.innerHTML = '';

  const question = selectedQuizQuestions[index];

  if(question){
    startTimer();
    questionTextElement.textContent = question.questionText;

    const shuffledOptions = [...question.options];
    shuffleArray(shuffledOptions);

    shuffledOptions.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.classList.add("option-button");

      optionsContainer.appendChild(button);

      button.addEventListener('click', () => {
        checkAnswer(option); //calling the function to verify the answer
      });
    });

    nextButton.style.display = 'none';
    resetButton.style.display = 'none';
  }
  else {
    stopTimer();
    timerDisplayElement.style.display = 'none';
    //this block will execute when all the questions have been displayed
    console.log("Quiz finished! Display final score.");
    questionTextElement.textContent = "Quiz Complete!";
    optionsContainer.innerHTML = '';
    nextButton.style.display = 'none';
    resetButton.style.display = 'block';
    scoreDisplay.textContent = `Final Score: Correct: ${score.correct}, Incorrect: ${score.incorrect}`;
    scoreDisplay.style.display = "block";
    questionProgressElement.textContent = '';
  }

  updateProgressDisplay();
}

// checking for correct answer
function checkAnswer(selectedOption){
  stopTimer();
  const currentQuestion = selectedQuizQuestions[currentQuestionIndex];

  document.querySelectorAll('.option-button').forEach(button => {
    button.disabled = true;

    if(button.textContent === currentQuestion.correctAnswer) {
      button.style.backgroundColor = "lightgreen";
      button.style.color = "black";
      button.style.borderColor = "green";
    }
    else if(button.textContent === selectedOption) {
      button.style.backgroundColor = "lightcoral";
      button.style.color = "black";
      button.style.borderColor = "red";
    }
  });

  if(selectedOption === currentQuestion.correctAnswer) {
    score.correct++;
    console.log("Correct!");
  }
  else if (selectedOption === null) {
    score.incorrect++;
    console.log("Time's up! No answer selected!");
  }
  else {
    score.incorrect++;
    console.log("Incorrect!");
  }
  nextButton.style.display = 'block';
  updateProgressDisplay();
  // updateScoreDisplay(); 
}

function updateProgressDisplay() {
  if(currentQuestionIndex < selectedQuizQuestions.length) {
    questionProgressElement.textContent = `Question ${currentQuestionIndex + 1} of ${selectedQuizQuestions.length}`;
  }
  else {
    questionProgressElement.textContent = '';
  }
}

function updateScoreDisplay() {
    scoreDisplay.textContent = `Correct Answers: ${score.correct}, Incorrect Answers: ${score.incorrect}`;
}

function startTimer() {
  clearInterval(timeIntervalId);
  timeLeft = secondsRemaining;
  timerDisplayElement.style.display = 'block';

  timeIntervalId = setInterval (() => {
    timeLeft--;
    timeElement.textContent = timeLeft;

    if(timeLeft <= 0) {
      clearInterval(timeIntervalId);
      // console.log("Time's up! Moving to the next question!");
      checkAnswer(null);
      nextButton.click();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timeIntervalId)
}

function resetTimer() {
  stopTimer();
  timeLeft = secondsRemaining;
  timeElement.textContent = timeLeft;
  timerDisplayElement.style.display = 'none';
}

function resetHomePage() {
  resetTimer();
  quizContainer.style.display = "none";
  scoreDisplay.style.display = "none";
  resetButton.style.display = "none";
  nextButton.style.display = "none";

  questionTextElement.textContent = '';
  optionsContainer.innerHTML = '';
  questionProgressElement.textContent = '';
  scoreDisplay.textContent = '';
  startScreen.style.display = 'block';

  currentQuestionIndex = 0;
  score = {
    correct: 0,
    incorrect: 0
  };
  selectedQuizQuestions = [];
}

function shuffleArray(array) {
  for(let i = array.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

startGeographyQuizButton.addEventListener('click', () => {
  startQuiz("geography");
});

startScienceQuizButton.addEventListener('click', () => {
  startQuiz("science");
});

startHistoryQuizButton.addEventListener('click', () => {
  startQuiz("history");
});

startMathQuizButton.addEventListener('click', () => {
  startQuiz("math");
});

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  document.querySelectorAll('.option-button').forEach(button => {
    button.disabled = false;
    button.style.backgroundColor = '';
    button.style.borderColor = '';
    button.style.color = '';
  });
  displayQuestion(currentQuestionIndex);
});

resetButton.addEventListener('click', () => {
  resetHomePage();
});

// resetButton.addEventListener('click', () => {
//   currentQuestionIndex = 0;
//   score = {
//     correct: 0,
//     incorrect:0
//   };
//   scoreDisplay.textContent = '';
//   resetButton.style.display = 'none';
//   shuffleArray(selectedQuizQuestions);  
//   displayQuestion(currentQuestionIndex);
//   resetTimer();
//   // startTimer();
//   updateScoreDisplay();
// });

// shuffleArray(quizQuestions);
// displayQuestion(currentQuestionIndex);
// updateProgressDisplay();