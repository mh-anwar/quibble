import * as React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { HOST } from '../../../constants';
import './index.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTheme } from '@emotion/react';

export default function QuibbModal({
  modalOpen,
  handleModalClose,
  user,
  image,
  description,
  detailedDescription,
}) {
  const theme = useTheme();
  const bg = theme.palette.info.main;
  const fg = theme.palette.info.contrastText;
  const [button, setButton] = useState(
    <Button disabled variant="contained">
      Contact Quibber
    </Button>
  );
  useEffect(() => {
    const user = localStorage.getItem('userName');
    const fetchUserData = async () => {
      const userData = await fetch(HOST + '/userInfo/' + user)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          return json;
        });
      setButton(
        <Button
          onClick={() => window.open('mailto:' + userData[user])}
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
      <Box className="quibb-modal" sx={{ backgroundColor: bg, color: fg }}>
        <Box className="modal-image">
          <img src={image} alt={description} />
        </Box>
        <Box className="modal-actions">
          <Box className="modal-text">
            <Typography variant="h5">{detailedDescription}</Typography>
          </Box>
          {button}
        </Box>
      </Box>
    </Modal>
  );
}
