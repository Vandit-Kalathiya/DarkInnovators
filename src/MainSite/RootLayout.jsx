// src/Page/RootLayout.jsx
import React from 'react';
import WelcomePage from '../Components/MainSiteComponent/WelcomePage.jsx';
import DisasterGraph from '../Components/MainSiteComponent/DisasterGraph.jsx';

const RootLayout = () => (
  <div>
    <WelcomePage />
    <DisasterGraph />
  </div>
);

export default RootLayout;