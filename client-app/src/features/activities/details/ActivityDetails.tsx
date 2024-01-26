import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface Props {
    // activity: Activity;
    // cancelSelectActivity: () => void
    // openForm: (id: string) => void
}
export default function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity, openForm, cancelSelectedActivity } = activityStore
    // tên riêng của selectedActivity

    if (!activity) return <LoadingComponent />;

    return (
        <Card fluid>
            <Image src={`assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
            <CardContent>
                <CardHeader>{activity.title}</CardHeader>
                <CardMeta>
                    <span>{activity.date}</span>
                </CardMeta>
                <CardDescription>
                    {activity.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <Button.Group width='2' >
                    <Button onClick={() => openForm(activity.id)} basic color="blue">Edit</Button>
                    {/* cho cái state trở về undefined => vi phạm && nên k được hiển thị nữa */}
                    <Button onClick={cancelSelectedActivity} basic color="grey">Cancel</Button>
                </Button.Group>
            </CardContent>
        </Card>
    )
}