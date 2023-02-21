import React, { useState, useEffect } from 'react';

function LineItems(props) {
    const [data, setData] = useState([]);
    const [item, setItem] = useState(props.param);

    useEffect(() => {
        
        async function fetchData() {
            const res = await fetch(`${props.serverUrl}/api/lineitem/`+item);
            
            res
            .json()
            .then(res => setData(JSON.parse(JSON.stringify(res)).data.Items))
            .catch(err => console.log(err));
        }
        fetchData();
    }, [item]);

    return (
        data.map(product => (
            <p class="card-text">{product.units} x {product.product}</p>
        ))

    );
}

export default LineItems;