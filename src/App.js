
import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import './App.css'; // Importing CSS file for styling

import MainPage from './MainPage';
import FitmentScorePage from './FitmentScorePage';
function App() {
 
  return ( 
   <Router>
    <Switch>
      
        <Route exact path="/" component={MainPage} />
        <Route path="/fitment-score" component={FitmentScorePage} />
      </Switch>
    
   </Router>
  );
}

export default App;

