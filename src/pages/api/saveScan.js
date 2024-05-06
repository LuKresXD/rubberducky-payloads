import Scan from '../../../models/Scan';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { url, result, safetyScore } = req.body;
        try {
            await Scan.create({
                url,
                result,
                safetyScore,
                date: new Date()
            });
            res.status(201).send({ message: 'Scan saved' });
        } catch (error) {
            console.error('Failed to save scan:', error);
            res.status(500).send({ error: 'Failed to save scan' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
