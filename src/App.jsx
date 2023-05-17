import "./App.scss";
import { useEffect, useState } from "react";
// import axios from "axios";
import { data } from "../data/questions";

const classnames = ['']

function App() {
  const [quiz, setQuiz] = useState(data);
  const [time, setTime] = useState(20);
  const [quizOver, setQuizOver] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime((time) => time - 1);
      if(time === 0){
        setCurrentQuestion(currentQuestion => currentQuestion + 1)
        setTime(20)

        if(currentQuestion === quiz.length - 1){
          setCurrentQuestion(0)
          setQuizOver(true)
        }
      }
    }, 900);
    // const getQuizQuestions = async () => {
    //   try {
    //     const response = await axios.get(
    //       'https://questions.aloc.ng/api/v2/q?subject=chemistry?api_key=.'
    //     );
    //     if(response.data){
    //       setQuiz(response.data.results);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // getQuizQuestions();

    return () => clearTimeout(timer);
  }, [time]);

  const handleClick = (index) => {
    setCurrentQuestion(index);
    setTime(20)
  };

  const checkAnswer = (correct) => {
    if (correct) {
      setScore((score) => score + 5);
      setCorrectAnswers((correctAnswers) => correctAnswers + 1);
      setTime(20);
    }
    if (currentQuestion === quiz.length - 1) {
      setQuizOver(true);
    }
    setCurrentQuestion(currentQuestion + 1);
    setTime(20)
  };

  return (
    <div className="app">
      <div className="quiz-wrapper">
        {quizOver ? (
          <div className="score">
            You answered {correctAnswers} correctly out of {quiz.length}{" "}
            questions Your Total score is: {score}
          </div>
        ) : (
          <>
            <div className="quiz-container">
              {quiz.map((quiz, id) => {
                return (
                  <>
                    {id === currentQuestion ? (
                      <div key={id} className="question">
                        <div className="question-header">
                          <h1 className="question-heading">Question {id + 1}:</h1>
                          <p className="question-timer"> time left: {time}s </p>
                        </div>
                        <p className="question-text">{quiz.question}</p>
                        <hr />
                        <ul className="options">
                          {quiz.options.map((answer) => (
                            <li
                              key={answer}
                              onClick={() => checkAnswer(answer.isCorrect)}
                            >
                              {answer.text}
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
                <button
                  onClick={() => handleClick(index)}
                  className={index === currentQuestion ? "active" : "number"}
                  key={index}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
