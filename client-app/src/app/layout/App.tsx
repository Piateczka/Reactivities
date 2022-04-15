import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity'
import agent from '../api/agent'
import ActivitieDashboard from '../../features/activities/dashborad/ActivitieDashboard'
import LoadingComponent from './LoadingComponent'
import {v4 as uuid} from 'uuid'

import NavBar from '../layout/NavBar'


function App() {

	const [activities, setActivities] = useState<Activity[]>([])
	const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
	const [editMode, setEditMode] = useState(false)
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [deleting,setDeleting] = useState(false)

	useEffect(() => {
		agent.Activities.list().then(response => {
			let activties: Activity[] = [];
			response.forEach(activity=>{
				activity.date = activity.date.split('T')[0]
				activties.push(activity)
			})
			setActivities(activties)
			setLoading(false)
		})
	}, [])
	function handleSelectActivity(id: string) {
		setSelectedActivity(activities.find(x => x.id === id))
	}
	function handleCancelSelectActivity() {
		setSelectedActivity(undefined)
	}

	function handelFormOpen(id?: string) {
		id ? handleSelectActivity(id) : handleCancelSelectActivity();
		setEditMode(true)

	}

	function handelFormClose() {
		setEditMode(false);
	}

	function handleCreateOrEditActivity(activity: Activity){
		setSubmitting(true);
		if(activity.id){
			agent.Activities.update(activity,activity.id).then(()=>{
				setActivities([...activities.filter(x=>x.id !==activity.id), activity]) 
				setSelectedActivity(activity)
				setEditMode(false)
				setSubmitting(false)
			})

			
		}else
		{
			activity.id = uuid()
			agent.Activities.create(activity).then(()=>{
				setActivities([...activities, activity]);
				setEditMode(false);
				setSelectedActivity(activity)
			})
		}
	}

	function handelDeleteActivity(id: string){
		setSubmitting(true);
		agent.Activities.delete(id).then(()=>{
			setActivities([...activities.filter(x=>x.id !== id)])
		})
		setSubmitting(false);
		
	}
	if(loading) return <LoadingComponent content='Loading app' />
	return (
		<Fragment>
			<NavBar openForm={handelFormOpen} />
			<Container style={{ marginTop: '7em' }}>
				<ActivitieDashboard
					activites={activities}
					selectedActivity={selectedActivity}
					selectActivity={handleSelectActivity}
					cancelSelectActivity={handleCancelSelectActivity}
					editMode={editMode}
					openForm={handelFormOpen}
					closeForm={handelFormClose}
					createOrEdit={handleCreateOrEditActivity}
					deleteActivity={handelDeleteActivity}
					submitting={submitting} />
			</Container>


		</Fragment>
	);
}

export default App;
