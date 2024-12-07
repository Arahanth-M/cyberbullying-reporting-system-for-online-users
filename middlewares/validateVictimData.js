const {
    body,
    validationResult
} = require('express-validator');

// Validation middleware for /victims endpoint
const validateVictimData = [
    // Check if 'name' is present and is a string
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),

    // Check if 'email' is present, is a valid email, and is unique (optional: need to check against the DB)
    body('email').isEmail().withMessage('Email must be a valid email address').notEmpty().withMessage('Email is required'),

    // Check if 'age' is present and is a number
    body('age').isInt({
        min: 0
    }).withMessage('Age must be a positive integer'),

    // Check if 'gender' is present and is a string
    body('gender').isString().withMessage('Gender must be a string').notEmpty().withMessage('Gender is required'),

    // Check if 'contact_info' is present and is a string
    body('contact_info').isString().withMessage('Contact info must be a string').notEmpty().withMessage('Contact info is required'),

    // Handle validation result
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        next();
    }
];

module.exports = validateVictimData;