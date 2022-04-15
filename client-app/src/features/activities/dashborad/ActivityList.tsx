import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
interface Props {

	activities: Activity[];
	selectActivity: (id: string) => void;
	deleteActivity: (id: string) => void;
	submitting: boolean;
}

export default function ActivityList(props: Props) {

	const[target,setTarger] = useState('')
	function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>,id:string){
		setTarger(e.currentTarget.name)
		props.deleteActivity(id)
	}

	return (
		<Segment>
			<Item.Group divided>
				{props.activities.map((activitiy) => (
					<Item key={activitiy.id}>
						<Item.Content>
							<Item.Header as='a'>
								{activitiy.title}
							</Item.Header>
							<Item.Meta>
								{activitiy.date}
							</Item.Meta>
							<Item.Description>
								<div>{activitiy.description}</div>
								<div>{activitiy.city}, {activitiy.venue}</div>
							</Item.Description>
							<Item.Extra>
								<Button onClick={() => props.selectActivity(activitiy.id)} floated='right' content='View' color='blue' />
								<Button
									name={activitiy.id}
									loading={props.submitting && target === activitiy.id}
									onClick={(e) => handleActivityDelete(e,activitiy.id)}
									floated='right'
									content='Delete'
									color='red' />
								<Label basic content={activitiy.category} />
							</Item.Extra>
						</Item.Content>

					</Item>
				))}
			</Item.Group>
		</Segment>
	)
}