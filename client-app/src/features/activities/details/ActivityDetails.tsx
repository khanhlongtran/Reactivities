import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";

interface Props {
    activity: Activity;
    cancelSelectActivity: () => void
    openForm: (id: string) => void
}
export default function ActivityDetails({ activity, cancelSelectActivity, openForm }: Props) {
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
                    <Button onClick={cancelSelectActivity} basic color="grey">Cancel</Button>
                </Button.Group>
            </CardContent>
        </Card>
    )
}