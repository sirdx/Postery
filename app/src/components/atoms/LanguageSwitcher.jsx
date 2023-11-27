import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';
import { supportedLanguages } from 'src/utils/config/i18n';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <select
      className={styles.languageSwitcher}
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
  );
}