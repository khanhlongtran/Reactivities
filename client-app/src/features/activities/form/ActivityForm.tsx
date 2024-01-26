import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

// interface Props {
// activity: Activity | undefined;
// closeForm: () => void;
// createOrEdit: (activity: Activity) => void;
// submitting: boolean
// }
// Sử dụng other name. biến activity có thể sử dụng tên khác là selectedActivity
// Đây là rename
export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { selectedActivity, closeForm, createActivity, loading, updateActivity } = activityStore

    // Nếu chưa có activity tức là create thì mình tạo một object rỗng để gán vào cái state đó
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity) // nó chính là thằng này: handleCreateOrEditActivity
        // Nó hết hợp các state: submitting, make HTTP request Update or Create
        // list activities, editMode, selectedActivity
        // Đây là một callback function
        // trong một form gồm nhiều name. Để có thể lấy được tất cả giá trị của cái thẻ đó thì ta sử dụng onChange
        // trong hàm onChange sẽ dồn tất cả cái name trong thẻ đó vào cái object activity sử dụng spread + useState ban đầu
        // tức là nếu name đã trùng thì sẽ bị ghi đè lên thôi
    }


    // onChange thì cần đầu vào là event: ... di vào vào sẽ thấy
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        // Sử dụng event.target để track các thuộc tính trong thẻ
        // ở đây có 3 thuộc tính là placeholder, name, value 
        // event.target sẽ track và trả về 3 
        // mình sử dụng destructuring lấy name với value thôi
        const { name, value } = event.target;
        // Sử dụng spread với phần tử [title] có giá trị là value = "??" do người dùg nhập
        // Vì trùng key là title nên sẽ bị override
        setActivity({ ...activity, [name]: value })
    }
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input type="date" placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})