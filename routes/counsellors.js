const express = require('express');
const router = express.Router();
const pool = require('../database/db');

router.post('/', async (req, res) => {
    const {
        name,
        contact_info,
        area_of_expertise
    } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Counsellor (name, contact_info, area_of_expertise) VALUES (?, ?, ?)',
            [name, contact_info, area_of_expertise]
        );
        res.status(201).json({
            message: 'Counsellor created',
            counsellorId: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;