window.addEventListener('DOMContentLoaded',() => {
    let passwdBtn = document.querySelector('#show-passwd');
    passwdBtn.addEventListener('click', () => {
        if(passwdBtn.checked){
            let passwdInput = document.querySelector('.passwd-input');
            passwdInput.classList.add('active');
            passwdInput.type = 'text';
        }else{
            let passwdInput = document.querySelector('.passwd-input');
            passwdInput.classList.remove('active');
            passwdInput.type = 'password'
        }
    })
})