import React, { useState } from "react";
import { connect } from 'react-redux';
import moment from "moment";
import { Calendar as BigCalendar, momentLocalizer, Views } from "react-big-calendar";

const localizer = momentLocalizer(moment);

function Calendar({ times }) {
	let allViews = Object.keys(Views).map(k => Views[k])

	const ColoredDateCellWrapper = ({ children }) =>
		React.cloneElement(React.Children.only(children), {
			style: {
				backgroundColor: 'lightblue',
			},
		})
	
	return (
		<div className="page">
			<BigCalendar
				events={times}
				views={allViews}
				step={60}
				showMultiDayTimes
				defaultDate={new Date(2015, 3, 1)}
				style={{height: "70vh"}}
				components={{
					timeSlotWrapper: ColoredDateCellWrapper,
				}}
				localizer={localizer}
			/>
		</div>
	)
}

const mapStateToProps = (state) => ({
	times: state.time,
})

export default connect(mapStateToProps)(Calendar);