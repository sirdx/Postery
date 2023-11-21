import './AppBar.scss';
import { useTranslation } from 'react-i18next';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import DarkModeToggle from './DarkModeToggle';
import { useState } from 'react';

export default function AppBar() {
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
        <span className='search-icon'></span>
        <input 
          type='text' 
          placeholder='Search for posts'
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyDown={(e) => e.key === 'Enter' ? handleSearch() : ''}
        />
      </div>
      <div className='appbar-options'>
        <DarkModeToggle />
        <LanguageSwitcher />
      </div>
    </header>
  );
}