import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

// interface Props {
//     activities: Activity[];
//     // selectActivity: (id: string) => void
//     deleteActivity: (id: string) => void
//     submitting: boolean
// }

export default observer(function ActivityList() {

    const { activityStore } = useStore();
    const { deleteActivity, activityByDate, loading } = activityStore
    const [target, setTarget] = useState('')

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name)
        deleteActivity(id)
    }


    return (
        <Segment>
            <Item.Group divided>
                {activityByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                {/* Click vào sẽ lấy được id của thằng vừa chọn, và lưu vào state */}
                                {/* Nên là ở thằng Dashboard mới xem được state nếu đã chọn  */}
                                {/* Khi mà ấn vào view thì state selectedActivity sẽ trả về thằng có Id vừa ấn */}
                                {/* Cứ ấn xong thì re-render lại thì thằng kia được cập nhật  */}
                                <Button onClick={() => activityStore.selectActivity(activity.id)} floated='right' content='View' color='blue' />
                                <Button
                                    name={activity.id}
                                    loading={loading && target === activity.id}
                                    onClick={(e) => handleActivityDelete(e, activity.id)}
                                    floated='right'
                                    content='Delete'
                                    color='red' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})