import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// Import the helpers.. that we'll make here in the next step
import Messages from './Notifications/messages'
import Errors from './Notifications/errors'

import registrationRequest from './actions'

class Registration extends Component {
  // Pass the correct proptypes in for validation
  static propTypes = {
    handleSubmit: PropTypes.func,
    registrationRequest: PropTypes.func,
    registration: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array
    })
  }

  // Redux Form will call this function with the values of our
  // Form fields "email" and "password" when the form is submitted
  // this will in turn call the action
  submit = values => {
    // we could just do registrationRequest here with the static proptypes
    // but ESLint doesn't like that very much...
    this.props.registrationRequest(values)
  }

  render() {
    // grab what we need from props.  The handleSubmit from ReduxForm
    // and the pieces of state from the global state.
    const {
      handleSubmit,
      registration: { requesting, successful, messages, errors }
    } = this.props

    return (
      <div className="registration">
        {/* Use the Submit handler with our own submit handler*/}
        <form className="register-form" onSubmit={handleSubmit(this.submit)}>
          <h1>Create New Account</h1>
          <label htmlFor="email">Email</label>
          <Field
            name="email"
            type="text"
            id="email"
            className="email"
            label="Email"
            component="input"
          />
          <label htmlFor="firstName">First Name</label>
          <Field
            name="firstName"
            type="text"
            id="firstName"
            className="firstName"
            label="FirstName"
            component="input"
          />
          <label htmlFor="lastName">Last Name</label>
          <Field
            name="lastName"
            type="text"
            id="lastName"
            className="lastName"
            label="LastName"
            component="input"
          />
          <label htmlFor="type">User Type</label>
          <Field name="userType" component="select">
            <option />
            <option value="Band">Band</option>
            <option value="Venue">Venue</option>
          </Field>
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            type="password"
            id="password"
            className="password"
            label="Password"
            component="input"
          />
          <button action="submit">Register</button>
        </form>
        <div className="auth-messages">
          {/* 
            These are all nothing more than helpers that will show up
            based on the UI states, not worth covering in depth.  Simply put
            if there are messages or errors, we show them
            */}
          {!requesting &&
            !!errors.length && (
              <Errors
                message="Failure to registration due to:"
                errors={errors}
              />
            )}
          {!requesting && !!messages.length && <Messages messages={messages} />}
          {!requesting &&
            successful && (
              <div>
                registration Successful!{' '}
                <Link to="/login">Click here to Login »</Link>
              </div>
            )}
          {/* Redux Router's <Link> component for quick navigation of routes */}
          {!requesting &&
            !successful && (
              <Link to="/login">Already a Widgeter? Login Here »</Link>
            )}
        </div>
      </div>
    )
  }
}

// Grab only the piece of state we need
const mapStateToProps = state => ({
  registration: state.registration
})

// Connect our component to redux and attach the "registration" piece
// of state to our "props" in the component.  Also attach the
// "registrationRequest" action to our "props" as well.
const connected = connect(mapStateToProps, { registrationRequest })(
  Registration
)

// Connect our connected component to Redux Form.  It will namespace
// the form we use in this component as "registration".
const formed = reduxForm({
  form: 'registration'
})(connected)

// Export our well formed component!
export default formed
