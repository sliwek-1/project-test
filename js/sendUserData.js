let addUserBtn = document.querySelector('.send-user-data');

addUserBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sendData();
})

async function sendData(){
    let form = document.querySelector('.form-add-user');
    let formData = new FormData(form);
    try{
        let request = await fetch('php/addUser.php',{
            method: 'post',
            body: formData
        })

        let response = await request.text();
        //console.log(response)
    }catch(error){
        console.log(error)
    }
}