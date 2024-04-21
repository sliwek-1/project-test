export function checkIdIsValid() {
    let navItems = document.querySelectorAll('.nav-item-id');
    let poprawne = JSON.parse(sessionStorage.getItem('poprawne'));
    let userOdp = JSON.parse(sessionStorage.getItem('odpowiedzi_user'));

    navItems.forEach((element, i) => {
        let poprawna = poprawne[i].poprawna;
        let usrOdp = userOdp[i].odp

        if(poprawna == usrOdp) {
            if(element.dataset.id == i) {
                element.classList.add('good');
            }
        }else if(poprawna != usrOdp && usrOdp != "Brak odpowiedzi") {
            if(element.dataset.id == i) {
                element.classList.add('bad');
            }
        } else {
            if(usrOdp == "Brak odpowiedzi") {
                element.classList.add('unanswer');
            }
        }
    })
}