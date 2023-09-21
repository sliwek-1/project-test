let addUserBtn = document.querySelector('.send-user-data');

addUserBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sendData();
})

async function sendData(){
    let form = document.querySelector('.form-add-user');
    let formInputs = document.querySelector('.form-add-user input');
    let formData = new FormData(form);
    try{
        let request = await fetch('php/addUser.php',{
            method: 'post',
            body: formData
        })

        let response = await request.text();
        
        location.reload()
    }catch(error){
        console.log(error)
    }
}