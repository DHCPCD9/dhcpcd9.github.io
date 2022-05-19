import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";




export default function Partners() {

    const { t } = useTranslation();

    const [, setMQuery] = useState({
        matches: window.innerWidth > 768,
    });
    useEffect(() => {
        let mediaQuery = window.matchMedia("(min-width: 768px)");
        mediaQuery.addListener(setMQuery);
        // this is the cleanup function to remove the listener
        return () => mediaQuery.removeListener(setMQuery);
    }, []);

    const buttonColors = {
        twitch: {
            bg: "purple",
            text: "white",
            label: "Twitch"
        },
        tiktok: {
            bg: "black",
            text: "white",
            label: "Tiktok"
        },
        youtube: {
            bg: "#ED4245",
            text: "white",
            label: "Youtube"
        }
    }
    
    const partners = [{
            name: "DHCPCD",
            image: "/images/partners/dhcpcd.png",
            urls: {
                twitch: "https://twitch.tv/dhcpcd"
            }
        }];



    const getSize = () => {
        if (window.innerWidth < 768)
            return 1;
        if (partners.length >= 4)
            return 4;
        return partners.length;
    }
    return (<div style={{marginTop: "32px", display: "block"}}>
        <div style={{textAlign: "center", fontSize: "28px", color: "white",  fontFamily: "'Comfortaa', cursive" }}>{t("partners.ourParners")}</div>

        <div className={`grid grid-cols-${getSize()} gap-${getSize()} place-items-center  partc mt-6`}>
            {partners.map(partner => <div className={"max-w-sm rounded shadow-lg overflow-hidden"}>
                <img className="w-full rounded-t-xl" src={partner.image} alt="Avatar" width={512} height={512} />
                <div className="px-6 py4">
                    <div className="font-bold text-xl mt-2 text-white text-center ">
                        {partner.name}
                    </div>
                </div>
                <div className={"grid grid-cols-1"}>
                    {Object.entries(partner.urls).map(c =>
                        <button type="button" className="btn btn-primary partc btn-lg"  style={{ color: buttonColors[c.at(0)].text, backgroundColor: buttonColors[c.at(0)].bg, borderColor: buttonColors[c.at(0)].bg, margin: "10px"}} onClick={() => window.open(c.at(1))}>{buttonColors[c.at(0)].label}</button>
                    )}
                </div>
            </div>)}
        </div>
    </div>)
}