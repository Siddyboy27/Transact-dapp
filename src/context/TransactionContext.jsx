import { createContext, useEffect,useState } from "react";
import { ethers } from "ethers";
import {contractABI,contractAddress} from '../utils/contants'

export const TransactionContext=createContext();

const {ethereum}=window;


//fetch contract
const getEthContract=()=>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer=provider.getSigner();
    const transactionContract=new ethers.Contract(contractAddress,contractABI,signer);
    console.log(transactionContract);
    return transactionContract;
}

export const TransactionProvider=({children})=>{


    const [currentAcc,setCurrentAcc]=useState('');
    const[formData,setFormData]=useState({addressTo:'',amount:"",keyword:"",message:""})
    const[loading,setLoading]=useState(false);
    const [count,setCount]=useState(localStorage.getItem('count'));
    const [transactions,setTransactions]=useState([]);



    const handleChange=(e,name)=>{
        setFormData((prevState)=>({...prevState,[name]:e.target.value}))
    }

    const getAllTransactions=async()=>{
        try {
            if(!ethereum) return alert ("Install MetaMask");
            const transactionContract=getEthContract();
            const availableTransactions=await transactionContract.getAllTransactions();
            const formattedTransactions=await availableTransactions.map((transaction)=>({
                addressTo: transaction.receiver,
                addressFrom:transaction.sender,
                timestamp:new Date(transaction.time.toNumber()*1000).toLocaleString(),
                message:transaction.message,
                keyword:transaction.keyword,
                amount:parseInt(transaction.amount._hex)/(10**18)
            }))
            
            setTransactions(formattedTransactions);
        } catch (error) {
            console.log(error);
        }
        
    }
    

    const checkIfWalletIsConnected =async()=>{
        try {
            if(!ethereum) return alert ("Install MetaMask");
            const accounts=await ethereum.request({method:'eth_accounts'});
            if(accounts.length)
            {
                setCurrentAcc(accounts[0]);
                getAllTransactions();
            }
            else console.log("No accounts found");
                
        } catch (error) {
            console.log(error);
            throw new Error("No Eth Obj Found");
        }
        

    }
    

    const checkIfTransactionsExist=async()=>{
        try {
            const transactionContract=getEthContract();
            const count=await transactionContract.getCount();
            window.localStorage.setItem("count",count);
        } catch (error) {
            
        }
    }
    
    const connectWallet=async()=>{
        try {
            if(!ethereum) return alert ("Install MetaMask");
            const accounts=await ethereum.request({method:'eth_requestAccounts'});
            setCurrentAcc(accounts[0]);
            
                
        } catch (error) {
            console.log(error);
            throw new Error("No Eth Obj Found");
        }
    }

    const disconnectWallet=()=>{
        setCurrentAcc('');
    }
    

    
    useEffect(()=>{
        
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    },[]);



    const sendTransaction=async()=>{
        try {
            if(!ethereum) return alert ("Install MetaMask");
            const {addressTo,amount,keyword,message}=formData;
            
            const transactionContract=getEthContract();
            const parsedAmt=ethers.utils.parseEther(amount);
            console.log(parsedAmt._hex);
            await ethereum.request({
                method:'eth_sendTransaction',
                params:[{
                    from:currentAcc,
                    to:addressTo,
                    gas:'0x5208',
                    value:parsedAmt._hex,
                }]
            });
            const transactionHash=await transactionContract.addtoChain(addressTo,parsedAmt,message,keyword);
            setLoading(true);
            console.log("Loading ",transactionHash);
            await transactionHash.wait();
            setLoading(false);
            console.log("Success ",transactionHash);
            alert("Transaction is a success");
            const count=await transactionContract.getCount();
            setCount(count.toNumber());
            console.log(count);

        } catch (error) {
            console.log(error);
            alert("Transaction has failed!");
        }
    }



return(
    <TransactionContext.Provider value={{connectWallet,currentAcc,disconnectWallet,formData,sendTransaction,handleChange,loading,transactions}}>
        {children}
    </TransactionContext.Provider>)
}