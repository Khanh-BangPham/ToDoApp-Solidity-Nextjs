"use client";
import React, { useEffect, useState } from 'react'
import Web3Model from 'web3modal';
import { ethers } from 'ethers';

import { toDoListAddress, toDoListABI } from "./constants";

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(toDoListAddress, toDoListABI, signerOrProvider);

export const ToDoListContext = React.createContext();

export const ToDoListProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState('');
    const [error, setError] = useState('');
    const [allToDoList, setAllToDoList] = useState([]);
    const [message, setMessage] = useState([]);
    const [allAddress, setAllAddress] = useState([]);

    // ---------- Connecting metamask
    const checkIfWalletIsConnect = async () => {
        if (!window.ethereum) return setError("please install metamask!");

        const account = await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (account.length) {
            setCurrentAccount(account[0]);
            console.log(account[0]);
        } else {
            setError("Please install metamask & connect, reload")
        }
    };
    // ---------- Connect wallet
    const connectWallet = async() => {
        if (!window.ethereum) return setError("please install metamask!");

        const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        setCurrentAccount(account[0]);
        console.log(1)
    }
    // ----------- Intracting with smart contract
    const toDoList = async (message) => {
        try {
            // Connecting with smart contract
            const web3model = new Web3Model();
            const connection = await web3model.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = await fetchContract(signer);

            const createList = await contract.createList(message); 
            createList.wait();
            console.log(createList)
            console.log(1)
        } catch (error) {
            
            setError("Something wrong crating list")
        }
    }

    const getToDoList = async() => {
        try {
            // Connecting with smart contract
            const web3model = new Web3Model();
            const connection = await web3model.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = await fetchContract(signer);     
            
            // Get data
            const getAllAddress = await contract.getAllAddress();
            setAllAddress(getAllAddress);

            console.log(getAllAddress)

            getAllAddress.map(async(el) => {
                const getSingleData = await contract.getCreatorData(el);
                allToDoList.push(getToDoList);
                console.log(getSingleData);
            })
            
            const allMessage = await contract.getMessage();
            setMessage(allMessage);
        } catch (error) {
            setError("Something wrong getting data");
        }
    }

    // Change state of todolist to false to true
    const change = async(address) => {
        try {
            // Connecting with smart contract
            const web3model = new Web3Model();
            const connection = await web3model.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = await fetchContract(signer);
            
            const state  = await contract.toggle(address);
            state.wait();
            console.log(state)
        } catch (error) {
            setError("Something wrong changing status");
        }
    }

    return (
        <ToDoListContext.Provider 
        value={{ 
            checkIfWalletIsConnect, 
            connectWallet, 
            toDoList, 
            change,
            currentAccount,
            error,
            allToDoList,
            message,
            allAddress
        }}>
            {children}
        </ToDoListContext.Provider>
    )
}

const ToDoListapp = () => {
    return (
        <div>ToDoListapp</div>
    )
}

export default ToDoListapp