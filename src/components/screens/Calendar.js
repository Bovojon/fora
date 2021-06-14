import React, { useState, useEffect, useRef, Fragment } from "react";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import axios from 'axios';
import { useParams } from "react-router-dom";
import moment from "moment";
import momentTimezone from "moment-timezone";
import styled from 'styled-components';
import tw from "twin.macro";
import { Calendar as BigCalendar, momentLocalizer, Views } from "react-big-calendar";
import { useTheme } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { addError } from '../../actions/errorActionCreators';
import { addSuccess } from '../../actions/successActionCreators';
import {
	Grid,
	Box as MuiBox,
	Paper as MuiPaper,
	Button,
	IconButton as MuiIconButton,
	Select as MuiSelect,
	MenuItem,
	Divider,
	useMediaQuery,
	Snackbar
} from '@material-ui/core';
import {
	ArrowRight as ArrowRightIcon,
	ArrowLeft as ArrowLeftIcon
} from '@material-ui/icons';

import ParticipantsList from '../ParticipantsList';
import TimesList from '../TimesList';
import UserForm from '../forms/UserForm';
import UserLogin from '../forms/UserLogin';
import EventClickForm from '../forms/EventClickForm';
import ImportTimesForm from '../forms/ImportTimesForm';
import AddAvailabilityForm from '../forms/AddAvailabilityForm';
import EventDetails from '../EventDetails';
import EventDialog from '../EventDialog';
import SuccessNotification from '../notifications/SuccessNotification';
import ImportCalendar from '../ImportCalendar';
import Timezone from '../Timezone';
import { addTimePending, removeTimePending } from '../../actions/timeActionCreators';
import { fetchCalendarPending } from '../../actions/calendarActionCreators';
import { addEventPending } from '../../actions/eventActionCreators';
import { removeAuthCodeSuccess } from '../../actions/authActionCreators';
import '../animations/styles/loading.scss';

const browserTimezone = momentTimezone.tz.guess();

const Paper = styled(MuiPaper)`
	height: 100%;
	margin-top: 5vh;
	width: 95%;
`

const Box = styled(MuiBox)`
	margin-top: 25px;
`

const ToolbarBox = tw.div`flex flex-row mb-3`;
const ToolbarItemLeft = tw.div`flex flex-auto justify-start`;
const ToolbarItemRight = tw.div`flex flex-auto justify-end`;
const CalNavigation = tw.div`flex flex-auto justify-start items-center`;
const DateLabel = styled.span`margin-left: 10px;`
const TodayButton = styled(Button)`
	margin-right: 12px;
	padding: 5px 7px;
	border-radius: 9999px;
	:focus {
    outline: none;
  }
`

const IconButton = styled(MuiIconButton)`
	width: 32px;
	height: 32px;
	padding: 0px;
	:focus {
    outline: none;
  }
`

const Select = styled(MuiSelect)`
	padding: 5px;
`

const NameArea = styled(Grid)`
	width: 70%;
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

const MidnightSlot = styled.span`
	background-color: #fff4dc;
	text-align: center;
	font-weight: bold;
`

const ShowTimeText = styled.span`
	color: #bdbdbd;
	text-align: center;
