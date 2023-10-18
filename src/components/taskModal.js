import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open}  onClose={handleClose}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        minHeight: "40%",
        maxHeight: "75%",
        transform: "translate(-50%, -50%)",
        width: "75%",
        bgcolor: "background.paper",

        boxShadow: 24,
        p: 4,
        overflow: "auto",
      }}
    >
    </Box>
  </Modal>
  );
}
