import React, { Fragment } from "react";
import moment from "moment";
import momentTimezone from "moment-timezone";
import styled from 'styled-components';
import { MoreHoriz } from '@material-ui/icons';
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

const LightText = styled.p`
  color: #5f6368;
  font: 400 15px / 20px Roboto, sans-serif;
  text-align: center
`

const NameHeader = styled.span`
	margin-right: 7px;
`

const NameArea = styled(Grid)`
	width: 70%;
`

const IconButton = styled(MuiIconButton)`
  :focus {
    outline: none;
  }
`

const TimesList = ({ times, handleSelectEvent, handleEditUserName, currentUser, initialTimes, handleNavigate, isDifferentTimezone, calTimezone }) => {
  return (
    <Box mt={2}>
      <ListArea>
        <Header>Availability</Header>
        {initialTimes.length === 0 ?
          <LightText>Click and drag on the calendar to select availability.</LightText>
          :
          <Fragment>
            <LightText>Click on an availability slot to schedule an event.</LightText>
            {times.map(time => {
              const eventStart = momentTimezone.tz(time.start, calTimezone);
              const eventEnd = momentTimezone.tz(time.end, calTimezone);
              let background = time.creator?.color;
              let width = time.id < 1000000 ? "100%" : "90%";
              let ml = time.id < 1000000 ? "0" : "5%";
              if (typeof background === "undefined") background = currentUser.color;
              let userName = typeof time.creator?.name === "undefined" || currentUser.id === time.creator.id ?
                currentUser.name
                :
                time.creator.name;
              if (moment(eventStart).format('YYYY-MM-DD') !== moment(eventEnd).format('YYYY-MM-DD')){
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
            })}
          </Fragment>
        }
      </ListArea>
    </Box>
  );
}

export default TimesList;