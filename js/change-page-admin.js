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
            <span class="user-number">${i + 1}</span>
            <div class="user-name">${element.imie} ${element.nazwisko}</div>
            <div class="user-login">${element.login}</div>
            <button type="submit" class="edit-btn btn"><img src="./img/edit.png" class="option-btn" style="width: 17px; height: 17px;" alt="edit"></button>
            <button type="submit" class="delete-btn btn"><img src="./img/bin.png" class="option-btn" style="width: 17px; height: 17px;" alt="bin"></button>
        `;
        el.innerHTML = text;

        usersElement.append(el);
    })
}
