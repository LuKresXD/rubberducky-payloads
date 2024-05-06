import axios from 'axios';

export default async function handler(req, res) {
  const apiUrl = 'https://www.virustotal.com/api/v3';
  const headers = {
    'x-apikey': process.env.VIRUSTOTAL_API_KEY,
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  try {
    if (req.method === 'POST') {
      const response = await axios.post(`${apiUrl}/urls`, `url=${encodeURIComponent(req.body.url)}`, { headers });
      res.status(200).json(response.data);
    } else if (req.method === 'GET' && req.query.id) {
      const response = await axios.get(`${apiUrl}/analyses/${req.query.id}`, { headers });
      res.status(200).json(response.data);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
