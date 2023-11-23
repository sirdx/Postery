import 'src/styles/Common.scss';
import AuthProvider from './components/providers/AuthProvider';
import Routes from './routes/Routes';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}