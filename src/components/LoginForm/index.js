import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showSubmitError: false,
  }

  inputChanged = event => {
    this.setState({username: event.target.value})
  }

  passwordChanged = event => {
    this.setState({password: event.target.value})
  }

  submitDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    console.log(response.ok)
    const data = await response.json()
    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({
      errorMsg,
      showSubmitError: true,
    })
  }

  renderUserInput = () => {
    const {username} = this.state

    return (
      <div className="input-label-div">
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          onChange={this.inputChanged}
          value={username}
          className="input"
          placeholder="Username"
        />
      </div>
    )
  }

  renderPasswordInput = () => {
    const {password} = this.state

    return (
      <div>
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          type="password"
          onChange={this.passwordChanged}
          value={password}
          id="password"
          className="input"
          placeholder="Password"
        />
      </div>
    )
  }

  render() {
    const {errorMsg, showSubmitError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="credentials-div">
          <div className="credentials">
            <p className="username-password-heading">
              Username: <span className="span">rahul </span>
            </p>
            <p className="username-password-heading ">
              Password: <span className="span">rahul@2021</span>
            </p>
          </div>

          <div className="credentials">
            <p className="username-password-heading">
              Username:{' '}
              <span span className="span">
                raja
              </span>
            </p>
            <p className="username-password-heading">
              Password:{' '}
              <span span className="span">
                raja@2021
              </span>
            </p>
          </div>
        </div>

        <div className="login-page-bg">
          <div className="form-bg">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="app-logo-login-form"
            />
            <form className="input-details" onSubmit={this.submitDetails}>
              {this.renderUserInput()}
              {this.renderPasswordInput()}
              <button type="submit" className="login-button">
                Login
              </button>
              {showSubmitError ? (
                <p className="error-msg">*{errorMsg}</p>
              ) : null}
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default LoginForm
