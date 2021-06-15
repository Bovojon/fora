import React, { Fragment } from "react";
import moment from "moment";
import momentTimezone from "moment-timezone";
import styled from 'styled-components';
import { MoreHoriz, Add as MuiAddIcon } from '@material-ui/icons';
import {
  Box as MuiBox,
  Grid,
  IconButton as MuiIconButton
} from '@material-ui/core';
import {
	Card as ReactCard,
  CardBody as ReactCardBody,
	Row as ReactCardRow
} from 'reactstrap';

const Card = styled(ReactCard)`
  background-color: ${props => props.background};
  color: white;
  border: 0px;
	padding: 0.7rem;
  margin-bottom: 7px;
  cursor: pointer;
  width: ${props => props.width};
  margin-left: ${props => props.ml};

  &:hover {
    transition: all 0.2s ease-out;
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
    top: -3px;
  }
`;

const CardBody = styled(ReactCardBody)`
	padding: 0px;
`;

const Row = styled(ReactCardRow)`
  margin-left: 0px;
`

const TopRightArea = styled.span`
	position: absolute;
	right: 0;
	top: 0;
  padding-top: 0.7rem;	
	padding-right: 0.7rem;
`

const MoreIcon = styled(MoreHoriz)`
  cursor: pointer;
  color: white;
`

const Box = styled(MuiBox)`
  height: 50vh;
`

const ListArea = styled(Grid)`
  height: 45vh;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 15px;
  padding: 0px 13px;
`

const Header = styled.h5`
  font-size: 1.25em;
  text-align: center;
  color: #f2a099;
`

const NameHeader = styled.span`
	margin-right: 7px;
`

const NameArea = styled(Grid)`
	width: 70%;
`

const AddIconButton = styled(MuiIconButton)`
  background-color: #fddede;
  margin: 0px 0px 6px 7px;
  height: 32px;
  width: 32px;
  :focus {
    outline: none;
  }
`

const IconButton = styled(MuiIconButton)`
  :focus {
    outline: none;
  }
`

const AddIcon = styled(MuiAddIcon)`
  color: #4299e1 !important;
`

const HeaderGrid = styled(Grid)`
  margin-bottom: 5px;
`

