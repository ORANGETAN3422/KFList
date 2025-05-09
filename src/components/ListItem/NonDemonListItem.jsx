import './list-item.css';

function NonDemonListItem(props) {
const thumbnail = `https://raw.githubusercontent.com/cdc-sys/level-thumbnails/main/thumbs/${props.data.ID}.png`

    return (
        <li className='card card-outer'>
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
                                {props.data.Player} - {props.data.Name}
                            </b>
                        </div>
                        <p className='detail-text'>
                            <br />
                            Non-Demon level
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

export default NonDemonListItem