const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/responders', async (req, res) => {
    const {
        name,
        role,
        contact_info
    } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Responder (name, role, contact_info) VALUES (?, ?, ?)',
            [name, role, contact_info]
        );
        res.status(201).json({
            message: 'Responder created',
            responderId: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;