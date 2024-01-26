import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx"
import { Activity } from "../models/Activity"
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';


export default class ActivityStore {
    // Đưa mấy cái state ở ngoài app vào trong store (store được lưu bằng class)
    // activities: Activity[] = []; Thay bang thag ben duoi
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;


    constructor() {
        makeAutoObservable(this)
    }

    get activityByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }


    // Vì trong cái effect return promise tức là sử dụng async/await
    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list(); // Khai báo bên trong dù trùng tên nhưng không phải cái là cái observable
            // Mà là response.data từ API
            // Để tránh strict-mode thì sau await, ném tất cả câu lệnh vào runInAction
            // Nếu khôg thích thì dùng action. Thay vì loadingInitial thì setLoading
            // runInAction(() => {
            //     activities.forEach(activity => {
            //         activity.date = activity.date.split('T')[0]
            //         this.activities.push(activity) // sử dụng this để nói rằng đây mới là activities thật 
            //     })
            //     this.loadingInitial = false;
            // })

            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0]
                // this.activities.push(activity) // sử dụng this để nói rằng đây mới là activities thật 
                this.activityRegistry.set(activity.id, activity)
            })
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            // runInAction(() => {
            //     this.loadingInitial = false
            // })
            this.setLoadingInitial(false)
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        // this.selectedActivity = this.activities.find(a => a.id === id)
        this.selectedActivity = this.activityRegistry.get(id)
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined // không trỏ tới object nữa mà trỏ với undefined
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity()
        this.editMode = true
    }

    closeForm = () => {
        this.editMode = false
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity)
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity)
                this.selectedActivity = activity
                this.editMode = false
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true
        try {
            await agent.Activities.update(activity)
            runInAction(() => {
                // this.activities = [...this.activities.filter(a => a.id !== activity.id), activity]
                // thay bằng  this.activityRegistry.set(activity.id, activity)
                this.activityRegistry.set(activity.id, activity)
                this.selectedActivity = activity
                this.editMode = false
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true
        try {
            await agent.Activities.delete(id)
            runInAction(() => {
                // this.activities = [...this.activities.filter(a => a.id !== id)]
                this.activityRegistry.delete(id)
                if (this.selectedActivity?.id === id) this.cancelSelectedActivity()
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}