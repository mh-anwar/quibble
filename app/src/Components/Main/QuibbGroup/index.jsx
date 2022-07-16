import * as React from 'react';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
import Quibb from './Quibb';
import styles from './index.css';

export default function QuibbGroup() {
  const [cards, setCards] = useState(null);
  useEffect(() => {
    const fetchBarters = async () => {
      //Add error catching later
      const barters = await fetch('http://localhost:4000/barters')
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          return json;
        });
      populateCards(barters);
    };
    fetchBarters();
  }, []);

  const populateCards = (data) => {
    let quibbs = Object.keys(data).map((key) => {
      return (
        <Quibb
          user={data[key]['user']}
          product={key}
          time={data[key]['time']}
          image={data[key]['image']}
        />
      );
    });

    setCards(quibbs);
  };

  return <Box className="group">{cards}</Box>;
}
