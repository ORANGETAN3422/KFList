export default async function handler(req, res) {
    const { id } = req.query;
  
    try {
      const response = await fetch(`https://gdladder.com/api/level/${id}`);
      const data = await response.json();
  
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch level data' });
    }
  }
  