import React, { Fragment, useEffect, useState } from 'react';
import {  Container } from 'semantic-ui-react';
import { Activity } from '../models/activity'
import agent from '../api/agent'
import ActivitieDashboard from '../../features/activities/dashborad/ActivitieDashboard'
import LoadingComponent from './LoadingComponent'
import {v4 as uuid} from 'uuid'

import NavBar from '../layout/NavBar'
import { UseStore } from '../stores/store';

import { observer } from 'mobx-react-lite';


function App() {


	const {activityStore} = UseStore()


	useEffect(() => {
		activityStore.loadActivities()

	}, [activityStore])




	if(activityStore.loadingInitial) return <LoadingComponent content='Loading app' />
	return (
		<Fragment>
			<NavBar />
			<Container style={{ marginTop: '7em' }}>
				<ActivitieDashboard />
			</Container>


		</Fragment>
	);
}

export default observer(App);
