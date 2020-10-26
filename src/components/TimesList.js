import React from "react";
import moment from "moment";
import styled from 'styled-components';
import { Clear as ClearIcon } from '@material-ui/icons';
import { Box as MuiBox } from '@material-ui/core';
import { 
	Card as ReactCard,
	CardTitle as ReactCardTitle,
  CardBody as ReactCardBody,
	Row
} from 'reactstrap';

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

const Box = styled(MuiBox)`
  height: 42vh;
`

const ListArea = styled(MuiBox)`
  height: 38vh;
  overflow: auto;
`

const TimesList = ({ times, handleDelete }) => {
  return (
    <Box mt={3}>
      {times.length === 0 ? 
        <h4>Select times that work for you.</h4>
        :
        <>
          <h4>Selected times:</h4>
          <ListArea>
            {times.map(time => {
              if (moment(time.start).format('YYYY-MM-DD') !== moment(time.end).format('YYYY-MM-DD')){
                return (
                  <Card key={time.id} body outline color="primary">
                    <CardBody>
                      <CardTitle onClick={() => handleDelete(time.id)} className="float-right"> <ClearIcon /> </CardTitle>
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
                      <CardTitle onClick={() => handleDelete(time.id)} className="float-right"> <ClearIcon /> </CardTitle>
                      <Row>
                        {moment(time.start).format('ddd, MMM D')}
                      </Row>
                      <Row>
                        {moment(time.start).format('h:mm A') + " – " + moment(time.end).format('h:mm A')} 
                      </Row>
                    </CardBody>
                  </Card>
                );
              }
            })}
          </ListArea>
        </>
      }
    </Box>
  );
}

export default TimesList;