import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = ({ results }) => {
  const ooiArr = results.ooi.map(org => <p>{org.name}: {org.shared_users} users in common</p>);
  const externalArr = results.external_ooi.map(org => <p>{org.name}: {org.shared_users} users in common</p>);

  return(
    <section className='dashboard'>
      <h2 className='analytics-title'>
        Analytics
      </h2>
      <h3>Our App: {results.dapp_info.name}</h3>
      <h3>Users: {results.users.count}</h3>
      <div className='card-container'>
        <article>
          <h4>Organizations of Interest</h4>
          <div className='card'>
            {ooiArr}
          </div>
        </article>
        <article>
          <h4>External Orgs of Interest</h4>
          <div className='card'>
            {externalArr}
          </div>
        </article>
      </div>
      <div className='nav-btns'>
        <Link to="/">
          <button>Back</button>
        </Link>
        <Link to="/graphs">
          <button>Next</button>
        </Link>
      </div>
    </section>
  )
}

export default Dashboard;
