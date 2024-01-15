const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
    // _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    company_name: {
        type: String,
        required: true
    },
    remote: {
        type: String,
        enum: ['Remote', 'Office'],
        required: true
    },
    skills_required: {
        type: [String],
        required: true
    },
    recruiter_name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    add_logo_url: {
        type: String,
        required: true
    },
    job_position: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    jobtype: {
        type: String,
        enum: ['Full-time', 'Part-time'],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    information: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('JobPost', jobPostSchema);