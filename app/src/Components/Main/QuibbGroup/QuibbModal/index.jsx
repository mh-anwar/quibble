import * as React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { HOST } from '../../../../constants';
import './index.css';
import { useEffect } from 'react';
import { useState } from 'react';

export default function QuibbModal({
  modalOpen,
  handleModalClose,
  user,
  image,
  description,
  detailedDescription,
}) {
  const [button, setButton] = useState(
    <Button disabled variant="contained">
      Contact Quibber
    </Button>
  );
  useEffect(() => {
    const fetchUserData = async () => {
      //Add error catching later
      const userData = await fetch(HOST + '/userInfo/' + user)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          return json;
        });
      console.log(userData[user]);
      setButton(
        <Button
          onClick={() => window.open('mailto:' + userData.user)}
          variant="contained"
        >
          Contact Quibber
        </Button>
      );
    };
    fetchUserData();
  }, [user]);

  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="quibb-modal">
        <Box className="modal-image">
          <img src={image} alt={description} />
        </Box>
        <Box className="modal-actions">
          <Typography variant="h5">{detailedDescription}</Typography>

          {button}
        </Box>
      </Box>
    </Modal>
  );
}
