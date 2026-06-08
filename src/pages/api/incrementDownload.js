import { incrementCount } from '../../../lib/counts';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    const { scriptName } = req.body || {};
    if (!scriptName || typeof scriptName !== 'string') {
        return res.status(400).json({ error: 'scriptName is required' });
    }
    const newCount = await incrementCount(scriptName);
    if (newCount === null) {
        // Store not provisioned yet — don't fail the download flow.
        return res.status(200).json({ success: false, reason: 'store unavailable' });
    }
    res.status(200).json({ success: true, newCount });
}
