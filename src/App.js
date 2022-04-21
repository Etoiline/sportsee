import './App.css'
import Main from './pages/dashboard/Main'
import { Link } from 'react-router-dom'


function App() {
  const urlUser12 = '/user/12'
  const urlUser18 = '/user/18'
  const txt = 'User 12'
  const txt18 = 'user 18'
  return (
    <div className="App">
      <Link to={urlUser12} ><p>{txt}</p></Link>
      <Link to={urlUser18}>{txt18}</Link>
    {/* <Main /> */}
    </div>
  );
}

export default App;
