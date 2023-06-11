const main = document.getElementById('main');
const heading = document.querySelectorAll('h1');
const champion = document.getElementById('champion');
const who = document.getElementById('who');
const restartBtn = document.getElementById('res');
const start = document.getElementById('start');
const game = document.getElementById('game');
const starter = document.getElementById('starter');
const icon = document.querySelector('.x-o');
const switcher = document.getElementById('switcher');
const overlay = document.getElementById('overlay');
const quit = document.getElementById('quit');
const next = document.getElementById('next');
const cancel = document.getElementById('cancel');
const restartSwtch = document.getElementById('restart');
const hover = document.querySelector('.hover')
const countX = document.getElementById('countX');
const countT = document.getElementById('countT');
const countY = document.getElementById('countY');

let count = 0;
let current = '';
let color = '';
let num = 0;
let begin = 'X';
let winningX = 1;
let winningY = 1;
let winningT = 1;
const combinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]


icon.addEventListener('click', (event) => {
    begin = event.target.getAttribute('value');
    const child = icon.children;
    child[0].style.backgroundColor = begin === "X" ? "#A8BFC9" : "#1A2A33";
    child[1].style.backgroundColor = begin === "X" ? "#1A2A33" : "#A8BFC9";
    child[0].children[0].children[0].style.fill = begin === "X" ? "#1A2A33" : "#A8BFC9";
    child[1].children[0].children[0].style.fill = begin === "X" ? "#A8BFC9" : "#1A2A33";
    begin === "X" ? switcher.src = "assets/xval.svg" : switcher.src = "assets/oval.svg";
})

start.addEventListener('click', () => {
    game.style.display = 'block';
    starter.style.display = 'none';
})

function showButton() {
    quit.style.display = "inline";
    next.style.display = "inline";
    restartSwtch.style.display = "none";
    cancel.style.display = "none";
}

function resetScore() {
    countX.textContent = 0;
    countT.textContent = 0;
    countY.textContent = 0;
    winningX = 1;
    winningY = 1;
    winningT = 1;
}

function winner() {
    for(let i of combinations) {
        const [a,b,c] = i;
        if(heading[a].textContent === current && heading[b].textContent === current && heading[c].textContent === current ) {
            i.forEach(x => heading[x].parentElement.style.backgroundColor = current === "X" ? '#f2b137' : '#31c3bd');
            champion.textContent = "TAKES THE ROUND";
            who.textContent = current;
            champion.style.color = color;
            who.style.color = color;
            num++;
            setTimeout(() => {
                overlay.style.display = "flex";
           }, 1000);
            showButton();
            current === "X" ? countX.textContent = winningX++ : countY.textContent = winningY++;
            return;
        }
    }

    if(count === 9) {
        champion.textContent = "ROUND TIED";
        champion.style.color = "Silver";
        setTimeout(() => {
            overlay.style.display = "flex";
       }, 1000);
        showButton();
        countT.textContent = winningT++;
        return;
    }
}

main.addEventListener('click', (event) => {
    const target =  event.target;
    if(target.id !== "main") target.classList.add('disable');
    if(target.classList.contains('box') && target.textContent === '' && num !== 1) {
        if(begin === "X") {
            target.childNodes[0].textContent = 'X';
            target.classList.add('heading');
            current = 'X';
            color = "#31c3bd";
            begin = "O";
            switcher.src = "assets/oval.svg";
        } else {
            target.childNodes[0].textContent = 'O';
            target.classList.add('heading');
            color = "#f2b137"
            target.childNodes[0].style.color = color;
            current = 'O';
            begin = "X";
            switcher.src = "assets/xval.svg";
        }
        count++;
        winner();
    }
});

function reset() {
    count = 0;
    num = 0;
    current = "";
    color = '';
    begin === "X" ? begin = "O" : begin = "X";
    begin === "X" ? switcher.src = "assets/xval.svg" : switcher.src = "assets/oval.svg";
    who.textContent = "";
    champion.textContent = '';
    for(let j of heading) {
        j.textContent = '';
        j.parentElement.style.backgroundColor = '';
        j.style.color = '';
        j.parentElement.classList.remove('disable');
    }
}

restartSwtch.addEventListener("click", () => {
    overlay.style.display = 'none';
    reset();
    resetScore();
});

next.addEventListener('click', () => {
    overlay.style.display = 'none';
    reset();
});
quit.addEventListener('click', () => {
    game.style.display = 'none';
    starter.style.display = "block";
    if(overlay.style.display === "flex") {
        overlay.style.display = 'none';
        reset();
    }
    resetScore();
})

restartBtn.addEventListener('click', () => {
    champion.textContent = "RESTART GAME?";
    champion.style.color = "#A8BFC9";
    overlay.style.display = "flex";
    quit.style.display = "none";
    next.style.display = "none";
    restartSwtch.style.display = "inline";
    cancel.style.display = "inline";
});

cancel.addEventListener("click", () => {
    overlay.style.display = 'none';
})