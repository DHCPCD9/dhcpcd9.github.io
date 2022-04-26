
import React, {useEffect, useState} from "react";
import {Modal, Accordion, ListGroup} from "react-bootstrap"



export default function Information() {

    const [show, setShow] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const basePrice = 80;
    const [prices, setPrice] = useState([]);

    const codes = {
        840: "USD",
        978: "EUR",
        985: "PLN"
    };

    useEffect(() => {
       updatePrices().then(r => {});
    });

    const updatePrices = async () => {
        if (localStorage.getItem("currentCache")) {
            const cachedResponse = JSON.parse(localStorage.getItem("currentCache"));

            if ((Date.now() - cachedResponse.cachedAt) / 1024 > 1800) {
                localStorage.removeItem('currentCache');
                return updatePrices();
            }

            const prices = [{currency: "UAH", price: basePrice}];

            for(const code of Object.entries(codes)){
                const exchangeRate = cachedResponse.response.find(c => c.currencyCodeA === parseInt(code.at(0)) && c.currencyCodeB === 980);

                if (!exchangeRate)
                    continue;
                prices.push({
                    currency: code.at(1),
                    price: exchangeRate.rateBuy ? Math.round(basePrice / exchangeRate.rateBuy) : Math.round(basePrice / exchangeRate.rateCross)
                })
            }

            setPrice(prices);
            setLoading(false);
            return
        }
        const response = await fetch("https://api.monobank.ua/bank/currency");

        if (!response.ok) return;
        localStorage.setItem("currentCache", JSON.stringify({response: await response.json(), cachedAt: Date.now()}))
    }

    
    

    const redirect = (url) => window.location.href = url;
    return (
    <div className={"infoc rounded overflow-hidden p-1"}>
            <img src="girl.png" className="girl" alt={"girl"} width={350} />
        <div className="align-middle" style={{maxWidth: "90%"}}>
                <div className="title" style={{color: "white", fontSize: "64px", textAlign: "center", fontFamily: "'Comfortaa', cursive"}}>
                    Lisek world
                </div>
                <div className="info" style={{color: 'white', fontSize: "24px", fontFamily: "'Comfortaa', cursive", textAlign: "center"}}>
                    Перший український сервер зі своїми унікальними механіками.
                </div>

                <div className="grid btns gap-2 place-content-center" style={{margin: "15px", display: "flex", justifyContent: "center"}}>
                    <button type="button" className="btn btn-primary btn-lg" style={{width: "200px"}} onClick={() => redirect("https://discord.dhcpcd.xyz")}>Discord</button>
                    <button type="button" className="btn btn-danger btn-lg"  style={{width: "200px"}} onClick={() => setShow(true)}>Отримати доступ</button>
                </div>

        </div>

        <Modal show={show} onHide={() => setShow(false)} variant="dark">
            <Modal.Header closeButton>
                <Modal.Title>Як отримати доступ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Отримати доступ безкоштовно.</Accordion.Header>
                        <Accordion.Body>
                            Ви можете отримати безкоштовний доступ до серверу якщо:
                           <ListGroup>
                                <ListGroup.Item>Ви контент-мейкер (Tiktok/Youtube/Twitch)</ListGroup.Item>
                                <ListGroup.Item>Маєте бали канала партнера.</ListGroup.Item>
                                <ListGroup.Item>Маєте за віртуальні гривні на нашому Discord сервері.</ListGroup.Item>
                            </ListGroup> 

                            Якщо ви підходите по критеріям - <a style={{textDecoration: "none"}} target="_blank" rel="noreferrer" href="https://cm.dhcpcd.xyz"> заповніть анкету</a>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Отримати доступ платно.</Accordion.Header>
                        <Accordion.Body>
                            Якщо ви не підходите по критеріям вище - ви завжди можете купити прохід.
                            <br/><br/>
                            Ціна на даний момент: {isLoading ? `Зачекайте трохи` : <div style={{display: "flex"}}> {prices.map((price, index) => <div key={index}>{price.price} <b>{price.currency}</b>{prices.length   !== index+1?<span class="sl">/</span>:<span/>}</div>)}</div>}
                            <div style={{fontSize: "12px", color: "rgb(147 147 147)"}}>Ціни приблизні.</div>
                            <br/>
                            <h5><b>Для цього потрібно:</b></h5>
                            <ListGroup>
                                <ListGroup.Item>1. Зайти на <a style={{textDecoration: "none"}} target="_blank" rel="noreferrer" href="https://discord.dhcpcd.xyz">наш Discord сервер</a></ListGroup.Item>
                                <ListGroup.Item>2. Зареєструватись на Minecraft сервері (IP: <b>play.dhcpcd.xyz</b>)</ListGroup.Item>
                                <ListGroup.Item>3. Перейти  на <a style={{textDecoration: "none"}} target="_blank" rel="noreferrer" href="https://donate.dhcpcd.xyz">строінку оплати</a></ListGroup.Item>
                                <ListGroup.Item>4. В коментарі вказати свій нік у грі та діскорд</ListGroup.Item>
                            </ListGroup> 
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Modal.Body>
            {/* <Modal.Footer>
            </Modal.Footer> */}
        </Modal>
    </div>)
}