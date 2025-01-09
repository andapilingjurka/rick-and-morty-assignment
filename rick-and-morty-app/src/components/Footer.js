import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { i18n } = useTranslation(); 

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); 
  };

  return (
    <footer className="footer d-flex justify-content-center align-items-center p-3 mt-6">
      <button
        className={`btn mx-2 ${i18n.language === 'en' ? 'btn-warning text-white' : 'btn-outline-warning'}`}  
        onClick={() => changeLanguage('en')}
      >
        English
      </button>
      <button
        className={`btn mx-2 ${i18n.language === 'de' ? 'btn-warning text-white' : 'btn-outline-warning'}`}  
        onClick={() => changeLanguage('de')}
      >
        Deutsch
      </button>
    </footer>
  );
};

export default Footer;

