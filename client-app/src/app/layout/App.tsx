import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Container } from 'semantic-ui-react'
import { Activity } from '../models/Activity'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { v4 as uuid } from 'uuid';
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent'
import { useStore } from '../stores/store'
import { observer } from 'mobx-react-lite'

// Mindset: Thành phần nào mà cần lưu trữ, và cần re-render nhiều lần ?
// List activity (CRUD)
// Form (Create (Form khi ấn vào nút create thì hiện ra form) Edit (ấn vào đây thì form hiện ra)
// Thực ra form lúc nào cũng hiện nếu như đã có object nhưng mà để làm cho nó ẩn hiện thì kết hợp với button state
// làm cho form ẩn hiện ẩn hiện => true false => button
// Loading indicator 
// Submitting indicator

// => ta sẽ kết hợp các state lại với nhau để return cho component mà mình cần

// Các cái hàm bên dưới đơn giản chỉ là cập nhật các cái state lại với nhau thôi 
// Khi state được cập nhật thì sẽ được re-render lại 
// Khi re-render lại thì vẫn là các cái state kết hợp lại với nhau để return
// Các cái hàm kia thực ra đều điều khiển state theo mong muốn
// Và kết hợp các state lại để return thôi
// State ở đây có thể là một mảng, object, boolean


function App() {

  const { activityStore } = useStore(); // destructuring object store thoi


  // const [activities, setActivities] = useState<Activity[]>([])
  // Mình muốn xử lý sự kiện view. Ấn vào view thì chỗ detail thay đổi, thì cái chỗ đấy cần lưu trữ thằng vừa click
  // const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  // Vì form sửa đã có, bây giờ khi ấn vào edit mới hiện ra để mà sửa => boolean
  // Kết hợp với selectedActivity để form edit hiện or ẩn
  // const [editMode, setEditMode] = useState(false)

  // Loading component nhưng mà là cho toàn trang web (cái loading app to đùng đùng ấy)
  // const [loading, setLoading] = useState(true)

  // Khi submit (đang submitting...) tức là xoay tròn gọi là đang submit = submitting thì quay tròn ở cái button đấy
  // khi nào submit thì mới quay 
  // const [submitting, setSubmitting] = useState(false)

  // Mobx store: Ném cái này vào trong store(đây là action, thay đổi state mà)
  // function handleSelectedActivity(id: string) {
  //   setSelectedActivity(activities.find(x => x.id === id))
  // }

  // Ném nốt vào store
  // function handleCancelSelectedActitity() {
  //   setSelectedActivity(undefined)
  // }

  // function handleFormOpen(id?: string) {
  //   // Có id thì tức là edit cái form đó. 
  //   id ? handleSelectedActivity(id) : handleCancelSelectedActitity();
  //   // Create thì không có Id nên là vẫn cho dù create hay edit thì đều phải hiện ra form nên là EditMode = true
  //   setEditMode(true)
  // }

  // function handleFormClose() {
  //   setEditMode(false)
  // }

  // Khi cái thằng cuối là nút submit được ấn. Tức là lúc này mình muốn cập nhật lại thằng list 
  // sau khi ấn submit, thì lúc đó logic ở bên dưới thôi. Check list rồi add thêm nếu chưa có
  // Ấn submit -> re-render -> Các cái state tại hàm handleCreateOrEdit này sẽ thay đổi vì mình gọi nó mà
  // Vì nút submit kia thể hiện create or edit. Tức là mình tại cái hàm này sẽ make HTTP Request POST or PUT
  // Sau đó thì mình đã có cái callback response function. Mình sẽ cập nhật lại state của vài cái (trong callback func)
  // dựa vào response nhận được.
  // function handleCreateOrEditActivity(activity: Activity) {
  //   setSubmitting(true) // spinner hiện ra 
  //   if (activity.id) {
  //     agent.Activities.update(activity).then(() => {
  //       setActivities([...activities.filter(x => x.id !== activity.id), activity])
  //       setSelectedActivity(activity)
  //       setEditMode(false)
  //       setSubmitting(false)
  //     })
  //   } else {
  //     activity.id = uuid();
  //     agent.Activities.create(activity).then(() => {
  //       setActivities([...activities, { ...activity, id: uuid() }])
  //       setSelectedActivity(activity)
  //       setEditMode(false)
  //       setSubmitting(false)
  //     })
  //   }
  // }
  // function handleDeleteActivity(id: string) {
  //   setSubmitting(true)
  //   agent.Activities.delete(id).then(() => {
  //     setActivities([...activities.filter(x => x.id !== id)])
  //     setSubmitting(false)
  //   })
  // }

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  // Vì useEffect được gọi trước khi render nên vì khi load lại thì loadingInitial = true
  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <>
      {/* <h1>Reactivities</h1> */}
      {/* <Header as="h2" content="Reactivities" icon="unordered list" /> */}

      {/* <NavBar openForm={handleFormOpen} /> */}
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        {/* Cần truyền state để lưu trữ cái thằng mà nó vừa mới ấn */}
        {/* Và cái func để xử lý select và cancel */}
        <ActivityDashboard
        // activities={activityStore.activities}
        //   selectedActivity={selectedActivity} // ban đầu là undefined luôn 
        // selectActivity={handleSelectedActivity} // Nhờ có thừang này thì mới biết được thằng trên là Activity nào, nếu k thì vẫn sẽ cứ là undefined
        // cancelSelectActivity={handleCancelSelectedActitity}
        //  editMode={editMode}
        // openForm={handleFormOpen}
        // closeForm={handleFormClose}
        // createOrEdit={handleCreateOrEditActivity}
        // deleteActivity={handleDeleteActivity}
        // submitting={submitting}
        />


      </Container>
    </>
  )
}

export default observer(App)

