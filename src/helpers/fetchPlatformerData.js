import Papa from "papaparse";

export async function fetchPlatformerData() {
  // fetch CSV
  const csvRes = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vSeXsd3uNqAlI-pBTA7dWakdSOChU5GK9asBv3EiiUjw_1QFcp45nI1jXSG5pCA7HwWz0KrRD5hVQl7/pub?gid=1537412780&single=true&output=csv");
  const csvText = await csvRes.text();
  const parsed = Papa.parse(csvText, { header: true });

  const records = parsed.data
    .filter(row => row.Type === "Demon" && row.ID)
    .map(row => ({
      ID: row.ID.trim(),
      Player: row.Player.trim(),
      Video: row.Video ? row.Video.trim() : ""
    }));

  // fetch per-level data
  const levelPromises = records.map(async (record) => {
    const levelInfo = await fetch(`https://kf-list-orangetan3422s-projects.vercel.app/api/level/${record.ID}`)
      .then(res => res.json());
    levelInfo.Player = record.Player;
    levelInfo.Video = record.Video;

    try {
      const platformerInfo = await fetch(`https://kf-list-orangetan3422s-projects.vercel.app/api/plevel/${record.ID}`)
        .then(res => res.json());
      levelInfo.PlatformerInfo = platformerInfo;
    } catch (e) {
      console.error(`Platformer info failed for ${record.ID}`);
    }

    return levelInfo;
  });

  const levels = await Promise.all(levelPromises);
  levels.sort((a, b) => a.PlatformerInfo?.placement - b.PlatformerInfo?.placement);
  return levels;
}
