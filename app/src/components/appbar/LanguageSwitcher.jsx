import './LanguageSwitcher.scss';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from 'src/config/i18n';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className='navbar-language'>
      <select
        value={i18n.language}
        onChange={(e) => 
          i18n.changeLanguage(e.target.value)
        }
      >
        {supportedLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}