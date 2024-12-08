const express = require('express');
const router = express.Router();
const pool = require('../middlewares/database/db');

router.post('/victim-counsellor', async (req, res) => {
    const {
        victim_id,
        counsellor_id
    } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO VictimCounsellor (victim_id, counsellor_id) VALUES (?, ?)',
            [victim_id, counsellor_id]
        );
        res.status(201).json({
            message: 'Victim linked to counsellor',
            victimCounsellorId: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;