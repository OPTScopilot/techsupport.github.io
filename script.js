// Данные опроса
const surveyQuestions = [
    {
        question: "Какой ваш любимый цвет?",
        options: ["Красный", "Синий", "Зеленый", "Желтый"],
        answer: "Синий"
    },
    {
        question: "Сколько часов в сутках?",
        options: ["12 часов", "24 часа", "48 часов", "36 часов"],
        answer: "24 часа"
    },
    {
        question: "Какая столица России?",
        options: ["Санкт-Петербург", "Москва", "Казань", "Новосибирск"],
        answer: "Москва"
    },
    {
        question: "Сколько континентов на Земле?",
        options: ["5", "6", "7", "8"],
        answer: "7"
    },
    {
        question: "Какой язык программирования используется для веб-разработки?",
        options: ["Python", "JavaScript", "C++", "Java"],
        answer: "JavaScript"
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];

// Элементы DOM
const authScreen = document.getElementById('auth-screen');
const warningScreen = document.getElementById('warning-screen');
const surveyScreen = document.getElementById('survey-screen');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');

const acceptWarning = document.getElementById('accept-warning');
const continueBtn = document.getElementById('continue-btn');

const questionsContainer = document.getElementById('questions-container');
const currentQuestionSpan = document.getElementById('current-question');
const progressFill = document.getElementById('progress-fill');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Переключение между формами входа и регистрации
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// Обработка входа
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (email && password) {
        showScreen(warningScreen);
    }
});

// Обработка регистрации
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    if (name && email && password) {
        showScreen(warningScreen);
    }
});

// Активация кнопки "Продолжить" при принятии условий
acceptWarning.addEventListener('change', () => {
    continueBtn.disabled = !acceptWarning.checked;
});

// Переход к опросу
continueBtn.addEventListener('click', () => {
    showScreen(surveyScreen);
    initSurvey();
});

// Функция переключения экранов
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

// Инициализация опроса
function initSurvey() {
    renderQuestions();
    showQuestion(0);
    updateProgress();
}

// Отрисовка всех вопросов
function renderQuestions() {
    questionsContainer.innerHTML = '';
    
    surveyQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.dataset.index = index;
        
        const questionTitle = document.createElement('h3');
        questionTitle.textContent = `${index + 1}. ${q.question}`;
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'answer-options';
        
        q.options.forEach((option, optIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'answer-option';
            optionDiv.textContent = option;
            optionDiv.dataset.questionIndex = index;
            optionDiv.dataset.optionIndex = optIndex;
            optionDiv.dataset.answer = option;
            
            optionDiv.addEventListener('click', () => selectAnswer(index, option, optionDiv));
            
            optionsDiv.appendChild(optionDiv);
        });
        
        questionDiv.appendChild(questionTitle);
        questionDiv.appendChild(optionsDiv);
        questionsContainer.appendChild(questionDiv);
    });
}

// Выбор ответа
function selectAnswer(questionIndex, answer, element) {
    // Убираем выделение с других ответов
    const allOptions = element.parentElement.querySelectorAll('.answer-option');
    allOptions.forEach(opt => opt.classList.remove('selected'));
    
    // Выделяем выбранный ответ
    element.classList.add('selected');
    
    // Сохраняем ответ
    userAnswers[questionIndex] = answer;
    
    // Активируем кнопку "Далее"
    nextBtn.disabled = false;
}

// Показать конкретный вопрос
function showQuestion(index) {
    const questions = document.querySelectorAll('.question');
    questions.forEach(q => q.classList.remove('active'));
    questions[index].classList.add('active');
    
    currentQuestionIndex = index;
    currentQuestionSpan.textContent = index + 1;
    
    // Управление кнопками
    prevBtn.disabled = index === 0;
    
    // Проверяем, есть ли ответ на текущий вопрос
    if (userAnswers[index]) {
        nextBtn.disabled = false;
        // Восстанавливаем выделение
        const selectedOption = questions[index].querySelector(`[data-answer="${userAnswers[index]}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }
    } else {
        nextBtn.disabled = true;
    }
    
    // Меняем текст кнопки на последнем вопросе
    if (index === surveyQuestions.length - 1) {
        nextBtn.textContent = 'Завершить';
    } else {
        nextBtn.textContent = 'Далее';
    }
    
    updateProgress();
}

// Обновление прогресс-бара
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / surveyQuestions.length) * 100;
    progressFill.style.width = progress + '%';
}

// Кнопка "Назад"
prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        showQuestion(currentQuestionIndex - 1);
    }
});

// Кнопка "Далее"
nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < surveyQuestions.length - 1) {
        showQuestion(currentQuestionIndex + 1);
    } else {
        // Завершение опроса
        finishSurvey();
    }
});

// Завершение опроса
function finishSurvey() {
    let correctAnswers = 0;
    
    surveyQuestions.forEach((q, index) => {
        if (userAnswers[index] === q.answer) {
            correctAnswers++;
        }
    });
    
    const resultHTML = `
        <div class="question active">
            <h3 style="text-align: center; color: #667eea;">🎉 Опрос завершен!</h3>
            <div style="text-align: center; margin-top: 30px; font-size: 1.2em;">
                <p style="margin-bottom: 20px;">Спасибо за участие!</p>
                <p style="color: #667eea; font-weight: 600; font-size: 1.5em;">
                    Правильных ответов: ${correctAnswers} из ${surveyQuestions.length}
                </p>
                <div style="margin-top: 40px;">
                    <button class="btn btn-primary" onclick="location.reload()">
                        Начать заново
                    </button>
                </div>
            </div>
        </div>
    `;
    
    questionsContainer.innerHTML = resultHTML;
    document.querySelector('.survey-navigation').style.display = 'none';
    document.querySelector('.question-counter').style.display = 'none';
    progressFill.style.width = '100%';
}
