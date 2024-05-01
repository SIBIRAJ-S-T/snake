import React, { useState } from 'react';
import './Launch.css'; // Assuming you have a separate CSS file named App.css for styling
import { Launch } from '@mui/icons-material';

function Launchapp(){
  const [appLink, setAppLink] = useState('');
  const [appName, setAppName] = useState('');
  const [appIcon, setAppIcon] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission, like sending data to a backend or performing client-side validation
    console.log('App link:', appLink);
    console.log('App name:', appName);
    console.log('App icon:', appIcon);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleSubmit} className="app-form">
        <label htmlFor="appLink">App Link:</label>
        <input
          type="text"
          id="appLink"
          value={appLink}
          onChange={(e) => setAppLink(e.target.value)}
          required
        />
        <label htmlFor="appName">App Name:</label>
        <input
          type="text"
          id="appName"
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          required
        />
        <label htmlFor="appIcon">App Icon Image:</label>
        <input
          type="file"
          id="appIcon"
          accept="image/*"
          onChange={(e) => setAppIcon(e.target.files[0])}
          required
        />
        <button type="submit">Launch</button>
      </form>
    </div>
  );
}

export default Launchapp;
