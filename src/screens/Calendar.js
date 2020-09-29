import React, { useState } from "react";
import { connect } from 'react-redux';
import moment from "moment";
import {
	Grid,
	Box
} from '@material-ui/core';
import { 
	Calendar as BigCalendar, 
	momentLocalizer,
	Views,
	Navigate
} from "react-big-calendar";

const localizer = momentLocalizer(moment);

function Calendar({ times }) {
	return (
		<Box alignItems="center" style={{ 'marginTop': '70px' }}>
		<Grid container spacing={3} direction="row" alignItems="center" justify="center">
			<Grid item xs={8}>
				<BigCalendar
					localizer={localizer}
					events={times}
					startAccessor="start"
					endAccessor="end"
					selectable={true}
					defaultView={Views.WEEK}
					views={{ month: true, week: true }}
					style={{height: "70vh"}}
					min={new Date(0, 0, 0, 6, 0, 0)}
					max={new Date(0, 0, 0, 23, 0, 0)}
					scrollToTime={new Date(0, 0, 0, 7, 0, 0)}
					/>
			</Grid>
			<Grid item xs={3}>
				Selected:
			</Grid>
    </Grid>
		</Box>
	)
}

const mapStateToProps = (state) => ({
	times: state.time,
})

export default connect(mapStateToProps)(Calendar);