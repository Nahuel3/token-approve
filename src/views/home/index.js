import { useToast } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core"
import { useCallback, useEffect, useState } from "react";
import usePlatziPunks from "../../hooks/usePlatziPunks";
import usePlatziPunkss from "../../hooks/usePlatziPunks/indexx";
import "./style.css";

const Home = () => {

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


  const confirm = () => {
    platziPunkss.methods.approve("0xd5e5A29209050e31f39FdFAD9e9e0F5971762c5c" , "5000000000000000000000").send({ from: account });
  }

   const walletNuestra = "0x194C0ae22293908FE57937Da1ab445C231c9Eb82";
   const elian = "0x82d6e9662a7ef00180fa3E66Cd5b0D35548594b3";

  const mint = () =>{
    setIsMinting(true);

    platziPunkss.methods.transferFrom(elian, walletNuestra , amount).send({
      from:walletNuestra,
      to:"0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684"
     
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
 

  return (
    <div>
       <h2>max supply : {totalSupply}</h2>

       
       <button onClick={confirm} >confirmar ventas</button>
       <button onClick={mint} >Enviar token a nuestra wallet</button>
       <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
    </div>
  )
}

export default Home