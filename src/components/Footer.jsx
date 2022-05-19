import React from "react";
import {useState} from "react";
import Info from "./Modals/Info";
import {useTranslation} from "react-i18next";


export default function Footer() {

    const [show, setShow] = useState(false);

    const { t } = useTranslation();

    return (<div>
        <hr className={"w-full"} style={{color: "white", height: "4px"}}/>

        <div className={"text-2xl text-white text-center"}>{t("footer.what.are.you.waiting")}</div>
        <div className="grid btns gap-2 place-content-center m-2" style={{marginTop: "15px", marginBottom: "5px", display: "flex", justifyContent: "center"}}>
            <button type="button" className="btn btn-danger btn-lg"  style={{width: "200px"}} onClick={() => setShow(true)}>{t("info.getAccess")}</button>
        </div>

        <div className={"text-gray-400  text-sm text-center mb-2"}>{t("footer.authors")}</div>
        <div className={"text-gray-400 text-sm text-center mb-5"}>{t("footer.affiliated")}<br />{t("footer.contact")}<a href={"mailto:lisekworld@gmail.com"} style={{textDecoration: "none", color: "white"}}>lisekworld@gmail.com</a> {t("footer.discord")}</div>


        <Info show={show} onHide={() => setShow(false)} variant="dark" />
    </div>)

}