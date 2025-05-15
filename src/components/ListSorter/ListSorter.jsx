import ListItem from '../ListItem/ListItem.jsx';
import NonDemonListItem from '../ListItem/NonDemonListItem.jsx'
import { useEffect, useState } from 'react';

function ListSorter() {
    const [records, setRecords] = useState(null);
    const [loadedLevels, setLoadedLevels] = useState([]);

    useEffect(() => {
        async function fetchRecords() {
            try {
                const response = await fetch(`https://gist.githubusercontent.com/ORANGETAN3422/4c63c842e0e52e3ccb69aba71811675a/raw/KFRecords.json`);
                const data = await response.json();
                setRecords(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }

        fetchRecords();
    }, []);

    useEffect(() => {
        if (!records) return;

        async function loadLevels() {
            try {
                const levelPromises = records.Records.map(async (record) => {
                    const levelInfo = await fetch(`https://kf-list-orangetan3422s-projects.vercel.app/api/level/${record.ID}`).then(res => res.json());
                    levelInfo.Player = record.Player;
                    levelInfo.Video = record.Video ? record.Video : "";
                    return levelInfo;
                });

                function sortNames(a, b) {
                    return b.Rating - a.Rating
                }

                const levels = await Promise.all(levelPromises);
                levels.sort(sortNames)

                setLoadedLevels(levels);
            } catch (error) {
                console.error('Failed to fetch levels:', error);
            }
        }

        loadLevels();
    }, [records]);

    return (
        <ol className='main-list' >
            {loadedLevels.length > 0
                ? loadedLevels.map((level, index) => (<ListItem key={level.ID + index} data={level} rank={index + 1} />))
                : (<ListItem key="loading" data="loading" rank="" />)}
            {loadedLevels.length > 0 && records && records.NonDemonRecords.length > 0
                ? records.NonDemonRecords.map((level, index) => (<NonDemonListItem key={index} data={level} rank = {loadedLevels.length + index + 1} />))
                : ""
            }
        </ol>
    );
}

export default ListSorter;
