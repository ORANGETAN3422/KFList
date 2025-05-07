import { useEffect, useState } from 'react';
import { useSelectedData } from '../../SelectedDataContext';
import './big-display.css';

function BigDisplay() {
    const { selectedData } = useSelectedData();
    let loadedImageThumb;

    function updateVariables(data) {
        if (selectedData === null) return;
        loadedImageThumb = `https://raw.githubusercontent.com/cdc-sys/level-thumbnails/main/thumbs/${data[0].ID}.png`
    }

    return (
        <section>
            {updateVariables(selectedData)}
            <img src={loadedImageThumb} className='main-image' />
            {selectedData ? (
                <div className='info-sec'>
                    <div>
                        <b className={(selectedData[1] <= 3 ? `bloom-deg${selectedData[1]}` : "") + " victor-title"}>
                            {`#${selectedData[1]} - ${selectedData[0].Player}`}
                        </b>
                    </div>
                    <div>

                    </div>
                </div>
            ) : <></>}
        </section>
    );
}

export default BigDisplay