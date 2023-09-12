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
    data.forEach((element,i) => {
       
        let el = document.createElement('article');
        el.classList.add('users-item');
        let text = `
            <span class="user-number option">${i + 1}</span>
            <div class="user-name option">${element.imie} ${element.nazwisko}</div>
            <div class="user-login option">${element.login}</div>
            <div class="btns-section">
                <button type="submit" class="edit-btn btn">
                    <img src="./img/edit.png" class="option-btn" style="width: 17px; height: 17px;" alt="edit">
                </button>
                <button type="submit" class="delete-btn btn">
                    <img src="./img/bin.png" class="option-btn" style="width: 17px; height: 17px;" alt="bin">
                </button>
            </div>`;
        el.innerHTML = text;

        let editBtn = el.querySelector('.edit-btn');
        let editUserSection = document.querySelector('.edit-section-user');
        let closeBtn = document.querySelector('.close-btn');

        closeBtn.addEventListener('click', () => {
            editUserSection.classList.remove('active');
        })

        editBtn.addEventListener('click', (e) => {
            e.preventDefault();
            editUserSection.classList.add('active')
            editUser(element.id);
            confirmEdit(element.id);
        })

        usersElement.append(el);
    })
}

async function editUser(id){
    try{    
        let editUserSection = document.querySelector('.edit-section-user');

        let request = await fetch('php/getEditData.php',{
            method: 'post',
            body: "userID=" + id,
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })

        let response = await request.json();

        let userName = document.querySelector('.user-name')
        let userSurrname = document.querySelector('.user-surrname')
        let userLogin = document.querySelector('.user-login');
        let passwd = document.querySelector('.user-passwd');
        let selectKlasa = document.querySelector('#select-klasa');
        let selectPermission = document.querySelector('#select-permision');
        
        userName.value = response.imie;
        userSurrname.value = response.nazwisko;
        userLogin.value = response.login;
        passwd.value = response.haslo;
        selectKlasa.value = response.klasa;
        selectPermission.value = response.permision;
        
    }catch(error){
        console.log(error);
    }
}

function confirmEdit(id){
    let editBtn = document.querySelector('.edit-user-data-btn');
    let form = document.querySelector('.edit-user-data');
    let formData = new FormData(form);
    editBtn.addEventListener('click',async (a) => {
        try{    
            let request = await fetch('php/editUserData.php', {
                method: 'post',
                body: formData,
            })
    
            let response = await request.text();            
        }catch(error){  
            console.log(error);
        }
    })

}
