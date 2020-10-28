import React from 'react';
import styled from 'styled-components';
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

const UsersList = () => {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  
  return (
    <Box my={2}>
      <Header><h4>Filter times</h4></Header>
      <List>
        {[0, 1,2,3,4,5,6,7,8,9].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem key={value} button>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value)}
                  checked={checked.indexOf(value) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default UsersList;