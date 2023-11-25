import { useState } from 'react';
import { createSearchParams, Link, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TbSearch } from 'react-icons/tb';
import './Header.scss';
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
    <header className='header'>
      <span className='header-brand'>
        <Link to='/'>Postery</Link>
      </span>
      <div className='header-search'>
        <TbSearch className='search-icon' />
        <input 
          type='text' 
          placeholder={t('header_search')}
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyDown={(e) => e.key === 'Enter' ? handleSearch() : ''}
        />
      </div>
      <div className='header-options'>
        <DarkModeToggle />
        <LanguageSwitcher />
        {userData === null &&
          <Link to='/login'>
            <button className='login-button'>
              {t('header_login')}
            </button>
          </Link>
        }
        {userData !== null && 
          <>
            <Link to='/logout'>
              <button className='login-button'>
                {t('header_logout')}
              </button>
            </Link>
            <div className='avatar' style={{ backgroundColor: `#${userData.profileColor}` }}></div>
          </>
        }
      </div>
    </header>
  );
}