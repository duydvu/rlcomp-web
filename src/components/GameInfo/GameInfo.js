import React from 'react';
import './GameInfo.css';

function GameInfo(props) {
    const {
        player,
        status,
     } = props;

    if (player) {
        return (
            <div className='game-info'>
                <div>Energy: {player['energy']}</div>
                <div>Score: {player['score']}</div>
                <div>Status: {status}</div>
            </div>
        );
    }
    return null;
}

export default GameInfo;
