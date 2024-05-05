// funkcja pobiera dane z sessionStorage przeglądargi gdy są dostępne a następnie je wyświetla
// co poswala widzieć dobre i złe odpowiedzi udzielone podczas testu po odświeżeniu strony
export function loadDataFromStorage(odpowiedzi, poprawne){
    let dataResult = sessionStorage.getItem('results');
    let data = JSON.parse(dataResult);
    let dobreOdpowiedzi = data.odp_dobrze;
    let wszystkie = data.wszystkie_odp;
    let wynikProcentowy = data.wynik;
    
    colorAnswersAfterChecking(odpowiedzi, poprawne);
    checkIdIsValid();
    pokazWynik(dobreOdpowiedzi,wszystkie,wynikProcentowy)
    
    let sprawdz = document.querySelector('.sprawdz');
    sprawdz.classList.add('schowaj');
}