import React from "react";
import { Grid, GridColumn, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList"
import ActivityDetails from '../details/ActivityDetails'

import ActivityForm from '../form/ActivityForm'

interface Props {
	activites: Activity[];
	selectedActivity: Activity | undefined;
	selectActivity: (id:string) => void;
	cancelSelectActivity: () => void;
	editMode: boolean;
	openForm: (id: string) => void;
	closeForm: () => void;
	createOrEdit: (activty: Activity) => void;
	deleteActivity:(id:string) => void;
}

export default function ActivityDashborad(props : Props){
	return(
		<Grid>
			<Grid.Column width='10'>
			<List>
				<ActivityList activities={props.activites} selectActivity={props.selectActivity} deleteActivity={props.deleteActivity} />
			</List>				
			</Grid.Column>
			<GridColumn width="6">
				{props.selectedActivity && !props.editMode &&
				<ActivityDetails activity={props.selectedActivity} cancelSelectActivity={props.cancelSelectActivity}
				openForm={props.openForm}
				/>}
				{props.editMode &&
				<ActivityForm closeForm={props.closeForm} activity={props.selectedActivity} createOrEdit={props.createOrEdit}/>}
			</GridColumn>

		</Grid>
	)
}