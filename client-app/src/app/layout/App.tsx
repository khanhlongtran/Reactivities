import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'semantic-ui-react'
import { Activity } from '../models/Activity'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { v4 as uuid } from 'uuid';


function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  // Mình muốn xử lý sự kiện view. Ấn vào view thì chỗ detail thay đổi, thì cái chỗ đấy cần lưu trữ thằng vừa click
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  // Vì form sửa đã có, bây giờ khi ấn vào edit mới hiện ra để mà sửa => boolean
  const [editMode, setEditMode] = useState(false)

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
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
      : setActivities([...activities, { ...activity, id: uuid() }])
    // Tạo or Sửa xong thì đóng form
    setEditMode(false)
    setSelectedActivity(activity)
  }
  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)])
  }

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data)
      })
  }, [])

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
        />


      </Container>
    </>
  )
}

export default App

