import React from 'react';
import { useTranslation } from 'react-i18next';
import headerImage from '../images/header_img.webp';

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 text-center mb-3 mb-md-0">
            <img
              src={headerImage}
              alt="Rick and Morty Characters"
              className="img-fluid custom-image"
            />
          </div>
          <div className="col-12 col-md-6 text-center text-md-start">
            <h1 className="header-title text-white fw-bold">{t('headerTitle')}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
