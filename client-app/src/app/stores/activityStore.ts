import { makeAutoObservable } from 'mobx'
import agent from '../api/agent';
import { Activity } from '../models/activity'
import {v4 as uuid} from 'uuid'

export default class ActivityStore {
	activityRegistry = new Map<string, Activity>();
	selectedActivity: Activity | undefined = undefined;
	editMode: boolean = false
	loading: boolean = false
	loadingInitial: boolean = false;
	deleting: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	get activitiesByDate(){
		return Array.from(this.activityRegistry.values()).sort((a,b) => Date.parse(a.date) - Date.parse(b.date))
	}

	loadActivities = async () => {
		this.setLoadingInitial(true)
		try {
			const activities = await agent.Activities.list();

			activities.forEach(activity => {
				activity.date = activity.date.split('T')[0]
				this.activityRegistry.set(activity.id,activity);

				this.setLoadingInitial(false)
			})

		} catch (error) {
			console.log(error)

			this.setLoadingInitial(false)

		}
	}
	setLoadingInitial = (state: boolean) => {

		this.loadingInitial = state

	}
	setLoading= (state: boolean) =>{
		this.loading = state;
	}


	setEditMode = (state: boolean) => {
		this.editMode = state
	}
	selectActivity = (id: string) => {
		this.selectedActivity = this.activityRegistry.get(id)
	}

	cancelSelectedActivity = () => {
		this.selectedActivity = undefined
	}

	openForm = (id?: string) => {
		id ? this.selectActivity(id) : this.cancelSelectedActivity();
		this.setEditMode(true)
	}
	closeForm = () => {
		this.setEditMode(false)
	}
	setSelectedActivity(activity: Activity) {
		this.selectedActivity = activity
	}

	createActivity = async (activity: Activity) => {
		this.setLoading(true)
		activity.id = uuid()

			try{
			await agent.Activities.create(activity)
				this.activityRegistry.set(activity.id,activity)			
				this.setEditMode(false);
				this.setSelectedActivity(activity)
				this.setLoading(false)
			}catch(error){
				console.log(error)
				this.setLoading(false)
			}

			
		}

	updateActivity = async (activity: Activity) => {
		this.setLoading(true)
		if (activity.id) {
			try{
				await agent.Activities.update(activity, activity.id)
				this.activityRegistry.set(activity.id, activity)
				this.setSelectedActivity(activity)
				this.setEditMode(false)
				this.setLoading(false)
			}catch(error){
				console.log(error)
				this.setLoading(false)
			}

			


		}
	}

	deleteActivity = async (id:string) =>{
		this.setLoading(true)
		try{
			await agent.Activities.delete(id)
			this.activityRegistry.delete(id)
			if(this.selectedActivity?.id === id) 
				this.cancelSelectedActivity();
			this.setLoading(false)
		}catch(error){
			console.log(error)
			this.setLoading(false)
		}

		
		
	}
}

