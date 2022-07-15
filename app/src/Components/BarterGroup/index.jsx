import * as React from 'react';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
import BarterCard from './BarterCard';

export default function BarterGroup() {
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
    let group = [];
    console.log(data.entries);
    for (let key in data) {
      console.log(data[key]);
      data[key].map(({ user, time, image }) => {
        group.push(<BarterCard user={user} time={time} image={image} />);
        console.log('t');
      });
    }
    setCards(group);
  };

  return <Box>{cards}</Box>;
}
