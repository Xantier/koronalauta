import React from 'react';
import { HorizontalGridLines, LineSeries, makeVisFlexible, VerticalGridLines, XAxis, XYPlot, YAxis } from 'react-vis';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';


const formattedDate = (it) => moment(it.date).format('MM/DD/YYYY'); // Murica
const mmdd = (it) => moment(it).format('DD-MM');

const FlexXYPlot = makeVisFlexible(XYPlot);

const Line = ({ data, district }) => {

    const orderByDate = orderBy(data, it => moment(it.date).format('YYYYMMDD'), ['asc']);
    const groupedByDistrict = groupBy(orderByDate, it => it.healthCareDistrict);

    function toLineSeriesFormat(values) {
        return Object.entries(groupBy(values, it => formattedDate(it)))
            .reduce((acc, [date, data]) => {
                acc.push({
                    x: new Date(date),
                    y: acc.length > 0 ? acc[acc.length - 1].y + data.length : 1
                });
                return acc;
            }, []);
    }

    const districtLineData = Object.entries(groupedByDistrict)
        .reduce((acc, [district, values]) => ({
            [district]: toLineSeriesFormat(values),
            ...acc
        }), {});
    return (
        <FlexXYPlot
                    margin={{ bottom: 50 }}
                    xType="time">
            <HorizontalGridLines/>
            <VerticalGridLines/>
            <XAxis title="Päivämäärä"
                   tickFormat={v => mmdd(v)}
                   tickLabelAngle={-45}
            />
            <YAxis title={`Todetut tapaukset - ${district}`}/>
            <LineSeries color={'red'} data={districtLineData[district]}/>
        </FlexXYPlot>
    );
};
export default Line;