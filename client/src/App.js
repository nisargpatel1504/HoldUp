import React,{useEffect,useState } from 'react';
import {ethers} from 'ethers';
import artifact from './artifacts/contracts/Staking.sol/Staking.json';
import './App.css';
import NavBar from './components/NavBar'
import Body from './components/Body';
const CONTRACT_ADDRESS = '0x8bf5eFAc0C78364A1a8626Bd303c3F695Df010C9'


function App() {
  //genereal
  const [provider,setProvider] = useState(undefined);
  const [signer,setSigner] = useState(undefined);
  const[contract,setContract] = useState(undefined);
  const [signerAddress,setSignerAddress] = useState(undefined);

  //assets
  const [assetsIds,setAssetsIds] = useState([]);
  const [assets,setAssets]= useState([]);
  
  //staking
  const [showStakeModal,setShowStakeModal] = useState(false);
  const [stakingLength,setStakingLength] = useState(undefined);
  const [ stakingPercent,setStakingPercent] = useState(undefined);
  const [amount,setAmount] = useState(0);

  //helper
  const toString = bytes32 => ethers.utils.parseBytes32String(bytes32);
  const toWei = ether => ethers.utils.parseEther(ether);
  const toEther = wei => ethers.utils.formatEther(wei);

  useEffect(() => {

    const onLoad = async() =>{
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      const contract = await new ethers.Contract(CONTRACT_ADDRESS,artifact.abi);
      setContract(contract);
    }

    onLoad();
  },[])

  const isConnected  = () => signer !== undefined;

  const getSigner = async () =>{
    provider.send('eth_requestAccounts',[])
    const signer = provider.getSigner();
    return signer;
  }

  const getAssestId = async(address,signer) =>{
    const assetIds = await contract.connect(signer).getPositionIdsForAddress(address);
    return assetIds;
  }

  const calcDaysRemaining = (unlockDate) => {
    const timeNow = Date.now() / 100;
    const secondsRemaining  = unlockDate - timeNow
    return Math.max((secondsRemaining /60 /60/24).toFixed(0),0);
    }

  const getAssets = async(ids,signer) => {
    const queriedAssets = await Promise.all(ids.map(id => contract.connect(signer).getPositionById(id)));
    queriedAssets.map(async assets => {
      const parsedAsset = {
        positionId:assets.positionId,
        percentInterest:Number(assets.percentInterest) / 100 ,
        daysRemaining:calcDaysRemaining(Number(assets.unlockDate)),
        etherInterest: toEther(assets.weiInterest),
        etherStaked: toEther(assets.weiStaked),
        open: assets.open,      
      }
      setAssets(prev => [...prev,parsedAsset]);
    })
  }

  const connectAndLoad = async () => {
    const signer = await getSigner(provider)
    setSigner(signer);
    
    const signerAddresses = await signer.getAddress()
    setSignerAddress(signerAddresses);

    const assetIds = await getAssestId(signerAddress,signer)
    setAssetsIds(assetIds);

    getAssets(assetIds,signer);

  }

  const oepnStakingModal = (stakingLength,stakingPercent)=>{
    setShowStakeModal(true);
    setStakingLength(stakingLength)
    setStakingPercent(stakingPercent)
  }

  const stakeEther = () => {
    const wei = toWei(amount);
    const data = {value : wei};
    contract.connect(signer).stakeEther(stakingLength,data)
  }

  const withDraw = positionId => {
    contract.connect(signer).closePosition(positionId)
  }

  return (
    <div className="App">
      <NavBar 
      isConnected={isConnected}
      connect={connectAndLoad} 
      signer={signer} 
      signerAddress={signerAddress} 
      style={{ backgroundColor:'#0a0d79'}}/>
      <div>
      <Body oepnStakingModal={oepnStakingModal}/>
      </div>
    </div>
  );
}

export default App;
