import Papa from "papaparse";

import ListItem from "../ListItem/ListItem.jsx";
import NonDemonListItem from "../ListItem/NonDemonListItem.jsx";

import { useEffect, useState } from "react";

function MainListSorter() {
    const [records, setRecords] = useState(null);
    const [loadedLevels, setLoadedLevels] = useState([]);

    useEffect(() => {
        async function fetchRecords() {
            try {
                const response = await fetch(
                    `https://docs.google.com/spreadsheets/d/e/2PACX-1vSeXsd3uNqAlI-pBTA7dWakdSOChU5GK9asBv3EiiUjw_1QFcp45nI1jXSG5pCA7HwWz0KrRD5hVQl7/pub?gid=0&single=true&output=csv`
                );
                const csvText = await response.text();
                const parsed = Papa.parse(csvText, { header: true });

                const demonRecords = parsed.data
                    .filter(row => row.Type === "Demon" && row.ID)
                    .map(row => ({
                        ID: row.ID.trim(),
                        Player: row.Player.trim(),
                        Video: row.Video ? row.Video.trim() : ""
                    }));

                const nonDemonRecords = parsed.data
                    .filter(row => row.Type === "NonDemon" && row.ID)
                    .map(row => ({
                        ID: row.ID.trim(),
                        Name: row.Name.trim(),
                        Player: row.Player.trim(),
                        Video: row.Video ? row.Video.trim() : ""
                    }));

                setRecords({
                    Records: demonRecords,
                    NonDemonRecords: nonDemonRecords
                });
            } catch (error) {
                console.error("Fetch error:", error);
            }
        }

        fetchRecords();
    }, []);

    useEffect(() => {
        if (!records) return;

        async function loadLevels() {
            try {
                const levelPromises = records.Records.map(async record => {
                    const levelInfo = await fetch(
                        `https://kf-list-orangetan3422s-projects.vercel.app/api/level/${record.ID}`
                    ).then(res => res.json());

                    levelInfo.Player = record.Player;
                    levelInfo.Video = record.Video;

                    if (levelInfo.Meta?.Difficulty === "Extreme") {
                        try {
                            const extremeData = await fetch(
                                `https://kf-list-orangetan3422s-projects.vercel.app/api/aredl/levels/${record.ID}`
                            ).then(res => res.json());
                            levelInfo.ExtremeInfo = extremeData;
                        } catch (error) {
                            console.error(
                                `Failed to fetch Extreme info for level ${record.ID}:`,
                                error
                            );
                        }
                    }

                    return levelInfo;
                });

                const levels = await Promise.all(levelPromises);

                levels.sort((a, b) => {
                    const aIsExtreme = a.Meta?.Difficulty === "Extreme";
                    const bIsExtreme = b.Meta?.Difficulty === "Extreme";

                    if (aIsExtreme && bIsExtreme) {
                        return a.ExtremeInfo?.position - b.ExtremeInfo?.position;
                    }
                    if (aIsExtreme && !bIsExtreme) return -1;
                    if (!aIsExtreme && bIsExtreme) return 1;
                    return b.Rating - a.Rating;
                });

                setLoadedLevels(levels);
            } catch (error) {
                console.error("Failed to fetch levels:", error);
            }
        }

        loadLevels();
    }, [records]);

    return (
        <ol className="main-list">
            {loadedLevels.length > 0 ? (
                loadedLevels.map((level, index) => (
                    <ListItem key={level.ID + index} data={level} rank={index + 1} />
                ))
            ) : (
                <ListItem key="loading" data="loading" rank="" />
            )}
            {loadedLevels.length > 0 &&
                records &&
                records.NonDemonRecords.length > 0 &&
                records.NonDemonRecords.map((level, index) => (
                    <NonDemonListItem
                        key={index}
                        data={level}
                        rank={loadedLevels.length + index + 1}
                    />
                ))}
                <li style={{height: '20px'}}></li>
        </ol>
    );
}

export default MainListSorter;