const TimesList = ({ times, handleSelectEvent, handleEditUserName, currentUser, initialTimes, handleNavigate,
  isDifferentTimezone, calTimezone, setAvailabilityDialogOpen }) => {
  return (
    <Box mt={2}>
      <ListArea>
        <HeaderGrid container direction="row" justify="center" alignItems="center">
          <Header>Availability</Header>
          <AddIconButton onClick={() => setAvailabilityDialogOpen(true)} disableFocusRipple disableRipple>
            <AddIcon />
          </AddIconButton>
        </HeaderGrid>
        <Fragment>
          {times.map(time => {
            const eventStart = momentTimezone.tz(time.start, calTimezone);
            const eventEnd = momentTimezone.tz(time.end, calTimezone);
            let background = time.creator?.color;
            let width = time.id > 1000000 || (typeof time.id === "string" && time.id.charAt(0) === "U")  ? "90%" : "100%";
            let ml = time.id > 1000000 || (typeof time.id === "string" && time.id.charAt(0) === "U")  ? "5%" : "0";
            if (typeof background === "undefined") background = currentUser.color;
            let userName = typeof time.creator?.name === "undefined" || currentUser.id === time.creator.id ?
              currentUser.name
              :
              time.creator.name;
            if (typeof time.id === "string" && (time.id.charAt(0) === "C" || time.id.charAt(0) === "U")) {
              if (moment(eventStart).format('YYYY-MM-DD') !== moment(eventEnd).format('YYYY-MM-DD')) {
                return (
                  <Card key={time.id} onClick={(event) => handleNavigate(event, time)} body background="white"
                    style={{
                      background: "repeating-linear-gradient(45deg, white, #fddede 5px, white 5px, #fddede 10px)",
                      border: "1px solid #265985",
                      color: "#5f6368"
                    }}
                  >
                    <CardBody>
                      <TopRightArea>
                        <IconButton onClick={() => handleSelectEvent(time)} disableFocusRipple disableRipple>
                          <MoreIcon style={{ color: "#5f6368" }} />
                        </IconButton>
                      </TopRightArea>
                      <Row>
                        {moment(eventStart).format('MMM D') + " – " + moment(eventEnd).format('MMM D')}
                      </Row>
                      <Row>
                        <NameArea container direction="row" justify="flex-start" alignItems="center">
                          <NameHeader>{"\u200C"}</NameHeader>
                        </NameArea>
                      </Row>
                      <Row>
                        {isDifferentTimezone ?
                          <Fragment>({calTimezone})</Fragment>
                          :
                          null
                        }
                      </Row>
                    </CardBody>
                  </Card>
                );
              } else {
                return (
                  <Card key={time.id} onClick={(event) => handleNavigate(event, time)} body background="white" width={width} ml={ml}
                    style={{
                      background: "repeating-linear-gradient(45deg, white, #fddede 5px, white 5px, #fddede 10px)",
                      border: "1px solid #265985",
                      color: "#5f6368"
                    }}
                  >
                    <CardBody>
                      <TopRightArea>
                        <IconButton onClick={() => handleSelectEvent(time)} disableFocusRipple disableRipple>
                          <MoreIcon style={{ color: "#5f6368" }} />
                        </IconButton>
                      </TopRightArea>
                      <Row>
                        {moment(eventStart).format('ddd, MMM D')}
                      </Row>
                      <Row>
                        {moment(eventStart).format('h:mma') + " – " + moment(eventEnd).format('h:mma')}
                      </Row>
                      <Row>
                        {isDifferentTimezone ?
                          <Fragment>({calTimezone})</Fragment>
                          :
                          null
                        }
                      </Row>
                    </CardBody>
                  </Card>
                );
              }
            } else {
              if (moment(eventStart).format('YYYY-MM-DD') !== moment(eventEnd).format('YYYY-MM-DD')) {
                return (
                  <Card key={time.id} onClick={(event) => handleNavigate(event, time)} body background={background}>
                    <CardBody>
                      <TopRightArea>
                        {time.id < 1000000 && <IconButton onClick={() => handleSelectEvent(time)} disableFocusRipple disableRipple><MoreIcon /></IconButton>}
                      </TopRightArea>
                      <Row>
                        <NameArea container direction="row" justify="flex-start" alignItems="center">
                          <NameHeader>{userName}</NameHeader>
                        </NameArea>
                      </Row>
                      <Row>
                        {moment(eventStart).format('MMM D') + " – " + moment(eventEnd).format('MMM D')}
                      </Row>
                      <Row>
                        {isDifferentTimezone ?
                          <Fragment>({calTimezone})</Fragment>
                          :
                          null
                        }
                      </Row>
                    </CardBody>
                  </Card>
                );
              } else {
                return (
                  <Card key={time.id} onClick={(event) => handleNavigate(event, time)} body background={background} width={width} ml={ml}>
                    <CardBody>
                      <TopRightArea>
                        {time.id < 1000000 && <IconButton onClick={() => handleSelectEvent(time)} disableFocusRipple disableRipple><MoreIcon /></IconButton>}
                      </TopRightArea>
                      <Row>
                        <NameArea container direction="row" justify="flex-start" alignItems="center">
                          <NameHeader>{userName}</NameHeader>
                        </NameArea>
                      </Row>
                      <Row>
                        {moment(eventStart).format('ddd, MMM D')}
                      </Row>
                      <Row>
                        {moment(eventStart).format('h:mma') + " – " + moment(eventEnd).format('h:mma')}
                      </Row>
                      <Row>
                        {isDifferentTimezone ?
                          <Fragment>({calTimezone})</Fragment>
                          :
                          null
                        }
                      </Row>
                    </CardBody>
                  </Card>
                );
              }
            }
          })}
        </Fragment>
      </ListArea>
    </Box>
  );
}

export default TimesList;