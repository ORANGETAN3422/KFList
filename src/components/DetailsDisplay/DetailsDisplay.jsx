import { useSelectedData } from '../../SelectedDataContext';
import './details-display.css';

function BigDisplay() {
    const { selectedData } = useSelectedData();
    let loadedImageThumb;

    function updateVariables(data) {
        loadedImageThumb = "";
        if (selectedData === null) return;
        loadedImageThumb = `https://tjcsucht.net/levelthumbs/${data[0].ID}.png`
    }

    function buttonClick() {
        const display = document.querySelector('.big-display');
        const list = document.querySelector('.list-bg');

        if (window.innerWidth <= 500) {
            display.style.display = 'none';
            list.style.display = 'initial';
        }
        else {
            display.style.display = 'grid';
            list.style.display = 'initial';
        }
    }

    return (
        <section className='big-display'>
            {updateVariables(selectedData)}
            <div className='image-con'>
                {window.innerWidth <= 500 ? (<button className='back-button' onClick={() => { buttonClick() }}> Back </button>) : ""}
                <img src={loadedImageThumb} className='main-image' />
                <div className='image-overlay'>
                    {selectedData
                        ? (<img src={`${import.meta.env.BASE_URL}demon-icons/demon-${selectedData[0].Meta.Difficulty.toLowerCase()}.png`}></img>)
                        : ""}
                </div>
                <div className='title-overlay'>
                    {selectedData
                        ? (<b> {selectedData[0].Meta.Name} by {selectedData[0].Meta.Creator} </b>)
                        : ""}
                </div>
                <div className='title-overlay-2'></div>
            </div>
            {selectedData ? (
                <div className='info-sec'>
                    <div>
                        <b className={(selectedData[1] <= 3 ? `bloom-deg${selectedData[1]}` : "") + " victor-title"}>
                            {`#${selectedData[1]}`} - {`${selectedData[0].Player}`}
                        </b>
                        <br /><br />
                        {selectedData[3] === "classic"
                            ? `Tier ${Math.round(selectedData[0].Rating)} on GDDL`
                            : `${Math.round(selectedData[0].Enjoyment * 10) / 10} on GDDL`}
                        <br />
                        {selectedData[3] === "classic"
                            ? ((selectedData[2] ? "#" + selectedData[2].position + " on AREDL" : selectedData[0].Meta.Difficulty + " Demon"))
                            : ("#" + selectedData[2].placement + " on pemonlist")}
                        <p className='description'>
                            <i>{selectedData[0].Meta.Description}</i>
                        </p>
                    </div>
                    <div className='right-div'>
                        <a href={`https://www.youtube.com/watch?v=${selectedData[0].Showcase}`} target='_blank'>
                            Level Showcase
                        </a>
                        <br />
                        <a href={`https://www.newgrounds.com/audio/listen/${selectedData[0].Meta.Song.ID}`} target='_blank'>
                            Level Song
                        </a>
                        {selectedData[0].Video ? (
                            <>
                                <br /> <br />
                                <a href={selectedData[0].Video} target='_blank'>
                                    Completion Video
                                </a>
                            </>
                        ) : ""}
                        <br /> <br />
                        ID: {selectedData[0].ID}
                        <br /> <br />
                        <p className='description'>Song: <br /> {selectedData[0].Meta.Song.Name} by {selectedData[0].Meta.Song.Author}</p>
                    </div>
                </div>
            ) : <></>}
        </section>
    );
}

export default BigDisplay