import React, { useRef, useEffect, useState } from 'react';


class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', description: '' };
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
    console.log(event.target.value);
    console.log('the name is: '+event.target.name);
    console.log('the state is: '+JSON.stringify(this.state));
  }

  handleSubmit = (event) => {
    alert('A form was submitted: ' + JSON.stringify(this.state));


    fetch('http://localhost:3001/api/events', {
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(this.state)
      }).then(function(response) {
        console.log(response)
        return response.json();
      });

    event.preventDefault();
}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label class = "labelings">
          Name:
          <input class = "labelings" type="text" value={this.state.value} name="name" onChange={this.handleChange} />
        </label>
        <label class = "labelings">
          Description:
          <input class = "labelings" type="text" value={this.state.value} name="description" onChange={this.handleChange} />
        </label>
        <input class = "labelings" type="submit" value="Submit" />
      </form>
    );
  }


}

export default NameForm;
