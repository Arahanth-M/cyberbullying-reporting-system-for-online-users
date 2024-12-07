// middlewares/incidentValidation.js

async function validateIncident(req, res, next) {
    const {
        victim_id,
        description
    } = req.body;

    // Check if victim exists
    try {
        const [rows] = await pool.query('SELECT * FROM Victims WHERE victim_id = ?', [victim_id]);
        if (rows.length === 0) {
            return res.status(404).json({
                error: 'Victim not found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    // Validate description length (200 words max)
    const wordCount = description.split(/\s+/).length; // Split by any whitespace
    if (wordCount > 200) {
        return res.status(400).json({
            error: 'Description should not exceed 200 words'
        });
    }

    // If both checks pass, proceed to the next middleware or route handler
    next();
}

module.exports = validateIncident;