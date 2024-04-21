window.addEventListener('DOMContentLoaded', () => {
    if(!sessionStorage.getItem('gamemode')) {
        sessionStorage.setItem('gamemode', 'classic');
    }
    init();
    checkWithModeIsOn();
    setGamemode();
})

function init() {
    let chooseBtns = document.querySelectorAll('.choose-btn');

    chooseBtns.forEach(btn => {
        let id = sessionStorage.getItem('gamemode');
        btn.textContent = "Wybierz";
        if(btn.dataset.id == id) {
            btn.textContent = "Wybrano"
        }

    })
}

function setGamemode() {
    let chooseBtns = document.querySelectorAll('.choose-btn');

    chooseBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let currentGamemode = e.target.dataset.id;
            sessionStorage.setItem('gamemode', currentGamemode);
            init();
        })
    })
}

function checkWithModeIsOn() {
    let gamemode = sessionStorage.getItem('gamemode');
}