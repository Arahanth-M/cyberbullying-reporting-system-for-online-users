// routes/incidents.js
const express = require('express');
const router = express.Router();
const validateIncident = require('../middlewares/incidentValidation');
const pool = require('../middlewares/database/db'); // Import your database pool

// POST route for creating an incident
router.post('/incidents', validateIncident, async (req, res) => {
    const {
        victim_id,
        description,
        status
    } = req.body;

    // Input validation for missing fields
    if (!victim_id || !description || !status) {
        return res.status(400).json({
            error: 'Missing required fields: victim_id, description, or status'
        });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO Incident (victim_id, description, status) VALUES (?, ?, ?)',
            [victim_id, description, status]
        );
        res.status(201).json({
            message: 'Incident created successfully',
            incidentId: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;