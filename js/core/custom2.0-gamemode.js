const secretKey = "#$HaLaBaRdAtOBrOnSReDnOwIeCzA1410";
const iv = CryptoJS.lib.WordArray.random(16);
let odpowiedzi_user = new Array(40).fill({odp: "Brak odpowiedzi", id: "Brak ID"});

window.addEventListener('DOMContentLoaded', () => {
    let btnsE = document.querySelectorAll('.list-item');
    let data = sessionStorage.getItem('response');

    if(data !== null){
        checkWithModeIsOn(JSON.parse(deszyfrowanieDanych(data)));
    }else{
        //console.log("e")
    }

    btnsE.forEach(btn => {
        btn.addEventListener('click',async (e) => {
            initial(e)
        })
    })

    let odpowiedzi = sessionStorage.getItem('odpowiedzi_user');
    let poprawne = sessionStorage.getItem('poprawne');

    let userActions = sessionStorage.getItem('userActions');
    if(userActions !== null || userActions !== undefined){
        anticheat();
    }

    if (odpowiedzi !== null && poprawne !== null) {
        loadDataFromStorage(JSON.parse(odpowiedzi), JSON.parse(poprawne));
    }
})

function initial(e){
    let currentElement = e.currentTarget;
    let id = currentElement.dataset.id;
    sessionStorage.setItem('examSaveStatus', false)
    clear(id)
    sendData(id);
    setStartedData();
    anticheat();
}
