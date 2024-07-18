import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsStarFill} from 'react-icons/bs'
import {MdLocationOn, MdWork} from 'react-icons/md'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SkillsCard from '../SkillsCard'
import SimilarJobCard from '../SimilarJobCard'

import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobDetails extends Component {
  state = {
    companyJobDetails: [],
    apiStatus: apiStatusList.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusList.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          title: data.job_details.title,
          jobDescription: data.job_details.job_description,
          skills: data.job_details.skills.map(each => ({
            imageUrl: each.image_url,
            name: each.name,
          })),
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          similarJobs: data.similar_jobs.map(each => ({
            companyLogoUrl: each.company_logo_url,
            employmentType: each.employment_type,
            id: each.id,
            jobDescription: each.job_description,
            location: each.location,
            rating: each.rating,
            title: each.title,
          })),
        },
      }
      console.log(updatedData)
      this.setState({
        companyJobDetails: updatedData,
        apiStatus: apiStatusList.success,
      })
    } else {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  renderSuccessView = () => {
    const {companyJobDetails} = this.state
    const {jobDetails} = companyJobDetails
    console.log(jobDetails)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      packagePerAnnum,
      location,
      rating,
      title,
      lifeAtCompany,
      skills,
      similarJobs,
    } = jobDetails

    console.log(skills)
    return (
      <div className="success-div">
        <div className="job-details">
          <div className="company-logo-job-role-div">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo-job-details"
            />
            <div className="company-title-rating-div">
              <h1 className="company-name">{title}</h1>
              <div className="rating-div">
                <BsStarFill color="#fbbf24" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="role-location-package-div">
            <div className="role-location-div">
              <div className="location-div">
                <MdLocationOn color=" #cbd5e1" className="job-card-icon" />
                <p className="location">{location}</p>
              </div>
              <div className="location-div">
                <MdWork color=" #cbd5e1" className="job-card-icon" />
                <p className="location">{employmentType}</p>
              </div>
            </div>
            <p className="package job-details-package">{packagePerAnnum}</p>
          </div>
          <div>
            <div className="description-heading-visit-link">
              <h1 className="job-details-description-heading">Description</h1>
              <a className="visit-link" href={companyWebsiteUrl}>
                Visit <FaExternalLinkAlt />
              </a>
            </div>
            <p className="description role-description">{jobDescription}</p>
          </div>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list">
            {skills.map(each => (
              <SkillsCard data={each} key={each.name} />
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-description-img-div">
            <p className="description about-company-description">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="company-img"
            />
          </div>
        </div>
        <div>
          <h1 className="similar-job-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list-div">
            {similarJobs.map(each => (
              <SimilarJobCard data={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-div">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-btn"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container loader-div" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsView = () => {
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
    return (
      <>
        <Header />
        <div>{this.renderJobDetailsView()}</div>
      </>
    )
  }
}

export default JobDetails
