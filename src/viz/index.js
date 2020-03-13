import React from 'react';
import '../../node_modules/react-vis/dist/style.css';

import Line from './Line';
import Pie from './Pie';
import Map from './Map';

const Chart = ({ data = [] }) => {
    return (
        <div>
            <div style={{ height: '50vh', marginBottom: 50 }}>
                <h1>Tartuntojen lukumäärä</h1>
                <Line data={data}/>
            </div>
            <div style={{ height: '50vh' }}>
                <h1>Tartuntapaikka</h1>
                <Pie data={data}/>
            </div>




        </div>
    );
};
export default Chart;
