import React, { useState } from "react";
import { connect } from 'react-redux';
import moment from "moment";
import { Grid, Box } from '@material-ui/core';
import { Card, CardTitle } from 'reactstrap';
import { 
	Calendar as BigCalendar, 
	momentLocalizer,
	Views,
} from "react-big-calendar";

import { addTime } from '../actions/time';

const localizer = momentLocalizer(moment);

function Calendar({ times, addTime }) {

	const handleSelectSlot = (selected) => {
		let { start, end } = selected;
		start = new Date(start);
		end = new Date(end);
		const newTime = { start, end }
		addTime(newTime)
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
						<Card key={time.start} body outline color="primary">
							<CardTitle>{String(time.start)}</CardTitle>
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
		addTime: (time) => { dispatch(addTime(time)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);