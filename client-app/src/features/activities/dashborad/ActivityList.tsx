import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { UseStore } from "../../../app/stores/store";
interface Props {



}

export default function ActivityList(props: Props) {

	const[target,setTarger] = useState('')
	function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>,id:string){
		setTarger(e.currentTarget.name)
		deleteActivity(id)
	}
	const{activityStore} = UseStore()
	const{loading,deleteActivity,activitiesByDate} = activityStore

	return (
		<Segment>
			<Item.Group divided>
				{activitiesByDate.map((activitiy) => (
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
								<Button as={Link} to={`/activities/${activitiy.id}`} floated='right' content='View' color='blue' />
								<Button
									name={activitiy.id}
									loading={loading && target === activitiy.id}
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