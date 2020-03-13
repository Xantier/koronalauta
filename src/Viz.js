import React from 'react';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries } from 'react-vis';
import '../node_modules/react-vis/dist/style.css';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import {isMobile} from 'react-device-detect';

const formattedDate = (it) => moment(it.date).format('MM/DD/YYYY'); // Murica
const mmdd = (it) => moment(it).format('DD-MM'); // Murica

const Chart = ({ data }) => {
    const orderedData = orderBy(data, it => moment(it.date).format('YYYYMMDD'), ['asc']);
    const dataArr = Object.entries(
        groupBy(orderedData, it => formattedDate(it)))
        .reduce((acc, [date, data]) => {
            acc.push({
                x: new Date(date),
                y: acc.length > 0 ? acc[acc.length - 1].y + data.length : 1
            });
            return acc;
        }, []);



    console.log(dataArr)
    return (
        <XYPlot
            xType="time"
            width={isMobile ? 400 : 800}
            height={500}>
            <HorizontalGridLines/>

            <VerticalGridLines/>
            <XAxis title="Päivämäärä"
                   tickFormat={v => mmdd(v)}
                   tickLabelAngle={-45}
            />
            <YAxis title="Todetut tapaukset"/>
            <LineSeries color={'red'} data={dataArr}/>
        </XYPlot>

    );
};
export default Chart;