import {Link} from 'react-router-dom'
import {BsStarFill} from 'react-icons/bs'
import {MdLocationOn, MdWork} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {data} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = data

  return (
    <Link to={`/jobs/${id}`} className="link-cards">
      <li className="job-card">
        <div className="company-logo-name-div">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
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
          <p className="package">{packagePerAnnum}</p>
        </div>
        <div>
          <h1 className="description-heading">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
