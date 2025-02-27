import { makeAutoObservable } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";

export default class ActivityStore{
    activities : Activity[] = [];
    selectedActivity: Activity | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        // makeObservable(this, {
        //     title: observable,
        //     setTitle: action //.bound // .boud use to bind automatically to the title
        // })
        makeAutoObservable(this)
    }

    // setTitle = () => { // instad of .boud can be used array function( = () => ) for auttomatically bind
    //     this.title = this.title + '!';
    // }

    loadActivities = async () => {
        this.loadingInitial = true;
        try{
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activities.push(activity);
            })
            this.loadingInitial = false;
        }catch(error){
            console.log(error);
            this.loadingInitial = false;
        }
    }
} 