const express = require('express');
const router = express.Router();
const pool = require('../database/db');

router.post('/', async (req, res) => {
    const {
        incident_id,
        responder_id,
        action_description
    } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO ActionTaken (incident_id, responder_id, action_description) VALUES (?, ?, ?)',
            [incident_id, responder_id, action_description]
        );
        res.status(201).json({
            message: 'Action taken recorded',
            actionId: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;