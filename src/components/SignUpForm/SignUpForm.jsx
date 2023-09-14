import { Component } from 'react';
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const {name, email, password} = this.state;
      const formData = {name, email, password};
      // The promise returned by the signUp service
      // method will resolve to the user object included
      // in the payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      console.log(user)
      this.props.setUser(user);
    } catch {
      // An error occurred
      // Probably due to a duplicate email
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div className="w-96">
        <div className="p-2 rounded-xl">
          <form autoComplete="off" onSubmit={this.handleSubmit} className="flex flex-col justify-center items-center">
            <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} required className="w-full py-4 px-4 my-1 rounded-xl bg-[#1c1c1c] text-white border border-white border-opacity-30"/>
            <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required className="w-full py-4 px-4 my-1 border-solid bfocus:border border-white rounded-xl bg-[#1c1c1c] text-white border border-white border-opacity-30"/>
            <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required className="w-full py-4 px-4 my-1 rounded-xl bg-[#1c1c1c] text-white border border-white border-opacity-30"/>
            <input type="password" name="confirm" placeholder="Confirm Password" value={this.state.confirm} onChange={this.handleChange} required className="w-full py-4 px-4 my-1 rounded-xl bg-[#1c1c1c] text-white border border-white border-opacity-30"/>
            <button className="w-full py-4 px-4 my-1 border-solid border-transparent rounded-xl bg-white text-white font-bold btn-hover" type="submit" disabled={disable} >Sign Up</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}