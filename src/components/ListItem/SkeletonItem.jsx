import './list-item.css';

function SkeletonItem(props) {
    return (
        <li className='card card-outer'>
            <div className='card-inner skeleton-con'>
                <div className='card-title-con'>
                    <div className='skeleton-title' />
                    <div className='skeleton-desc' />
                </div>
                <div className='skeleton-tb-con'>
                </div>
            </div>
        </li>
    );
}

export default SkeletonItem