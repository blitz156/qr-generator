import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const CreateQrDialog = ({ open, onClose, onSubmit, loading, error, setError, initialLink = '', initialDescription = '', isEdit = false }) => {
  const [link, setLink] = useState(initialLink);
  const [description, setDescription] = useState(initialDescription);
  const [linkError, setLinkError] = useState("");

  const validateUrl = (value) => {
    try {
      const url = new URL(value);
      if (!(url.protocol === "http:" || url.protocol === "https:")) return false;
      // Проверка домена: должен быть хотя бы один точечный сегмент и не быть только числом
      const host = url.hostname;
      // host должен содержать хотя бы одну точку и не состоять только из цифр
      if (!host.includes(".")) return false;
      if (/^\d+$/.test(host.replace(/\./g, ''))) return false;
      // Проверка на валидность домена через простую regexp (буквы/цифры/дефисы, хотя бы 2 буквы в TLD)
      if (!/^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(host)) return false;
      return true;
    } catch {
      return false;
    }
  };

  const handleLinkChange = (e) => {
    const value = e.target.value;
    setLink(value);
    if (setError) setError(null);
    if (!value.trim()) {
      setLinkError("");
    } else if (!validateUrl(value)) {
      setLinkError("Введите корректную ссылку (http/https)");
    } else {
      setLinkError("");
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (setError) setError(null);
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();
    if (!link.trim() || linkError) return;
    onSubmit({ link, description });
  };

  const handleClose = () => {
    if (loading) return; // Не даём закрыть во время загрузки
    setLink(initialLink || "");
    setDescription(initialDescription || "");
    setLinkError("");
    if (setError) setError(null);
    onClose && onClose();
  };

  useEffect(() => {
    if (open) {
      setLink(initialLink);
      setDescription(initialDescription);
      setLinkError("");
    }
  }, [open, initialLink, initialDescription]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>{isEdit ? "Редактировать QR-код" : "Создать QR-код"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Ссылка для QR"
            type="url"
            fullWidth
            variant="standard"
            value={link}
            onChange={handleLinkChange}
            error={!!linkError}
            helperText={linkError}
            disabled={loading}
          />
          <TextField
            margin="dense"
            label="Описание (необязательно)"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={handleDescriptionChange}
            disabled={loading}
          />
          {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>Отмена</Button>
        <Button onClick={handleSubmit} disabled={loading || !link || !!linkError} variant="contained">
          {isEdit ? "Сохранить" : "Создать"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateQrDialog;
