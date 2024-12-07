const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./middlewares/database/db.js'); // Importing the pool from db.js

const victimRoute = require("./routes/victims");
const incidentRoute = require("./routes/incidents");
const responderRoute = require("./routes/responders");
const counsellorRoute = require("./routes/counsellors");
const victimCounsellorRoute = require("./routes/Vic_Couns.js");
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/victims", victimRoute);
app.use("/incidents", incidentRoute);
app.use("/responders", responderRoute);
app.use("/counsellors", counsellorRoute);
app.use("/victim-counsellors", victimCounsellorRoute);






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