import { useEffect, useState } from 'react';
import './list-item.css'

function ListItem(props) {
    const [extremeInfo, setExtremeInfo] = useState([]);

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
    }, [props.data !== "loading", props.data.Meta]);
    
    return (

        <li className='card card-outer'>
            {props.data === "loading" ? <b className='card-title load-text card-inner'>LOADING</b> : (
                <>
                    <img src={`https://raw.githubusercontent.com/cdc-sys/level-thumbnails/main/thumbs/${props.data.ID}.png`} className="card-image" />
                    <div className='fade-out-con'>
                        <img src={`https://raw.githubusercontent.com/cdc-sys/level-thumbnails/main/thumbs/${props.data.ID}.png`} className="fade-out-image" /> 
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
                            <img src={`https://raw.githubusercontent.com/cdc-sys/level-thumbnails/main/thumbs/${props.data.ID}.png`} className="inner-image" /> 
                        </div>
                    </div>
                </>
            )}
        </li>
    );
}

export default ListItem