import { useEffect, useState } from 'react';
import { useSelectedData } from '../../SelectedDataContext';
import './list-item.css';

function ListItem(props) {
    const { setSelectedData } = useSelectedData();
    const thumbnail = `https://tjcsucht.net/levelthumbs/${props.data.ID}.png`

    useEffect(() => {
        if (props.rank === 1 && props.data !== "loading") {
            setSelectedData([props.data, props.rank, props.data.ExtremeInfo ? props.data.ExtremeInfo : null], "classic");
        }
    }, [props.rank, props.data, setSelectedData]);

    function buttonClick() {
        const display = document.querySelector('.big-display');
        const list = document.querySelector('.list-bg');

        setSelectedData([props.data, props.rank, props.data.ExtremeInfo ? props.data.ExtremeInfo : null], "classic");
        if (window.innerWidth <= 500) {
            display.style.display = 'grid';
            list.style.display = 'none';
        }
        else {
            list.style.display = 'initial';
            display.style.display = 'grid';
        }
    }

    return (

        <li className='card card-outer'>
            <input type='button' className='card-hitbox' onClick={() => { buttonClick() }} />
            {props.data === "loading" ? <b className='card-title load-text card-inner'>LOADING</b> : (
                <>
                    <img src={thumbnail} className="card-image" />
                    <div className='fade-out-con'>
                        <img src={thumbnail} />
                    </div>
                    <div className='card-inner'>
                        <div className='card-title-con'>
                            <b className={`card-title ${props.rank <= 3 ? "bloom-deg" + props.rank : ""}`}>
                                <>{props.rank}. </>
                                {props.data.Player} - {props.data.Meta.Name}
                            </b>
                        </div>
                        <p className='detail-text'>
                            <br />
                            Tier {Math.round(props.data.Rating)} on GDDL
                            <br />
                            {props.data.Meta.Difficulty === "Extreme" ? (`#${props.data.ExtremeInfo.position} on AREDL`) : `${props.data.Meta.Difficulty} Demon`}
                        </p>
                        <div className='thumbnail-con'>
                            <img src={thumbnail} />
                        </div>
                    </div>
                </>
            )}
        </li>
    );
}

export default ListItem