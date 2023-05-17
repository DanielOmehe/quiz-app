import "./App.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { data } from "../data/questions";

function App() {
  const [quiz, setQuiz] = useState(data);
  const [quizOver, setQuizOver] = useState(false);
  const [correctAnswers,  setCorrectAnswers] = useState(0);
  const [ score, setScore ] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  console.log(score);

  // useEffect(() => {
  //   const getQuizQuestions = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://opentdb.com/api.php?amount=10"
  //       );
  //       if(response.data){
  //         setQuestions(response.data.results);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getQuizQuestions();
  // }, []);

  const handleClick =(index)=>{
    setCurrentQuestion(index)
  }

  const checkAnswer =(answer, correct)=>{
    if(answer === correct){
      setScore(score => score + 5);
      setCorrectAnswers(correctAnswers => correctAnswers + 1)
    }
    if(currentQuestion === quiz.length - 1){
      setQuizOver(true)
    }
    setCurrentQuestion(currentQuestion + 1)
  }

  return (
    <div className="app">
      <div className="quiz-wrapper">{
        quizOver ?
        <div className="score">
           You answered {correctAnswers} correctly out of {quiz.length} questions
           Your Total score is: {score}
        </div> : ( <>
          <div className="quiz-container">
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
  
          </>)
      }</div>
    </div>
  );
}

export default App;
