import React from 'react';
import './GameInfo.css';

function GameInfo(props) {
    const {
        player,
        status,
        action,
    } = props;

    const actionArray = ['left', 'right', 'up', 'down', 'rest', 'mine'];

    if (player) {
        return (
            <div className='game-info'>
                <div>Energy: {player['energy']}</div>
                <div>Score: {player['score']}</div>
                <div>Status: {status}</div>
                <div>Last action: {actionArray[action]}</div>
            </div>
        );
    }
    return null;
}

export default GameInfo;
