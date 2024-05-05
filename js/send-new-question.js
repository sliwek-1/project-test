window.addEventListener('DOMContentLoaded', () => {
    let btn = document.querySelector('.btn-add-quaetion');

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const dataToSend = main();
        sendData(dataToSend);
        console.log(dataToSend)
    })

})

async function sendData(data) { 
    try {
        let request = await fetch('php/save-new-question-to-db.php', {
            method: "POST",
            body: data,
        })

        let response = await request.text();
        console.log(response)

    } catch(error) {
        throw new Error(error);
    }
}

function main() {
    let title = document.querySelector('#title').value;
    let baza = document.querySelector('#baza').value;
    let linkToImgRadio = document.querySelector("#link-img");
    let fileToImgRadio = document.querySelector("#file-img");
    let linkToImgInput = document.querySelector("#link-img-input").value;
    let fileToImgInput = document.querySelector("#file-img-input").files[0];
    let poprawnaOdp = document.querySelector("#poprawna_odp").value;
    let A = document.querySelector("#A").value;
    let B = document.querySelector("#B").value;
    let C = document.querySelector("#C").value;
    let D = document.querySelector("#D").value;

    let formData = new FormData();

    const chooseValidOdpValue = (poprawna) => {
        switch(poprawna) {
            case 'A':
                return A
            case 'B':
                return B
            case 'C':
                return C
            case 'D':
                return D
        }
    }

    formData.append('title', title);
    formData.append('baza', baza);
    formData.append('obrazek', linkToImgRadio.checked ? linkToImgInput : fileToImgInput);
    formData.append('poprawna_odp', chooseValidOdpValue(poprawnaOdp));
    formData.append('odpowiedzi[A]', A);
    formData.append('odpowiedzi[B]', B);
    formData.append('odpowiedzi[C]', C);
    formData.append('odpowiedzi[D]', D);

    return formData

}