import React from "react";
import {useState} from "react";
import Info from "./Modals/Info";


export default function () {

    const [show, setShow] = useState(false);

    return (<div>
        <hr className={"w-full"} style={{color: "white", height: "4px"}}/>

        <div className={"text-2xl text-white text-center"}>Чого ти чекаешь, швидкше приєднуйся до нас!</div>
        <div className="grid btns gap-2 place-content-center m-2" style={{marginTop: "15px", marginBottom: "5px", display: "flex", justifyContent: "center"}}>
            <button type="button" className="btn btn-danger btn-lg"  style={{width: "200px"}} onClick={() => setShow(true)}>Отримати доступ</button>
        </div>

        <div className={"text-gray-400  text-sm text-center mb-5"}>Сайт був написаний Єгором (DHCPCD) та Олегом (ItsOlegDm)</div>


        <Info show={show} onHide={() => setShow(false)} variant="dark" />
    </div>)

}