import { useTranslation } from 'react-i18next';
import './Header.scss';

export default function Header({ title, type = 1 }) {
  const { t } = useTranslation();

  return (
    <div className='header'>
      <div className={`header-bar header-bar-${type}`}></div>
      {type === 1 && <h1>{t(title)}</h1> }
      {type === 2 && <h2>{t(title)}</h2> }
    </div>
  );
}