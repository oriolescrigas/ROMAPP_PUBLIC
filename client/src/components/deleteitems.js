import React, { useState, useEffect } from 'react';

function DeleteItems(props) {
    //In case we want a error-handler
    //const [data, setData] = useState(null);

    async function deleteData() {

        fetch(`${props.serverUrl}/api/lineitem/${props.param}`, {
            method: 'DELETE',
        });
        
        console.log("Deleting item: "+props.param);
        window.location.reload();
        /*In case we want a error-handler
        const response = await fetch('/api/lineitem/${props.param}', {
            method: 'DELETE',
        });
        
        const json = await response.json();
        setData(json);*/
    }

    return (
        <div>
            <button class="btn btn-dark" onClick={deleteData}>Pagado</button>
        </div>

        /* In case we want a error-handler
        <div>
            <button class="btn btn-dark" onClick={deleteData}>Pagado</button>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>*/
    );
}
export default DeleteItems;
