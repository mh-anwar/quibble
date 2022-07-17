import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Quibb from './Quibb';
import { HOST } from '../../../constants';
import './index.css';

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
          user={userData[key]['user']}
          product={key}
          time={userData[key]['time']}
          description={userData[key]['description']}
          image={userData[key]['image']}
          action={true}
        />
      );
    });
    let mainQuibbs = Object.keys(mainData).map((key) => {
      return (
        <Quibb
          user={mainData[key]['user']}
          product={key}
          time={mainData[key]['time']}
          description={mainData[key]['description']}
          image={mainData[key]['image']}
        />
      );
    });
    setUserQuibbs(userQuibbs);
    setMainQuibbs(mainQuibbs);
  };

  return (
    <Box key={'quibbgroup'} className="group">
      <Box className="group">{userQuibbs}</Box>
      <Box className="group">{mainQuibbs}</Box>
    </Box>
  );
}
