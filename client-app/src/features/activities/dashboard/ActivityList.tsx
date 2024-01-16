import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void
    deleteActivity: (id: string) => void
}

export default function ActivityList({ activities, selectActivity, deleteActivity }: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
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
                                {/* Còn nếu khhông chọn thì sẽ là false */}
                                <Button onClick={() => selectActivity(activity.id)} floated='right' content='View' color='blue' />|
                                <Button onClick={() => deleteActivity(activity.id)} floated='right' content='Delete ' color='red' />|
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}