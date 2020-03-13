import React, { useEffect, useState } from 'react';
import oboe from 'oboe';
import moment from 'moment';
import isoCodes from './isoCodes.json';
import './App.css';
import Table from './Table';

moment.locale('FI');
const headers = (showInfectionInfo) => [
    {
        name: 'Potilasnumero',
        selector: 'id',
        sortable: true,
    }, {
        name: 'Päivämäärä',
        selector: 'formattedDate',
        sortable: true,
    }, {
        name: 'Sairaanhoitoalue',
        selector: 'healthCareDistrict',
        sortable: true,
    },
    ...showInfectionInfo ? [
        {
            name: 'Tartuntapaikka',
            selector: 'location',
            sortable: true,
        }, {
            name: 'Tartuttaja',
            selector: 'source',
            sortable: true,
        },
    ] : []
];

function App() {
    const [state, setState] = useState({
        loaded: false,
        confirmed: [],
        deaths: [],
        recovered: []
    });

    useEffect(() => {
        const doFetch = async () => {
            oboe('https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData')
                .done(function (cases) {
                    setState({ loaded: true, ...cases });
                })
                .fail(function () {
                    console.error('Couldn\'t get data :(');
                });
        };
        doFetch();
    }, []);


    function getSource(it) {
        if (it.infectionSource === 'related to earlier') {
            return 'Liittyy aiempaan tapaukseen';
        }
        return it.infectionSource !== 'unknown'
            ? `Potilas ${it.infectionSource}`
            : 'Tuntematon';
    }

    const format = it => ({
        formattedDate: moment(it.date).format('YYYY-MM-DD HH:mm:ss'),
        location: it.infectionSourceCountry != null ? isoCodes[it.infectionSourceCountry] : 'Tuntematon',
        source: getSource(it),
        ...it,
    });
    return (
        <div className="App">
            {state.loaded ? (
                    <div>
                        <Table
                            title={'Varmistetut'}
                            data={state.confirmed.map(format)}
                            columns={headers(true)}/>
                        <Table
                            title={'Kuolleet'}
                            data={state.deaths.map(format)} columns={headers(false)}/>
                        <Table
                            title={'Parantuneet'}
                            data={state.recovered.map(format)} columns={headers(false)}/>
                    </div>)
                : 'Haetaan Tietoja'}
        </div>
    );
}

export default App;
