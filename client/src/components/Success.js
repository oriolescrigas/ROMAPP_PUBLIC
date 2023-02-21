import {useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';


const Success = (props) => {

    const [sessionData, setSessionData] = useState();

    const useQuery = () => new URLSearchParams(useLocation().search);
    const sessionId = useQuery().get("session_id");

    useEffect(() => {
        const fetchSessionData = async () => {
            const queryParams = new URLSearchParams({
                id: sessionId,
            });
            
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            function generateOrderId() {
                const MIN_NUM = 1;
                const MAX_NUM = 999;

                const MIN_LET = 65;
                const MAX_LET = 90;

                // Number side
                var num_side = getRandomInt(MIN_NUM, MAX_NUM);

                // Letter side
                var let_side = String.fromCharCode(getRandomInt(MIN_LET, MAX_LET));

                // Generate order id:
                var orderid = String(num_side)+String(let_side);

                return orderid;
            }

            /*
            const sessionData = await fetch('/get-checkout-session?' + queryParams).then(res => res.json());

            console.log("Session Data: ");
            console.log(sessionData);
            setSessionData(sessionData);
            */

            fetch(`${props.serverUrl}/get-checkout-session?` + queryParams)
                .then(response => response.json())
                .then(data => {
                    // Guardem la info de la sessio de STRIPE
                    setSessionData(data);

                    // Creem el contador per a crear el item-id
                    let count = 1;

                    // Generem el codi aleatori de la comanda
                    let apiResponse = true;
                    let orderid = generateOrderId();

                    // Comprobem si existeix ja aquest número aleatori i n'anem generant fins trobar-ne un d'unic
                    (async () => {
                        while(apiResponse.success) {
                            await fetch(`${props.serverUrl}/api/order/`+orderid)
                                .then(response => response.json())
                                .then(data => {
                                    apiResponse = data.success;
                                    console.log("ORder id: "+orderid)
                                    console.log("API response is: "+apiResponse);
                                });

                            orderid = generateOrderId();
                        }
                        console.log("New order ID: " + orderid);
                    })();

                    // Afegim la comanda a la BBDD de Orders:
                    console.log(sessionId);
                    let orderJson = {id: sessionId, orderid: orderid};
                    fetch(`${props.serverUrl}/api/order`, {
                        method: 'POST',
                        body: JSON.stringify(orderJson),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    /*.then(response => response.json())
                    .then(data => console.log(data))*/
                    .catch(error => console.error(error))
                    

                    // Recorrem tots els lineitems de la sessio
                    console.log(data);
                    data.line_items.data.forEach(item => {
                        // Auxiliary variables
                        let itemid = "item-"+count;
                        let amount = item.amount_total/100;
                        let unit_price = amount/item.quantity;

                        // Defining the JSON of each line item
                        let itemJson = {cs_id: sessionId, orderid: orderid, itemid: itemid, product: item.description, units: item.quantity, total_price: amount, unit_price: unit_price};

                        fetch(`${props.serverUrl}/api/lineitem`, {
                            method: 'POST',
                            body: JSON.stringify(itemJson),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(response => response.json())
                        //.then(data => console.log(data))
                        .catch(error => console.error(error))

                        count = count + 1;
                    })
                })
                .catch(error => console.error(error))
        
        };

        fetchSessionData();
        
        
    }, [sessionId]);

    return (
        <div className="container bg-light">
            <h2 className='success-msg'>Tu pedido estará listo enseguida!</h2>
            {sessionData && (<a href={sessionData.url} target="_blank" rel="noreferrer">
                <button class="btn btn-dark">View Receipt</button>
            </a>)}
        </div>
    );
}

export default Success;