import React from "react";
import { connect } from 'react-redux';
import moment from "moment";
import styled from 'styled-components'
import { Calendar as BigCalendar, momentLocalizer, Views } from "react-big-calendar";
import { Grid, Box } from '@material-ui/core';
import { Clear as ClearIcon } from '@material-ui/icons';
import { 
	Card as rCard,
	CardText,
	CardTitle as rCardTitle,
	CardBody as rCardBody,
	Row
} from 'reactstrap';

import { addTime, deleteTime } from '../actions/time';

const localizer = momentLocalizer(moment);

const Card = styled(rCard)`
	padding: 0.7rem;
	margin-bottom: 5px;
`;

const CardBody = styled(rCardBody)`
	padding: 0
`;

const CardTitle = styled(rCardTitle)`
	margin-left: 4px;
	margin-bottom: 4px;
	cursor: pointer;
`

function Calendar({ times, addTime, deleteTime }) {

	const handleSelectSlot = (selected) => {
		let { start, end } = selected;
		start = new Date(start);
		end = new Date(end);
		const newTime = { start, end }
		addTime(newTime)
	}

	const handleDelete = (id) => {
		deleteTime(id)
	}

	return (
		<Box alignItems="center" style={{ 'marginTop': '70px' }}>
			<Grid container spacing={3} direction="row" alignItems="center" justify="center">
				<Grid item xs={8}>
					<BigCalendar
						localizer={localizer}
						events={times}
						startAccessor="start"
						endAccessor="end"
						selectable
						defaultView={Views.WEEK}
						views={{ month: true, week: true }}
						style={{height: "70vh"}}
						scrollToTime={new Date(0, 0, 0, 7, 0, 0)}
						onSelectSlot={handleSelectSlot}
					/>
				</Grid>
				<Grid item xs={3}>
					{times.map(time => {
						return (
						<Card key={time.id} body outline color="primary">
							<CardBody>
								<CardTitle onClick={() => handleDelete(time.id)} className="float-right"> <ClearIcon /> </CardTitle>
								<CardText>
									<Row>
										{moment(time.start).format('ddd, MMM Do')}
									</Row>
									<Row>
										{moment(time.start).format('hh:mm a') + " – " + moment(time.end).format('hh:mm a')} 
									</Row>
								</CardText>
							</CardBody>
						</Card>
						)
					})}
				</Grid>
			</Grid>
		</Box>
	)
}

const mapStateToProps = (state) => ({
	times: state.time,
})

const mapDispatchToProps = (dispatch) => {
	return {
		addTime: (time) => { dispatch(addTime(time)) },
		deleteTime: (id) => { dispatch(deleteTime(id)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);