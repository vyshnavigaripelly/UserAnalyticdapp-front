import React from 'react';
import './App.css';
import Form from './Form.js';
import Dashboard from './Dashboard.js';
import GraphPage from './GraphPage.js';
import { RotateCircleLoading } from 'react-loadingg';
import { Route } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      address: '',
      selected_cat: '',
      loading: false,
      data: JSON.parse(localStorage.getItem('data')) || {}
    }
  }

  submitInfo = (info) => {
    this.setState({
      loading: true,
      address: info.address,
      selected_cat: info.selected_cat
    })
    this.fetchDetails(info.address, info.selected_cat)
  }

  fetchDetails(address, category) {
    const options = {
      method: 'POST',
      body: JSON.stringify({dapp_address: address, category: category}),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch('https://dappstat-backend.herokuapp.com/analyze', options)
      .then(response => {
        if(!response.ok) {
            throw Error('Errow while fetching')
        }
        return response.json()}
    )
      .then(data => {
        this.setState({loading: false,data},() => {
          localStorage.setItem('data', JSON.stringify(this.state.data))
        })
      })
      .catch(err => console.log('error: ', err))
  }
  
  render() {
    const { data, loading } = this.state;

    return (
      <main className='app'>
        <header className='header'>
          <h1>DappStat</h1>
        </header>
        <Route exact path='/' render={() => <Form submitInfo={this.submitInfo} />} />
          {loading ? <RotateCircleLoading /> : <Route exact path='/dashboard' render={() => <Dashboard results={data} />} />}
        <Route exact path='/graphs' render={() => <GraphPage results={data} />} />
      </main>
    );
  }

}

export default App;
