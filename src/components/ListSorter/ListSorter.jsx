import ListItem from '../ListItem/ListItem.jsx';
import { useEffect, useState } from 'react';

function ListSorter() {
    const [records, setRecords] = useState(null);
    const [loadedLevels, setLoadedLevels] = useState([]);

    useEffect(() => {
        async function fetchRecords() {
            try {
                const response = await fetch('/KFRecords.json');
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
                    const levelInfo = await fetch(`/api/level/${record.ID}`).then(res => res.json());
                    levelInfo.Player = record.Player; // <-- correctly added here after resolution
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
            {loadedLevels.map((level, index) => ( <ListItem key={level.ID} data={level} rank={index + 1}/> ))}
        </ol>
    );
}

export default ListSorter;
