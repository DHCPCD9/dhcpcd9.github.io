import {Accordion, ListGroup, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";


export default function (props) {
    const basePrice = 80;
    const [prices, setPrice] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const { t } = useTranslation();

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

    return (<Modal {...props}>
        <Modal.Header closeButton>
            <Modal.Title>{t("modal.info.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{t("modal.info.freeAccess")}</Accordion.Header>
                    <Accordion.Body>
                        {t("modal.info.freeAccess.text")}
                        <ListGroup>
                            <ListGroup.Item>{t("modal.info.freeAccess.text.cm")}</ListGroup.Item>
                            <ListGroup.Item>{t("modal.info.freeAccess.text.partner_points")}</ListGroup.Item>
                        </ListGroup>

                        {t("modal.info.freeAccess.text.ok")} <a style={{textDecoration: "none"}} target="_blank" rel="noreferrer" href="https://cm.dhcpcd.xyz"> {t("modal.info.freeAccess.text.ok.fill_form")}</a>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>{t("modal.info.paid.for.access")}</Accordion.Header>
                    <Accordion.Body>
                        {t("modal.info.paid.for.access.text")}
                        <br/><br/>
                        {t("modal.info.paid.price.list")}: {isLoading ? t("modal.info.paid.loading") : <div style={{display: "flex"}}> {prices.map((price, index) => <div key={index}>{price.price} <b>{price.currency}</b>{prices.length   !== index+1?<span class="sl">/</span>:<span/>}</div>)}</div>}
                        <div style={{fontSize: "12px", color: "rgb(147 147 147)"}}>{t("modal.info.paid.prices.approximate")}</div>
                        <br/>
                        <h5><b>{t("modal.info.paid.price.list.requirements")}</b></h5>
                        <ListGroup>
                            <ListGroup.Item>1. {t("modal.info.paid.price.list.join.to")}<a style={{textDecoration: "none"}} target="_blank" rel="noreferrer" href="https://discord.dhcpcd.xyz">{t("modal.info.paid.price.list.join.to.discord")}</a></ListGroup.Item>
                            <ListGroup.Item>2. {t("modal.info.paid.price.list.register")} (IP: <b>play.dhcpcd.xyz</b>)</ListGroup.Item>
                            <ListGroup.Item>3. {t("modal.info.paid.price.list.goto")} <a style={{textDecoration: "none"}} target="_blank" rel="noreferrer" href="https://donate.dhcpcd.xyz">{t("modal.info.paid.price.list.donate.page")}</a></ListGroup.Item>
                            <ListGroup.Item>4. {t("modal.info.paid.price.list.comment")}</ListGroup.Item>
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Modal.Body>
        {/* <Modal.Footer>
            </Modal.Footer> */}
    </Modal>);


}