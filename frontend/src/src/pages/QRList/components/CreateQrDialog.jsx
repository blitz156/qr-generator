import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useUser } from '../../../context/UserContext';

const CreateQrDialog = ({ open, onClose, onSubmit, loading, error, setError, initialLink = '', initialDescription = '', isEdit = false }) => {
  const { t } = useUser();
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
      setLinkError(t('create_qr_dialog__invalid_url'));
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
    if (!link.trim() || !description.trim() || linkError) return;
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
      <DialogTitle>{isEdit ? t('create_qr_dialog__edit_title') : t('create_qr_dialog__create_title')}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            label={t('create_qr_dialog__link_label')}
            type="url"
            fullWidth
            variant="standard"
            value={link}
            onChange={handleLinkChange}
            error={!!linkError || (!link && open)}
            helperText={linkError || (!link && open ? t('create_qr_dialog__required_field') : '')}
            disabled={loading}
          />
          <TextField
            margin="dense"
            label={t('create_qr_dialog__desc_label')}
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={handleDescriptionChange}
            error={!description && open}
            helperText={!description && open ? t('create_qr_dialog__required_field') : ''}
            disabled={loading}
          />
          {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          {t('create_qr_dialog__cancel')}
        </Button>
        <Button onClick={handleSubmit} disabled={loading || !link || !description || !!linkError} variant="contained">
          {isEdit ? t('create_qr_dialog__save') : t('create_qr_dialog__create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateQrDialog;
