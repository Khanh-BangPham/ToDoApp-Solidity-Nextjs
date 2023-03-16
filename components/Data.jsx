import React, {useContext} from 'react'
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { RiSendPlaneFill, RiCloseFill } from "react-icons/ri";
import Style from "../styles/index.module.css"
const Data = ({allToDoList, allAddress, message, change}) => {
  
  return (
    <div className={Style.home_create_list}>
      {allToDoList.length === 0 ? (
        <div className={Style.noDate}> NO DATA </div>
      ) : (
        <div>
          {allToDoList.map((el, i) => (
          <div key={i + 1} className={Style.home_create_list_app}>
            <div className={Style.lock_list}>
              <AiFillLock className={Style.lock_color} />
              p{el[2]}
            </div>
            {el[3] === false ? (
              <RiCloseFill onClick={() => change()} className={Style.iconClose}/>
            ) : (
              <p className={Style.down}>Down</p>
            )}
          </div>
        ))}
        </div>
      )}
    </div>
  )
}

export default Data