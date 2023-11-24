import './AppBar.scss';
import { useTranslation } from 'react-i18next';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import DarkModeToggle from './DarkModeToggle';
import { useState } from 'react';
import { TbSearch } from 'react-icons/tb';

export default function AppBar({ userId, userProfileColor }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

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
    <header className='appbar'>
      <span className='appbar-brand'>
        <Link to='/'>Postery</Link>
      </span>
      <div className='appbar-search'>
        <TbSearch className='search-icon' />
        <input 
          type='text' 
          placeholder={t('appbar_search')}
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyDown={(e) => e.key === 'Enter' ? handleSearch() : ''}
        />
      </div>
      <div className='appbar-options'>
        <DarkModeToggle />
        <LanguageSwitcher />
        {userId === null &&
          <Link to='/login'>
            <button className='login-button'>
              {t('appbar_login')}
            </button>
          </Link>
        }
        {userId !== null && 
          <>
            <Link to='/logout'>
              <button className='login-button'>
                {t('appbar_logout')}
              </button>
            </Link>
            <div className='avatar' style={{ backgroundColor: `#${userProfileColor}` }}></div>
          </>
        }
      </div>
    </header>
  );
}