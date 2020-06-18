import React from 'react';
import './Form.css';
import { Redirect } from 'react-router-dom';


class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      address: '',
      selected_cat: '',
      showError: false,
      formFilled: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  submitForm = () => {
    if (this.state.address && this.state.selected_cat) {
      this.props.submitInfo(this.state)
      this.setState({formFilled: true})
    } else {
      this.setState({showError: true})
    }
  }

  render() {
    if(this.state.formFilled) {
      return(
        <Redirect to="/dashboard" />
      )
    }

    return (
      <form className='form'>
        <h2>Let the fun begin.</h2>
        <label className='address-section'>
          <h3>Contract Address:</h3>
          <input type="text" placeholder='Contract Address...'name='address' value={this.state.address} onChange={this.handleChange} />
        </label>
        <label className='category-section'>
          <h3>Category:</h3>
          <select name='selected_cat' className='category-select' value={this.state.selected_cat} onChange={this.handleChange}>
            <option selected value="">Select Category...</option>
            <option value="Gaming">Gaming</option>
            <option value="Exchanges">Exchanges</option>
            <option value="Marketplaces">Marketplaces</option>
            <option value="Gambling">Gambling</option>
          </select>
        </label>
          <button type='button' onClick={this.submitForm} className='submit-btn'>Submit</button>
          <h4 className={this.state.showError ? 'input-error':'hidden'}
          >Please fill all inputs.</h4>
      </form>
    );
  }
}


export default Form