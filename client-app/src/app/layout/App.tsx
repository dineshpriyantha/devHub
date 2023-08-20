import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
const {activityStore} = useStore();
const [activities, setActivities] = useState<Activity[]>([]);
const [selectedActivity, setSelectedActivity] = useState<Activity | undefined> (undefined);
const [editMode, setEditMode] = useState(false);
const [submitting, setSubmitting] = useState(false); 

useEffect(() => {
  // agent.Activities.list().then(response => {  //removed  axios.get<Activity[]>('http://localhost:5000/api/devhubblogs')
  //   let activities: Activity[] = [];
  //   response.forEach(activity => {
  //     activity.date = activity.date.split('T')[0];
  //     activities.push(activity);
  //   })
  //   setActivities(activities);  // set data to 'activites' variable
  //   steLoading(false);
  //  })

  activityStore.loadActivities()
}, [activityStore])

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

function handleCreateOrEditActivity(activity: Activity){
  setSubmitting(true);
  if(activity.id){
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(x => x.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
  } else{
    activity.id = uuid();
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
  }

  // activity.id 
  //   ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
  //   : setActivities([...activities, {...activity, id: uuid()}]);
  // setEditMode(false);
  // setSelectedActivity(activity);
}

function handleDeleteActivity(id: string){
  setSubmitting(true);
  agent.Activities.delete(id).then(() => {
    setActivities([...activities.filter(X => X.id !== id)]);
    setSubmitting(false);
  })  
}

if(activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  // can't allowed multiple element without Fragment or div, 
  // Fragment is used to replace the div, div is providing a unneccessary div to the frontend
  // Can be used <> </> instead of <Fragment> </Fragment>, <> </> is shorcut for Fragment 
  return (
    <Fragment>  
        <NavBar openForm={handleFormOpen} />
        <Container style={{marginTop: '7em'}}>
          
          <ActivityDashboard 
            activities={activityStore.activities}
            selectedActivity = {selectedActivity}
            selectActivity = {handleSelectActivity}
            cancelSelectActivity = {handleCancelSelectedActivity}
            editMode = {editMode}
            openForm = {handleFormOpen}
            closeForm = {handleClose}
            createOrEdit = {handleCreateOrEditActivity}
            deleteActivity = {handleDeleteActivity}
            submitting = {submitting}
          />
        </Container>        
    </Fragment>
  );
}

export default observer(App);
