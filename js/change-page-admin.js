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
        btn.addEventListener('click',async (e) => {
            try{
                let currentElement = e.target;
                let id = currentElement.dataset.id;
                addUserForm.classList.remove('active');
                displayUser.classList.add('active');

                let request = await fetch('php/getKlasaData.php',{
                    method: 'post',
                    body: "klasaID="+id,
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                })

                let response = await request.text();
                console.log(response)
            }catch(error){
                console.log(error);
            }
        })
    })
}
