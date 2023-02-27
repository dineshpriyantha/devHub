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
const [selectedActivity, setSelectedActivity] = useState<Activity | undefined> (undefined);
const [editMode, setEditMode] = useState(false);

useEffect(() => {
  axios.get<Activity[]>('http://localhost:5000/api/devhubblogs').then(response => {
    setActivities(response.data);  // set data to 'activites' variable
   })
}, [])

function handleSelectActivity(id: string){
  setSelectedActivity(activities.find(x => x.id === id));
}

function handleCancelSelectedActivity(){
  setSelectedActivity(undefined);
}

function handleFormOpen(id?: string){
  id ? handleSelectActivity(id) : handleCancelSelectedActivity();
  setEditMode(true);
}

function handleClose(){
  setEditMode(false);
}

  // can't allowed multiple element without Fragment or div, 
  // Fragment is used to replace the div, div is providing a unneccessary div to the frontend
  // Can be used <> </> instead of <Fragment> </Fragment>, <> </> is shorcut for Fragment 
  return (
    <Fragment>  
        <NavBar openForm={handleFormOpen} />
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard 
            activities={activities}
            selectedActivity = {selectedActivity}
            selectActivity = {handleSelectActivity}
            cancelSelectActivity = {handleCancelSelectedActivity}
            editMode = {editMode}
            openForm = {handleFormOpen}
            closeForm = {handleClose}
          />
        </Container>        
    </Fragment>
  );
}

export default App;
