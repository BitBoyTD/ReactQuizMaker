import { useState } from "react";
import SideMenu from "../components/SideMenu";

const Quiz = (props) => {
  const page = props.page;
  const updatePage = props.updatePage;
  const selectedQuiz = props.selectedQuiz;
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const resetFlipped = () =>
    new Array(selectedQuiz.questions.length).fill(false);
  const [flipped, setFlipped] = useState(resetFlipped);
  return (
    <>
      <SideMenu
        page={page}
        quizzes={null}
        selectedQuiz={selectedQuiz}
        updatePage={null}
        updateSelectedQuiz={null}
        updateSelectedLink={null}
        setShare={null}
      />
      <main id="quiz" key="quiz">
        <h1>{selectedQuiz.title}</h1>
        {selectedQuiz.questions.map((value, index) => {
          const onePlusIndex = index + 1;
          if (selectedQuiz.displayMode === "default") {
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
          } else if (selectedQuiz.displayMode === "q-cards") {
            return (
              <div className="QCD" id={"QCD" + index} key={"QCD" + index}>
                <h2>{"Question " + onePlusIndex}</h2>
                <textarea
                  id={"QC" + index}
                  readOnly={true}
                  value={
                    flipped[index] === false
                      ? "Q: " + value
                      : "A: " + selectedQuiz.answers[index]
                  }
                  onClick={(event) => {
                    const index = event.target.id.split("QC")[1];
                    let newFlipped = Array.from(flipped);
                    if (flipped[index] === false) {
                      newFlipped[index] = true;
                    } else if (flipped[index] === true) {
                      newFlipped[index] = false;
                    }
                    setFlipped(newFlipped);
                  }}
                />
              </div>
            );
          }
        })}
        <h1 className={submitted === false ? "displayNone" : null}>
          {score + "/" + selectedQuiz.answers.length}
        </h1>
        {selectedQuiz.displayMode === "default" ? (
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
        ) : null}
        <button
          className={
            selectedQuiz.displayMode === "default"
              ? submitted === true
                ? "quizButton"
                : "displayNone"
              : "quizButton"
          }
          onClick={() => {
            if (selectedQuiz.displayMode === "default") {
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
            } else if (selectedQuiz.displayMode === "q-cards") {
              setFlipped(resetFlipped);
              const btnIdNum = 0;
              const el = document.getElementById("QCD" + btnIdNum);
              const vhValue = (10 * window.innerHeight) / 100;
              const vwValue = (2 * window.innerWidth) / 100;
              const navbarHeight = vhValue + vwValue;
              const offset = el.offsetTop - navbarHeight;
              window.scrollTo({ top: offset, behavior: "smooth" });
            }
          }}
        >
          Restart
        </button>
        <button
          className={
            selectedQuiz.displayMode === "default"
              ? submitted === true
                ? "quizButton bottomBtn"
                : "displayNone"
              : "quizButton bottomBtn"
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
