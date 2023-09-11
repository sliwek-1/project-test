window.addEventListener('DOMContentLoaded', () => {
    showMainOpstions();
    showUserOptions();
})

function showMainOpstions(){
    let sections = document.querySelectorAll('.section');
    let btns = document.querySelectorAll('.list-item');

    btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let currentBtn = e.target;
            let currentID = currentBtn.dataset.id;

            btns.forEach(btn => {
                btn.classList.remove('active');
            })

            currentBtn.classList.add('active');
        

            sections.forEach(section => {
                section.classList.remove('active')
            })

            sections.forEach(section => {
                if(section.dataset.id == currentID){
                        console.log("true")
                        section.classList.add('active');
                }
            })
        })
    })
}

function showUserOptions(){
    let addUserBtn = document.querySelector('.add-user');
    let klasaBtns = document.querySelectorAll('.klasa');
    let addUserForm = document.querySelector('.add-user-form');
    let displayUser = document.querySelector('.display-users');

    addUserBtn.addEventListener('click', () => {
        displayUser.classList.remove('active');
        addUserForm.classList.add('active');
    })

    klasaBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            addUserForm.classList.remove('active');
            displayUser.classList.add('active');
        })
    })
}