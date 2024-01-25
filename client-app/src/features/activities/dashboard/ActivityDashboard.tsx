import React from "react"
import { Grid, List, ListItem } from "semantic-ui-react"
import { Activity } from "../../../app/models/Activity"
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

export interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean
}

export default function ActivityDashboard({ activities, selectedActivity, selectActivity, cancelSelectActivity,
    editMode, openForm, closeForm, createOrEdit, deleteActivity, submitting }: Props) {
    return (
        <Grid>
            {/* Cột 10 này là để select thôi */}
            <Grid.Column width='10'>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                    submitting={submitting} />
            </Grid.Column>
            {/* Cột 6 này đã thêm cancel */}
            {/* selectedActivity là thằng cầm state hiện tại. Nếu chưa ấn là undefined, vấn rồi thì nó sẽ set State */}
            {/* Vì chơi điều kiện && nên thằng nếu như không phải undefined thì mới hiện ra cái detail */}

            <Grid.Column width='6'>
                {/* Mới chỉ chọn, chưa edit thì hiện ra */}
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />}
                {/* Muốn chơi ẩn hiển thì phải chơi && */}

                {/* Vì là truyền state nên khi hiện ra detail. Người dùng ấn Edit = OpenFrom */}
                {/* Thì lúc này state của Edit mode được cập nhật. Do đó khi mà re-render 
                thì Detail mất do điều kiện trên mà Form hiện ra */}
                {editMode &&
                    <ActivityForm
                        closeForm={closeForm}
                        activity={selectedActivity}
                        createOrEdit={createOrEdit}
                        submitting={submitting} />}
            </Grid.Column>
        </Grid>
    )
}