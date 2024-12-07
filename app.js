const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db'); // Importing the pool from db.js

const validateVictimData = require('./middlewares/validateVictimData'); // Import the validation middleware


const app = express();
const port = 3000;

app.use(bodyParser.json());

// API routes for inserting data into the tables

// Add a new victim
app.post('/victims', validateVictimData, async (req, res) => {
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
            message: 'Victim created',
            victimId: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Add a new incident
//victim can add an incident only when he or she is first registered .. 

app.post('/incidents', async (req, res) => {
    const {
        victim_id,
        description,
        status
    } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Incident (victim_id, description, status) VALUES (?, ?, ?)',
            [victim_id, description, status]
        );
        res.status(201).json({
            message: 'Incident created',
            incidentId: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Add a new responder
app.post('/responders', async (req, res) => {
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

// Add an action taken by a responder for an incident
app.post('/actions', async (req, res) => {
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

// Add a new counsellor
app.post('/counsellors', async (req, res) => {
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

// Link a victim to a counsellor
app.post('/victim-counsellor', async (req, res) => {
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

// Link an incident to a responder
app.post('/incident-responder', async (req, res) => {
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

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});