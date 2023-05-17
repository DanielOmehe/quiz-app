const Quiz =()=>{
    return (
        <>        <div className="quiz-container">
          {quiz.map((quiz, id) => {
            return (
              <>
                {id === currentQuestion ? (
                  <div key={id} className="question">
                    <h1>Question {id + 1}:</h1>
                    <p>
                      {quiz.question}
                    </p>
                    <hr />
                    <ul className="options">
                      {quiz.options.map((answer) => (
                        <li key={answer} onClick={() => checkAnswer(answer, quiz.correct_answer)}>
                          {answer}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </>
            );
          })}
        </div>
        <div className="numbers">
          {quiz.map((question, index) => (
            <button onClick={()=>handleClick(index)} className={index === currentQuestion ? 'active' : 'number'} key={index}>
              {index + 1}
            </button>
          ))}
        </div>
</>
    )
}