
import React, {useState} from "react";
import Info from "./Modals/Info";
import { useTranslation } from "react-i18next";


export default function Information() {

    const [show, setShow] = useState(false);

    const { t } = useTranslation();
    
    

    const redirect = (url) => window.location.href = url;
    return (
    <div className={"infoc rounded overflow-hidden p-1"}>
            <img src="girl.png" className="girl" alt={"girl"} width={350} />
        <div className="align-middle" style={{maxWidth: "90%"}}>
                <div className="title" style={{color: "white", fontSize: "64px", textAlign: "center", fontFamily: "'Comfortaa', cursive"}}>
                    Lisek world
                </div>
                <div className="info" style={{color: 'white', fontSize: "24px", fontFamily: "'Comfortaa', cursive", textAlign: "center"}}>
                    {t("info.info")}
                </div>

                <div className="grid btns gap-2 place-content-center" style={{margin: "15px", display: "flex", justifyContent: "center"}}>
                    <button type="button" className="btn btn-primary btn-lg" style={{width: "200px"}} onClick={() => redirect("https://discord.dhcpcd.xyz")}>Discord</button>
                    <button type="button" className="btn btn-danger btn-lg"  style={{width: "200px"}} onClick={() => setShow(true)}>{t("info.getAccess")}</button>
                </div>

        </div>

        <Info show={show} onHide={() => setShow(false)} variant="dark" />
    </div>)
}