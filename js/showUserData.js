main();

async function main(){
    try{
        let request = await fetch('php/get-user-data.php');

        let response = await request.text();
        //console.log(response)
    }catch(error){
        //console.log(error);
    }
}