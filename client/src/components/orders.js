import React, { useState, useEffect } from 'react';

import LineItems from './lineitems';
import DeleteItems from './deleteitems';

function Orders(props) {
    const [orders, setOrders] = useState([]);

    function prepareArrayOfElements() {
        // Function dedicated to create a Card-Deck of 3 cards per row
        // Columns are responsive
        let elements = [];
        let arrayOfElements = [];
        let count = 0;
        for (const order of orders) {
            
            elements.push(
                <div className="col-12 col-md-4">
                    <div className="card mt-2">
                        <div class="text-center card-header"><h5>{order.orderid}</h5></div>
                        <div className="card-body">
                            <LineItems param={order.id} serverUrl={props.serverUrl}/>
                            <div class="col text-center">
                                <DeleteItems param={order.id} serverUrl={props.serverUrl}/>
                            </div>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Last updated 3 mins ago</small>
                        </div>
                    </div>
                </div>
            );

            count = count + 1;
            let partition = count % 3;
            if (partition === 0) {
                arrayOfElements.push(<div className="row mt-2">{elements}</div>);
                elements = [];
                count = 0;
            }
        }

        // Last iteration:
        arrayOfElements.push(<div className="row mt-2">{elements}</div>);
        return(arrayOfElements);
    }

    useEffect(() => {

        async function fetchData() {
            // Fetch call to retrieve the list of orders
            const res = await fetch(`${props.serverUrl}/api/orders`);
            const data = await res.json();
            setOrders(JSON.parse(JSON.stringify(data)).data);            

            // Another way to get the same result:
            /*res
            .json()
            .then(res => setOrders(JSON.parse(JSON.stringify(res)).data))
            .catch(err => console.log(err));*/
            
        };

        function startPolling() {
            //TODO: PENDING to correct the synchronous issue
            //var initOrders = orders.length;
            
            setInterval( () => {
                fetchData();
                
                // 
                /*if(initOrders<orders.length) {
                    initOrders = orders.length;
                    window.location.reload("http://localhost:3000/");
                }*/
                
            }, 5000);
        }

        fetchData();
        startPolling();
        
    }, []);

    const arrayOfElements = prepareArrayOfElements();

    return (    
        <div>
            {arrayOfElements}
        </div>

    );
}

export default Orders;