import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import UserService from "../../services/users";
import { useUser } from '../../context/UserContext';

const userService = new UserService();

const LanguageSelector = ({userLang}) => {
  const { t, setUserInfo } = useUser();
  const [changedUserlang, setChangedUserLang] = useState(undefined);
  const [languageLoading, setLanguageLoading] = useState(false);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguageLoading(true);
    userService.setLanguage(lang).then(() => {
      setChangedUserLang(lang);
      setLanguageLoading(false);
      setUserInfo(prev => ({ ...prev, language: lang })); // мгновенное обновление языка
    });
  };

  const lang = changedUserlang || userLang;

  if (!lang) {
    return null;
  }

  const LANGUAGES = [
    { code: "ru", label: t('language__russian') },
    { code: "en", label: t('language__english') },
  ];

  return (
    <Select
      value={lang}
      onChange={handleLanguageChange}
      size="small"
      disabled={languageLoading}
      sx={{ minWidth: 100, marginRight: 2 }}
    >
      {LANGUAGES.map((langObj) => (
        <MenuItem key={langObj.code} value={langObj.code}>
          {langObj.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSelector;
