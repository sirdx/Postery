import { useState } from 'react';
import { createSearchParams, Link, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TbSearch } from 'react-icons/tb';
import styles from './Header.module.scss';
import LanguageSwitcher from '../atoms/LanguageSwitcher';
import DarkModeToggle from '../atoms/DarkModeToggle';

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const userData = useRouteLoaderData('root').data;

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    navigate({
      pathname: 'posts',
      search: createSearchParams({
        query: searchQuery,
      }).toString()
    });

    setSearchQuery('');
  };

  return (
    <header className={styles.header}>
      <span className={styles.headerBrand}>
        <Link to='/'>Postery</Link>
      </span>
      <div className={styles.headerSearch}>
        <TbSearch className={styles.searchIcon} />
        <input 
          type='text' 
          placeholder={t('header_search')}
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyDown={(e) => e.key === 'Enter' ? handleSearch() : ''}
        />
      </div>
      <div className={styles.headerOptions}>
        <DarkModeToggle />
        <LanguageSwitcher />
        {userData === null &&
          <Link to='/login'>
            <button className={styles.loginButton}>
              {t('header_login')}
            </button>
          </Link>
        }
        {userData !== null && 
          <>
            <Link to='/logout'>
              <button className={styles.loginButton}>
                {t('header_logout')}
              </button>
            </Link>
            <div className={styles.avatar} style={{ backgroundColor: `#${userData.profileColor}` }}></div>
          </>
        }
      </div>
    </header>
  );
}