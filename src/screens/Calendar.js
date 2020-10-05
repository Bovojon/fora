import React, { useState } from "react";
import { connect } from 'react-redux';
import moment from "moment";
import styled from 'styled-components'
import { Calendar as BigCalendar, momentLocalizer, Views } from "react-big-calendar";
import { 
	Grid, 
	Box as MuiBox, 
	Paper as MuiPaper,
	Button,
	Select as MuiSelect,
	MenuItem,
	Tooltip
} from '@material-ui/core';
import { 
	Clear as ClearIcon,
	ArrowRight as ArrowRightIcon,
	ArrowLeft as ArrowLeftIcon,
	Today as TodayIcon,
} from '@material-ui/icons';
import { 
	Card as ReactCard,
	CardTitle as ReactCardTitle,
	CardBody as ReactCardBody,
	Row
} from 'reactstrap';

import { addTime, deleteTime } from '../actions/time';

const localizer = momentLocalizer(moment);

const Card = styled(ReactCard)`
	padding: 0.7rem;
	margin-bottom: 5px;
`;

const CardBody = styled(ReactCardBody)`
	padding: 0
`;

const CardTitle = styled(ReactCardTitle)`
	margin-left: 4px;
	margin-bottom: 4px;
	cursor: pointer;
`

const Paper = styled(MuiPaper)`
	height: 65vh;
	overflow: auto;
	margin-top: 5vh;
	padding: 14px;
`

const ShortPaper = styled(MuiPaper)`
	padding: 20px;
	height: 15vh;
	display: flex;
  justify-content: center;
  align-items: center;
`

const Box = styled(MuiBox)`
	margin-top: 50px;
`

const ToolbarBox = styled(MuiBox)`
	margin-bottom: 10px;
`

const Select = styled(MuiSelect)`
	padding: 5px;
`

const CustomToolbar = (toolbar) => {
	const [calendarView, setCalendarView] = useState('week');

	const handleCalendarViewChange = (e) => {
		const view = e.target.value
		setCalendarView(view);
		toolbar.onView(view);
	}

	const handleBackClick = () => { toolbar.onNavigate('PREV'); };

	const handleNextClick = () => { toolbar.onNavigate('NEXT'); };

	const handleTodayClick = () => { toolbar.onNavigate('TODAY'); };

	const monthYearLabel = () => {
		const toolbarDate = moment(toolbar.date);
		return toolbarDate.format('MMM') + ' ' + toolbarDate.format('YYYY')
  };

	return (
		<ToolbarBox>
			<Grid container direction="row" justify="space-between" alignItems="center">
				<Grid item md={2} xs={12}>
					<Tooltip title="Today">
						<Button onClick={handleTodayClick}><TodayIcon alt="Today" /></Button>
					</Tooltip>
				</Grid>

				<Grid item md={4} xs={12}>
					<Grid container direction="row" justify="space-between" alignItems="center">
						<Button onClick={handleBackClick}><ArrowLeftIcon /></Button>
						<span>{monthYearLabel()}</span>
						<Button onClick={handleNextClick}><ArrowRightIcon /></Button>
					</Grid>
				</Grid>

				<Grid item md={1} xs={12}>
					<Select value={calendarView} onChange={handleCalendarViewChange}>
						<MenuItem value={'week'}>Week</MenuItem>
						<MenuItem value={'month'}>Month</MenuItem>
					</Select>
				</Grid>
			</Grid>
		</ToolbarBox>
	)
}

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
		<Box alignItems="center">
			<Grid container spacing={3} direction="row" alignItems="center" justify="center">
				<Grid item md={8} xs={12}>
					<BigCalendar
						localizer={localizer}
						events={times}
						startAccessor="start"
						endAccessor="end"
						selectable
						style={{height: "70vh"}}
						defaultView={Views.WEEK}
						views={{ month: true, week: true }}
						scrollToTime={new Date(0, 0, 0, 7, 0, 0)}
						onSelectSlot={handleSelectSlot}
						components = {{ toolbar : CustomToolbar }}
						formats={{ dayFormat: 'ddd D' }}
					/>
				</Grid>
				<Grid item md={3} xs={12}>
					{
						times.length === 0 ? 
						<ShortPaper>
							<MuiBox m={2} style={{ fontSize: '18px', textAlign: 'center' }}>
								Select times that work for you.
							</MuiBox>
						</ShortPaper>
						:
						<Paper variant="outlined">
							{times.map(time => {
								return (
								<Card key={time.id} body outline color="primary">
									<CardBody>
										<CardTitle onClick={() => handleDelete(time.id)} className="float-right"> <ClearIcon /> </CardTitle>
										<Row>
											{moment(time.start).format('ddd, MMM Do')}
										</Row>
										<Row>
											{moment(time.start).format('h:mm a') + " – " + moment(time.end).format('h:mm a')} 
										</Row>
									</CardBody>
								</Card>
							)})}
						</Paper>
					}
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