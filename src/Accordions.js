import * as React from 'react';
import './Accordion.css';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import mergeWith from 'lodash/mergeWith';
import moment from 'moment';

class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }

    componentDidMount() {
        this._handleClick();
    }

    _handleClick() {
        const acc = this._acc.children;
        for (let i = 0; i < acc.length; i++) {
            let a = acc[i];
            a.onclick = () => a.classList.toggle("active");
        }
    }

    render() {
        return (
            <div
                ref={a => this._acc = a}
                onClick={this._handleClick}>
                {this.props.children}
            </div>
        )
    }
}

const formattedDate = (it) => moment(it.date).format('YYYY-MM-DD');
class Accordions extends React.Component {
    render() {
        const confirmed = groupBy(this.props.confirmed, it => it.healthCareDistrict);
        const orderedbyDateData = orderBy(this.props.confirmed, it => moment(it.date).format('YYYYMMDD'), ['asc']);
        const dateArr = groupBy(orderedbyDateData, it => formattedDate(it));
        return (
            <div>
                <Accordion>
                    <div className="accor">
                        <div className="head">Sairaanhoitopiireittain</div>
                        <div className="body">
                            {Object.entries(confirmed).map(([district, arr]) => (
                                <div key={district} style={{ margin: 5 }}>
                                    <span style={{ fontWeight: 'bold' }}>{district}</span>
                                    <div>Tartunnat: {JSON.stringify(arr.length)}</div>
                                </div>))
                            }
                        </div>
                    </div>
                    <div className="accor">
                        <div className="head">Päivittäin</div>
                        <div className="body">
                            {Object.entries(dateArr).map(([date, arr]) => (
                                <div key={date + arr.length} style={{ margin: 5 }}>
                                    <span style={{ fontWeight: 'bold' }}>{date}</span>
                                    <div>Tartunnat: {JSON.stringify(arr.length)}</div>
                                </div>))
                            }
                        </div>
                    </div>
                </Accordion>
            </div>
        );
    }
}

export default Accordions;