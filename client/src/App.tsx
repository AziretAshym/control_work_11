import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './features/users/Containers/RegisterPage.tsx';
import LoginPage from './features/users/Containers/LoginPage.tsx';
import AppToolbar from '../components/UI/AppToolbar/AppToolbar.tsx';
import Categories from './features/categories/Components/Categories.tsx';


const App = () => {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl">
          <Categories />
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
