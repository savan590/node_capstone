import { useState, useEffect} from 'react';
import styles from './job.module.css';
import { useLocation ,useNavigate} from 'react-router';
import Backend_api from '../../config';

function JobForm() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(null);
    const [formData, setFormData] = useState({
        company_name: "",
        add_logo_url: "",
        job_position: "",
        salary: "",
        jobtype: "",
        remote: "",
        location: "",
        description: "",
        about: "",
        information: "",
        skills_required: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    useEffect(() => {
        const { id, edit } = state || {};
        if (edit) {
            setEdit(edit);
        }
        if (id) {
            setId(id);
            const options = { method: 'GET' };
            fetch(`${Backend_api}/api/job/job-posts/${id}`, options)
                .then(response => response.json())
                .then(response => setFormData({ ...response.jobPost }))
                .catch(err => console.error(err));
        }
    }, [state]);

    const handleJobSubmission = async (url, method, successMessage) => {
        try {
            const jwttoken = window.localStorage.getItem("token")
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${jwttoken}`,
                },
                body: JSON.stringify({ ...formData, name: window.localStorage.getItem("name") })
            });

            if (!response.ok) {
                throw new Error("An error occurred. Please try again.");
            }

            const responseData = await response.json();
            console.log(responseData);
            alert(successMessage);
            navigate("/listing");

        } catch (error) {
            console.error("There was a problem with the request:", error);
            alert("There was a problem with the request. Please try again.");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = `${Backend_api}/api/job/job-posts`;
        const method = "POST";
        const successMessage = "Job created successfully";
        handleJobSubmission(url, method, successMessage);
    };

    const handleEdit = (event) => {
        event.preventDefault();
        const url = `${Backend_api}/api/job/job-posts/${id}`;
        const method = "PUT";
        const successMessage = "Job edited successfully";
        handleJobSubmission(url, method, successMessage);
    };

    const buttonText = edit ? "Edit Job" : "+ Add Job";

    return (
        <div className={styles.container}>
            <h1>{edit ? "Edit" : "Add"} job description</h1>
            <div className={styles.jobForm}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="company_name">Company Name:</label>
                    <input className={styles.input} type="text" name="company_name" value={formData.company_name} onChange={handleChange} placeholder="Enter company name" />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="add_logo_url">Add Logo URL:</label>
                    <input className={styles.input} type="text" name="add_logo_url" value={formData.add_logo_url} onChange={handleChange} placeholder="Enter logo URL" />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="job_position">Job Position:</label>
                    <input className={styles.input} type="text" name="job_position" value={formData.job_position} onChange={handleChange} placeholder="Enter job position" />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="salary">Monthly Salary:</label>
                    <input className={styles.input} type="text" name="salary" value={formData.salary} onChange={handleChange} placeholder="Enter job salary" />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="jobtype">Job Type:</label>
                    <select className={styles.select} name="jobtype" value={formData.jobtype} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="remote">Remote/office:</label>
                    <select className={styles.select} name="remote" value={formData.remote} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Remote">Remote</option>
                        <option value="Office">Office</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="location">Location:</label>
                    <input className={styles.input} type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Enter job location" />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="description">Job Description:</label>
                    <textarea className={styles.input} name="description" value={formData.description} onChange={handleChange} placeholder="Enter job description" />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="about">About Company:</label>
                    <textarea className={styles.input} name="about" value={formData.about} onChange={handleChange} placeholder="Type about your company" />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="skills_required">Skills Required:</label>
                    <input className={styles.input} type="text" name="skills_required" value={formData.skills_required} onChange={handleChange} placeholder='skills' />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="information">Information:</label>
                    <input className={styles.input} name="information" value={formData.information} onChange={handleChange} placeholder="Enter the additional information" />
                </div>

            </div>
            <button className={styles.cancel}>Cancel</button>
            <button onClick={edit ? handleEdit : handleSubmit} className={styles.add}>
                {buttonText}
            </button>
        </div>
    );
};

export default JobForm;
