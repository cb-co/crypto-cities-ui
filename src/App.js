import { Route, Routes } from 'react-router-dom';

import Home from './views/Home';
import CityPage from './views/CityPage';
import Cities from './views/Cities';
import MainLayout from './layouts/main';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/cities' exact element={<Cities />} />
        <Route path='/cities/:tokenId' exact element={<CityPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
