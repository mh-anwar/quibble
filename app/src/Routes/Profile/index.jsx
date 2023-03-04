import * as React from 'react';
import { Avatar, Box, Card } from '@mui/material';
import { HOST } from '../../constants';

export default function Settings() {
  const [profileInfo, setProfileInfo] = React.useState('');
  React.useEffect(() => {
    const user = localStorage.getItem('userName');
    const fetchProfileData = async () => {
      const profileData = await fetch(HOST + '/userProfile/' + user)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          return json;
        });
      setProfileInfo(profileData[user]);
    };
    fetchProfileData();
  }, []);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: '1em',
        columnGap: '1em',
        margin: 0,
        marginTop: '4em',
        alignContent: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Avatar sx={{ width: '200px', height: '200px', margin: 0 }}>
        {localStorage.getItem('userName')}
      </Avatar>

      <Card
        sx={{
          width: '70%',
          minHeight: 'min-content',
          height: '40%',
          padding: '3em',
          margin: 0,
          textOverflow: 'wrap',
          lineBreak: 'anywhere',
        }}
      >
        {profileInfo}
      </Card>
    </Box>
  );
}
