
function detectCheat() {
    window.addEventListener('blur', (e) => {
        e.preventDefault()
        alert("Chyba nie chcesz ściągać prawda? ;)");
    })
}


export { detectCheat }