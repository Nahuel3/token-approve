import {useMemo} from "react";
import { useWeb3React } from "@web3-react/core";
import platziPunksArtifactss from "../../config/web3/artifacts/PlatziPunkss";



const {address, abi} = platziPunksArtifactss;

const usePlatziPunks = () => {
    const {active,library,chainId } = useWeb3React()
  
    const platziPunks = useMemo( () => {
    if (active) return new library.eth.Contract(abi,address[chainId]);
      }, [active,chainId,library?.eth?.Contract]);
  
      return platziPunks
  };
  
  export default usePlatziPunks;