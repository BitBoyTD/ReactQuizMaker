const SideMenu = (props) => {
  const page = props.page;
  const quizzes = props.quizzes;
  const selectedQuiz = props.selectedQuiz;
  const updatePage = props.updatePage;
  const updateSelectedQuiz = props.updateSelectedQuiz;
  const updateSelectedLink = props.updateSelectedLink;
  const setQuizzesIndex = props.setQuizzesIndex;

  if (page === "home") {
    return (
      <div id="sideMenu" key="sideMenu">
        {quizzes.map((value, index) => {
          return (
            <button
              key={"SM" + index}
              onClick={() => {
                updatePage("quiz");
                updateSelectedQuiz(value);
                updateSelectedLink("quiz");
              }}
            >
              {value.title}
            </button>
          );
        })}
        <button
          key="SM+"
          onClick={() => {
            updatePage("maker");
            updateSelectedQuiz({
              title: "Untitled Quiz",
              questions: [""],
              answers: [""],
            });
            setQuizzesIndex(false);
            updateSelectedLink("maker");
          }}
        >
          +
        </button>
      </div>
    );
  } else if (page === "maker") {
    return (
      <div id="sideMenu" key="sideMenu">
        {selectedQuiz.questions.map((value, index) => {
          const onePlusIndex = index + 1;
          return (
            <button
              key={"MSM" + index}
              id={"MSM" + onePlusIndex}
              onClick={(event) => {
                const btnIdNum = event.target.id.split("MSM")[1];
                const el = document.getElementById("QAD" + btnIdNum);
                const vhValue = (10 * window.innerHeight) / 100;
                const vwValue = (2 * window.innerWidth) / 100;
                const navbarHeight = vhValue + vwValue;
                const offset = el.offsetTop - navbarHeight;
                window.scrollTo({ top: offset, behavior: "smooth" });
              }}
            >
              {onePlusIndex}
            </button>
          );
        })}
        <button
          key="SM+"
          onClick={() => {
            const newQuestions = [...selectedQuiz.questions, ""];
            const newAnswers = [...selectedQuiz.answers, ""];
            updateSelectedQuiz({
              title: selectedQuiz.title,
              questions: newQuestions,
              answers: newAnswers,
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
      </div>
    );
  } else if (page === "quiz") {
    return (
      <div id="sideMenu" key="sideMenu">
        {selectedQuiz.questions.map((value, index) => {
          const onePlusIndex = index + 1;
          return (
            <button
              key={"QSM" + index}
              id={"QSM" + index}
              onClick={(event) => {
                const btnIdNum = event.target.id.split("QSM")[1];
                let el;
                if (selectedQuiz.displayMode === "default") {
                  el = document.getElementById("QQAD" + btnIdNum);
                } else if (selectedQuiz.displayMode === "q-cards") {
                  el = document.getElementById("QCD" + btnIdNum);
                }
                const vhValue = (10 * window.innerHeight) / 100;
                const vwValue = (2 * window.innerWidth) / 100;
                const navbarHeight = vhValue + vwValue;
                const offset = el.offsetTop - navbarHeight;
                window.scrollTo({ top: offset, behavior: "smooth" });
              }}
            >
              {onePlusIndex}
            </button>
          );
        })}
      </div>
    );
  }
};

export default SideMenu;
