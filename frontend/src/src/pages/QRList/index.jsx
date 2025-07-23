import React, { useEffect, useState } from "react";
import QRLinkService from "../../services/qr_links";
import "./QRListPage.css";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import CreateQrDialog from "./components/CreateQrDialog";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Header from "../../components/Header/Header";
import { useUser } from "../../context/UserContext";
import useTranslations from "../../context/useTranslations";

const qrService = new QRLinkService();

// Новый компонент для отображения одного QR-кода
const QRListItem = ({ qr, onEdit, onDelete }) => {
  const { t, formatDate } = useTranslations();

  return (
    <div className="qr-list-row">
      <div className="qr-image-col">
        {/* QR-код SVG или img */}
        <span
          className="qr-image"
          dangerouslySetInnerHTML={{ __html: qr.image_html }}
          style={{
            display: "block",
            height: "100%",
            width: "auto",
            maxWidth: "120px",
            aspectRatio: "1 / 1",
          }}
        />
      </div>
      <div className="qr-info-col">
        <div className="qr-title">{qr.link_description}</div>
        <div className="qr-link">
          <b>{t("qr_list_page__static_link")}</b>{" "}
          <a href={qr.qr_link} target="_blank" rel="noopener noreferrer">
            {qr.qr_link}
          </a>
        </div>
        <div className="qr-link">
          <b>{t("qr_list_page__final_link")}</b>{" "}
          <a
            href={qr.link_to_redirect}
            target="_blank"
            rel="noopener noreferrer"
          >
            {qr.link_to_redirect}
          </a>
        </div>
        <div className="qr-date">
          <b>{t("qr_list_page__created")}</b> {formatDate(qr.created_at)}
        </div>
        <div className="qr-visit-count">
          <b>{t("qr_list_page__visit_count")}</b> {qr.visit_count}
        </div>
      </div>
      <div
        className="qr-actions-col"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IconButton
          aria-label={t("qr_list_page__edit")}
          onClick={() => onEdit(qr)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label={t("qr_list_page__remove")}
          color="error"
          onClick={() => onDelete(qr)}
          style={{ marginTop: 8 }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

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
          <Skeleton width={50} height={16} />
        </div>
      </div>
    ))}
  </Stack>
);

const QRListPage = () => {
  const { t } = useUser();
  const [loading, setLoading] = useState(true);
  const [qrList, setQrList] = useState([]);
  const [error, setError] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [editQr, setEditQr] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [editError, setEditError] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteQr, setDeleteQr] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    setError(undefined);

    qrService
      .list()
      .then((res) => {
        let list = [];
        if (Array.isArray(res.data)) {
          list = res.data;
        }
        setQrList(list);
        setLoading(false);
      })
      .catch((err) => {
        setError(t("qr_list_page__load_error"));
        setLoading(false);
      });
  // eslint-disable-next-line
  }, []);

  const handleCreateOpen = () => setOpenCreate(true);
  const handleCreateClose = () => setOpenCreate(false);
  const handleCreateSubmit = async (data) => {
    setCreateError(null);
    setCreateLoading(true);
    try {
      await qrService.create({
        link_to_redirect: data.link,
        link_description: data.description,
      });
      // Обновить список после создания
      const res = await qrService.list();
      setQrList(Array.isArray(res.data) ? res.data : []);
      setOpenCreate(false);
    } catch (e) {
      setCreateError(t("qr_list_page__create_error"));
    } finally {
      setCreateLoading(false);
    }
  };

  const handleEditOpen = (qr) => {
    setEditQr(qr);
    setOpenEdit(true);
    setEditError(null);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
    setTimeout(() => setEditQr(null), 200); // чтобы модалка точно закрылась
  };
  const handleEditSubmit = async (data) => {
    setEditError(null);
    setEditLoading(true);

    qrService
      .update(editQr.link_hash, {
        link_to_redirect: data.link,
        link_description: data.description,
      })
      .then(() => {
        setOpenEdit(false);
        setEditLoading(false);
        setEditQr(null);
        // Обновить список после редактирования
        qrService.list().then((res) => {
          setQrList(Array.isArray(res.data) ? res.data : []);
        });
      })
      .catch((err) => {
        setEditError(t("qr_list_page__edit_error"));
        setEditLoading(false);
      });
  };

  const handleDeleteClick = (qr) => {
    setDeleteQr(qr);
    setDeleteError(null);
  };

  const handleDeleteCancel = () => {
    setDeleteQr(null);
    setDeleteError(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteQr) return;
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      await qrService.delete(deleteQr.link_hash);
      setQrList((prev) =>
        prev.filter((item) => item.link_hash !== deleteQr.link_hash)
      );
      setDeleteQr(null);
    } catch (e) {
      setDeleteError(t("qr_list_page__remove_qr_item_error"));
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="QRListPage">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>{t("qr_list_page__my_qrs")}</h2>
          <IconButton
            color="primary"
            onClick={handleCreateOpen}
            sx={{ float: "right" }}
            aria-label={t("qr_list_page__create")}
          >
            <AddIcon />
          </IconButton>
        </div>
        <CreateQrDialog
          open={openCreate}
          onClose={handleCreateClose}
          onSubmit={handleCreateSubmit}
          loading={createLoading}
          error={createError}
          setError={setCreateError}
        />
        <CreateQrDialog
          open={openEdit}
          onClose={handleEditClose}
          onSubmit={handleEditSubmit}
          loading={editLoading}
          error={editError}
          setError={setEditError}
          initialLink={editQr?.link_to_redirect}
          initialDescription={editQr?.link_description}
          isEdit={true}
        />
        {loading ? (
          <QRLinkSkeleton />
        ) : error ? (
          <div className="qr-error">{error}</div>
        ) : qrList.length === 0 ? (
          <div className="qr-empty">{t("qr_list_page__no_qrs")}</div>
        ) : (
          <ul className="qr-list">
            {qrList.map((qr) => (
              <li key={qr.link_hash} className="qr-item">
                <QRListItem
                  qr={qr}
                  onEdit={handleEditOpen}
                  onDelete={handleDeleteClick}
                />
              </li>
            ))}
          </ul>
        )}
        <Dialog open={!!deleteQr} onClose={handleDeleteCancel}>
          <DialogTitle>{t("qr_list_page__delete_confirm_title")}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t("qr_list_page__delete_confirm_text")}
              <b> {deleteQr?.link_description || ""} </b>?
            </DialogContentText>
            {deleteError && (
              <DialogContentText style={{ color: "red" }}>
                {deleteError}
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} disabled={deleteLoading}>
              {t("qr_list_page__delete_cancel")}
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              disabled={deleteLoading}
            >
              {deleteLoading
                ? t("qr_list_page__deleting")
                : t("qr_list_page__delete_action")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default QRListPage;
