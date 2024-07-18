import Profile from '../Profile'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const JobsSideBar = props => {
  const {func, employType} = props
  const changeSalary = event => {
    func(event.target.value)
  }

  const changeEmploymentType = event => {
    employType(event.target.value)
  }

  const renderTypesOfJobs = () =>
    employmentTypesList.map(each => (
      <li className="employment-list-item">
        <input
          type="checkbox"
          id={each.employmentTypeId}
          value={each.employmentTypeId}
          onChange={changeEmploymentType}
        />
        <label className="label" htmlFor={each.employmentTypeId}>
          {each.label}
        </label>
      </li>
    ))

  const renderSalaryRange = () =>
    salaryRangesList.map(each => (
      <li className="employment-list-item">
        <input
          type="radio"
          id={each.salaryRangeId}
          value={each.salaryRangeId}
          name="salary"
          onChange={changeSalary}
        />
        <label className="label" htmlFor={each.salaryRangeId}>
          {each.label}
        </label>
      </li>
    ))

  return (
    <>
      <div className="profile-side-bar-profile-div">
        <Profile />
      </div>
      <div className="types-of-employment-div">
        <h1 className="types-of-employment-heading">Type of Employment</h1>
        <ul className="employment-list">{renderTypesOfJobs()}</ul>
      </div>
      <div className="salary-range-div">
        <h1 className="types-of-employment-heading">Salary Range</h1>
        <ul className="employment-list">{renderSalaryRange()}</ul>
      </div>
    </>
  )
}

export default JobsSideBar
