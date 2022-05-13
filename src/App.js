import './App.css'
import React from 'react';
import { Link } from 'react-router-dom'


// export const SrcContext = createContext({
//   dataSource : 'MOCKED'
// });


function App() {
  const urlUser12 = '/user/12'
  const urlUser18 = '/user/18'
  const txt = 'User 12'
  const txt18 = 'User 18'
  const urlError='/500'
  const txtError='Erreur'
  // const urlUserMock12 = '/user/mock/12'
  // const urlUserMock18 = '/user/mock/18'
  // const txtMock = 'User mock 12'
  // const txtMock18 = 'User mock 18'
  //console.log('app')
  return (
    <div className="App">
      <Link to={urlUser12} ><p>{txt}</p></Link>
      <Link to={urlUser18}><p>{txt18}</p></Link>
      <Link to={urlError}><p>{txtError}</p></Link>
      {/* <Link to={urlUserMock12} ><p>{txtMock}</p></Link>
      <Link to={urlUserMock18}>{txtMock18}</Link> */}
    </div>
  );
}

export default App;
