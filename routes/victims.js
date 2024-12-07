// routes/victims.js
const express = require('express');
const router = express.Router();
const pool = require('../middlewares/database/db'); // Import your database pool
const validateVictimData = require('../middlewares/validateVictimData'); // Import the validation middleware

// POST route for adding a new victim
router.post('/', validateVictimData, async (req, res) => {
    const {
        name,
        email,
        age,
        gender,
        contact_info
    } = req.body;

    try {
        const [result] = await pool.query(
            'INSERT INTO Victim (name, email, age, gender, contact_info) VALUES (?, ?, ?, ?, ?)',
            [name, email, age, gender, contact_info]
        );
        res.status(201).json({
            message: 'Victim created successfully',
            victimId: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;