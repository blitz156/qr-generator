import React, { useEffect, useState } from "react";
import QRLinkService from "../../services/qr_links";
import "./QRListPage.css";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import CreateQrDialog from "./components/CreateQrDialog";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const qrService = new QRLinkService();

// Новый компонент для отображения одного QR-кода
const QRListItem = ({ qr }) => (
  <div className="qr-list-row">
    <div className="qr-image-col">
      {/* QR-код SVG или img */}
      <span
        className="qr-image"
        dangerouslySetInnerHTML={{ __html: qr.image_html }}
        style={{ display: 'block', height: '100%', width: 'auto', maxWidth: '120px', aspectRatio: '1 / 1' }}
      />
    </div>
    <div className="qr-info-col">
      <div className="qr-title">{qr.link_description}</div>
      <div className="qr-link"><b>Ссылка в QR:</b> <a href={qr.qr_link} target="_blank" rel="noopener noreferrer">{qr.qr_link}</a></div>
      <div className="qr-link"><b>Конечная ссылка:</b> <a href={qr.link_to_redirect} target="_blank" rel="noopener noreferrer">{qr.link_to_redirect}</a></div>
      <div className="qr-date"><b>Создан:</b> {formatDate(qr.created_at)}</div>
    </div>
  </div>
);

// Новый скелетон для строки списка
const QRLinkSkeleton = () => (
  <Stack spacing={2} className="qr-skeleton-list">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="qr-list-row">
        <Skeleton variant="rectangular" width={50} height={50} />
        <div className="qr-info-col">
          <Skeleton width={80} height={24} />
          <Skeleton width={220} height={18} />
          <Skeleton width={160} height={18} />
          <Skeleton width={100} height={16} />
        </div>
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
  const [createError, setCreateError] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);

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
    setCreateError(null);
    setCreateLoading(true);
    try {
      await qrService.create({
        link_to_redirect: data.link,
        link_description: data.description
      });
      // Обновить список после создания
      const res = await qrService.list();
      setQrList(Array.isArray(res.data) ? res.data : []);
      setOpenCreate(false);
    } catch (e) {
      setCreateError("Ошибка создания QR-кода");
    } finally {
      setCreateLoading(false);
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
      <CreateQrDialog open={openCreate} onClose={handleCreateClose} onSubmit={handleCreateSubmit} loading={createLoading} error={createError} setError={setCreateError} />
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
              <QRListItem qr={qr} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QRListPage;
