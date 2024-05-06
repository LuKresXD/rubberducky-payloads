import Scan from '../../../models/Scan';

export default async function handler(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await Scan.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['date', 'DESC']]
        });
        res.status(200).json({
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalScans: count,
            scans: rows
        });
    } catch (error) {
        console.error('Database read error:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
}
