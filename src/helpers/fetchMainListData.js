import Papa from "papaparse";

export async function fetchMainListData() {
  const csvRes = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vSeXsd3uNqAlI-pBTA7dWakdSOChU5GK9asBv3EiiUjw_1QFcp45nI1jXSG5pCA7HwWz0KrRD5hVQl7/pub?gid=0&single=true&output=csv");
  const csvText = await csvRes.text();
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

  const levelPromises = demonRecords.map(async (record) => {
    const levelInfo = await fetch(`https://kf-list-orangetan3422s-projects.vercel.app/api/level/${record.ID}`)
      .then(res => res.json());
    levelInfo.Player = record.Player;
    levelInfo.Video = record.Video;

    if (levelInfo.Meta?.Difficulty === "Extreme") {
      try {
        const extremeInfo = await fetch(`https://kf-list-orangetan3422s-projects.vercel.app/api/aredl/levels/${record.ID}`)
          .then(res => res.json());
        levelInfo.ExtremeInfo = extremeInfo;
      } catch (e) {
        console.error(`Extreme info failed for ${record.ID}`);
      }
    }
    return levelInfo;
  });

  const levels = await Promise.all(levelPromises);

  levels.sort((a, b) => {
    const aExtreme = a.Meta?.Difficulty === "Extreme";
    const bExtreme = b.Meta?.Difficulty === "Extreme";
    if (aExtreme && bExtreme) return a.ExtremeInfo?.position - b.ExtremeInfo?.position;
    if (aExtreme) return -1;
    if (bExtreme) return 1;
    return b.Rating - a.Rating;
  });

  return { levels, nonDemonRecords };
}
