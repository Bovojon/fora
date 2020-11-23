import React, { useState, useEffect, Fragment } from "react";
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import moment from "moment";
import styled from 'styled-components';
import { Calendar as BigCalendar, momentLocalizer, Views } from "react-big-calendar";
import { useTheme } from '@material-ui/core/styles';
import { 
	Grid, 
	Box as MuiBox, 
	Paper as MuiPaper,
	Button,
	Select as MuiSelect,
	MenuItem,
	Tooltip,
	Divider,
	useMediaQuery
} from '@material-ui/core';
import {
	ArrowRight as ArrowRightIcon,
	ArrowLeft as ArrowLeftIcon,
	Today as TodayIcon,
	Clear,
	Create
} from '@material-ui/icons';

import ParticipantsList from '../ParticipantsList';
import TimesList from '../TimesList';
import UserForm from '../forms/UserForm';
import UserLogin from '../forms/UserLogin';
import { addTimePending, removeTimePending } from '../../actions/timeActionCreators';
import { fetchCalendarPending } from '../../actions/calendarActionCreators';
import '../animations/styles/loading.scss';

const localizer = momentLocalizer(moment);

const Paper = styled(MuiPaper)`
	height: 80vh;
	margin-top: 5vh;
	padding: 14px;
	width: 95%;
`

const Box = styled(MuiBox)`
	margin-top: 25px;
`

const ToolbarBox = styled(MuiBox)`
	margin-bottom: 10px;
`

const Select = styled(MuiSelect)`
	padding: 5px;
`

const ClearIcon = styled(Clear)`
	position: absolute;
	right: 0;
	top: 0;
  cursor: pointer;
`

const PencilIcon = styled(Create)`
	width: 13%;
  height: 15%;
	display: none;
`

const NameArea = styled(Grid)`
	width: 70%;

	&:hover ${PencilIcon} {
    display: block;
  }
`

const Header = styled.span`
  color: #FFFFFF;
  font: 400 14px / 20px Roboto, sans-serif;
	margin-right: 5px;
`

const TimeText = styled.span`
  color: #FFFFFF;
  font: 400 12px / 20px Roboto, sans-serif;
`

const timeSorter = (a, b) => {
  return moment(a.start).diff(b.start)
}

const Loading = () => {
	return (
		<div className="loader-wrapper">
			<div className="loader">
				<div className="roller"></div>
				<div className="roller"></div>
			</div>
			<div id="loader2" className="loader">
				<div className="roller"></div>
				<div className="roller"></div>
			</div>
			<div id="loader3" className="loader">
				<div className="roller"></div>
				<div className="roller"></div>
			</div>
		</div>
	);
}

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
				<Grid item md={1} xs={12}>
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

const CustomWeekHeader = ({ label }) => {
	const labels = label.split(" ");
	return (
		<Grid container direction="column" justify="center" alignItems="center">
			<Grid item xs={12}>
				{labels[0]}
			</Grid>
			<Grid item xs={12}>
				{labels[1]}
			</Grid>
		</Grid>
	);
}

const Calendar = ({ times, calendar, currentUser, addTime, removeTime, fetchCalendarPending }) => {
	const { calendarId } = useParams();
	const [userFormOpen, setUserFormOpen] = useState(false);
	const [userLoginOpen, setUserLoginOpen] = useState(typeof currentUser.id === "undefined");
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	useEffect(() => {
		fetchCalendarPending(calendarId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const color = "#4299e1"

	const handleSelectSlot = (selected) => {
		let { start, end } = selected;
		start = new Date(start);
		end = new Date(end);
		const newTime = { 
			start, 
			end, 
			calendar_id: calendar.id, 
			user_id: currentUser.id 
		}
		addTime(newTime);
	}
	const handleDelete = (timeId) => {
		removeTime(timeId);
	}
	const handleEditUserName = () => {
    setUserFormOpen(true);
  };
  const handleUserFormClose = () => {
    setUserFormOpen(false);
	};
	const handleUserLoginClose = () => {
    setUserLoginOpen(false);
  };

	const CustomEvent = ({ event }) => {
		let userName;
		let canEditName = false;
		if (typeof event.creator?.name === "undefined") {
			userName = currentUser.name;
			canEditName = true;
		} else {
			userName = event.creator.name;
			if (currentUser.id === event.creator.id) {
				userName = currentUser.name;
				canEditName = true;
			}
		}
		return (
			<Grid container direction="column" justify="flex-start" alignItems="flex-start">
				<NameArea container direction="row" justify="flex-start" alignItems="center">
					<Header>{userName}</Header>
					{canEditName ?
						<PencilIcon onClick={handleEditUserName} fontSize="small" />
						:
						null
					}
				</NameArea>
				<TimeText>
					{moment(event.start).format('h:mm a') + " – " + moment(event.end).format('h:mm a')} 
				</TimeText>
				<ClearIcon onClick={() => handleDelete(event.id)} color="action" />
			</Grid>
		);
	}
	const getEventStyle = (color) => {
		const style = {
			backgroundColor: color,
			borderRadius: '3px',
			opacity: 0.5,
		};
		return {
				style: style
		};
	};

	return (
		<Fragment>
			<Box alignItems="center">
				{calendar.status.isLoading ?
					<Loading />
					:
					<Grid container spacing={3} direction="row" alignItems="flex-start" justify="center">
						<Grid item md={8} xs={12}>
							<BigCalendar
								localizer={localizer}
								events={times}
								startAccessor="start"
								endAccessor="end"
								selectable
								style={{height: "85vh"}}
								defaultView={Views.WEEK}
								views={{ month: true, week: true }}
								scrollToTime={new Date(0, 0, 0, 7, 0, 0)}
								onSelectSlot={handleSelectSlot}
								components = {{ 
									toolbar : CustomToolbar,
									event: CustomEvent,
									week: { header: CustomWeekHeader }
								}}
								formats={{
									dayFormat: 'ddd D',
									timeGutterFormat: 'h A'
								}}
								eventPropGetter={() => getEventStyle(color)}
							/>
						</Grid>
						<Grid item md={3} xs={12}>
							<Grid container direction="column" justify="center" alignItems="center">
								<Paper variant="outlined">
									<ParticipantsList participants={calendar.participants} calendarUniqueId={calendar.unique_id} currentUser={currentUser} handleEditUserName={handleEditUserName} />
									<Divider />
									<TimesList times={times.sort(timeSorter)} handleDelete={handleDelete} currentUser={currentUser} handleEditUserName={handleEditUserName} />
								</Paper>
							</Grid>
						</Grid>
					</Grid>
				}
			</Box>
			<UserForm handleDialogClose={handleUserFormClose} dialogIsOpen={userFormOpen} fullScreen={fullScreen} />
			<UserLogin handleDialogClose={handleUserLoginClose} dialogIsOpen={userLoginOpen} fullScreen={fullScreen} handleUserFormOpen={setUserFormOpen} />
		</Fragment>
	);
}

const mapStateToProps = (state) => {
  return {
		times: state.times,
		calendar: state.calendar,
		currentUser: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		addTime: (timeObj) => { dispatch(addTimePending(timeObj)) },
		removeTime: (timeId) => { dispatch(removeTimePending(timeId)) },
		fetchCalendarPending: (calendarId) => { dispatch(fetchCalendarPending(calendarId)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);