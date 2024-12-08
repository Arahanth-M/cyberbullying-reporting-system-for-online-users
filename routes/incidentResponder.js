const express = require('express');
const router = express.Router();
const pool = require('../database/db');

router.post('/', async (req, res) => {
    const {
        incident_id,
        responder_id
    } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO IncidentResponder (incident_id, responder_id) VALUES (?, ?)',
            [incident_id, responder_id]
        );
        res.status(201).json({
            message: 'Incident linked to responder',
            incidentResponderId: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;