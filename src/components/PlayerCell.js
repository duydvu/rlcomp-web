import React from 'react';

import player from '../images/player.png';

function PlayerCell(props) {
    const players = props.players;

    return (
        <div className='map--row--cell'>
            {players.length > 0 ? <img src={player} /> : null}
            <div className='map--row--cell--id-label'>
                {
                    players.map(player => (
                        <span key={player['id']}>
                            {player['id']}
                        </span>
                    ))
                }
            </div>
        </div>
    );
}

export default PlayerCell;
