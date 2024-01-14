import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Header, List, ListItem } from 'semantic-ui-react'


function App() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data)
      })
  }, [])

  return (
    <div>
      {/* <h1>Reactivities</h1> */}
      <Header as="h2" content="Reactivities" icon="unordered list" />
      <ul>
        {activities.map((activity: any) => (
          <List key={activity.id}>
            <ListItem content={activity.title} icon="angle right"></ListItem>
            <ListItem>
              <List>
                <ListItem content={activity.date} icon="calendar"></ListItem>
                <ListItem content={activity.description} icon="angle right"></ListItem>
                <ListItem content={activity.category} icon="angle right"></ListItem>
                <ListItem content={activity.city} icon="angle right"></ListItem>
                <ListItem content={activity.venue} icon="angle right"></ListItem>
              </List>
            </ListItem>
          </List>
        ))}
      </ul>
    </div>

  )
}

export default App

