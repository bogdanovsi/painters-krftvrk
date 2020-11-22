import React, { useEffect, useState } from 'react';
import './App.scss';

import Header from '../Header';
import Painters from '../Pages/Painters';
import Footer from '../Footer';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Painters />
      <Footer />
    </div>
  );
}

export default App;
