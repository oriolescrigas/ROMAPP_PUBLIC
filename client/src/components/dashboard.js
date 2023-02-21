import React from 'react';

import Orders from './orders';

const Dashboard = (props) => {
    return(

        <div className='container bg-light'>
            <div className='row'>
                <div className='col'>
                    <div class="px-4 py-5 my-5 text-center">
                        <h2>Actualiza la página para asegurarte que el contenido de las targetas es correcto</h2>
                    </div>
                </div>
            </div>

            <div className='row'>
                <Orders serverUrl={props.serverUrl}/>
            </div>
        </div>

        
    );
}
export default Dashboard;