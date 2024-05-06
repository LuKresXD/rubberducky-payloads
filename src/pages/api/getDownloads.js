import Download from '../../../models/Download';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const downloads = await Download.findAll();
        res.status(200).json(downloads);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}