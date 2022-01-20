import { Route, Routes } from 'react-router-dom';

import Home from './views/Home';
import Cities from './views/Cities';
import MainLayout from './layouts/main';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cities' element={<Cities />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
