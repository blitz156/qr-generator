import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const CreateQrDialog = ({ open, onClose, onSubmit }) => {
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (link.trim()) {
      onSubmit({ link, description });
      setLink("");
      setDescription("");
    }
  };

  const handleClose = () => {
    setLink("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Создать QR</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            autoFocus
            label="Ссылка"
            placeholder="https://example.com"
            value={link}
            onChange={e => setLink(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Описание"
            placeholder="Краткое описание ссылки"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!link.trim()}>
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateQrDialog;
