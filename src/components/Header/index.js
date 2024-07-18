import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {MdWork} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const logOutClicked = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <nav className="header-bg">
        <Link to="/" className="link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-logo"
          />
        </Link>
        <ul className="links-div">
          <Link to="/" className="link">
            <li className="link-items">Home</li>
          </Link>
          <Link to="/jobs" className="link">
            <li className="link-items">Jobs</li>
          </Link>
        </ul>
        <li className="link-items">
          <button
            type="button"
            className="logout-button"
            onClick={logOutClicked}
          >
            Logout
          </button>
        </li>
      </nav>
      <nav className="header-mobile-device-bg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-website-logo"
        />
        <ul className="icons-div">
          <Link to="/" className="link">
            <AiFillHome className="icons" />
          </Link>
          <Link to="/jobs" className="link">
            <MdWork className="icons" />
          </Link>

          <FiLogOut className="icons" onClick={logOutClicked} />
        </ul>
      </nav>
    </>
  )
}

export default withRouter(Header)
