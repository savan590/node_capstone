import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import c from '../../assets/job.png';
import e from '../../assets/india.png';
import d from '../../assets/Group 3 (1).png';
import styles from './jobs.module.css';
import { useLogin } from '../context'
import Backend_api from '../../config';

function Listing() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState('');
    const [skills, setSkills] = useState([]);
    const { isLoggedIn } = useLogin();

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSkill = (e) => {
        const selectedSkill = e.target.value;
        if (!skills.includes(selectedSkill)) {
            const updatedSkills = [...skills, selectedSkill];
            setSkills(updatedSkills);
        }
    };

    const handleRemove = (skill) => {
        const updatedSkills = skills.filter((s) => s !== skill);
        setSkills(updatedSkills);
    };

    const filterJobs = () => {
        let filtered = jobs;

        // Filter by search term
        if (search.length > 0) {
            filtered = filtered.filter((job) => job?.job_position?.includes(search));
        }

        // Filter by skills
        if (skills.length > 0) {
            filtered = filtered.filter((job) =>
                job.skills_required.some((skill) => skills.includes(skill))
            );
        }

        return filtered;
    };

    useEffect(() => {
        const options = { method: 'GET' };
        const apiUrl = skills.length > 0
            ? `${Backend_api}/api/job/job-posts?skills_required=${skills.join('&')}`
            : `${Backend_api}/api/job/job-posts`;

        fetch(apiUrl, options)
            .then((response) => response.json())
            .then((response) => setJobs(response.jobPosts))
            .catch((err) => console.error(err));
    }, [skills]);

    useEffect(() => {
        const filteredJobs = filterJobs();
        setJobs(filteredJobs);
    }, [search, skills]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.containerTop}>
                    <input className={styles.inputTop} value={search} onChange={handleSearch} type="text" name='search' placeholder='Type any job title' />
                </div>
                <div className={styles.containerBottom}>
                    <select onClick={handleSkill} className={styles.inputSelect} name="remote">
                        {codingSkills.map((skill) => (
                            <option key={skill} value={skill}>
                                {skill}
                            </option>
                        ))}
                    </select>
                    {skills.map((skill) => {
                        return (
                            <span className={styles.chip} key={skill}>{skill}<span onClick={() => handleRemove(skill)} className={styles.cross}>X</span></span>
                        )
                    }
                    )}
                    <button onClick={() => navigate("/addJob")} className={styles.addjob}>Add Job</button>
                </div>
            </div>
            <div className={styles.bottom}>
                {jobs.map((data) => {
                    return (
                        <div key={data._id} className={styles.list}>
                            <div className={styles.listLeft}>
                                <div>
                                    <img
                                        className={styles.logo}
                                        alt=''
                                        src={data.add_logo_url || c}
                                        onError={(e) => console.error("Image loading error", e)}
                                    />
                                </div>
                                <div className={styles.infoLeft}>
                                    <p className={styles.position}>{data.job_position}</p>
                                    <p className={styles.extraInfo}>
                                        <img alt='' src={d} style={{ height: "15px" }} />
                                        <span className={styles.greyText}>11-50</span>
                                        <span className={styles.greyText}>₹ {data.salary}</span>
                                        <img alt='' src={e} style={{ width: "20px" }} />
                                        <span className={styles.greyText}>{data.location}</span>
                                    </p>
                                    <p className={styles.extraInfo}>
                                        <span className={styles.redText}>{data.remote}</span>
                                        <span className={styles.redText}>{data.jobtype}</span>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {data.skills_required.map((skill) => {
                                        return (
                                            <span className={styles.skill} key={skill}>{skill}</span>
                                        )
                                    }
                                    )}
                                </div>
                                <div className={styles.btnGroup}>
                                    {isLoggedIn && (<button onClick={() => navigate('/addJob', { state: { id: data._id, edit: true } })} className={styles.edit}>Edit job</button>)}
                                    <button onClick={() => navigate('/view', { state: { id: data._id } })} className={styles.view}>View Details</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}



const codingSkills = [
    'javascript',
    'python',
    'java',
    'C++',
    'c',
    'Ruby',
    'PHP',
    'Swift',
    'mongodb',
    'SQL',
    'HTML',
    'ds',
    'css',
    "node",
    "react"
];

export default Listing