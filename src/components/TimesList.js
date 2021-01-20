import React, { Fragment } from "react";
import moment from "moment";
import styled from 'styled-components';
import { Clear, Create } from '@material-ui/icons';
import {
  Box as MuiBox,
  Grid,
  Paper as MuiPaper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Checkbox,
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
  margin-bottom: 5px;
  cursor: pointer;
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

const ClearIcon = styled(Clear)`
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

const Header = styled.h4`
  font-size: 1.5em;
  text-align: center;
  color: #4299e1;
`

const LightText = styled.p`
  color: #5f6368;
  font: 400 15px / 20px Roboto, sans-serif;
  text-align: center
`

const PencilIcon = styled(Create)`
  cursor: pointer;
	display: none;
  height: 60%;
`

const NameHeader = styled.span`
	margin-right: 7px;
`

const NameArea = styled(Grid)`
	width: 70%;

	&:hover ${PencilIcon} {
    display: block;
  }
`

const Paper = styled(MuiPaper)`
  padding: 15px;
  margin-bottom: 10px;
`

const TimesList = ({ times, handleDelete, handleSelectEvent, handleEditUserName, currentUser, initialTimes }) => {
  return (
    <Box mt={2}>
      <ListArea>
      {initialTimes.length === 0 ?
        <Fragment>
          <Header>Welcome to your new Fora calendar!</Header>
          <LightText>Here are some quick tips to help you get started:</LightText>
          <Paper variant="outlined">
            <List>
              <ListItem key={1}>
                <ListItemAvatar>
                  <Checkbox edge="end" checked={true} color="default" />
                </ListItemAvatar>
                <ListItemText primary={"Click and drag on the calendar to pick new times."} />
              </ListItem>
              <ListItem key={2}>
                <ListItemAvatar>
                  <Checkbox edge="end" checked={true} color="default" />
                </ListItemAvatar>
                <ListItemText primary={"Click on a selected time to remove it or to schedule a new event."} />
              </ListItem>
            </List>
          </Paper>
        </Fragment>
        :
        <Fragment>
          <Header>Selected times:</Header>
          {times.map(time => {
            let userName;
            let canEdit = false;
            let background = time.creator?.color;
            if (typeof background === "undefined") background = currentUser.color;
            if (typeof time.creator?.name === "undefined") {
              userName = currentUser.name;
              canEdit = true;
            } else {
              userName = time.creator.name;
              if (currentUser.id === time.creator.id) {
                userName = currentUser.name;
                canEdit = true;
              }
            }
            if (moment(time.start).format('YYYY-MM-DD') !== moment(time.end).format('YYYY-MM-DD')){
              return (
                <Card key={time.id} onClick={(event) => handleSelectEvent(time, event)} body background={background}>
                  <CardBody>
                    <TopRightArea>
                      {canEdit && <ClearIcon id="clearIcon" onClick={() => handleDelete(time.id)} />}
                    </TopRightArea>
                    <Row>
                      <NameArea container direction="row" justify="flex-start" alignItems="center">
                        <NameHeader>{userName}</NameHeader>
                        {canEdit && <PencilIcon id="pencilIcon" onClick={handleEditUserName} fontSize="small" />}
                      </NameArea>
                    </Row>
                    <Row>
                      {moment(time.start).format('MMM D') + " – " + moment(time.end).format('MMM D')}
                    </Row>
                  </CardBody>
                </Card>
              );
            } else {
              return (
                <Card key={time.id} onClick={(event) => handleSelectEvent(time, event)} body background={background}>
                  <CardBody>
                    <TopRightArea>
                      {canEdit && <ClearIcon id="clearIcon" onClick={() => handleDelete(time.id)} />}
                    </TopRightArea>
                    <Row>
                      <NameArea container direction="row" justify="flex-start" alignItems="center">
                        <NameHeader>{userName}</NameHeader>
                        {canEdit && <PencilIcon id="pencilIcon" onClick={handleEditUserName} fontSize="small" />}
                      </NameArea>
                    </Row>
                    <Row>
                      {moment(time.start).format('ddd, MMM D')}
                    </Row>
                    <Row>
                      {moment(time.start).format('h:mma') + " – " + moment(time.end).format('h:mma')}
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