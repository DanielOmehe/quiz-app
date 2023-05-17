import '../App.scss'

const ScoreBoard = ({ children, show }) => {
    
  return (
    <div className="score-board">
    {show ? children : null}
    </div>
  )
}

export default ScoreBoard
