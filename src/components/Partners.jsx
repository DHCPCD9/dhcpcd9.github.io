import {useEffect, useState} from "react";


export default function Partners() {

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
        name: "Король рептилій",
        image: "https://media.discordapp.net/attachments/939944897681719307/966991391764910100/512x512.png",
        urls: {
            twitch: "https://twitch.tv/king_of_reptiels"
        }   
    },
        {
            name: "DHCPCD",
            image: "https://cdn.discordapp.com/avatars/420663223344168976/1b97b0686222c3dff1ab5107e293af5e.png?size=512",
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
    return (<div>
        <div style={{textAlign: "center", fontSize: "28px", color: "white",  fontFamily: "'Comfortaa', cursive" }}>Наші партнери</div>

        <div className={`grid grid-cols-${getSize()} gap-${getSize()} place-items-center mt-6`}>
            {partners.map(partner => <div className={"max-w-sm rounded overflow-hidden shadow-lg"}>
                <img className="w-full rounded-t-xl" src={partner.image} alt="Avatar" width={512} height={512} />
                <div className="px-6 py4">
                    <div className="font-bold text-xl mb-2 text-white text-center ">
                        {partner.name}
                    </div>
                </div>
                <div className={"grid grid-cols-1"}>
                    {Object.entries(partner.urls).map(c =>
                        <button style={{width: "auto", height: "50px", color: buttonColors[c.at(0)].text, backgroundColor: buttonColors[c.at(0)].bg, fontSize: "24px", border: "0px transparent", borderRadius: '16px'}} className={"m-2"} onClick={() => window.open(c.at(1))}>{buttonColors[c.at(0)].label}</button>
                    )}
                </div>
            </div>)}
        </div>
    </div>)
}