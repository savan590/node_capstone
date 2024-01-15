import React, { useEffect, useState } from 'react';
import styles from './view.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLogin } from '../context';
import Backend_api from '../../config';

function Details() {
  const { isLoggedIn } = useLogin();
  const navigate = useNavigate();
  const [data, setData] = useState(undefined);
  const { state } = useLocation();
  const { id } = state;

  useEffect(() => {
    const options = { method: 'GET' };
    fetch(`${Backend_api}/api/job/job-posts/${id}`, options)
      .then(response => response.json())
      .then(response => setData({ ...response.jobPost }))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <>
      {data ? (
        <>
          <div className={styles.container}>
            <p className={styles.containerText}>{data.job_position} {data.remote === 'Remote' ? 'work from home' : 'work from office'} job/internship at {data.company_name}</p>
          </div>
          <div className={styles.containerBottom}>
            <div className={styles.preHeading} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <p className={styles.lightText}>{data.jobtype}</p>
              {isLoggedIn && (
                <>
                  <img className={styles.url_logo} src={data.add_logo_url} alt='' />
                  <span>{data.company_name}</span>
                </>
              )}
            </div>

            <div className={styles.heading}>
              <div>
                <p className={styles.boldText}>{data.job_position}</p>
                <p className={styles.locationText}>{data.location} | India</p>
              </div>
              <div>
                {isLoggedIn ? <button onClick={() => { navigate('/addJob', { state: { id: data._id, edit: true } }) }} className={styles.edit}>Edit Job</button> : null}
              </div>
            </div>
            <div className={styles.perks}>
              <div>
                <p className={styles.lightText}>Stipend</p>
                <p className={styles.lightText}>{data.salary}</p>
              </div>
              <div>
                <p className={styles.lightText}>Duration</p>
                <p className={styles.lightText}>6 Months</p>
              </div>
            </div>
            <div className={styles.info}>
              <h2>About Company</h2>
              <p>{data.about}</p>
            </div>
            <div className={styles.info}>
              <h2>Skill(s) Required</h2>
              {data.skills_required.map((skill) => (
                <span className={styles.skill} key={skill}>{skill}</span>
              ))}
            </div>
            <div className={styles.info}>
              <h2>About the job/internship</h2>
              <p>{data.description}</p>
            </div>
            <div className={styles.info}>
              <h2>Additional Information</h2>
              <p>{data.information}</p>
            </div>
          </div>
        </>
      ) : <></>}
    </>
  );
}

export default Details;
