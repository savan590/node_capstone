const express = require('express');
const JobPost = require('../models/jobs');
const requireAuth = require('../middleware/authenticate');

const router = express.Router();

// Create Job Post API
router.post('/job-posts', requireAuth, async (req, res) => {
  const {
    company_name,
    job_position,
    add_logo_url,
    salary,
    jobtype,
    remote,
    location,
    description,
    information,
    skills,
    about } = req.body;
  const recruiter_name = req.body.name;
  console.log(req.body)
  let skillsArray = skills;
  if (typeof skills === 'string') {
    skillsArray = skills.split(',').map(skill => skill.trim());
  }

  try {
    const jobPost = new JobPost({
      company_name,
      job_position,
      add_logo_url,
      salary,
      jobtype,
      remote,
      location,
      description,
      about,
      information,
      skills_required: skillsArray,
      recruiter_name
    });

    await jobPost.save();

    return res.json({ message: 'Job post created successfully', name: recruiter_name });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Edit Job Post API
router.put('/job-posts/:id', requireAuth,async (req, res) => {
  const jobId = req.params.id;
  // const { company_name, remote,jobtype, skills_required } = req.body;
  const {
    company_name,
    add_logo_url,
    job_position,
    salary,
    jobtype,
    remote,
    location,
    description,
    about,
    skills_required,
    information
  } = req.body;
  const updatedLogoURL = req.body.add_logo_url
    ? req.body.add_logo_url
    : "https://eu.ui-avatars.com/api/?name=John+Doe&size=250";

  let skillsArray = skills_required;
  if (typeof skills_required === 'string') {
    skillsArray = skills_required.split(',').map(skill => skill.trim());
  }
  // const recruiter_name = req.body.name;

  try {
    const jobPost = await JobPost.findById(jobId);

    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' });
    }

    // jobPost.company_name = company_name;
    // jobPost.jobtype = jobtype;
    // jobPost.remote = remote;
    // jobPost.skills_required = skills_required;
    jobPost.company_name = company_name;
    jobPost.add_logo_url = updatedLogoURL;
    jobPost.job_position = job_position;
    jobPost.salary = salary;
    jobPost.jobtype = jobtype;
    jobPost.remote = remote;
    jobPost.location = location;
    jobPost.description = description;
    jobPost.about = about;
    jobPost.skills_required =skillsArray;
    jobPost.information = information;
    // jobPost.recruiter_name = recruiter_name;

    await jobPost.save();

    return res.json({ message: 'Job post updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// router.put('/job-posts/:id', requireAuth, async (req, res) => {
//   const jobId = req.params.id;
//   const updatedLogoURL = req.body.add_logo_url
//     ? req.body.add_logo_url
//     : "https://eu.ui-avatars.com/api/?name=John+Doe&size=250";
//   const {
//     company_name,
//     add_logo_url,
//     job_position,
//     salary,
//     jobtype,
//     remote,
//     location,
//     description,
//     about,
//     skills_required,
//     information
//   } = req.body;
//   try {
//     const jobPost = await jobPost.findById(jobId);
    
//     // Check if all the required fields are provided
//     if (
//       !company_name ||
//       !add_logo_url ||
//       !job_position ||
//       !salary ||
//       !jobtype ||
//       !remote ||
//       !location ||
//       !description ||
//       !about ||
//       !skills_required ||
//       !information
//     ) {
//       return res
//         .status(400)
//         .json({ error: "Please provide all required fields" });
//     }

//     // const updatedJobLocation = location === "" ? "Remote" : jobLocation;


//     // Find the existing job listing by ID

//     if (!jobPost) {
//       return res.status(404).json({ error: "Job listing not found" });
//     }

//     // Update the job listing fields
//     jobPost.company_name = company_name;
//     jobPost.add_logo_url = updatedLogoURL;
//     jobPost.job_position = job_position;
//     jobPost.salary = salary;
//     jobPost.jobtype = jobtype;
//     jobPost.remote = remote;
//     jobPost.location = location;
//     jobPost.description = description;
//     jobPost.about = about;
//     jobPost.skills_required = skills_required;
//     jobPost.information = information;

//     // Save the updated job listing
//     await jobPost.save();

//     res.status(200).json({ message: "Job listing updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// })

// Get Job Posts with Filters API
router.get('/job-posts', async (req, res) => {
  const { jobtype, skills_required } = req.query;

  try {
    let query = {};

    if (jobtype) {
      query.jobtype = jobtype;
    }

    if (skills_required) {
      query.skills_required = { $in: skills_required.split('&') };
    }
    console.log(query)
    const jobPosts = await JobPost.find(query).sort({ createdAt: -1 });

    return res.json({ jobPosts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Get Job Post Detail API
router.get('/job-posts/:id', async (req, res) => {
  const jobId = req.params.id;

  try {
    const jobPost = await JobPost.findById(jobId);

    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' });
    }

    return res.json({ jobPost });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;