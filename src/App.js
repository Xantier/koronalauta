import React, { useEffect, useState } from 'react';
import oboe from 'oboe';
import moment from 'moment';
import isoCodes from './isoCodes.json';
import logo from './logo.svg';
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
        confirmed: [],
        deaths: [],
        recovered: []
    });

    useEffect(() => {
        const doFetch = async () => {
            oboe('https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData')
                .done(function (cases) {
                    console.log(cases);
                    setState(cases);
                })
                .fail(function () {
                    console.error('Couldn\'t get data :(');
                });
        };
        doFetch();
    }, []);


    function getSource(it) {
        if(it.infectionSource === 'related to earlier'){
            return 'Liittyy aiempaan tapaukseen';
        }
        return it.infectionSource !== 'unknown'
            ? `Potilas ${it.infectionSource}`
            : 'Tuntematon';
    }

    const format = it => ({
        formattedDate: moment(it.date).format('YYYY-MM-DD HH:mm:ss'),
        location: it.infectionSourceCountry != null ? isoCodes[it.infectionSourceCountry]: 'Tuntematon',
        source: getSource(it),
        ...it,
    });
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
            <h1>
                Varmistetut
            </h1>
            <Table
                title={'Varmistetut'}
                data={state.confirmed.map(format)}
                columns={headers(true)}/>

            <h1>
                Kuolleet
            </h1>
            <Table
                title={'Kuolleet'}
                data={state.deaths.map(format)} columns={headers(false)}/>
            <h1>
                Parantuneet
            </h1>
            <Table
                title={'Parantuneet'}
                data={state.recovered.map(format)} columns={headers(false)}/>
        </div>
    );
}

export default App;