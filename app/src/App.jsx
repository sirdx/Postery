import './styles/App.scss';
import './utils/services/i18n';
import ThemeProvider from './components/atoms/ThemeProvider';
import AuthProvider from './components/atoms/AuthProvider';
import Routes from './routes/Routes';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}