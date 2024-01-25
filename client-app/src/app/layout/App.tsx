import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'semantic-ui-react'
import { Activity } from '../models/Activity'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { v4 as uuid } from 'uuid';
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent'


function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  // Mình muốn xử lý sự kiện view. Ấn vào view thì chỗ detail thay đổi, thì cái chỗ đấy cần lưu trữ thằng vừa click
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  // Vì form sửa đã có, bây giờ khi ấn vào edit mới hiện ra để mà sửa => boolean
  const [editMode, setEditMode] = useState(false)

  const [loading, setLoading] = useState(true)

  const [submitting, setSubmitting] = useState(false)

  function handleSelectedActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id))
  }

  function handleCancelSelectedActitity() {
    setSelectedActivity(undefined)
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectedActivity(id) : handleCancelSelectedActitity();
    setEditMode(true)
  }

  function handleFormClose() {
    setEditMode(false)
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true)
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity)
        setEditMode(false)
        setSubmitting(false)
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, { ...activity, id: uuid() }])
        setSelectedActivity(activity)
        setEditMode(false)
        setSubmitting(false)
      })
    }
  }
  function handleDeleteActivity(id: string) {
    setSubmitting(true)
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmitting(false)
    })

  }

  useEffect(() => {
    agent.Activities.list().then(response => { // List trả về requests.get('/activities') thì method này sẽ .then được 
      let activities: Activity[] = []
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0]
        activities.push(activity)
      })
      setActivities(activities);
      setLoading(false)
    })
  }, [])

  if (loading) return <LoadingComponent content='Loading app' />

  return (
    <>
      {/* <h1>Reactivities</h1> */}
      {/* <Header as="h2" content="Reactivities" icon="unordered list" /> */}

      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        {/* Cần truyền state để lưu trữ cái thằng mà nó vừa mới ấn */}
        {/* Và cái func để xử lý select và cancel */}
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelSelectActivity={handleCancelSelectedActitity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />


      </Container>
    </>
  )
}

export default App

