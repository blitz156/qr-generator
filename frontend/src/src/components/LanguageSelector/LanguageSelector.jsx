import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import UserService from "../../services/users";

const LANGUAGES = [
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
];

const userService = new UserService();

const LanguageSelector = ({userLang}) => {
  const [changedUserlang, setChangedUserLang] = useState(undefined);
  const [languageLoading, setLanguageLoading] = useState(false);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguageLoading(true);
    userService.setLanguage(lang).then(() => {
      setChangedUserLang(lang);
      setLanguageLoading(false);
    });
  };

  const lang = changedUserlang || userLang;

  if (!lang) {
    return null;
  }

  return (
    <Select
      value={lang}
      onChange={handleLanguageChange}
      size="small"
      disabled={languageLoading}
      sx={{ minWidth: 100, marginRight: 2 }}
    >
      {LANGUAGES.map((lang) => (
        <MenuItem key={lang.code} value={lang.code}>
          {lang.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSelector;
