import { useEffect, useState } from 'react';
import { useSelectedData } from '../../SelectedDataContext';
import './big-display.css';

function BigDisplay() {
    const { selectedData } = useSelectedData();
    let loadedImageThumb;

    function updateVariables(data) {
        loadedImageThumb = "";
        if (selectedData === null) return;
        loadedImageThumb = `https://raw.githubusercontent.com/cdc-sys/level-thumbnails/main/thumbs/${data[0].ID}.png`;
    }

    function buttonClick() {
        const display = document.querySelector('.big-display');
        const list = document.querySelector('.list-bg');

        display.style.display = 'none';
        list.style.display = 'initial';
    }

    return (
        <section className='big-display'>
            {updateVariables(selectedData)}
            <div className='image-con'>
                {window.innerWidth <= 500 ? (<button className='back-button' onClick={() => { buttonClick() }}> Back </button>) : ""}
                <img src={loadedImageThumb} className='main-image' />
                <div className='image-overlay'></div>
            </div>
            {selectedData ? (
                <div className='info-sec'>
                    <div>
                        <b className={(selectedData[1] <= 3 ? `bloom-deg${selectedData[1]}` : "") + " victor-title"}>
                            {`#${selectedData[1]} - ${selectedData[0].Player}`}
                        </b>
                        <br /><br />
                        Tier {Math.floor(selectedData[0].Rating)} on GDDL
                        <br />
                        #{selectedData[2] ? selectedData[2].position : "???"} on AREDL
                    </div>
                    <div className='right-div'>
                        <b className={(selectedData[1] <= 3 ? `bloom-deg${selectedData[1]}` : "") + " victor-title"}>
                            {selectedData[0].Meta.Name} by {selectedData[0].Meta.Creator}
                        </b>
                        <br /><br />
                        <a href={`https://www.youtube.com/watch?v=${selectedData[0].Showcase}`} target='_blank'>
                            Level Showcase
                        </a>
                    </div>
                </div>
            ) : <></>}
        </section>
    );
}

export default BigDisplay