

export default () => {
    
    const partners = [{
        name: "Король рептилій",
        image: "https://static-cdn.jtvnw.net/jtv_user_pictures/4c1af5bb-3ca1-45b7-9a85-349c20d3b251-profile_image-300x300.png",
        urls: {
            twitch: "https://twitch.tv/king_of_reptiels"
        }   
    }];
    return (<div>
        <div style={{textAlign: "center", fontSize: "28px", color: "white",  fontFamily: "'Comfortaa', cursive" }}>Наші партнери</div>

        <div className="grid grid-cols-4 gap-4 place-content-center">
            {partners.map(partner => <div className={"max-w-sm rounded overflow-hidden shadow-lg"}>
                <img class="w-full" src={partner.image} alt="Avatar" />
                <div className="px-6 py4">
                    <div className="font-bold text-xl mb-2 text-white text-center ">
                        {partner.name}
                    </div>
                </div>
                <div className={"grid grid-cols-1"}>
                    <button style={{width: "auto", height: "50px", color: "white", backgroundColor: "purple", fontSize: "24px", border: "0px transparent", borderRadius: '16px'}}>Twitch</button>
                    <button style={{width: "auto", height: "50px", color: "white", backgroundColor: "purple", fontSize: "24px", border: "0px transparent", borderRadius: '16px'}} className={"m-2"}>Tiktok</button>
                </div>
            </div>)}
        </div>
    </div>)
}