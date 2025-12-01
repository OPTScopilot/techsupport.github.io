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

// Тестовые вопросы
const testQuestions = [
    {
        question: "Что происходит, если за время действия моего тарифа продавцы на площадке не совершили ни одной продажи?",
        options: [
            "Мне вернут деньги за тариф",
            "Мне начислят бонусные баллы", 
            "Выплат не будет, и деньги за тариф не возвращаются",
            "Мне автоматически продлят тариф бесплатно",
            "Администрация обязана найти новых продавцов"
        ],
        answer: "Выплат не будет, и деньги за тариф не возвращаются"
    },
    {
        question: "Какова минимальная возрастная граница для использования сервиса?",
        options: ["12 лет", "14 лет", "16 лет", "18 лет"],
        answer: "14 лет"
    },
    {
        question: "Кто осуществляет выплаты пользователям?",
        options: [
            "Продавцы напрямую",
            "Автоматическая система без участия человека",
            "Администратор сервиса лично",
            "Банк-партнёр"
        ],
        answer: "Администратор сервиса лично"
    },
    {
        question: "Что я подтверждаю, ставя галочку перед прохождением теста?",
        options: [
            "Что хочу зарабатывать много денег",
            "Что уже заработал хотя бы 100 рублей",
            "Что прочитал и понял, что доход не гарантирован и деньги за тариф не возвращаются",
            "Что согласен получать рекламу по email"
        ],
        answer: "Что прочитал и понял, что доход не гарантирован и деньги за тариф не возвращаются"
    },
    {
        question: "Сколько комиссии взимает сервис с каждой продажи продавца?",
        options: ["1–2%", "3–6%", "10%", "Комиссия не взимается"],
        answer: "3–6%"
    },
    {
        question: "Что из перечисленного НЕ входит в обязанности сервиса?",
        options: [
            "Выплачивать деньги при наличии продаж",
            "Предоставлять подтверждение выплаты (чек)",
            "Гарантировать, что продавцы обязательно совершат продажи",
            "Проводить тест на понимание условий"
        ],
        answer: "Гарантировать, что продавцы обязательно совершат продажи"
    },
    {
        question: "Что я указываю при регистрации?",
        options: [
            "Страну проживания",
            "Номер паспорта",
            "Скан банковской карты",
            "Имя и фамилию полностью"
        ],
        answer: "Страну проживания"
    },
    {
        question: "Могут ли условия соглашения измениться?",
        options: [
            "Да, и изменения вступают в силу после публикации на сайте",
            "Нет, условия фиксированы навсегда",
            "Только с моего личного согласия",
            "Только раз в год"
        ],
        answer: "Да, и изменения вступают в силу после публикации на сайте"
    },
    {
        question: "За что сервис НЕ несёт ответственности?",
        options: [
            "За технические сбои сайта",
            "За упущенную выгоду или отсутствие дохода",
            "За неправильный ввод данных пользователем",
            "За блокировку аккаунтов в Brawl Stars"
        ],
        answer: "За упущенную выгоду или отсутствие дохода"
    },
    {
        question: "Сколько вопросов в этом тесте?",
        options: ["5", "8", "10", "12", "15"],
        answer: "10"
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];
let testAnswers = [];

// Элементы DOM
const authScreen = document.getElementById('auth-screen');
const licenseScreen = document.getElementById('license-screen');
const testScreen = document.getElementById('test-screen');
const surveyScreen = document.getElementById('survey-screen');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');

const acceptLicense = document.getElementById('accept-license');
const licenseContinueBtn = document.getElementById('license-continue-btn');

const testSubmitBtn = document.getElementById('test-submit-btn');

const questionsContainer = document.getElementById('questions-container');
const testQuestionsContainer = document.getElementById('test-questions-container');
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
        showLicenseScreen();
    }
});

// Обработка регистрации
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    if (name && email && password) {
        showLicenseScreen();
    }
});

// Активация кнопки "Продолжить" при принятии лицензии
acceptLicense.addEventListener('change', () => {
    licenseContinueBtn.disabled = !acceptLicense.checked;
});

// Переход к лицензии
function showLicenseScreen() {
    showScreen(licenseScreen);
}

// Переход к тесту
licenseContinueBtn.addEventListener('click', () => {
    showScreen(testScreen);
    initTest();
});

// Переход к опросу
function goToSurvey() {
    showScreen(surveyScreen);
    initSurvey();
}

// Инициализация теста
function initTest() {
    renderTestQuestions();
    testSubmitBtn.disabled = false;
}

// Отрисовка вопросов теста
function renderTestQuestions() {
    testQuestionsContainer.innerHTML = '';
    
    testQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'test-question';
        questionDiv.dataset.index = index;
        
        const questionTitle = document.createElement('h4');
        questionTitle.textContent = `${index + 1}. ${q.question}`;
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'test-options';
        
        q.options.forEach((option, optIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'test-option';
            optionDiv.textContent = option;
            optionDiv.dataset.questionIndex = index;
            optionDiv.dataset.optionIndex = optIndex;
            optionDiv.dataset.answer = option;
            
            optionDiv.addEventListener('click', () => selectTestAnswer(index, option, optionDiv));
            
            optionsDiv.appendChild(optionDiv);
        });
        
        questionDiv.appendChild(questionTitle);
        questionDiv.appendChild(optionsDiv);
        testQuestionsContainer.appendChild(questionDiv);
    });
}

// Выбор ответа в тесте
function selectTestAnswer(questionIndex, answer, element) {
    // Убираем выделение с других ответов на этот вопрос
    const questionContainer = element.parentElement;
    const allOptions = questionContainer.querySelectorAll('.test-option');
    allOptions.forEach(opt => opt.classList.remove('selected'));
    
    // Выделяем выбранный ответ
    element.classList.add('selected');
    
    // Сохраняем ответ
    testAnswers[questionIndex] = answer;
}

// Отправка теста
testSubmitBtn.addEventListener('click', () => {
    submitTest();
});

// Проверка теста
function submitTest() {
    let correctAnswers = 0;
    
    testQuestions.forEach((q, index) => {
        if (testAnswers[index] === q.answer) {
            correctAnswers++;
        }
    });
    
    const testResult = document.getElementById('test-result');
    
    if (correctAnswers === testQuestions.length) {
        testResult.innerHTML = `
            <div class="test-result success">
                Поздравляем! Вы успешно прошли тест. 
                Правильных ответов: ${correctAnswers} из ${testQuestions.length}
            </div>
        `;
        
        // Добавляем задержку перед переходом к опросу
        setTimeout(() => {
            goToSurvey();
        }, 2000);
    } else {
        testResult.innerHTML = `
            <div class="test-result failure">
                Вы не прошли тест. 
                Правильных ответов: ${correctAnswers} из ${testQuestions.length}. 
                Пожалуйста, перечитайте соглашение и повторите попытку.
            </div>
        `;
        
        // Сбрасываем ответы и перезагружаем тест
        testAnswers = [];
        setTimeout(() => {
            renderTestQuestions();
        }, 3000);
    }
}

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
