import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity'
import agent from '../api/agent'
import ActivitieDashboard from '../../features/activities/dashborad/ActivitieDashboard'
import LoadingComponent from './LoadingComponent'
import { v4 as uuid } from 'uuid'

import NavBar from '../layout/NavBar'
import { UseStore } from '../stores/store';

import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage'
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';


function App() {

	const location = useLocation()



	return (
		<Fragment>
			<Route exact path='/' component={HomePage} />
			<Route path={'/(.+)'} render={() => (
				<>
					<NavBar />
					<Container style={{ marginTop: '7em' }}>

						<Route exact path='/activities' component={ActivitieDashboard} />
						<Route path='/activities/:id' component={ActivityDetails} />
						<Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />

					</Container></>
			)} />



		</Fragment>
	);
}

export default observer(App);
