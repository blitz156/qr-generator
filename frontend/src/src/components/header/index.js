import "./Header.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import SellerService from "../../services/seller";
import { Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [sellerInfo, setSellerInfo] = useState([]);
  const [isSellerInfoLoading, setIsSellerInfoLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsSellerInfoLoading(true);

    new SellerService()
      .getSellerInfo()
      .then((response) => {
        setSellerInfo(response.data);
        setIsSellerInfoLoading(false);
      })
      .catch((error) => {
        alert(error);
        setIsSellerInfoLoading(false);
      });
  }, []);

  const onLogout = () => {
    Cookies.remove("x_access_");
    navigate("/login/");
  };

  return (
    <header className="Header">
      <div className="Header__Menu">
        <Link to={"/"}>
          <h4>QR generator</h4>
        </Link>

        <Typography sx={{ color: "text.secondary" }}>
          <Link to={"/transactions/"}>Транзакции</Link>
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          <Link to={"/advertise/"}>Реклама</Link>
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          <Link to={"/balance/"}>Баланс</Link>
        </Typography>
      </div>
      <div className="Header__Account">
        {isSellerInfoLoading ? (
          <Skeleton variant="rectangular" width={210} height={60} />
        ) : (
          <span className="Header__AccountName">{sellerInfo.name}</span>
        )}
        <button className="Header__LogoutButton" onClick={onLogout}>
          Выйти
        </button>
      </div>
    </header>
  );
};

export default Header;
