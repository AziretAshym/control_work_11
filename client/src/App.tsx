import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './features/users/Containers/RegisterPage.tsx';
import LoginPage from './features/users/Containers/LoginPage.tsx';
import AppToolbar from '../components/UI/AppToolbar/AppToolbar.tsx';
import Items from './features/items/Containers/Items.tsx';
import NewItem from './features/items/Components/NewItem.tsx';
import ItemDetails from './features/items/Containers/ItemDetails.tsx';


const App = () => {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Items />} />
            <Route path="/items" element={<Items />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="add-new-item" element={<NewItem />}/>
            <Route path="item-details/:id" element={<ItemDetails />}/>
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
