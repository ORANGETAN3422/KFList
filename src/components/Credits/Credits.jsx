import './credits.css';

function Credits() {
    return (
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
            <a href='https://github.com/ORANGETAN3422/KFList' target='_blank'><img src={`${import.meta.env.BASE_URL}github.png`} className='gh-img' /></a>
        </section>
    )
}

export default Credits;