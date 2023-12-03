import SideMenu from "../components/SideMenu";
import { useState } from "react";

const Home = (props) => {
  const quizzes = props.quizzes;
  const updatePage = props.updatePage;
  const updateSelectedQuiz = props.updateSelectedQuiz;
  const updateSelectedLink = props.updateSelectedLink;
  const page = props.page;
  const remFunc = props.remFunc;
  const quizzesIndex = props.quizzesIndex;
  const setQuizzesIndex = props.setQuizzesIndex;
  const setShare = props.setShare;
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (quizzes === null) {
  } else {
    return (
      <>
        <SideMenu
          page={page}
          quizzes={quizzes}
          selectedQuiz={null}
          updatePage={updatePage}
          updateSelectedQuiz={updateSelectedQuiz}
          updateSelectedLink={updateSelectedLink}
          quizzesIndex={quizzesIndex}
          setQuizzesIndex={setQuizzesIndex}
          setShare={setShare}
        />
        <main id="home">
          {quizzes.map((value, index) => (
            <div
              className="homeDiv"
              id={"HD" + index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                id={"AD" + index}
                className={
                  hoveredIndex === index ? "actionDiv visible" : "actionDiv"
                }
              >
                <button
                  key={"EB" + index}
                  id={"EB" + index}
                  className="extraBtn"
                  onClick={(event) => {
                    let btnIndex;
                    if (event.target.src) {
                      btnIndex = event.target.id.split("EI")[1];
                    } else {
                      btnIndex = event.target.id.split("EB")[1];
                    }
                    setShare(false);
                    const value = quizzes[btnIndex];
                    updatePage("maker");
                    updateSelectedQuiz(value);
                    updateSelectedLink("maker");
                    setQuizzesIndex(btnIndex);
                  }}
                >
                  <img
                    className="extraImg"
                    id={"EI" + index}
                    src="./images/editBtn.png"
                  />
                </button>
                <button
                  key={"SB" + index}
                  id={"SB" + index}
                  className="extraBtn"
                  onClick={(event) => {
                    let btnIndex;
                    if (event.target.src) {
                      btnIndex = event.target.id.split("SI")[1];
                    } else {
                      btnIndex = event.target.id.split("SB")[1];
                    }
                    const value = JSON.stringify(quizzes[btnIndex]);
                    setShare(value);
                  }}
                >
                  <img
                    className="extraImg"
                    id={"SI" + index}
                    src="./images/shareImg.png"
                  />
                </button>
                <button
                  className="extraBtn"
                  key={"DB" + index}
                  id={"DB" + index}
                  onClick={(event) => {
                    let btnIndex;
                    if (event.target.src) {
                      btnIndex = event.target.id.split("DI")[1];
                    } else {
                      btnIndex = event.target.id.split("DB")[1];
                    }
                    setShare(false);
                    remFunc(btnIndex);
                    setHoveredIndex(null);
                  }}
                >
                  <img
                    className="extraImg"
                    id={"DI" + index}
                    src="./images/deleteBtn.png"
                  />
                </button>
              </div>
              <button
                className="homeButton"
                key={index}
                onClick={() => {
                  setShare(false);
                  updatePage("quiz");
                  updateSelectedQuiz(value);
                  updateSelectedLink("quiz");
                }}
              >
                {value.title}
              </button>
            </div>
          ))}

          <button
            className="homeButton"
            key="plus"
            id="plus"
            onClick={() => {
              updatePage("maker");
              updateSelectedQuiz({
                title: "Untitled Quiz",
                questions: [""],
                answers: [""],
                displayMode: "default",
              });
              setQuizzesIndex(false);
              updateSelectedLink("maker");
            }}
          >
            +
          </button>
        </main>
      </>
    );
  }
};

export default Home;
