import { getCounts } from '../../../lib/counts';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    const counts = await getCounts();
    const downloads = Object.entries(counts).map(([scriptName, count]) => ({ scriptName, count }));
    res.status(200).json(downloads);
}
