import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import { Activity } from '../models/activity';

function App() {
const [activities, setActivities] = useState<Activity[]>([]);

useEffect(() => {
  axios.get<Activity[]>('http://localhost:5000/api/devhubblogs').then(response => {
    setActivities(response.data);  // set data to 'activites' variable
   })
}, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Dev Hub' />           
        <List>
          {activities.map(activity => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
        <Button content='Test'/>
    </div>
  );
}

export default App;
