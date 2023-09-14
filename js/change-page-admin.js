window.addEventListener('DOMContentLoaded', () => {
    showMainOpstions();
    showUserOptions();
    getData("wszystkie")
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
                        //console.log("true")
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
        let usersElement = document.querySelector('.users');
        btn.addEventListener('click',(e) => {
            usersElement.innerHTML = "";
            let currentElement = e.target;
            let id = currentElement.dataset.id;
            addUserForm.classList.remove('active');
            displayUser.classList.add('active');

            getData(id)
        })
    })
}

async function getData(id){
    try{
        let request = await fetch('php/getKlasaData.php',{
            method: 'post',
            body: "klasaID="+id,
            headers:{
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
    
        let response = await request.json();

        generateData(response);
    }catch(error){
        console.log(error)
    }
}

function generateData(data){
    let usersElement = document.querySelector('.users');
    usersElement.innerHTML = "";
    data.forEach((element, i) => {
       
        let el = document.createElement('article');
        el.classList.add('users-item');
        let text = `
            <span class="user-index option">${i + 1}</span>
            <span class="user-number option">${element.id}</span>
            <div class="user-name option">${element.imie} ${element.nazwisko}</div>
            <div class="user-login option">${element.login}</div>
            <div class="user-klasa option">${element.klasa}</div>
            <div class="user-permision option">${element.permision}</div>
            <div class="btns-section">
                <button type="submit" class="edit-btn btn">
                    <img src="./img/edit.png" class="option-btn" style="width: 17px; height: 17px;" alt="edit">
                </button>
                <button type="submit" class="delete-btn btn">
                    <img src="./img/bin.png" class="option-btn" style="width: 17px; height: 17px;" alt="bin">
                </button>
            </div>`;
        el.innerHTML = text;
        usersElement.append(el);
    })

    let editBtnData = document.querySelector('.edit-user-data-btn');
    let editBtns = document.querySelectorAll('.edit-btn');
    let editUserSection = document.querySelector('.edit-section-user');
    let closeBtn = document.querySelector('.close-btn');

    editBtnData.addEventListener('click',async (e) =>{
        e.preventDefault();
        let form = document.querySelector('.edit-user-data');
        let formData = new FormData(form);
        try{    
            let request = await fetch('php/editUserData.php', {
                method: 'post',
                body: formData,
            })
        
            let response = await request.text();
            console.log(response)            
        }catch(error){  
            console.log(error);
        }
    })

    closeBtn.addEventListener('click', () => {
        editUserSection.classList.remove('active');
    })

    editBtns.forEach(editBtn => {
        editBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let currentElement = e.currentTarget.parentElement.parentElement;
            let currentID = currentElement.querySelector('.user-number').textContent
            editUserSection.classList.add('active')
            editUser(currentID);
        })
    })
}

async function editUser(id){
    try{    
        let request = await fetch('php/getEditData.php',{
            method: 'post',
            body: "userID=" + id,
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })

        let response = await request.json();

        let editId = document.querySelector('.edit-id').value = response.id;
        let userName = document.querySelector('.user-name').value = response.imie;
        let userSurrname = document.querySelector('.user-surrname').value = response.nazwisko;
        let userLogin = document.querySelector('.user-login').value = response.login;
        let passwd = document.querySelector('.user-passwd').value = response.haslo;
        let selectKlasa = document.querySelector('#select-klasa').value = response.klasa;
        let selectPermission = document.querySelector('#select-permision').value = response.permision;
        

    }catch(error){
        console.log(error);
    }
}