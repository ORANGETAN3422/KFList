import { useEffect, useState } from 'react';
import { useSelectedData } from '../../SelectedDataContext';
import './list-item.css';

function ListItem(props) {
    const [extremeInfo, setExtremeInfo] = useState([]);
    const { setSelectedData } = useSelectedData();
    const thumbnail = `https://raw.githubusercontent.com/cdc-sys/level-thumbnails/main/thumbs/${props.data.ID}.png`

    useEffect(() => {
        async function fetchExtremeInfo() {
            try {
                const response = await fetch(`https://api.aredl.net/api/aredl/levels/${props.data.ID}`);
                const data = await response.json();
                setExtremeInfo(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }

        fetchExtremeInfo();
    }, [props.data]);
    
    return (

        <li className='card card-outer'>
            <input type='button' className='card-hitbox' onClick={() => {setSelectedData([props.data, props.rank]);} } />
            {props.data === "loading" ? <b className='card-title load-text card-inner'>LOADING</b> : (
                <>
                    <img src={thumbnail} className="card-image" />
                    <div className='fade-out-con'>
                        <img src={thumbnail} /> 
                    </div>
                    <div className='card-inner'>
                        <b className={`card-title ${props.rank <= 3 ? "bloom-deg" + props.rank : ""}`}>
                            <>{props.rank}. </>
                            {props.data.Player} - {props.data.Meta.Name}
                        </b>
                        <br />
                        Tier {Math.floor(props.data.Rating)} on GDDL
                        <br />
                        {props.data.Meta.Difficulty === "Extreme" ? (`#${extremeInfo.position} on AREDL`) : console.log("naur")}
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