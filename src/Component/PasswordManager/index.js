import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordCards from '../PasswordCards'
import './index.css'

class PasswordManager extends Component {
  state = {
    username: '',
    password: '',
    website: '',
    status: true,
    passwordList: [],
    userInputData: '',
  }

  websiteEnter = event => {
    this.setState({website: event.target.value})
  }

  usernameEnter = event => {
    this.setState({username: event.target.value})
  }

  passwordEnter = event => {
    this.setState({password: event.target.value})
  }

  userDetailsEnter = event => {
    event.preventDefault()
    const {username, password, website} = this.state
    const userDetails = {
      id: uuidv4(),
      username,
      website,
      password,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, userDetails],
      username: '',
      password: '',
      website: '',
    }))
  }

  checkBoxClick = () => {
    this.setState(prevState => ({status: !prevState.status}))
  }

  searchInputEnter = event => {
    const {passwordList} = this.state
    const findItem = event.target.value
    console.log(findItem)

    if (event.key === 'Enter') {
      const filteredList = passwordList.filter(
        each => each.website.toLowerCase() === findItem.toLowerCase(),
      )
      console.log(filteredList)
      this.setState({passwordList: filteredList})
    }
  }

  searchInputTyped = event => {
    this.setState({userInputData: event.target.value})
  }

  renderForm = () => {
    const {username, password, website} = this.state

    return (
      <form className="form-container" onSubmit={this.userDetailsEnter}>
        <h1 className="heading">Add New Password</h1>
        <div className="input-details">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
            alt="website"
            className="input-icons"
          />
          <input
            type="text"
            value={website}
            placeholder="Enter Website"
            onChange={this.websiteEnter}
            className="input"
          />
        </div>
        <div className="input-details">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
            alt="username"
            className="input-icons"
          />
          <input
            type="text"
            placeholder=" Enter Username"
            value={username}
            onChange={this.usernameEnter}
            className="input"
          />
        </div>
        <div className="input-details">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
            alt="password"
            className="input-icons"
          />

          <input
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={this.passwordEnter}
            className="input"
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )
  }

  deleteItemPasswaordList = id => {
    this.setState(prevState => ({
      passwordList: prevState.passwordList.filter(each => each.id !== id),
    }))
  }

  renderOutputPasswordManagerView = () => {
    const {passwordList, status} = this.state

    return (
      <ul>
        {passwordList.map(each => (
          <PasswordCards
            key={each.id}
            details={each}
            status={status}
            deleteItemPasswaordList={this.deleteItemPasswaordList}
          />
        ))}
      </ul>
    )
  }

  renderOutputStartView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
      />
      <p className="heaing">No Passwords </p>
    </div>
  )

  render() {
    const {passwordList} = this.state
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="top-container">
          {this.renderForm()}
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="image-password-manager"
            />
          </div>
        </div>
        <div className="bottom-container">
          <div className="bottom-container-1">
            <div className="bottom-container-1-sub">
              <h1 className="heading">Your Passwords</h1>
              <p className="para">{passwordList.length}</p>
            </div>
            <div className="input-details">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png  "
                alt="search"
                className="input-icons"
              />
              <input
                type="search"
                placeholder="Search"
                onChange={this.searchInputTyped}
                onKeyDown={this.searchInputEnter}
                className="input"
              />
            </div>
          </div>
          <hr />
          <div className="check-container">
            <input
              type="checkbox"
              id="checkbox"
              onChange={this.checkBoxClick}
            />
            <label htmlFor="checkbox">Show passwords</label>
          </div>
          {passwordList.length !== 0
            ? this.renderOutputPasswordManagerView()
            : this.renderOutputStartView()}
        </div>
      </div>
    )
  }
}

export default PasswordManager
