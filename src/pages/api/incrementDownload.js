import Download from '../../../models/Download';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { scriptName } = req.body;
        const download = await Download.findOne({ where: { scriptName } });
        if (download) {
            download.count++;
            await download.save();
            res.status(200).json({ success: true });
        } else {
            // If script doesn't exist, create a new record
            await Download.create({ scriptName, count: 1 });
            res.status(201).json({ success: true });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}