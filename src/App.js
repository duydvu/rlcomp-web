import React from 'react';
import './App.css';
import Row from './components/Row.js';
import MapCell from './components/MapCell';
import PlayerCell from './components/PlayerCell';
import GameInfo from './components/GameInfo';


const REMOTE_URL = 'http://118.69.144.206:5201';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: [],
            players: [],
            status: null,
            action: null,
            mapId: '1',
            initX: '0',
            initY: '0',
            step: 0,
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
                    action: data.action,
                    step: data.step,
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
        fetch(`${REMOTE_URL}/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                map_id: this.state.mapId,
                init_x: this.state.initX,
                init_y: this.state.initY,
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data.state) {
                this.setState({
                    map: data.state.map,
                    players: data.state.players,
                    status: data.status,
                    action: null,
                    step: 0,
                });
            }
        });
    }

    handleChange(event, name) {
        this.setState({
            [name]: event.target.value
        })
    }

    render() {
        const {
            map: mapView,
            players,
            status,
            action,
            mapId,
            initX,
            initY,
            step,
        } = this.state;
        const mainPlayer = players.filter(pl => pl['id'] === 1)[0];
        return (
            <div>
                <div className='controller'>
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
                <GameInfo
                    player={mainPlayer}
                    status={status}
                    action={action}
                    mapId={mapId}
                    initX={initX}
                    initY={initY}
                    step={step}
                    handleMapIdChange={(e) => this.handleChange(e, 'mapId')}
                    handleInitXChange={(e) => this.handleChange(e, 'initX')}
                    handleInitYChange={(e) => this.handleChange(e, 'initY')}
                />
            </div>
        );
    }
}

export default App;
