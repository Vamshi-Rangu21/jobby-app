import {BsStarFill} from 'react-icons/bs'
import {MdLocationOn, MdWork} from 'react-icons/md'
import './index.css'

const SimilarJobCard = props => {
  const {data} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = data

  return (
    <li className="similar-job-card">
      <div className="logo-role-div">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-company-logo"
        />
        <div className="role-rating-div">
          <h1 className="similar-job-role">{title}</h1>
          <div className="rating-div">
            <BsStarFill color="#fbbf24" />
            <p className="similar-job-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-card-description-heading">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="similar-jobs-location-type-div ">
        <div className="icon-and-icon-type-div">
          <MdLocationOn color="#cbd5e1" />
          <p className="icon-name">{location}</p>
        </div>
        <div className="icon-and-icon-type-div">
          <MdWork color="#cbd5e1" />
          <p className="icon-name">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
