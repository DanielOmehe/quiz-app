import "./App.scss";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  console.log(questions[currentQuestion]);
  console.log(currentQuestion);

  useEffect(() => {
    const getQuizQuestions = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=10"
        );
        setQuestions(response.data.results);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getQuizQuestions();
  }, []);

  const handleClick =(index)=>{
    setCurrentQuestion(index)
  }

  return (
    <div className="app">
      <div className="quiz-wrapper">
        <div className="quiz-container">
          {questions.map((question, id) => {
            return (
              <>
                {id === currentQuestion ? (
                  <div key={id} className="question">
                    <h1>Question {id + 1}:</h1>
                    <p>
                      {question.question
                        .replaceAll("&quot;", `'`)
                        .replaceAll("&#039;", "'")}
                    </p>
                    <hr />
                    <ul className="options">
                        <li>{question.correct_answer}</li>
                      {question.incorrect_answers.map((answer) => (
                        <li key={answer}>
                          {answer
                            .replaceAll("$quot", "'")
                            .replaceAll("&#039", "'")}
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
          {questions.map((question, index) => (
            <button onClick={()=>handleClick(index)} className={index === currentQuestion ? 'active' : 'number'} key={index}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
