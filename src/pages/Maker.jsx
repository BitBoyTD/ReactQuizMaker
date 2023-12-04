import SideMenu from "../components/SideMenu";

const Maker = (props) => {
  const page = props.page;
  const selectedQuiz = props.selectedQuiz;
  const updateSelectedQuiz = props.updateSelectedQuiz;
  return (
    <>
      <SideMenu
        page={page}
        quizzes={null}
        selectedQuiz={selectedQuiz}
        updatePage={null}
        updateSelectedQuiz={updateSelectedQuiz}
        updateSelectedLink={null}
        setShare={null}
      />
      <main id="maker" key="maker">
        <h1 key="title" id="title">
          {selectedQuiz.title}
        </h1>

        {selectedQuiz.questions.map((value, index) => {
          const onePlusIndex = index + 1;
          return (
            <>
              <div id={"QAD" + onePlusIndex} className="QAD">
                <div className="subTitleDiv" key={"STD" + onePlusIndex}>
                  <h2 key={"ST" + onePlusIndex}>
                    {"Question " + onePlusIndex}
                  </h2>
                  {index === 0 ? null : (
                    <button
                      key={"-" + onePlusIndex}
                      id={"-" + onePlusIndex}
                      onClick={(event) => {
                        const newQuestions = selectedQuiz.questions;
                        const newAnswers = selectedQuiz.answers;
                        newQuestions.splice(index, 1);
                        newAnswers.splice(index, 1);
                        updateSelectedQuiz({
                          title: selectedQuiz.title,
                          questions: newQuestions,
                          answers: newAnswers,
                          displayMode: selectedQuiz.displayMode,
                        });
                      }}
                    >
                      -
                    </button>
                  )}
                </div>
                <textarea
                  key={"Q" + onePlusIndex}
                  id={"Q" + onePlusIndex}
                  value={selectedQuiz.questions[index]}
                  placeholder="Question"
                  onChange={(event) => {
                    const index = event.target.id.split("Q")[1] - 1;
                    const newQuestions = selectedQuiz.questions;
                    newQuestions[index] = event.target.value;
                    updateSelectedQuiz({
                      title: selectedQuiz.title,
                      questions: newQuestions,
                      answers: selectedQuiz.answers,
                      displayMode: selectedQuiz.displayMode,
                    });
                  }}
                />
                <textarea
                  key={"A" + onePlusIndex}
                  id={"A" + onePlusIndex}
                  value={selectedQuiz.answers[index]}
                  placeholder="Answer"
                  onChange={(event) => {
                    const index = event.target.id.split("A")[1] - 1;
                    const newAnswers = selectedQuiz.answers;
                    newAnswers[index] = event.target.value;
                    updateSelectedQuiz({
                      title: selectedQuiz.title,
                      questions: selectedQuiz.questions,
                      answers: newAnswers,
                      displayMode: selectedQuiz.displayMode,
                    });
                  }}
                />
              </div>
            </>
          );
        })}
        <button
          key="+"
          id="plusBtn"
          onClick={() => {
            const newQuestions = [...selectedQuiz.questions, ""];
            const newAnswers = [...selectedQuiz.answers, ""];
            updateSelectedQuiz({
              title: selectedQuiz.title,
              questions: newQuestions,
              answers: newAnswers,
              displayMode: selectedQuiz.displayMode,
            });
            setTimeout(() => {
              const el = document.getElementById("plusBtn");
              const vhValue = (10 * window.innerHeight) / 100;
              const vwValue = (2 * window.innerWidth) / 100;
              const navbarHeight = vhValue + vwValue;
              const offset = el.offsetTop + navbarHeight;
              window.scrollTo({ top: offset, behavior: "smooth" });
            }, 0);
          }}
        >
          +
        </button>
      </main>
    </>
  );
};

export default Maker;
