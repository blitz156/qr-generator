import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import UserService from "../../services/users";
import { useUser } from '../../context/UserContext';

const userService = new UserService();

const LanguageSelector = ({userLang}) => {
  const { setUserInfo } = useUser();
  const [changedUserlang, setChangedUserLang] = useState(undefined);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    userService.setLanguage(lang).then(() => {
      setChangedUserLang(lang);
      setUserInfo(prev => ({ ...prev, language: lang })); // мгновенное обновление языка
    });
  };

  const lang = changedUserlang || userLang;

  if (!lang) {
    return null;
  }

  const LANGUAGES = [
    { code: "ru", native: "Русский" },
    { code: "en", native: "English" },
    { code: "es", native: "Español" },
    { code: "fr", native: "Français" },
    { code: "de", native: "Deutsch" },
    { code: "it", native: "Italiano" },
    { code: "zh", native: "中文" },
    { code: "ja", native: "日本語" },
    { code: "pt", native: "Português" },
    { code: "ar", native: "العربية" },
    { code: "hi", native: "हिन्दी" },
    { code: "tr", native: "Türkçe" },
    { code: "ko", native: "한국어" },
    { code: "pl", native: "Polski" },
    { code: "uk", native: "Українська" },
    { code: "nl", native: "Nederlands" },
    { code: "sv", native: "Svenska" },
  ];

  return (
    <Select
      value={lang}
      onChange={handleLanguageChange}
      size="small"
      sx={{ minWidth: 100, marginRight: 2 }}
    >
      {LANGUAGES.map((langObj) => (
        <MenuItem key={langObj.code} value={langObj.code}>
          {langObj.native}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSelector;
