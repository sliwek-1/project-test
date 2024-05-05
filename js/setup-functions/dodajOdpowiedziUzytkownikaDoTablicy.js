// dodaje odpowiedzi użytkownika z klasą odp do tablicy
export function dodajOdpowiedziUzytkownikaDoTablicy(e){
    let currentOdp = e.target;
    let IdElement = currentOdp.parentElement.parentElement.parentElement;
    let id = IdElement.querySelector('.id').textContent;
    odpowiedzi_user[id] = {odp: currentOdp.textContent, id: id};
    sessionStorage.setItem('odpowiedzi_user', JSON.stringify(odpowiedzi_user));
}