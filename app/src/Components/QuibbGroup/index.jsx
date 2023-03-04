import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Quibb from './Quibb';
import { HOST } from '../../constants';

export default function QuibbGroup() {
  const [mainQuibbs, setMainQuibbs] = useState(null);
  const [userQuibbs, setUserQuibbs] = useState(null);
  useEffect(() => {
    const fetchBarters = async () => {
      //Add error catching later
      const barters = await fetch(
        HOST + '/barters/' + localStorage.getItem('userName')
      )
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          return json;
        });
      populateQuibbs(barters);
    };
    fetchBarters();
  }, []);

  const populateQuibbs = (data) => {
    let mainData = data['general'];
    let userData = data['user'];
    let userQuibbs = Object.keys(userData).map((key) => {
      return (
        <Quibb
          key={userData[key]['user'] + '_' + key}
          user={userData[key]['user']}
          product={key}
          time={userData[key]['time']}
          description={userData[key]['description']}
          detailedDescription={userData[key]['detailedDescription']}
          image={userData[key]['image']}
          action={true}
        />
      );
    });
    let mainQuibbs = Object.keys(mainData).map((key) => {
      return (
        <Quibb
          key={key}
          user={mainData[key]['user']}
          product={key}
          time={mainData[key]['time']}
          description={mainData[key]['description']}
          detailedDescription={mainData[key]['detailedDescription']}
          image={mainData[key]['image']}
          modal={true}
        />
      );
    });
    setUserQuibbs(userQuibbs);
    setMainQuibbs(mainQuibbs);
  };
  const groupStyle = {
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: 'min-content',
  };
  return (
    <>
      {userQuibbs !== null && userQuibbs.length > 0 && (
        <Typography variant="h4">Your Quibbs</Typography>
      )}

      <Box sx={groupStyle}>{userQuibbs}</Box>
      <Typography variant="h4">All Quibbs</Typography>
      <Box sx={groupStyle}>{mainQuibbs}</Box>
    </>
  );
}
