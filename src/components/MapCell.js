import React from 'react';

import ground from '../images/ground.png';
import gold from '../images/gold.png';
import forest from '../images/forest.png';
import trap from '../images/trap.png';
import swamp from '../images/swamp.png';

function MapCell(props) {
    const cellId = props.cellId;
    const cellImg =
        cellId > 0 ? gold :
            cellId === 0 ? ground :
                cellId === -1 ? forest :
                    cellId === -2 ? trap :
                        swamp;
    return (
        <div className='map--row--cell'>
            <img src={cellImg} />
        </div>
    );
}

export default MapCell;
