import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Skeleton } from '@material-ui/lab';
import { 
  List,  
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  Avatar,
  Box as MuiBox
} from '@material-ui/core';

const Box = styled(MuiBox)`
  height: 30vh;
  overflow: auto;
`

const Header = styled.span`
  font-size: 1.5em;
  text-align: center;
  color: #4299e1;
`

const LoadingListSkeleton = () => {
  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText>
          <Skeleton animation="wave" variant="text" height={20} width="90%" />
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText>
          <Skeleton animation="wave" variant="text" height={20} width="90%" />
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText>
          <Skeleton animation="wave" variant="text" height={20} width="90%" />
        </ListItemText>
      </ListItem>
    </List>
  );
}

const UsersList = ({ participants }) => {
  const [checked, setChecked] = useState([]);
  const [isLoading, setIsLoading] = useState(typeof participants === "undefined");

  const handleCheckBoxClick = (labelId) => () => {
    const currentIndex = checked.indexOf(labelId);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(labelId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  useEffect(() => {
    const fetchProduct = () => {
      if (typeof participants === "undefined") {
        setIsLoading(true)
      } else {
        setIsLoading(false)
      }
    };
    fetchProduct();
  }, [participants]);
  
  return (
    <Box my={2}>
      <Header><h4>Others in this calendar:</h4></Header>
      {isLoading ? 
        <LoadingListSkeleton />
        :
        <List>
          {participants.map((participant) => {
            const labelId = participant.id;
            return (
              <ListItem key={labelId} button>
                <ListItemAvatar>
                  <Avatar/>
                </ListItemAvatar>
                <ListItemText id={labelId} primary={participant.name} />
                <ListItemSecondaryAction>
                  <Checkbox edge="end" onChange={handleCheckBoxClick(labelId)} checked={checked.indexOf(labelId) !== -1} inputProps={{ 'aria-labelledby': labelId }} />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      }
    </Box>
  );
}

export default UsersList;