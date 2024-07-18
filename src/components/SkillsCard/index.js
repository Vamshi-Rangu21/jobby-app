import './index.css'

const SkillsCard = props => {
  const {data} = props
  const {name, imageUrl} = data

  return (
    <li className="skill-card">
      <img src={imageUrl} alt={name} className="skill-img" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillsCard
