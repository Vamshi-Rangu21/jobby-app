import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobCard from '../JobCard'
import JobsSideBar from '../JobsSideBar'
import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    jobsList: [],
    apiStatus: apiStatusList.initial,
    salaryRange: '',
    employmentTypeList: [],
    toBeSearched: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusList.initial})
    const {employmentTypeList, salaryRange, toBeSearched} = this.state
    const employmentType = employmentTypeList.join()

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = ` https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${toBeSearched}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        apiStatus: apiStatusList.success,
        jobsList: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusList.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="jobs-failure-div">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="failure-btn" onClick={this.getJobsList}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <>
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return (
        <div className="no-jobs-found-div">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-found-img"
          />
          <h1 className="no-jobs-found-heading">No Jobs Found</h1>
          <p className="no-jobs-found-description">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }

    return (
      <ul className="jobs-list-container">
        {jobsList.map(each => (
          <JobCard data={each} />
        ))}
      </ul>
    )
  }

  renderJobsView = () => {
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

  changeSalaryRange = id => {
    this.setState({salaryRange: id}, this.getJobsList)
    console.log('hi')
  }

  changeJobsList = type => {
    console.log('hello')
    const {employmentTypeList} = this.state

    const doesInclude = employmentTypeList.includes(type)

    if (doesInclude === false) {
      const updatedList = [...employmentTypeList, type]
      this.setState({employmentTypeList: updatedList}, this.getJobsList)
    } else {
      const updatedList = employmentTypeList.filter(each => each !== type)
      this.setState({employmentTypeList: updatedList}, this.getJobsList)
    }
  }

  searchJobs = () => {
    const {searchInput} = this.state
    this.setState({toBeSearched: searchInput}, this.getJobsList)
  }

  changeInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  render() {
    const {employmentTypeList, searchInput} = this.state
    console.log(employmentTypeList)
    return (
      <>
        <Header />
        <div className="jobs-sm-device-bg">
          <div className="search-container-div-sm-device">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              value={searchInput}
              onChange={this.changeInput}
            />
            <div className="search-icon">
              <button
                className="search-button"
                type="button"
                data-testid="searchButton"
                onClick={this.searchJobs}
              >
                {}
                <BsSearch color="#f8fafc" />
              </button>
            </div>
          </div>

          <div className="jobs-bg">
            <div className="jobs-side-bar-div">
              <JobsSideBar
                func={this.changeSalaryRange}
                employType={this.changeJobsList}
              />
            </div>
            <div className="jobs-display-search-div">
              <div className="search-container-div">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.changeInput}
                />
                <div className="search-icon">
                  <button
                    className="search-button"
                    type="button"
                    data-testid="searchButton"
                    onClick={this.searchJobs}
                  >
                    {}
                    <BsSearch color="#f8fafc" />
                  </button>
                </div>
              </div>
              {this.renderJobsView()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
