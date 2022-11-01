/* eslint-disable no-unused-vars */
import React,{useRef, useState } from 'react';
import Staking from './components/Staking'
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

function App() {
  //genereal
  // const modalRef = useRef();
  // const [provider,setProvider] = useState(undefined);
  // const [signer,setSigner] = useState(undefined);
  // const[contract,setContract] = useState(undefined);
  // const [signerAddress,setSignerAddress] = useState(undefined);

  // //assets
  // const [assetsIds,setAssetsIds] = useState([]);
  // const [assets,setAssets]= useState([]);
  
  // //staking
  // const [showStakeModal,setShowStakeModal] = useState(false);
  // const [stakingLength,setStakingLength] = useState(undefined);
  // const [ stakingPercent,setStakingPercent] = useState(undefined);
  // const [amount,setAmount] = useState(0);

  // //helper
  // const toString = bytes32 => ethers.utils.parseBytes32String(bytes32);
  // const toWei = ether => ethers.utils.parseEther(ether);
  // const toEther = wei => ethers.utils.formatEther(wei);

  
  // const contractAddress = "0x6D282e1D53A650222C41D39841CB433b8D534C93";

  // const isConnected  = () => signer !== undefined;

  // const calcDaysRemaining = (unlockDate) => {
  //   const timeNow = Date.now() / 1000;
  //   const secondsRemaining  = unlockDate - timeNow

  //   return Math.max((secondsRemaining /60 /60/24).toFixed(0),0);
  //   }

  // const getAssets = async(assetsIds,signer) => {
  //   const queriedAssets = await Promise.all(assetsIds.map(id => contract.connect(signer).getPositionById(id)));    
  //   queriedAssets.map(async asset => {
  //     const parsedAsset = {
  //       positionId:asset.positionId,
  //       percentInterest:Number(asset.percentInterest) / 100 ,
  //       daysRemaining:calcDaysRemaining(Number(asset.unlockDate)),
  //       etherInterest: toEther(asset.weiInterest),
  //       etherStaked: toEther(asset.weiStaked),
  //       open: asset.open,      
  //     }
  //     setAssets(prev => [...prev, parsedAsset]);
  //   })
  // }
  // const onLoad = async () => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum)
  //   await provider.send('eth_requestAccounts',[])
  //   const signer = provider.getSigner();
  //   const myContract = new ethers.Contract(contractAddress, artifact.abi,signer);
  //   setProvider(provider);
  //   setContract(myContract);
  // }
  // useEffect(()=>{
  //   onLoad();
  // },[]);
  // const connectAndLoad = async () => {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     await provider.send('eth_requestAccounts',[])
  //     const signer = provider.getSigner();
  //     const signerAddresses = await signer.getAddress();
  //     const myContract = new ethers.Contract(contractAddress, artifact.abi,signer); 
  //     const connection =  myContract.connect(signer);
  //     const assetsIds = await connection.getPositionIdsForAddress(signerAddresses);
  //     setSignerAddress(signerAddresses);
  //     setSigner(signer);
  //     setContract(myContract); 
  //     setAssetsIds(assetsIds);
  //     getAssets(assetsIds,signer);
  // }
  // const oepnStakingModal = (stakingLength,stakingPercent)=>{
  //   setShowStakeModal(true);
  //   setStakingLength(stakingLength)
  //   setStakingPercent(stakingPercent)
  // }

  // const stakeEther = () => {
  //   console.log(signer);
  //   if(signer !== undefined){ 
  //     <Alert severity="error"> Please sign in first </Alert>
  //   }
  //   else{
  //     const wei = toWei(amount);
  //     const data = {value : wei};
  //     contract.connect(signer).stakeEther(stakingLength,data)
  //   }
  // }

  // const withDraw = positionId => {
  //   contract.connect(signer).closePosition(positionId)
  // }

  return (
   <div>
    <Staking/>
    </div>
  );
}

export default App;
