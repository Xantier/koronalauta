import React from 'react';
import ImageMapper from "react-image-mapper";
import './mapstyles.css'
import groupBy from 'lodash/groupBy';

const areas = {
    name: "Sairaanhoitopiirit",
    areas: [
        {
            name: "Lappi",
            shape: "rect",
            coords: [100, 50, 400, 350],

        },
        {
            name: "Länsi-Pohja",
            shape: "rect",
            coords: [170, 350, 230, 420],

        },
        {
            name: "Pohjois-Pohjanmaa",
            shape: "rect",
            coords: [190, 420, 300, 620],

        },
        {
            name: "Kainuu",
            shape: "rect",
            coords: [310, 480, 450, 620],

        },
        {
            name: "Pohjois-Karjala",
            shape: "rect",
            coords: [360, 620, 500, 760],

        },
        {
            name: "Pohjois-Savo",
            shape: "rect",
            coords: [260, 620, 360, 760],

        },
        {
            name: "Keski-Suomi",
            shape: "rect",
            coords: [180, 620, 260, 780],

        },
        {
            name: "Keski-Pohjanmaa",
            shape: "rect",
            coords: [110, 610, 180, 680],

        },
        {
            name: "Vaasa",
            shape: "rect",
            coords: [0, 610, 60, 780],

        },
        {
            name: "Etelä-Pohjanmaa",
            shape: "rect",
            coords: [60, 680, 180, 780],
        },
        {
            name: "Satakunta",
            shape: "rect",
            coords: [20, 780, 80, 880],

        },
        {
            name: "Pirkanmaa",
            shape: "rect",
            coords: [80, 780, 210, 870],

        },
        {
            name: "Varsinais-Suomi",
            shape: "rect",
            coords: [10, 870, 100, 1000],

        },
        {
            name: "HUS",
            shape: "rect",
            coords: [100, 920, 280, 970],

        },
        {
            name: "Kanta-Häme",
            shape: "rect",
            coords: [100, 870, 190, 920],

        },
        {
            name: "Päijät-Häme",
            shape: "rect",
            coords: [200, 820, 260, 920],

        },
        {
            name: "Kymenlaakso",
            shape: "rect",
            coords: [260, 880, 330, 920],

        },
        {
            name: "Etelä-Karjala",
            shape: "rect",
            coords: [330, 835, 400, 920],

        },
        {
            name: "Etelä-Savo",
            shape: "rect",
            coords: [260, 760, 340, 860],

        },
        {
            name: "Itä-Savo",
            shape: "rect",
            coords: [340, 760, 440, 845],

        },
    ]
};

const URL = "/assets/fin_map_sairaanhoitopiirit.jpg";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hoveredArea: null, msg: null, moveMsg: null }
        this.clicked = this.clicked.bind(this);
        this.clickedOutside = this.clickedOutside.bind(this);
        this.enterArea = this.enterArea.bind(this);
        this.leaveArea = this.leaveArea.bind(this);
        this.getTipPosition = this.getTipPosition.bind(this);
    }

    clicked(area) {
        this.setState({
            hoveredArea: area,
        });
    }

    clickedOutside(evt) {
        this.setState({
            area: null,
        });
    }


    enterArea(area) {
        this.setState({
            hoveredArea: area,
        });
    }

    leaveArea(area) {
        this.setState({
            hoveredArea: null,
        });
    }

    getTipPosition(area) {
        return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
    }

    getHoverText(dataArr) {
        const amount = `${dataArr[this.state.hoveredArea.name] ? dataArr[this.state.hoveredArea.name].length : 0}`;
        let thing = amount == 1 ? 'tapaus' : `tapausta`;
        return <>
            {this.state.hoveredArea
                ? `${this.state.hoveredArea.name} - ${amount} ${thing}`
                : null}
        </>;
    }

    render() {
        const dataArr = groupBy(this.props.data, it => it.healthCareDistrict);
        return (
            <div className="grid">
                <div className="presenter">
                    <div style={{ position: "relative" }}>
                        <ImageMapper
                            src={URL}
                            map={areas}
                            width={500}
                            onClick={area => this.clicked(area)}
                            onMouseEnter={area => this.enterArea(area, dataArr)}
                            onMouseLeave={area => this.leaveArea(area)}
                            onImageClick={evt => this.clickedOutside(evt)}
                            active={false}
                        />
                        {this.state.hoveredArea && (
                            <span
                                className="tooltip"
                                style={{ ...this.getTipPosition(this.state.hoveredArea) }}
                            >
								{this.getHoverText(dataArr)}
							</span>
                        )}
                    </div>
                </div>
            </div>
        );
    }

};

export default App;