import { classicGenerateData } from "../generate/classic.js";
import { szyfrowanieDanych, deszyfrowanieDanych } from "./szyfrowanie.js";

// funkcja wywołuje funlcje fetchData z odpowiedznimi parametrami do każdego egzaminu
export async function sendData(id){
    try{
        switch(id){
            case "inf02-40":
                fetchData("inf02Random",40);
            break;
            case "inf02-1":
                fetchData("inf02Random",1);
            break;
            case "inf03-40":
                fetchData("inf03Random",40);
            break;
            case "inf03-1":
                fetchData("inf03Random",1);
            break;
        }
    }catch(error){
        console.log(error);
    }
}

// fetch data wysyła dane z parametrami do odpowiedniego pliku php aby uzyskać pytania
async function fetchData(dbID, count){
    try{
        let request = await fetch(`php/${dbID}.php`,{
            method: 'post',
            body: 'count=' + count,
            headers: {
                'Content-type': "application/x-www-form-urlencoded",
            }
        })

        let response = await request.json();
        let dataToStorage = JSON.stringify(response);
        let zaszyfrowaneDane = szyfrowanieDanych(dataToStorage)
        sessionStorage.setItem('response', zaszyfrowaneDane);
        let data = sessionStorage.getItem('response');
        classicGenerateData(JSON.parse(deszyfrowanieDanych(data)), dbID) 
    }catch(error){
        console.log(error);
    }    
}