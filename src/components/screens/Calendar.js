import React, { useState, useEffect, Fragment } from "react";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import axios from 'axios';
import { useParams } from "react-router-dom";
import moment from "moment";
import momentTimezone from "moment-timezone";
import styled from 'styled-components';
import { Calendar as BigCalendar, momentLocalizer, Views } from "react-big-calendar";
import { useTheme } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { addError } from '../../actions/errorActionCreators';
import {
	Grid, 
	Box as MuiBox,
	Paper as MuiPaper,
	Button,
	Select as MuiSelect,
	MenuItem,
	Tooltip,
	Divider,
	useMediaQuery,
	Snackbar
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
import EventClickForm from '../forms/EventClickForm';
import ImportTimesForm from '../forms/ImportTimesForm';
import EventDetails from '../EventDetails';
import SuccessNotification from '../notifications/SuccessNotification';
import ImportCalendar from '../ImportCalendar';
import { addTimePending, removeTimePending } from '../../actions/timeActionCreators';
import { fetchCalendarPending } from '../../actions/calendarActionCreators';
import { addEventPending } from '../../actions/eventActionCreators';
import { removeAuthCodeSuccess } from '../../actions/authActionCreators';
import '../animations/styles/loading.scss';

const localizer = momentLocalizer(moment);

const Paper = styled(MuiPaper)`
	height: 100%;
	margin-top: 5vh;
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
	color: white;
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
	const dateLabel = () => {
		const toolbarDate = moment(toolbar.date);
		if (calendarView === "day") return toolbarDate.format('MMM D, YYYY');
		return toolbarDate.format('MMM YYYY');
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
						<span>{dateLabel()}</span>
						<Button onClick={handleNextClick}><ArrowRightIcon /></Button>
					</Grid>
				</Grid>
				<Grid item md={1} xs={12}>
					<Select value={calendarView} onChange={handleCalendarViewChange}>
						<MenuItem value={'month'}>Month</MenuItem>
						<MenuItem value={'week'}>Week</MenuItem>
						<MenuItem value={'day'}>Day</MenuItem>
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

const Calendar = ({ initialTimes, calendar, currentUser, auth, eventObj, navigateTo, addTime, removeTime, fetchCalendarPending, addEvent, removeAuthCode, addError }) => {
	const [userFormOpen, setUserFormOpen] = useState(false);
	const [userLoginOpen, setUserLoginOpen] = useState(typeof currentUser.id === "undefined");
	const [eventClickFormOpen, setEventClickFormOpen] = useState(false);
	const [importDialogOpen, setImportDialogOpen] = useState(false);
	const [eventDetailsOpen, setEventDetailsOpen] = useState(false);

	const [times, setTimes] = useState(initialTimes);
	const [events, setEvents] = useState(times);
	const [isOwner, setIsOwner] = useState(false);
	const [timeSelectedObj, setTimeSelectedObj] = useState({});
	const [scrollToBottomOpen, setScrollToBottomOpen] = useState(true);
	const [importStartTime, setImportStartTime] = useState(new Date(moment(new Date()).subtract(1, 'day')));
	const [importEndTime, setImportEndTime] = useState(new Date(moment(new Date()).add(1, 'month')));
	const [importedEventDetails, setImportedEventDetails] = useState({})
	
	const { calendarId } = useParams();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	useEffect(() => {
		fetchCalendarPending(calendarId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => { setTimes(initialTimes) }, [initialTimes]);

	useEffect(() => {
		setUserFormOpen(typeof currentUser?.name === "undefined" ? false : currentUser.name.includes("Person"));
	}, [currentUser]);

	useEffect(() => {
		const importedEvents = calendar.importedEvents;
		if (typeof importedEvents === "undefined") {
			setEvents(times);
		} else {
			const newImportedEvents = importedEvents.map(event => {
				return {
					start: new Date(event.start.dateTime),
					end: new Date(event.end.dateTime),
					summary: event.summary,
					description: event.description,
					location: event.location
				}
			})
			setEvents([...times, ...newImportedEvents])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [times, calendar.importedEvents]);

	const getUrlAndRedirect = () => {
		axios({
			method: 'post',
			url: `${process.env.REACT_APP_URL}/auth/google/getUrl`
		}).then(response => {
			window.location.replace(response.data.url);
		}).catch(err =>{
			addError("Sorry, something went wrong. If you keep seeing this, please contact us at letsfora@gmail.com.");
			console.error(err);
		});
	}

	const handleDelete = (timeId) => { removeTime(timeId) }
	const handleEditUserName = () => { setUserFormOpen(true) }
  const handleUserFormClose = () => { setUserFormOpen(false) }
	const handleUserLoginClose = () => { setUserLoginOpen(false) }
	const handleEventClickFormClose = () => { setEventClickFormOpen(false) }
	const handleSelectSlot = (event) => {
		let { start, end } = event;
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
	const handleSelectEvent = (event, e) => {
		if (typeof event?.summary === "undefined") {
			if (e.target.id !== "pencilIcon" && e.target.id !== "clearIcon") {
				setIsOwner(currentUser.id === event.user_id);
				setTimeSelectedObj(event);
				const { start, end } = event;
				const newEventObj = {
					details: { start, end },
					calendar_id: calendar.id,
					user_id: currentUser.id
				}
				addEvent(newEventObj);
				setEventClickFormOpen(true);
			}
		} else {
			setImportedEventDetails(event);
			setEventDetailsOpen(true);
		}
	}
	const handleAddTime = (timeSelectedObj) => { handleSelectSlot(timeSelectedObj) }
	const handleScheduleEventClick = (eventObject) => {
		if (auth.code !== false) removeAuthCode();
		const redirectUrl = '/event';
		localStorage.setItem('fora', JSON.stringify({ calendar, currentUser, redirectUrl, eventObject }));
		getUrlAndRedirect();
	}
	const handleScrollToBottom = (event, reason) => {
    if (reason === 'clickaway') return;
    setScrollToBottomOpen(false);
	}
	const handleImportCalendarClick = () => { setImportDialogOpen(true) }
	const handleImportDialogClose = () => { setImportDialogOpen(false) }
	const handleEventDetailsClose = () => { setEventDetailsOpen(false) }
	const handleImportClick = () => {
		if (auth.code !== false) removeAuthCode();
		const timeZone = momentTimezone.tz.guess();
		const timeMin = importStartTime.toISOString();
		const timeMax = importEndTime.toISOString();
		const calendarDetails = { timeMin, timeMax, timeZone }
		const redirectUrl = `/${calendar.unique_id}`
		localStorage.setItem('fora', JSON.stringify({ calendar, currentUser, redirectUrl, calendarDetails }));
		getUrlAndRedirect();
	}

	const CustomEvent = ({ event }) => {
		if (typeof event?.summary === "undefined") {
			let userName;
			let canEdit = false;
			if (typeof event.creator?.name === "undefined") {
				userName = currentUser.name;
				canEdit = true;
			} else {
				userName = event.creator.name;
				if (currentUser.id === event.creator.id) {
					userName = currentUser.name;
					canEdit = true;
				}
			}
			return (
				<Grid container direction="column" justify="flex-start" alignItems="flex-start">
					<NameArea container direction="row" justify="flex-start" alignItems="center">
						<Header>{userName}</Header>
						{canEdit && <PencilIcon id="pencilIcon" onClick={handleEditUserName} fontSize="small" />}
					</NameArea>
					<TimeText>
						{moment(event.start).format('h:mma') + " – " + moment(event.end).format('h:mma')}
					</TimeText>
					{canEdit && <ClearIcon id="clearIcon" onClick={() => handleDelete(event.id)} />}
				</Grid>
			);
		}
		return (
			<Grid container direction="column" justify="flex-start" alignItems="flex-start">
				<NameArea container direction="row" justify="flex-start" alignItems="center">
					<Header>{event.summary}</Header>
				</NameArea>
				<TimeText>
					{moment(event.start).format('h:mma') + " – " + moment(event.end).format('h:mma')}
				</TimeText>
			</Grid>
		);
	}
	const getEventStyle = (event) => {
		let background = event.creator?.color;
		if (typeof background === "undefined") background = currentUser.color;
		const selectedStyle = {
			backgroundColor: background,
			borderRadius: '3px',
			opacity: 0.8,
			border: '0px',
			display: 'block'
		};
		const importedStyle = {
			backgroundColor: 'black',
			borderRadius: '3px',
			opacity: 1,
			border: `2px solid ${background}`,
			display: 'block'
		}
		if (typeof event?.summary === "undefined") return { style: selectedStyle }
		return { style: importedStyle }
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
								events={events}
								startAccessor="start"
								endAccessor="end"
								selectable
								style={{height: "85vh"}}
								defaultView={Views.WEEK}
								views={{ month: true, week: true, day: true }}
								scrollToTime={new Date(0, 0, 0, 7, 0, 0)}
								onSelectSlot={handleSelectSlot}
								onSelectEvent={handleSelectEvent}
								components = {{
									toolbar : CustomToolbar,
									event: CustomEvent,
									week: { header: CustomWeekHeader }
								}}
								formats={{
									dayFormat: 'ddd D',
									timeGutterFormat: 'h A'
								}}
								eventPropGetter={getEventStyle}
							/>
						</Grid>
						<Grid item md={3} xs={12}>
							<Grid container direction="column" justify="center" alignItems="center">
								<Paper elevation={0}>
									<ImportCalendar handleImportCalendarClick={handleImportCalendarClick} calendar={calendar} />
									<ParticipantsList
										participants={calendar.participants}
										calendarUniqueId={calendar.unique_id}
										currentUser={currentUser}
										handleEditUserName={handleEditUserName}
										initialTimes={initialTimes}
										setTimes={setTimes}
									/>
									<Divider />
									<TimesList
										times={times.sort(timeSorter)} 
										handleDelete={handleDelete} 
										currentUser={currentUser} 
										handleEditUserName={handleEditUserName} 
										initialTimes={initialTimes}
									/>
								</Paper>
							</Grid>
						</Grid>
					</Grid>
				}
			</Box>
			<UserForm handleDialogClose={handleUserFormClose} dialogIsOpen={userFormOpen} fullScreen={fullScreen} />
			<UserLogin handleDialogClose={handleUserLoginClose} dialogIsOpen={userLoginOpen} fullScreen={fullScreen} handleUserFormOpen={setUserFormOpen} />
			<EventClickForm handleDialogClose={handleEventClickFormClose} handleScheduleEventClick={handleScheduleEventClick} isOwner={isOwner} 
				eventObj={eventObj} handleAddTime={handleAddTime} dialogIsOpen={eventClickFormOpen} fullScreen={fullScreen} 
				handleDelete={handleDelete} timeSelectedObj={timeSelectedObj} />
			<ImportTimesForm handleImportClick={handleImportClick} dialogIsOpen={importDialogOpen} handleDialogClose={handleImportDialogClose}
				startDate={importStartTime} endDate={importEndTime} setStartDate={setImportStartTime} setEndDate={setImportEndTime} fullScreen={fullScreen} />
			<EventDetails dialogIsOpen={eventDetailsOpen} handleDialogClose={handleEventDetailsClose} eventObj={importedEventDetails} />
			<Box display={{ xs: 'block', md: 'none' }} m={1}>
				<Snackbar open={scrollToBottomOpen} autoHideDuration={10000} onClose={handleScrollToBottom}>
					<Alert onClose={handleScrollToBottom} severity="info" elevation={6} variant="filled">Scroll below the calendar to view others on this calendar and the selected times.</Alert>
				</Snackbar>
      </Box>
			<SuccessNotification />
		</Fragment>
	);
}

const mapStateToProps = (state) => {
  return {
		initialTimes: state.times,
		calendar: state.calendar,
		currentUser: state.user,
		auth: state.auth,
		eventObj: state.event
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		navigateTo: (route) => { dispatch(push(route)) },
		addTime: (timeObj) => { dispatch(addTimePending(timeObj)) },
		removeTime: (timeId) => { dispatch(removeTimePending(timeId)) },
		fetchCalendarPending: (calendarId) => { dispatch(fetchCalendarPending(calendarId)) },
		addEvent: (eventObj) => { dispatch(addEventPending(eventObj)) },
		removeAuthCode: () => { dispatch(removeAuthCodeSuccess()) },
		addError: (errorMessage) => { dispatch(addError(errorMessage)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);