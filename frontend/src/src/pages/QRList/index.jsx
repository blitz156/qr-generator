import React, { useEffect, useState } from "react";
import QRLinkService from "../../services/qr_links";
import "./QRListPage.css";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import CreateQrDialog from "./components/CreateQrDialog";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const qrService = new QRLinkService();

const QRLinkSkeleton = () => (
  <Stack spacing={2} className="qr-skeleton-list">
    {[...Array(5)].map((_, i) => (
      <div key={i}>
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="90%" height={20} />
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="text" width="30%" height={20} />
      </div>
    ))}
  </Stack>
);

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleString();
};

const QRListPage = () => {
  const [loading, setLoading] = useState(true);
  const [qrList, setQrList] = useState([]);
  const [error, setError] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    setError(undefined);

    qrService
      .list()
      .then((res) => {
        let list = [];
        if (Array.isArray(res.data)) {
          list = res.data
        }
        setQrList(list);
        setLoading(false);
      })
      .catch((err) => {
        setError("Ошибка загрузки QR-кодов");
        setLoading(false);
      });
  }, []);

  const handleCreateOpen = () => setOpenCreate(true);
  const handleCreateClose = () => setOpenCreate(false);
  const handleCreateSubmit = async (data) => {
    try {
      setError(undefined);
      setLoading(true);
      await qrService.create({
        link_to_redirect: data.link,
        link_description: data.description
      });
      // Обновить список после создания
      const res = await qrService.list();
      setQrList(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      setError("Ошибка создания QR-кода");
    } finally {
      setLoading(false);
      setOpenCreate(false);
    }
  };

  return (
    <div className="QRListPage">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Мои QR-коды</h2>
        <IconButton color="primary" onClick={handleCreateOpen} sx={{ float: 'right' }} aria-label="Создать QR">
          <AddIcon />
        </IconButton>
      </div>
      <CreateQrDialog open={openCreate} onClose={handleCreateClose} onSubmit={handleCreateSubmit} />
      {loading ? (
        <QRLinkSkeleton />
      ) : error ? (
        <div className="qr-error">{error}</div>
      ) : qrList.length === 0 ? (
        <div className="qr-empty">Нет QR-кодов</div>
      ) : (
        <ul className="qr-list">
          {qrList.map((qr) => (
            <li key={qr.link_hash} className="qr-item">
              <div className="qr-title">{qr.link_description}</div>
              <div className="qr-link"><b>Ссылка для распространения</b> {qr.qr_link}</div>
              <div className="qr-link"><b>Конечная ссылка:</b> {qr.link_to_redirect}</div>
              <div className="qr-date"><b>Создан:</b> {formatDate(qr.created_at)}</div>
              <div className="qr-image" dangerouslySetInnerHTML={{ __html: qr.image_html }}></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QRListPage;
