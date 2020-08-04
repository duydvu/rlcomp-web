import React from 'react';
import './App.css';
import Row from './components/Row.js';
import MapCell from './components/MapCell';
import PlayerCell from './components/PlayerCell';
import GameInfo from './components/GameInfo';


const REMOTE_URL = 'http://192.168.11.11:5201';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: [],
            players: [],
            status: '',
        }

        this.next = this.next.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        this.reset();
    }

    next() {
        fetch(`${REMOTE_URL}/next`).then(res => {
            return res.json();
        }).then(data => {
            if (data.state) {
                this.setState({
                    map: data.state.map,
                    players: data.state.players,
                    status: data.status,
                });
            }
            else {
                this.setState({
                    status: data.status,
                });
            }
        });
    }

    reset() {
        fetch(`${REMOTE_URL}/reset`, {method: 'POST'}).then(res => {
            return res.json();
        }).then(data => {
            if (data.state) {
                this.setState({
                    map: data.state.map,
                    players: data.state.players,
                    status: data.status,
                });
            }
        });
    }

    render() {
        const {
            map: mapView,
            players,
            status,
        } = this.state;
        const mainPlayer = players.filter(pl => pl['id'] === 1)[0];
        return (
            <div>
                <div>
                    <input type='button' value='Next' onClick={this.next}/>
                    <input type='button' value='Reset' onClick={this.reset}/>
                </div>
                <div className='game-layer'>
                    <div className='map-layer'>
                        {
                            mapView.map((row, i) => (
                                <Row key={i}>
                                    {
                                        row.map((cellId, j) => (
                                            <MapCell cellId={cellId} key={j} />
                                        ))
                                    }
                                </Row>
                            ))
                        }
                    </div>
                    <div className='player-layer'>
                        {
                            mapView.map((row, x) => (
                                <Row key={x}>
                                    {
                                        row.map((cellId, y) => {
                                            let pls = players.filter(pl => pl['x'] === x & pl['y'] === y);
                                            return (
                                                <PlayerCell players={pls} key={y} />
                                            )
                                        })
                                    }
                                </Row>
                            ))
                        }
                    </div>
                </div>
                <GameInfo player={mainPlayer} status={status} />
            </div>
        );
    }
}

export default App;
