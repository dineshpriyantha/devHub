import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
const [activities, setActivities] = useState<Activity[]>([]);

useEffect(() => {
  axios.get<Activity[]>('http://localhost:5000/api/devhubblogs').then(response => {
    setActivities(response.data);  // set data to 'activites' variable
   })
}, [])

  // can't allowed multiple element without Fragment or div, 
  // Fragment is used to replace the div, div is providing a unneccessary div to the frontend
  // Can be used <> </> instead of <Fragment> </Fragment>, <> </> is shorcut for Fragment 
  return (
    <Fragment>  
        <NavBar />
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard activities={activities}/>
        </Container>        
    </Fragment>
  );
}

export default App;
