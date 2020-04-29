
const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container')
let shuffledQuestions, currentQuestionIndex;

const questionID = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')


startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
})

function startGame() {
  console.log('Game Started..')
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => (Math.random() - 0.5));
  currentQuestionIndex = 0;
  questionContainer.classList.remove('hide')
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionID.innerText = question.question
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtons.appendChild(button)
  });
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide');
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is 2*2 ?',
    answers: [
      { text: '4', correct: true },
      { text: '2', correct: false },
    ]
  }
];