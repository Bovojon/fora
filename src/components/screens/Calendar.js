import React, { useState } from "react";
import { connect } from 'react-redux';
import moment from "moment";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";

const localizer = momentLocalizer(moment);

function Calendar({ times }) {
	return (
		<div className="page">
			<BigCalendar 
				localizer={localizer}
				events={times}
				startAccessor="start"
				endAccessor="end"
				selectable={true}
				style={{height: "70vh"}}
			/>
		</div>
	)
}

const mapStateToProps = (state) => ({
	times: state.time,
})

export default connect(mapStateToProps)(Calendar);