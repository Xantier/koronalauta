import React, { useState } from 'react';
import '../../node_modules/react-vis/dist/style.css';

import uniqBy from 'lodash/uniqBy';
import Line from './Line';
import Pie from './Pie';
import LineCharts from './LineCharts';

const Chart = ({ data = [] }) => {
    const [district, setDistrict] = useState('HUS');
    const districts = uniqBy(data, 'healthCareDistrict').map(it => it.healthCareDistrict);
    return (
        <div>
            {districts.map(it => (
                <button key={it} onClick={() => setDistrict(it)}>{it}</button>
            ))}
            <div style={{ height: '50vh', marginBottom: 50 }}>
                <h1>Tartuntojen lukumäärä - {district}</h1>
                <LineCharts data={data} district={district}/>
            </div>
            <div style={{ height: '50vh', marginBottom: 50 }}>
                <h1>Tartuntojen lukumäärä - Koko maa</h1>
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
