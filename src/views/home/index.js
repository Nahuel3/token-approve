import { useToast } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core"
import { useCallback, useEffect, useState } from "react";
import usePlatziPunks from "../../hooks/usePlatziPunks";
import usePlatziPunkss from "../../hooks/usePlatziPunks/indexx";


const Home = () => {

   const [isMinting, setIsMinting] = useState(false)


  const[totalSupply, setTotalSupply] = useState();

  const platziPunks = usePlatziPunks(); //(token que se va a vender y necesita que se use el APPROVE)
  const platziPunkss = usePlatziPunkss(); // USDT BSC TESTNET (APPROVE)

  const amount = usePlatziPunks();
  const amounts = usePlatziPunkss();

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
    platziPunkss.methods.approve("0xBDff5c03b8e0e7F6701785179859c9c4B9aE4471" , "5000000000000000000000").send({ from: account });
  }

   

  const mint = () =>{
    setIsMinting(true);

    platziPunks.methods.buy("1").send({
      from:account,
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
       <button onClick={mint} >Mintear</button>
    </div>
  )
}

export default Home