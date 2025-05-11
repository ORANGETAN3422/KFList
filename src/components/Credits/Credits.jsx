import './credits.css';
import ExpandedCredits from './ExpandedCredits.jsx';

function Credits() {
    function EnableOverlay() {
        const blackout = document.querySelector('.blackout');
        if (blackout) {
            blackout.style.display = 'flex';
        }
    }

    return (
        <>
            <ExpandedCredits />
            <section className='credits-section'>
                <b className='title'>Karma Farm Completion List</b>
                <br />
                <p className='description'>a collection of the hardest levels completed by the Geometry Dash Karma Farm Team </p>
                <br /><br />
                <div className='text-con'>
                    <span>Website developed by <b>ORANGETAN</b> </span> <hr /> <br />
                    <span>Original list organised by <b>Henabidus</b></span> <hr /> <br />
                    <span>Karma Farm hosted by <b>Crackermanuel</b></span> <hr />
                </div>
                <div className='more-credits'>
                    <img src={`${import.meta.env.BASE_URL}more-icon.png`} className='more-img' onClick={() => EnableOverlay()}/>
                    <a href='https://github.com/ORANGETAN3422/KFList' target='_blank'><img src={`${import.meta.env.BASE_URL}github.png`} className='gh-img' /></a>
                </div>
            </section>
        </>
    )
}

export default Credits;