import React from "react"
import { Grid, List, ListItem } from "semantic-ui-react"
import { Activity } from "../../../app/models/Activity"
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export interface Props {
    activities: Activity[];
    // selectedActivity: Activity | undefined;
    // selectActivity: (id: string) => void;
    // cancelSelectActivity: () => void
    // editMode: boolean;
    // openForm: (id: string) => void;
    // closeForm: () => void;
    // createOrEdit: (activity: Activity) => void;
    // deleteActivity: (id: string) => void;
    // submitting: boolean
}

// Thực ra trong cái bài này thì cột selectedActivity nó phụ thuộc vào selectActivity
export default observer(function ActivityDashboard() {

    const { activityStore } = useStore();
    const { selectedActivity, editMode } = activityStore
    return (
        <Grid>
            {/* Cột 10 này là để select thôi */}
            <Grid.Column width='10'>
                {/* Mục đích của cột này là Delete và View */}
                {/* Khi mà ấn vào view thì cái hàm selectActivity sẽ được pass id vào */}
                <ActivityList
                //   activities={activities} // List các activity
                //   selectActivity={selectActivity} // handle xem mình chọn thằng nào thì setSelectedActivity là Id đó
                //     deleteActivity={deleteActivity} // callback, chọn thằng nào thì mới thực hiện xóa
                //   submitting={submitting} // cái spinner khi mà submit nút delete
                />
            </Grid.Column>
            {/* Cột 6 này đã thêm cancel */}
            {/* selectedActivity là thằng cầm state hiện tại. Nếu chưa ấn là undefined, vấn rồi thì nó sẽ set State */}
            {/* Vì chơi điều kiện && nên thằng nếu như không phải undefined thì mới hiện ra cái detail */}

            <Grid.Column width='6'>
                {/* Đây là phần View, ở bên kia khi ấn vào View thì cái hàm selectActivity được thực hiện
                Khi đó  */}
                {/* Mới chỉ chọn, chưa edit thì hiện ra */}
                {/* selectedActivity && !editMode đúng tức là không phải edit mà là view thì cái detail khi được thực thi */}
                {/* Khi thằng người dùng ấn vào view tức là khi đó selectedActivity không còn là undefined 
                    => true (bởi vì ấn xong thì nó re-render lại mà => khi đó chạy lại từ đầu => ko còn là undefined) */}
                {/*  */}
                {selectedActivity && !editMode &&
                    <ActivityDetails
                    // activity={selectedActivity}
                    // cancelSelectActivity={cancelSelectActivity}
                    // openForm={openForm}
                    />}
                {/* Muốn chơi ẩn hiển thì phải chơi && */}

                {/* Vì là truyền state nên khi hiện ra detail. Người dùng ấn Edit = OpenFrom */}
                {/* Thì lúc này state của Edit mode được cập nhật. Do đó khi mà re-render 
                thì Detail mất do điều kiện trên mà Form hiện ra */}
                {/* Toán tử && trong này là khác nhé
                tức là nếu editMode đúng thì cái form kia sẽ được thực thi */}
                {editMode &&
                    <ActivityForm
                    // closeForm={closeForm}
                    // activity={selectedActivity}
                    // createOrEdit={createOrEdit}
                    // submitting={submitting} => loading indicator da thay = loading
                    />}
            </Grid.Column>
        </Grid>
    )
})