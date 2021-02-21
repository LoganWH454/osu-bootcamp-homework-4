const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Why is it important to use semantic HTML?',
        choice1: 'Search engine optimzation.',
        choice2: 'So that it is accessible for screen readers.',
        choice3: 'To give meaning to your HTML tags.',
        choice4: 'All of the above.',
        answer: 4,
    },
    {
        question: 'When linking your style.css and reset.css in your HTML, which link needs to come first?',
        choice1: 'reset.css',
        choice2: 'style.css',
        choice3: 'It does not matter.',
        choice4: 'They should both be on the same line.',
        answer: 1,
    },
    {
        question: 'When listing 4 values for the margin property in CSS, what order do they go in?',
        choice1: 'Top, bottom, right, left',
        choice2: 'Right, left, top, bottom',
        choice3: 'Top, right, bottom, left',
        choice4: 'Right, top, left, bottom',
        answer: 3,
    },
    {
        question: 'In JavaScript, which operator would you use to test if 7 is equal to "7" and make it true?',
        choice1: '===',
        choice2: '==',
        choice3: '=',
        choice4: '!=',
        answer: 2,
    },
]

const timer = document.getElementById('timer');
let time = 30;

// Timer

displayTime(time);

const countDown = setInterval (() => {
    time--;
    displayTime(time);
    if(time <= 0 || time < 1){
        endTime();
        clearInterval(countDown);
        window.location.assign('index.html');
    }
},1000);

function displayTime(second){
    const min = Math.floor(second / 60);
    const sec = Math.floor(second % 60);
    timer.innerHTML = `${min<10 ? '0': ''}${min}:${sec<10?'0':''}${sec}`;
};

function endTime(){
    timer.innerHTML = 'Out of Time!'
};

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startQuiz = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', i => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = i.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startQuiz()
