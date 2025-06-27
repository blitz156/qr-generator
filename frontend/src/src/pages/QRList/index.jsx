import React, { useEffect, useState } from "react";
import QRLinkService from "../../services/qr_links";
import "./QRListPage.css";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

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

  useEffect(() => {
    qrService
      .list()
      .then((res) => {
        let list = [];
        if (Array.isArray(res)) {
          list = res
        }
        setQrList(list);
        setLoading(false);
      })
      .catch((err) => {
        setError("Ошибка загрузки QR-кодов");
        setLoading(false);
      });
  }, []);

  return (
    <div className="QRListPage">
      <h2>Мои QR-коды</h2>
      {loading ? (
        <QRLinkSkeleton />
      ) : error ? (
        <div className="qr-error">{error}</div>
      ) : qrList.length === 0 ? (
        <div className="qr-empty">Нет QR-кодов</div>
      ) : (
        <ul className="qr-list">
          {qrList.map((qr) => (
            <li key={qr.id || qr.link_hash} className="qr-item">
              <div className="qr-title">{qr.link_description}</div>
              <div className="qr-link"><b>Ссылка:</b> {qr.link_to_redirect}</div>
              <div className="qr-hash"><b>Hash:</b> {qr.link_hash}</div>
              <div className="qr-date"><b>Создан:</b> {formatDate(qr.created_at)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QRListPage;
