
//fetch localhost:4000
const handleFetch = () => {
    try{

        fetch("http://localhost:4000/api/wallet/admin/wallets")
        .then(response => response.json())
        .then(data => {
            console.log("data", data);
        });
    }catch(e){
        console.log(e);
    }
}

handleFetch();

export default handleFetch;