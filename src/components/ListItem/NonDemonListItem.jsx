import './list-item.css';

function NonDemonListItem(props) {
    return (
        <li className='card card-outer'>
            {props.data === "loading" ? <b className='card-title load-text card-inner'>LOADING</b> : (
                <>
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
                    </div>
                </>
            )}
        </li>
    );
}

export default NonDemonListItem