const pool = require('./database/db'); // Import the database pool

async function validateVictimCounsellor(req, res, next) {
    const {
        victim_id,
        counsellor_id
    } = req.body;

    // Check if victim_id and counsellor_id are provided
    if (!victim_id || !counsellor_id) {
        return res.status(400).json({
            error: 'Missing required fields: victim_id or counsellor_id'
        });
    }

    try {
        // Check if the victim exists
        const [victimRows] = await pool.query('SELECT id FROM Victim WHERE id = ?', [victim_id]);
        if (victimRows.length === 0) {
            return res.status(404).json({
                error: 'Victim not found'
            });
        }

        // Check if the counselor exists
        const [counsellorRows] = await pool.query('SELECT id FROM Counsellor WHERE id = ?', [counsellor_id]);
        if (counsellorRows.length === 0) {
            return res.status(404).json({
                error: 'Counsellor not found'
            });
        }

        // Check if the relationship already exists
        const [relationshipRows] = await pool.query(
            'SELECT id FROM VictimCounsellor WHERE victim_id = ? AND counsellor_id = ?',
            [victim_id, counsellor_id]
        );
        if (relationshipRows.length > 0) {
            return res.status(409).json({
                error: 'Victim is already linked to this counselor'
            });
        }

        // If all checks pass, move to the next middleware or route handler
        next();
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = validateVictimCounsellor;