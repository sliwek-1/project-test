const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function(event) {
    socket.send('Hello, WebSocket Server!');
};

socket.onmessage = function(event) {
    console.log('Message received:', event.data);
};

socket.onclose = function(event) {
    console.log('WebSocket connection closed:', event);
};

// Funkcja sprawdza czy jest zalogowany użytkownik jeśli tak to włącza "Wielkiego brata" jeśli nie to nie robi nic
function checkUserIsLogged(){
    let userID = sessionStorage.getItem('userID') ?? null;
    if(userID !== null){
        return true;
    }else{
        return false;
    }
}

if(checkUserIsLogged()){
    window.addEventListener('blur', (e) => {
        e.preventDefault();
        detectCheat(e);
    })
}else{
    window.removeEventListener('blur', (e) => {
        e.preventDefault();
        detectCheat(e);
    })
}

function detectCheat(e) {
    e.preventDefault()
    let userID = sessionStorage.getItem('userID') ?? null;
    let examID = sessionStorage
    //alert("Chyba nie chcesz ściągać prawda? ;)");
}

export { detectCheat }