import React from 'react';
import { makeVisFlexible, RadialChart } from 'react-vis';
import groupBy from 'lodash/groupBy';

import isoCodes from '../isoCodes.json';

const colors = [
    '#F66D44',
    '#FEAE65',
    '#E6F69D',
    '#AADEA7',
    '#64C2A6',
    '#2D87BB',
];

const FlexRadialChart = makeVisFlexible(RadialChart);

const Pie = ({ data }) => {
    const groupedBySourceCountry = Object.entries(groupBy(data, 'infectionSourceCountry'))
        .reduce((acc, [country, data], idx) => {
            acc.push({
                angle: data.length + 1,
                label: isoCodes[country] ? isoCodes[country] : 'Tuntematon',
                ...isoCodes[country] ? { color: colors[idx] } : { color: 'red' }
            });
            return acc;
        }, []);
    return (
        <FlexRadialChart

            colorType="literal"
            data={groupedBySourceCountry}
            showLabels={true}
        />
    );
};
export default Pie;