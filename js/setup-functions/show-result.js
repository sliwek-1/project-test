// funckja wyswietla element z wynikiem testu
export function pokazWynik(result,wszystkie_odp,wynik){
    let resultElement = document.querySelector('.result')
    let resultTitle = document.querySelector('.result-title')
    let resultWynik = document.querySelector('.wynik')
    let resultProcent = document.querySelector('.procent')
    let userActionsElement = document.querySelector('.userActions')

    let userActions = JSON.parse(sessionStorage.getItem('userActions')) ?? 0;
    let countUserActions = userActions.length ?? 0;
    let countText = `Liczba wykroczeń: ${countUserActions}`;

    if(wynik >= 50){    
        resultElement.classList.remove('niezdany')
        resultElement.classList.add('zdany');
        resultTitle.textContent = `Gratulacje zdałeś egzamin`;
        userActionsElement.textContent = countText
    }else{
        resultElement.classList.remove('zdany');
        resultElement.classList.add('niezdany')
        resultTitle.textContent = `NIE zdałeś egzaminu`;
        userActionsElement.textContent = countText
    }
    
    resultWynik.textContent = `[${result}/${wszystkie_odp}]`;
    resultProcent.textContent = `${wynik}%`;

    sessionStorage.setItem('results', JSON.stringify({odp_dobrze: result, wszystkie_odp: wszystkie_odp,wynik: wynik}));
}