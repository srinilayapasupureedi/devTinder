const validator = require('validator');

// ---------------------- Signup Validation ----------------------
const validateSignupData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error('First name and last name are required');
    }

    if (!validator.isEmail(email)) {
        throw new Error('Email is invalid');
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error('Password is not strong enough');
    }
};

// ---------------------- Edit Profile Validation ----------------------
const validateEditProfileData = (req) => {
    const allowedFields = [
        "firstName",
        "lastName",
        "age",
        "gender",
        "skills",
        "about",
        "profileImage",
    ];

    // Check only allowed fields are included
    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedFields.includes(field)
    );

    if (!isEditAllowed) return false;

    // Allow age even if it arrives as a string → convert automatically
    if (req.body.age) {
        if (isNaN(Number(req.body.age))) return false;
        req.body.age = Number(req.body.age); // automatic clean
    }

    // Skills must be array if provided
    if (req.body.skills && !Array.isArray(req.body.skills)) return false;

    return true;
};

// ---------------------- Password Update Validation ----------------------
const validateEditPassWord = (req) => {
    if (!req.body) return false;

    const allowedFields = ["password"];

    const isAllowedEdit = Object.keys(req.body).every((key) =>
        allowedFields.includes(key)
    );

    return isAllowedEdit;
};

module.exports = {
    validateSignupData,
    validateEditProfileData,
    validateEditPassWord,
};