`

const timeSorter = (a, b) => {
  return moment(a.start).diff(b.start)
}

const differentDay = (start, end) => {
	if (moment(start).isSame(end, 'day')) {
		return false;
	}
	return true;
}

const breakDaysIntoHours = (timeObj) => {
	const newTimes = []
	const startTime = timeObj.start;
	const endTime = timeObj.end;
	let days = moment(endTime).diff(moment(startTime), 'days') + 1;
	if (days === 1) days = 2;
	let startTimeMO = moment(startTime);
	let endTimeMO = moment(startTime).endOf('day');
	let id = 1000000 + timeObj.id;
	for (let day=0; day<days; day++) {
		const start = new Date(startTimeMO);
		const end = new Date(endTimeMO);
		if (!moment(start).isSame(end)) {
			newTimes.push({...timeObj, id, start, end});
		}
		id += 100;
		startTimeMO = startTimeMO.add(1, 'day').startOf('day');
		endTimeMO = differentDay(startTimeMO, endTime) ? moment(startTimeMO).endOf('day') : moment(endTime);
	}
	if (endTimeMO.isSame(endTime)) {
		const start = new Date(startTimeMO);
		const end = new Date(endTimeMO);
		newTimes.push({...timeObj, id, start, end});
	}
	return newTimes;
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

const Calendar = ({ initialTimes, calendar, currentUser, auth, eventObj, navigateTo, addTime, removeTime, fetchCalendarPending, addEvent, removeAuthCode, addError, addSuccess }) => {
	const [calendarView, setCalendarView] = useState('week');
	const [userFormOpen, setUserFormOpen] = useState(false);
	const [userLoginOpen, setUserLoginOpen] = useState(typeof currentUser.id === "undefined");
	const [importDialogOpen, setImportDialogOpen] = useState(false);
	const [eventDetailsOpen, setEventDetailsOpen] = useState(false);
	const [eventDialogOpen, setEventDialogOpen] = useState(false);
	const [times, setTimes] = useState(initialTimes);
	const [sortedTimes, setSortedTimes] = useState(initialTimes);
	const [events, setEvents] = useState(times);
	const [isOwner, setIsOwner] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState({});
	const [scrollToBottomOpen, setScrollToBottomOpen] = useState(true);
	const [importStartTime, setImportStartTime] = useState(new Date(moment(new Date()).subtract(1, 'day')));
	const [importEndTime, setImportEndTime] = useState(new Date(moment(new Date()).add(1, 'month')));
	const [importedEventDetails, setImportedEventDetails] = useState({});
	const [localizer, setLocalizer] = useState(momentLocalizer(moment));
	const [calTimezone, setCalTimezone] = useState(browserTimezone);
	const [isDifferentTimezone, setIsDifferentTimezone] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [initialRender, setInitialRender] = useState(true);
	const [showTimes, setShowTimes] = useState(false);
	const [availabilityDialogOpen, setAvailabilityDialogOpen] = useState(false);
	
	const { calendarId } = useParams();
	const calRef = useRef(null);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	useEffect(() => {
		fetchCalendarPending(calendarId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSetTimesChange = (times) => {
		let newTimes = times;
		times.forEach(timeObj => {
			if (differentDay(timeObj.start, timeObj.end)) {
				newTimes = newTimes.concat(breakDaysIntoHours(timeObj));
			}
		});
		setTimes(newTimes);
		return newTimes;
	}

	useEffect(() => {
		const newTimes = handleSetTimesChange(initialTimes);
		const initialTimesCopy = [...newTimes];
		initialTimesCopy.sort(timeSorter);
		setSortedTimes(initialTimesCopy);
		if (initialTimesCopy.length > 0 && initialRender) {
			setStartDate(initialTimesCopy[0]?.start)
			setInitialRender(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialTimes]);

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
			addError("Sorry, something went wrong. Please email us at letsfora@gmail.com.");
			console.error(err);
		});
	}

	const handleDelete = (timeId) => { removeTime(timeId) }
	const handleEditUserName = () => { setUserFormOpen(true) }
  const handleUserFormClose = () => { setUserFormOpen(false) }
	const handleUserLoginClose = () => { setUserLoginOpen(false) }
	const handleSelectSlot = (event) => {
		let { start, end } = event;
		if (moment(start).isSame(end) || calendarView === "month") {
			end = moment(end).endOf('day');
		}
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
			setIsOwner(currentUser.id === event.user_id);
			const { start, end, creator } = event;
			let userName = typeof creator?.name === "undefined" || currentUser.id === creator.id ? currentUser.name : creator.name;
			let background = typeof creator?.color === "undefined" ? currentUser.color : creator.color;
			setSelectedEvent({...event, userName, background});
			const newEventObj = {
				details: { start, end },
				calendar_id: calendar.id,
				user_id: currentUser.id
			}
			addEvent(newEventObj);
			setEventDialogOpen(true);
		} else {
			setImportedEventDetails(event);
			setEventDetailsOpen(true);
		}
	}
	const handleNavigate = (event, timeClicked) => {
		if (event.target.nodeName !== "path" && event.target.nodeName !== "svg") {
			calRef.current.scrollIntoView();
			setStartDate(timeClicked.start);
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
	const handleEventDialogClose = () => { setEventDialogOpen(false) }
	const handleAvailabilityDialogClose = () => { setAvailabilityDialogOpen(false) }
	const handleShowTimeChange = (e) => { setShowTimes(!showTimes) }
	const handleImportClick = () => {
		if (auth.code !== false) removeAuthCode();
		const timeMin = importStartTime.toISOString();
		const timeMax = importEndTime.toISOString();
		const calendarDetails = { timeMin, timeMax, timeZone: browserTimezone }
		const redirectUrl = `/${calendar.unique_id}`
		localStorage.setItem('fora', JSON.stringify({ calendar, currentUser, redirectUrl, calendarDetails }));
		getUrlAndRedirect();
	}
	const handleTimezoneChange = (calTimezone) => {
		momentTimezone.tz.setDefault(calTimezone);
		setLocalizer(momentLocalizer(momentTimezone));
		calRef.current.scrollIntoView();
		setIsDifferentTimezone(browserTimezone !== calTimezone ? true : false)
		if (momentTimezone.tz(calTimezone).format('Z').split(":")[1] !== "00") {
			addError(`Sorry, Fora does not currently support ${calTimezone}.`);
		} else {
			addSuccess(`Changed timezone to ${calTimezone}`);
		}
	}

	const CustomToolbar = (toolbar) => {
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
				<ToolbarItemLeft>
					<TodayButton onClick={handleTodayClick} variant="outlined">Today</TodayButton>
					<CalNavigation>
						<IconButton onClick={handleBackClick}><ArrowLeftIcon /></IconButton>
						<IconButton onClick={handleNextClick}><ArrowRightIcon /></IconButton>
						<DateLabel>{dateLabel()}</DateLabel>
					</CalNavigation>
				</ToolbarItemLeft>
				<ToolbarItemRight>
					<Select value={calendarView} onChange={handleCalendarViewChange}>
						<MenuItem value={'month'}>Month</MenuItem>
						<MenuItem value={'week'}>Week</MenuItem>
						<MenuItem value={'day'}>Day</MenuItem>
					</Select>
				</ToolbarItemRight>
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
	const CustomEvent = ({ event }) => {
		const eventStart = momentTimezone.tz(event.start, calTimezone);
		const eventEnd = momentTimezone.tz(event.end, calTimezone);
		if (typeof event?.summary === "undefined") {
			let userName;
			if (typeof event.creator?.name === "undefined" || currentUser.id === event.creator.id) {
				userName = currentUser.name;
			} else {
				userName = event.creator.name;
			}
			return (
				<Grid container direction="column" justify="flex-start" alignItems="flex-start">
					<NameArea container direction="row" justify="flex-start" alignItems="center">
						<Header>{userName}</Header>
					</NameArea>
					<TimeText>
						{moment(eventStart).format('h:mma') + " – " + moment(eventEnd).format('h:mma')}
					</TimeText>
					<TimeText>
						{moment(eventStart).format('YYYY-MM-DD') !== moment(eventEnd).format('YYYY-MM-DD') ?
							<Fragment>{moment(eventStart).format('MMM D') + " – " + moment(eventEnd).format('MMM D')}</Fragment>
							:
							<Fragment>{moment(eventStart).format('ddd, MMM D')}</Fragment>
						}
					</TimeText>
					<TimeText>
						{isDifferentTimezone ?
							<Fragment>({calTimezone})</Fragment>
							:
							null
						}
					</TimeText>
				</Grid>
			);
		}
		return (
			<Grid container direction="column" justify="flex-start" alignItems="flex-start">
				<NameArea container direction="row" justify="flex-start" alignItems="center">
					<Header>{event.summary}</Header>
				</NameArea>
				<TimeText>
					{moment(eventStart).format('h:mma') + " – " + moment(eventEnd).format('h:mma')}
				</TimeText>
				<TimeText>
					{moment(eventStart).format('YYYY-MM-DD') !== moment(eventEnd).format('YYYY-MM-DD') ?
						<Fragment>{moment(eventStart).format('MMM D') + " – " + moment(eventEnd).format('MMM D')}</Fragment>
						:
						<Fragment>{moment(eventStart).format('ddd, MMM D')}</Fragment>
					}
				</TimeText>
				<TimeText>
					{isDifferentTimezone ?
						<Fragment>({calTimezone})</Fragment>
						:
						null
					}
				</TimeText>
			</Grid>
		);
	}
	const CustomTimeSlotWrapper = (props) => {
		const isNonGutter = typeof props.children.props.children === "undefined";
		if (isDifferentTimezone) {
			const propsCopy = {...props};
			propsCopy.value = momentTimezone.tz(props.value, calTimezone);
			if (propsCopy.value.toString().includes("00:00:00")) {
				if (isNonGutter) {
					return <MidnightSlot>{propsCopy.children}{moment(propsCopy.value).format('ddd D')}</MidnightSlot>;
				}
				return <MidnightSlot>{propsCopy.children.props.children}{"\u200C"}</MidnightSlot>;
			} else if (showTimes && isNonGutter) {
				return <ShowTimeText>{propsCopy.children}{moment(propsCopy.value).format('ddd D')}</ShowTimeText>;
			}
		}
		return <Fragment>{props.children}</Fragment>
	}
	const getEventStyle = (event) => {
		let background = event.creator?.color;
		if (typeof background === "undefined") background = currentUser.color;
		const selectedStyle = {
			backgroundColor: background,
			borderRadius: '3px',
			opacity: 0.8,
			border: '0px',
			display: 'block',
			overflow: 'auto'
		};
		const importedStyle = {
			backgroundColor: 'black',
			borderRadius: '3px',
			opacity: 1,
			border: `3px solid ${background}`,
			display: 'block',
			overflow: 'auto'
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
						<Grid item md={8} xs={12} ref={calRef}>
							<BigCalendar
								localizer={localizer}
								events={events}
								startAccessor="start"
								endAccessor="end"
								selectable
								style={{height: "85vh"}}
								defaultView={Views.WEEK}
								views={{ month: true, week: true, day: true }}
								date={startDate}
								onNavigate={date => { setStartDate(date) }}
								scrollToTime={startDate}
								onSelectSlot={handleSelectSlot}
								onSelectEvent={handleSelectEvent}
								components = {{
									toolbar : CustomToolbar,
									event: CustomEvent,
									timeSlotWrapper: CustomTimeSlotWrapper,
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
									<ImportCalendar handleImportCalendarClick={handleImportCalendarClick} />
									<Divider />
									<Timezone
										handleTimezoneChange={handleTimezoneChange}
										calTimezone={calTimezone}
										browserTimezone={browserTimezone}
										setCalTimezone={setCalTimezone}
										handleShowTimeChange={handleShowTimeChange}
										showTimes={showTimes}
									/>
									<Divider />
									<ParticipantsList
										participants={calendar.participants}
										calendarUniqueId={calendar.unique_id}
										currentUser={currentUser}
										handleEditUserName={handleEditUserName}
										initialTimes={initialTimes}
										handleSetTimesChange={handleSetTimesChange}
									/>
									<Divider />
									<TimesList
										times={sortedTimes}
										handleSelectEvent={handleSelectEvent}
										handleEditUserName={handleEditUserName}
										currentUser={currentUser}
										initialTimes={initialTimes}
										handleNavigate={handleNavigate}
										isDifferentTimezone={isDifferentTimezone}
										calTimezone={calTimezone}
										setAvailabilityDialogOpen={setAvailabilityDialogOpen}
									/>
								</Paper>
							</Grid>
						</Grid>
					</Grid>
				}
			</Box>
			<UserForm handleDialogClose={handleUserFormClose} dialogIsOpen={userFormOpen} fullScreen={fullScreen} />
			<UserLogin handleDialogClose={handleUserLoginClose} dialogIsOpen={userLoginOpen} fullScreen={fullScreen} 
				handleUserFormOpen={setUserFormOpen} 
			/>
			<ImportTimesForm handleImportClick={handleImportClick} dialogIsOpen={importDialogOpen} handleDialogClose={handleImportDialogClose}
				startDate={importStartTime} endDate={importEndTime} setStartDate={setImportStartTime} setEndDate={setImportEndTime} 
				fullScreen={fullScreen} 
			/>
			<EventDetails dialogIsOpen={eventDetailsOpen} handleDialogClose={handleEventDetailsClose} eventObj={importedEventDetails} />
			<EventDialog dialogIsOpen={eventDialogOpen} handleDialogClose={handleEventDialogClose} isOwner={isOwner} calTimezone={calTimezone}
				handleScheduleEventClick={handleScheduleEventClick} handleAddTime={handleAddTime} handleDelete={handleDelete}
				selectedEvent={selectedEvent} eventObj={eventObj}
			/>
			<AddAvailabilityForm dialogIsOpen={availabilityDialogOpen} handleDialogClose={handleAvailabilityDialogClose} handleAddTime={handleAddTime} />
			<Box display={{ xs: 'block', md: 'none' }} m={1}>
				<Snackbar open={scrollToBottomOpen} autoHideDuration={3000} onClose={handleScrollToBottom}>
					<Alert onClose={handleScrollToBottom} severity="info" elevation={6} variant="filled">
						Scroll below to view more details.
					</Alert>
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
		addError: (errorMessage) => { dispatch(addError(errorMessage)) },
		addSuccess: (successMessage) => { dispatch(addSuccess(successMessage)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);