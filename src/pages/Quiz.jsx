import { useState } from "react";
import SideMenu from "../components/SideMenu";

const Quiz = (props) => {
  const page = props.page;
  const updatePage = props.updatePage;
  const selectedQuiz = props.selectedQuiz;
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  return (
    <>
      <SideMenu
        page={page}
        quizzes={null}
        selectedQuiz={selectedQuiz}
        updatePage={null}
        updateSelectedQuiz={null}
        updateSelectedLink={null}
      />
      <main id="quiz" key="quiz">
        <h1>{selectedQuiz.title}</h1>
        {selectedQuiz.questions.map((value, index) => {
          const onePlusIndex = index + 1;
          return (
            <div className="QQAD" id={"QQAD" + index} key={"QQAD" + index}>
              <h2>{"Question " + onePlusIndex}</h2>
              <p>{value}</p>
              <textarea
                readOnly={submitted === true ? true : false}
                id={"TA" + index}
                placeholder="Answer"
              />
            </div>
          );
        })}
        <h1 className={submitted === false ? "displayNone" : null}>
          {score + "/" + selectedQuiz.answers.length}
        </h1>
        <button
          onClick={() => {
            setSubmitted(true);
            const responses = document.querySelectorAll("textarea");
            responses.forEach((el, index) => {
              const correctAnswer = selectedQuiz.answers[index];
              let OGValue;
              if (el.value) {
                OGValue = el.value;
              } else {
                OGValue = "";
              }
              const newValue = OGValue + "\r\n" + "\r\n" + correctAnswer;
              el.value = newValue;
              if (
                OGValue.trim().toLowerCase() ===
                correctAnswer.trim().toLowerCase()
              ) {
                el.classList.add("greenOutline");
                setScore((prevScore) => prevScore + 1);
              } else {
                el.classList.add("redOutline");
              }
            });
          }}
          className={
            submitted === true ? "displayNone" : "quizButton bottomBtn"
          }
        >
          Submit
        </button>
        <button
          className={submitted === true ? "quizButton" : "displayNone"}
          onClick={() => {
            setScore(0);
            setSubmitted(false);
            const responses = document.querySelectorAll("textarea");
            responses.forEach((el) => {
              el.value = "";
              el.classList.remove("redOutline");
              el.classList.remove("greenOutline");
            });
            const btnIdNum = 0;
            const el = document.getElementById("QQAD" + btnIdNum);
            const vhValue = (10 * window.innerHeight) / 100;
            const vwValue = (2 * window.innerWidth) / 100;
            const navbarHeight = vhValue + vwValue;
            const offset = el.offsetTop - navbarHeight;
            window.scrollTo({ top: offset, behavior: "smooth" });
          }}
        >
          Restart
        </button>
        <button
          className={
            submitted === true ? "quizButton bottomBtn" : "displayNone"
          }
          onClick={() => updatePage("maker")}
        >
          Edit
        </button>
      </main>
    </>
  );
};

export default Quiz;
