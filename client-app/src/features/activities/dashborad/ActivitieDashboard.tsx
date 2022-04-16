import React, { useEffect } from "react";
import { Grid, GridColumn, List } from "semantic-ui-react";

import ActivityList from "./ActivityList"
import ActivityDetails from '../details/ActivityDetails'

import ActivityForm from '../form/ActivityForm'
import { UseStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";


function ActivityDashborad(){





	const{activityStore} = UseStore()
	const{loadActivities,activityRegistry} = activityStore;
	useEffect(() => {
		if(activityRegistry.size === 0) loadActivities()

	}, [activityStore])




	if(activityStore.loadingInitial) return <LoadingComponent content='Loading app' />
	return(
		<Grid>
			<Grid.Column width='10'>
			<List>
				<ActivityList  />
			</List>				
			</Grid.Column>
			<GridColumn width="6">
			<h2>Activity filters</h2>
			</GridColumn>

		</Grid>
	)
}

export default observer(ActivityDashborad)