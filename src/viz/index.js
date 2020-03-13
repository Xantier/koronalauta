import React from 'react';
import '../../node_modules/react-vis/dist/style.css';

import Line from './Line';
import Pie from './Pie';

const Chart = ({ data }) => {
    return (
        <div>
            <div style={{ height: '50vh' }}>
                <Line data={data}/>
            </div>
            <div style={{ height: '50vh' }}>
                <Pie data={data}/>
            </div>
        </div>
    );
};
export default Chart;