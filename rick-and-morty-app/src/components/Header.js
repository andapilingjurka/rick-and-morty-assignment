import React from 'react';
import { useTranslation } from 'react-i18next';
import headerImage from '../images/header_img.webp';

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="header py-4">
      <div className="d-flex align-items-center gap-5 container-fluid">
        <div className="header-image-container flex-shrink-0">
          <img
            src={headerImage}
            alt="Rick and Morty Characters"
            className="header-image"
          />
        </div>
        <div className="header-text flex-grow-1">
          <h1 className="header-title text-white">{t('headerTitle')}</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
