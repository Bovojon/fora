import React, { Fragment } from "react";
import moment from "moment";
import styled from 'styled-components';
import { Clear, Create } from '@material-ui/icons';
import { Box as MuiBox, Grid } from '@material-ui/core';
import { 
	Card as ReactCard,
  CardBody as ReactCardBody,
	Row as ReactCardRow
} from 'reactstrap';

const Card = styled(ReactCard)`
	padding: 0.7rem;
	margin-bottom: 5px;
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
`

const Box = styled(MuiBox)`
  height: 51vh;
`

const ListArea = styled(Grid)`
  height: 46vh;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 15px;
  padding: 0px 13px;
`

const Header = styled.span`
  font-size: 1.5em;
  text-align: center;
  color: #4299e1;
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

const TimesList = ({ times, handleDelete, currentUser, handleEditUserName, initialTimes }) => {
  return (
    <Box mt={4}>
      {initialTimes.length === 0 ?
        <Header><h4>Click and drag on the calendar to select times.</h4></Header>
        :
        <Fragment>
          <Header><h4>Selected times:</h4></Header>
          <ListArea>
            {times.map(time => {
              let userName;
              let canEditName = false;
              if (typeof time.creator?.name === "undefined") {
                userName = currentUser.name;
                canEditName = true;
              } else {
                userName = time.creator.name;
                if (currentUser.id === time.creator.id) {
                  userName = currentUser.name;
                  canEditName = true;
                }
              }
              if (moment(time.start).format('YYYY-MM-DD') !== moment(time.end).format('YYYY-MM-DD')){
                return (
                  <Card key={time.id} body outline color="primary">
                    <CardBody>
                      <TopRightArea>
                        <ClearIcon onClick={() => handleDelete(time.id)} color="action" />
                      </TopRightArea>
                      <Row>
                        <NameArea container direction="row" justify="flex-start" alignItems="center">
                          <NameHeader>{userName}</NameHeader>
                          {canEditName && <PencilIcon onClick={handleEditUserName} fontSize="small" />}
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
                  <Card key={time.id} body outline color="primary">
                    <CardBody>
                      <TopRightArea>
                        <ClearIcon onClick={() => handleDelete(time.id)} color="action" />
                      </TopRightArea>
                      <Row>
                        <NameArea container direction="row" justify="flex-start" alignItems="center">
                          <NameHeader>{userName}</NameHeader>
                          {canEditName && <PencilIcon onClick={handleEditUserName} fontSize="small" />}
                        </NameArea>
                      </Row>
                      <Row>
                        {moment(time.start).format('ddd, MMM D')}
                      </Row>
                      <Row>
                        {moment(time.start).format('h:mm a') + " – " + moment(time.end).format('h:mm a')} 
                      </Row>
                    </CardBody>
                  </Card>
                );
              }
            })}
          </ListArea>
        </Fragment>
      }
    </Box>
  );
}

export default TimesList;