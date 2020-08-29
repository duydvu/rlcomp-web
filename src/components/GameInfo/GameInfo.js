import React from 'react';
import './GameInfo.css';

function GameInfo(props) {
    const {
        player,
        status,
        action,
        mapId,
        initX,
        initY,
        step,
        handleMapIdChange,
        handleInitXChange,
        handleInitYChange,
    } = props;

    const actionArray = ['left', 'right', 'up', 'down', 'rest', 'mine'];

    if (player) {
        return (
            <div className='game-info'>
                <div>Energy: {player['energy']}</div>
                <div>Score: {player['score']}</div>
                <div>Status: {status}</div>
                <div>Last action: {actionArray[action]}</div>
                <div>Step: {step}</div>
                <div>
                    <div>
                        <label>
                            Map ID:
                            <input type="text" value={mapId} onChange={handleMapIdChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Init X:
                            <input type="text" value={initX} onChange={handleInitXChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Init Y:
                            <input type="text" value={initY} onChange={handleInitYChange} />
                        </label>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default GameInfo;
