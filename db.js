const mysql = require('mysql2/promise');

// Create a connection pool for the MySQL database
const pool = mysql.createPool({
    host: 'Rahuls-MacBook-Air.local',
    user: 'root',
    password: 'Arahanth@77', // replace with your MySQL password
    database: 'first' // the database name
});

// SQL query to create tables if they do not exist
const createVictimTable = `
    CREATE TABLE IF NOT EXISTS Victim (
        victim_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        age INT,
        gender VARCHAR(10),
        contact_info VARCHAR(255)
    );
`;

// SQL query to create Incident table
const createIncidentTable = `
    CREATE TABLE IF NOT EXISTS Incident (
        incident_id INT AUTO_INCREMENT PRIMARY KEY,
        victim_id INT,
        incident_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        description TEXT,
        status VARCHAR(50),
        FOREIGN KEY (victim_id) REFERENCES Victim(victim_id)
    );
`;

// SQL query to create Responder table
const createResponderTable = `
    CREATE TABLE IF NOT EXISTS Responder (
        responder_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(50),
        contact_info VARCHAR(255)
    );
`;

// SQL query to create ActionTaken table
const createActionTakenTable = `
    CREATE TABLE IF NOT EXISTS ActionTaken (
        action_id INT AUTO_INCREMENT PRIMARY KEY,
        incident_id INT,
        responder_id INT,
        action_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        action_description TEXT,
        FOREIGN KEY (incident_id) REFERENCES Incident(incident_id),
        FOREIGN KEY (responder_id) REFERENCES Responder(responder_id)
    );
`;

// SQL query to create Counsellor table
const createCounsellorTable = `
    CREATE TABLE IF NOT EXISTS Counsellor (
        counsellor_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        contact_info VARCHAR(255),
        area_of_expertise VARCHAR(100)
    );
`;

// SQL query to create VictimCounsellor table
const createVictimCounsellorTable = `
    CREATE TABLE IF NOT EXISTS VictimCounsellor (
        victim_id INT,
        counsellor_id INT,
        start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (victim_id) REFERENCES Victim(victim_id),
        FOREIGN KEY (counsellor_id) REFERENCES Counsellor(counsellor_id),
        PRIMARY KEY (victim_id, counsellor_id)
    );
`;

// SQL query to create IncidentResponder table
const createIncidentResponderTable = `
    CREATE TABLE IF NOT EXISTS IncidentResponder (
        incident_id INT,
        responder_id INT,
        PRIMARY KEY (incident_id, responder_id),
        FOREIGN KEY (incident_id) REFERENCES Incident(incident_id),
        FOREIGN KEY (responder_id) REFERENCES Responder(responder_id)
    );
`;

// Function to create tables
const createTables = async () => {
    try {
        await pool.query(createVictimTable);
        await pool.query(createIncidentTable);
        await pool.query(createResponderTable);
        await pool.query(createActionTakenTable);
        await pool.query(createCounsellorTable);
        await pool.query(createVictimCounsellorTable);
        await pool.query(createIncidentResponderTable);
        console.log('Tables created or already exist.');
    } catch (error) {
        console.error('Error creating tables:', error.message);
    }
};

// Call the createTables function when db.js is imported
createTables();

// Export the connection pool for use in other modules
module.exports = pool;