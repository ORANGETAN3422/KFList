import { useEffect } from 'react';
import { useSelectedData } from '../../SelectedDataContext';
import './list-item.css';

function PlatformerListItem({ data, rank }) {
    const { setSelectedData } = useSelectedData();
    const thumbnail = `https://tjcsucht.net/levelthumbs/${data.ID}.png`;

    useEffect(() => {
        if (rank === 1) {
            setSelectedData([data, rank, data.PlatformerInfo ?? null, "platformer"]);
        }
    }, [rank, data, setSelectedData]);

    const handleClick = () => {
        setSelectedData([data, rank, data.PlatformerInfo ?? null, "platformer"]);
        const display = document.querySelector('.big-display');
        const list = document.querySelector('.list-bg');
        const isMobile = window.innerWidth <= 500;

        display.style.display = 'grid';
        list.style.display = isMobile ? 'none' : 'initial';
    };

    return (
        <li className="card card-outer">
            <button type="button" className="card-hitbox" onClick={handleClick} />
            <img src={thumbnail} className="card-image" alt="" />
            <div className="fade-out-con">
                <img src={thumbnail} alt="" />
            </div>
            <div className="card-inner">
                <div className="card-title-con">
                    <b className={`card-title ${rank <= 3 ? `bloom-deg${rank}` : ""}`}>
                        {rank}. {data.Player} - {data.Meta.Name}
                    </b>
                </div>
                <p className="detail-text">
                    {Math.round(data.Enjoyment * 10) / 10} enjoyment on GDDL
                    <br />
                    #{data.PlatformerInfo.placement} on pemonlist
                </p>
                <div className="thumbnail-con">
                    <img src={thumbnail} alt="" />
                </div>
            </div>
        </li>
    );
}

export default PlatformerListItem;
