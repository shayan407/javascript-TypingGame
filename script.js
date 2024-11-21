let settingsBtn = document.getElementById('settings-btn');
let settingsContainer = document.getElementById('setting');
let settingsForm = document.getElementById('form');
let difficultyDropdown = document.getElementById('difficulty');
let word = document.getElementById('word');
let userWord = document.getElementById('user-word');
let scoreCard = document.getElementById('score');
let timer = document.getElementById('time');
let gameover = document.getElementById('gameover');

let score = 0;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';
difficultyDropdown.value = difficulty;

let time = 10;

let randomWord;

userWord.focus();

async function getData() {
    let api = await fetch `https://random-word-api.vercel.app/api?words`;
    let dataJson = await api.json();
    let data = dataJson[0];
    renderWord(data);
};

function renderWord(data){
    randomWord = data;
    word.innerHTML = randomWord;
}

function incrementScore(){
    score++;
    scoreCard.innerHTML = score;
}

let timeInterval = setInterval(updateTime, 1000);

function updateTime(){
    time--;
    timer.innerHTML = `${time}s`;
    if(time === 0){
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver(){
    gameover.style.display = 'flex';
    gameover.innerHTML = `
        <h1 style="margin-bottom:0;">Time Up!</h1>
        <p>Your Score is : ${score}</p>
        <button onclick="location.reload()">Play Again</button>
    `
}

userWord.addEventListener('input', (e) => {
    let userInput = e.target.value;
    if(userInput === randomWord){
        e.target.value = ""
        getData();
        incrementScore();
        if(difficulty === 'easy'){
            time += 3;
        }else if(difficulty === 'medium'){
            time += 2;
        }else if(difficulty === 'hard'){
            time += 1;
        }
        timer.innerHTML = `${time}s`;
    }
});

settingsBtn.addEventListener('click', () => {
    settingsContainer.classList.toggle('hide')
});

difficultyDropdown.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty',difficulty);
});

getData();
