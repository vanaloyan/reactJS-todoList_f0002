import './Menu.css'

import {NavLink} from "react-router-dom";
import {useState} from "react";

const Menu = () =>{
    const [isOpenMenu,setIsOpenMenu] = useState(false)

    return(
        <div className="menu">
                <div className={isOpenMenu ? "openMenu" : "closeMenu"}>
                    <NavLink exact to="/" >Tasks</NavLink>
                    <NavLink exact to="/completed">Completed</NavLink>
                    <NavLink exact to="/trash-list">Trash</NavLink>
                </div>
                <button className="openBtn" onClick={()=>setIsOpenMenu(prev=>!prev)}>|</button>
        </div>
    )
}
export default Menu