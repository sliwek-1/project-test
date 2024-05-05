let randomBtn = document.querySelector('.random-password');
let passwdInput = document.querySelector('.password-input');
let smallLetters = 'qwertyuiopasdfghjklzxcvbnm';
let bigLetters = 'QWERTYUIOPASDFGHJKLZXCVBNM'
let numbers = '1234567890';
let specialCharacters = '!@#$%&';
let result = "";
randomBtn.addEventListener('click', (e) => {
    e.preventDefault();
    result = "";
    for(let i = 1; i <= 2; i++){
        let smallLetterRandom = Math.floor(Math.random() * smallLetters.length);
        let bigLetterRandom = Math.floor(Math.random() * bigLetters.length);
        let numberRandom = Math.floor(Math.random() * numbers.length);
        let specialCharsRandom = Math.floor(Math.random() * specialCharacters.length);

        result += smallLetters.charAt(smallLetterRandom) + numbers.charAt(numberRandom) + bigLetters.charAt(bigLetterRandom) + specialCharacters.charAt(specialCharsRandom);
    }
    passwdInput.value = result
})