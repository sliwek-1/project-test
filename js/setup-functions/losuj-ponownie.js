export function losujPonownie(){
    let losuj = document.querySelector('.losuj');
    losuj.addEventListener('click', () => {
        let id = sessionStorage.getItem('exam-id');
        clear(id)
        sendData(id) 
    })
}