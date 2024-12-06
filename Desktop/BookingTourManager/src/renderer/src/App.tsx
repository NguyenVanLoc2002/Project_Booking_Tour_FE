import { Route, Routes } from 'react-router-dom';
import CreateTour from './pages/TourManagement/CreateTour';
import ListTour from './pages/TourManagement/ListTour';
import ListTourPushed from './pages/TourManagement/ListTourPushed';
import Login from './pages/Account/Login';

const App: React.FC = () => {
  return (
    <div className="bg-white text-black text-base">
      <Routes>
      <Route path="/" element={<ListTourPushed />} />
        <Route path="/createTour" element={<CreateTour />} />
        <Route path="/listTourPushed" element={<ListTourPushed />} />
        <Route path="/listTour" element={<ListTour />} />
        <Route path="/login" element={<Login />} />
        {/* Thêm các route khác ở đây */}
      </Routes>
    </div>
  );
}

export default App;
