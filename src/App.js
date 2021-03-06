import React, { useEffect, useState } from 'react';
import oboe from 'oboe';
import moment from 'moment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import isoCodes from './isoCodes.json';
import './App.css';
import Table from './Table';
import Accordions from './Accordions';
import Viz from './viz';
import Map from './viz/Map';

moment.locale('FI');
const headers = (showInfectionInfo) => [
    {
        name: 'Potilasnumero',
        selector: 'id',
        sortable: true
    }, {
        name: 'Päivämäärä',
        selector: 'formattedDate',
        sortable: true,
        wrap: true,
    }, {
        name: 'Sairaanhoitoalue',
        selector: 'healthCareDistrict',
        sortable: true,
        wrap: true,
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

    const tableFormat = it => ({
        formattedDate: moment(it.date).format('YYYY-MM-DD HH:mm'),
        location: it.infectionSourceCountry != null ? isoCodes[it.infectionSourceCountry] : 'Tuntematon',
        source: getSource(it),
        ...it,
    });
    return (
        <div className="App">
            <header>
                <div>Tartunnat
                    <div className="numberCircle">{state.confirmed.length}</div>
                </div>
                <div>Parantuneet
                    <div className="numberCircle">{state.recovered.length}</div>
                </div>
                <div>Kuolleet
                    <div className="numberCircle">{state.deaths.length}</div>
                </div>
            </header>
            <Accordions {...state} />
            <Tabs>
                <TabList>
                    <Tab>Tartunnat</Tab>
                    <Tab>Kartta</Tab>
                    <Tab>Parantuneet</Tab>
                    {/*<Tab>Kuolleet</Tab>*/}
                    <Tab>Graafeja</Tab>
                </TabList>

                <TabPanel>
                    <Table
                        pending={!state.loaded}
                        title={'Tartunnat'}
                        data={state.confirmed.map(tableFormat)}
                        columns={headers(true)}/>
                </TabPanel>
                <TabPanel>
                    <Map data={state.confirmed}/>
                </TabPanel>
                <TabPanel>
                    <Table
                        pending={!state.loaded}
                        title={'Parantuneet'}
                        data={state.recovered.map(tableFormat)}
                        columns={headers(false)}/>
                </TabPanel>
{/*                <TabPanel>
                    <Table
                        pending={!state.loaded}
                        title={'Kuolleet'}
                        data={state.deaths.map(tableFormat)}
                        columns={headers(false)}/>
                </TabPanel>*/}
                <TabPanel>
                    <Viz data={state.confirmed}/>
                </TabPanel>
            </Tabs>


        </div>
    );
}

export default App;
