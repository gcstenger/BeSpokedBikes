import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Home />
          </Layout>        
        </BrowserRouter>
      </div>
    );
  };
}

export default App;