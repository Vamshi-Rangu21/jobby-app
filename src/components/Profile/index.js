import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Profile extends Component {
  state = {
    apiStatus: apiStatusList.initial,
    userProfile: [],
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusList.loading})
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const updatedData = {
        profileDetails: {
          name: data.profile_details.name,
          profileImageUrl: data.profile_details.profile_image_url,
          shortBio: data.profile_details.short_bio,
        },
      }

      this.setState({
        apiStatus: apiStatusList.success,
        userProfile: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  renderSuccessView = () => {
    const {userProfile} = this.state
    const {profileDetails} = userProfile
    console.log(profileDetails)

    const {name, profileImageUrl, shortBio} = profileDetails
    // console.log(profileImageUrl)

    return (
      <div className="profile-card">
        <img src={profileImageUrl} alt="profile" className="profile-avatar" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-div">
      <button type="button" className="retry-btn" onClick={this.getProfile}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container failure-div" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusList.success:
        return this.renderSuccessView()
      case apiStatusList.failure:
        return this.renderFailureView()
      case apiStatusList.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderProfileView()}</div>
  }
}

export default Profile
