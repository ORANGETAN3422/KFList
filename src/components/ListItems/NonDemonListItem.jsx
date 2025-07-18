import './list-item.css';

function NonDemonListItem({ data, rank }) {
    const thumbnail = `https://tjcsucht.net/levelthumbs/${data.ID}.png`

    return (
        <li className='card card-outer'>
            <img src={thumbnail} className="card-image" />
            <div className='fade-out-con'>
                <img src={thumbnail} />
            </div>
            <div className='card-inner'>
                <div className='card-title-con'>
                    <b className={`card-title ${rank <= 3 ? "bloom-deg" + rank : ""}`}>
                        <>{rank}. </>
                        {data.Player} - {data.Name}
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
        </li>
    );
}

export default NonDemonListItem;