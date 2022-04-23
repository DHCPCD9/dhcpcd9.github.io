
import React, {useEffect, useRef, useState} from "react";
import {Modal, Button, Accordion, ListGroup} from "react-bootstrap"

export default () => {

    const [show, setShow] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const basePrice = 80;
    const [price, setPrice] = useState([]);

    const codes = {
        840: "USD",
        978: "EUR",
        985: "PLN"
    };

    useEffect(() => {
       updatePrices(); 
    }, []);

    const updatePrices = async () => {
        if (localStorage.getItem("currentCache")) {
            const cachedResponse = JSON.parse(localStorage.getItem("currentCache"));

            if ((Date.now() - cachedResponse.cachedAt) / 1024 > 1800) {
                localStorage.removeItem('currentCache');
                return updatePrices();
            }

            const prices = [{currency: "UAH", price: basePrice}];

            for(const code of Object.entries(codes)) {
                const exchangeRate = cachedResponse.response.find(c => c.currencyCodeA == code.at(0) && c.currencyCodeB == 980);

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
    return (<div style={{width: "100%", overflow: "hidden", backgroundColor: "#171717"}} className={"grid grid-cols-2 gap-2 place-content-center"}>
        <div className="w-full">
            <img src="https://www.freeiconspng.com/thumbs/cat-png/cat-png-17.png" alt="cat" />
        </div>
        <div className="w-full">
            <div className="title" style={{color: "white", fontSize: "64px", textAlign: "center", fontFamily: "'Comfortaa', cursive"}}>
                Перший сервер
            </div>
            <div className="info" style={{color: 'white', fontSize: "24px", fontFamily: "'Comfortaa', cursive", textAlign: "center"}}>
                Перший український сервер зі своїми унікальними механіками.
            </div>

            <div className="grid grid-cols-2 gap-2 place-content-center my-4">
                <button style={{width: "auto", height: "50px", color: "white", backgroundColor: "#5865F2", fontSize: "24px", border: "0px transparent", borderRadius: '16px'}} onClick={() => redirect("https://discord.dhcpcd.xyz")}>Discord</button>
                <button style={{width: "auto", height: "50px", color: "white", backgroundColor: "#ED4245", fontSize: "24px", border: "0px transparent", borderRadius: '16px'}} onClick={() => setShow(true)}>Отримати доступ</button>
            </div>
        </div>

        <Modal show={show} onHide={() => setShow(false)} variant="dark">
            <Modal.Header closeButton>
                <Modal.Title>Як отримати доступ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Якщо ви хочете отримати доступ бесплатно.</Accordion.Header>
                        <Accordion.Body>
                            Якщо ви хочете отримати доступ бесплатно, ви можете це зробити якщо:
                            <ListGroup>
                                <ListGroup.Item>Ви контент мейкер (Tiktok/Youtube/Twitch)</ListGroup.Item>
                                <ListGroup.Item>Отримати за бали канала партнера.</ListGroup.Item>
                                <ListGroup.Item>Ви мій знайомий.</ListGroup.Item>
                            </ListGroup>

                            Якщо же ви підходите по критеріям - <a style={{textDecoration: "none"}} href="https://cm.dhcpcd.xyz"> заповніть анкету</a>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Якщо ви хочете отримати доступ платно.</Accordion.Header>
                        <Accordion.Body>
                            Якщо же ви не підходите по критеріям вище - ви завжди можете купити проходку.
                            Ціна на проходку на данний момент: {isLoading ? `Зачекайте трохи` : <div style={{display: "flex"}}> {price.map((price, index) => <div key={index}>{price.price} <b>{price.currency}</b> / </div>)}</div>}
                            <div style={{fontSize: "12px"}}>Ціни приблизні</div>
                            Ви можете перейти на <a style={{textDecoration: "none"}} href="https://donate.dhcpcd.xyz">сюди</a> і написати в коментарі Ваш нікнейм в грі та діскорд.<br />
                            Перед цим зайдіть на діскорд-сервер будь-ласка.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    </div>)
}