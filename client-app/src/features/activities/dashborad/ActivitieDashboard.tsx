import React from "react";
import { Grid, GridColumn, List } from "semantic-ui-react";

import ActivityList from "./ActivityList"
import ActivityDetails from '../details/ActivityDetails'

import ActivityForm from '../form/ActivityForm'
import { UseStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";


function ActivityDashborad(){
	const{activityStore} = UseStore()
	const{selectedActivity,editMode} = activityStore;
	return(
		<Grid>
			<Grid.Column width='10'>
			<List>
				<ActivityList  />
			</List>				
			</Grid.Column>
			<GridColumn width="6">
				{selectedActivity && !editMode &&
				<ActivityDetails />}
				{activityStore.editMode &&
				<ActivityForm />}
			</GridColumn>

		</Grid>
	)
}

export default observer(ActivityDashborad)