import { useEffect, useState } from 'react';
import './list-item.css'

function ListItem(props) {

    return (
        <li className='card card-outer'>
            <img src={`https://raw.githubusercontent.com/cdc-sys/level-thumbnails/main/thumbs/${props.data.ID}.png`} className="card-image" />
            <div className='card-inner'>
                <b className={`card-title ${props.rank <= 3 ? "bloom-deg" + props.rank : "" }`}>
                    <>{props.rank}. </>
                    {props.data.Player} - {props.data.Meta.Name}
                </b> 
                <br />
                Tier {Math.floor(props.data.Rating)} on GDDL
            </div>
        </li>
    );
}

export default ListItem