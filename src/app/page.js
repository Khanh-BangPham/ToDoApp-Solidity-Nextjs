"use client";
import React, { useState, useEffect, useContext } from "react";
import { ToDoListContext } from "../../context/ToDoListapp";
import { MdVerified } from "react-icons/md";
import { RiSendPlaneFill, RiCloseFill } from "react-icons/ri";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import Image from "next/image";
import Style from "../../styles/index.module.css";
import Loading from "../../loading.gif";
import Data from "../../components/Data";
const Home = () => {
  const [mess, setMess] = useState('');
  const {
    checkIfWalletIsConnect, 
    connectWallet, 
    toDoList, 
    change,
    currentAccount,
    error,
    allToDoList,
    message,
    allAddress
  } = useContext(ToDoListContext);
  useEffect(() => {
    checkIfWalletIsConnect();
    toDoList();
  }, []); 
  return (
    <div className={Style.home}>
      <div className={Style.navBar}>
        <Image src={Loading} alt="Logo" width={50} height={50}/>
        <div className={Style.connect}>
          {!currentAccount ? (
            <button onClick={() => connectWallet()}>Connect Wallet</button>
          ) : (
            <button>{currentAccount.slice(0,20)}...</button>
          )}
        </div>
      </div>
      <div className={Style.home_box}>
        <div className={Style.home_completed}>
          <h2>ToDo History List</h2>
          <div>
            {message.map((el, i) => (
              <div className={Style.home_completed_list}>
                <MdVerified className={Style.iconColor} />
                <p>{el.slice(0, 30)}..</p>
              </div>
            ))}
          </div>
        </div>

        <div className={Style.home_create}>
          <div className={Style.home_create_box}>
            <h2>Create Blockchain ToDoList</h2>
            <div className={Style.home_create_input}>
              <input type="Text" placeholder="Ether your todo" onChange={(e) => setMess(e.target.value)}/>

              {currentAccount ? (
                <RiSendPlaneFill className={Style.icon_black} onClick={() => toDoList(mess)} />
              ) : (
                <RiSendPlaneFill className={Style.icon_black} onClick={() => connectWallet()} />
              )}
            </div>
            <Data 
              allToDoList={allToDoList}
              allAddress={allAddress}
              message={message}
              change={change}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
  
export default Home;