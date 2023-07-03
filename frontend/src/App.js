import './App.scss';
import { Leaderboard } from './pages/leaderboard/Leaderboard';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className='App'>
      <Leaderboard />
      <ToastContainer />
    </div>
  );
}

export default App;
