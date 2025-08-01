import React from "react";
import "./Header.css";
import Button from "@mui/material/Button";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { useUser } from "../../context/UserContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const Header = () => {
  const { t, userInfo } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("x_access_");
    navigate("/login");
  };

  return (
    <header className="header mui-minimal-header">
      <div className="mui-minimal-header-content">
        <div className="mui-minimal-header-logo">
          <svg
            className="header-logo-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <rect
              x="2"
              y="2"
              width="28"
              height="28"
              rx="6"
              fill="#1976d2"
              fillOpacity="0.10"
            />
            <rect x="7" y="7" width="6" height="6" rx="2" fill="#1976d2" />
            <rect x="19" y="7" width="6" height="6" rx="2" fill="#1976d2" />
            <rect x="7" y="19" width="6" height="6" rx="2" fill="#1976d2" />
            <rect x="19" y="19" width="6" height="6" rx="2" fill="#1976d2" />
          </svg>
          <span className="mui-minimal-header-title">{t("header__title")}</span>
        </div>
        <div className="mui-minimal-header-user">
          <LanguageSelector userLang={userInfo?.language} />
          <span className="mui-minimal-header-user-name">
            {userInfo?.username}
          </span>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLogout}
            className="mui-minimal-header-logout-btn"
            sx={{
              borderRadius: "16px",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "1rem",
              minWidth: 80,
            }}
          >
            {t("header__logout")}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
