import React, { Component } from 'react';
import { Link } from 'react-router-dom;

import * as ROUTES from '../constants/routes';

const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm />
    </div>
)

type State = {
    username: string;
    email: string;
    passwordOne: string;
    passwordTwo: string;
    error: { message: string } | null;
}

const INITIAL_STATE: State = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
}

class SignUpForm extends Component {
    state: State = INITIAL_STATE;

    constructor(props: {}) {
        super(props);
    }

    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const { username, email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === "username" || name === "email" || name === "passwordOne" || name === "passwordTwo") {
            this.setState({ [name]: value } as Pick<State, typeof name>);
          }
    }

    render() {
        const { username, email, passwordOne, passwordTwo, error } = this.state;

        const isInvalid = 
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';
    
        return (
          <form onSubmit={this.onSubmit}>
            <input
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="Full Name"
            />
            <input
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
            <input
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
            <input
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
            />
            <button type="submit">Sign Up</button>
    
            {error && <p>{error.message}</p>}
          </form>
        );
      }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
)

export default SignUpPage;

export {SignUpForm, SignUpLink };