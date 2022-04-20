
import React, {useState} from "react";
import {Modal, Button, Accordion, ListGroup} from "react-bootstrap"

export default () => {

    const [show, setShow] = useState(false);
    const priceUah = 50;
    

    const redirect = (url) => window.location.href = url;
    return (<div style={{width: "100%", overflow: "hidden", backgroundColor: "#171717"}} className={"grid grid-cols-2 gap-2 place-content-center"}>
        <div className="w-full">
            <img src="https://www.freeiconspng.com/thumbs/cat-png/cat-png-17.png" alt="cat" />
        </div>
        <div className="w-full">
            <div className="title" style={{color: "white", fontSize: "64px", textAlign: "center", fontFamily: "'Comfortaa', cursive"}}>
                Перший сервер
            </div>
            <div className="info" style={{color: 'white', fontSize: "24px", fontFamily: "'Comfortaa', cursive"}}>
            Якась довга інформація. Якась довга інформація. Якась довга інформація. Якась довга інформація. Якась довга інформація. Якась довга інформація. Якась довга інформація. Якась довга інформація. 
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
                                <ListGroup.Item>Ви мій знайомий.</ListGroup.Item>
                            </ListGroup>

                            Якщо же ви підходите по критеріям - <a style={{textDecoration: "none"}} href="https://cm.dhcpcd.xyz"> заповніть цю форму</a>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Якщо ви хочете отримати доступ бесплатно.</Accordion.Header>
                        <Accordion.Body>
                            Якщо же ви не підходите по критеріям вище - ви завжди можете купити проходку.
                            Ціна на проходку на данний момент - {priceUah}UAH
                            Ви можете перейти на <a style={{textDecoration: "none"}} href="https://donate.dhcpcd.xyz">цю сторінку</a> і написати в коментарі Ваш нікнейм в грі та діскорд.<br />
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