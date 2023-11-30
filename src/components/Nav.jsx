const Nav = (props) => {
  const page = props.page;
  const updatePage = props.updatePage;
  let clickCount = 0;
  const selectedLink = props.selectedLink;
  const setSelectedLink = props.updateSelectedLink;
  const selectedQuiz = props.selectedQuiz;
  const updateSelectedQuiz = props.updateSelectedQuiz;
  const saveFunc = props.saveFunc;
  const quizzesIndex = props.quizzesIndex;
  const setQuizzesIndex = props.setQuizzesIndex;
  return (
    <nav>
      <div>
        <button
          className="logoBtn"
          onClick={() => {
            clickCount++;
            clickCount > 68
              ? (updatePage("logs"), setSelectedLink("logs"))
              : null;
          }}
        >
          <img src="./images/quizMakerLogo.png" />
        </button>
        <p>Quiz Maker</p>
      </div>
      <div>
        <button
          className={
            selectedLink === "home" ? "marginRight selectedLink" : "marginRight"
          }
          onClick={() => {
            setSelectedLink("home");
            updatePage("home");
          }}
        >
          Home
        </button>
        {page === "quiz" && (
          <button
            className={selectedLink === "quiz" && "marginRight selectedLink"}
            onClick={() => {
              setSelectedLink("quiz");
              updatePage("quiz");
            }}
          >
            Quiz
          </button>
        )}
        <button
          className={
            page === "logs"
              ? "marginRight"
              : page === "maker"
              ? "selectedLink"
              : null
          }
          onClick={() => {
            setSelectedLink("maker");
            updatePage("maker");
            updateSelectedQuiz({
              title: "Untitled Quiz",
              questions: [""],
              answers: [""],
            });
            setQuizzesIndex(false);
          }}
        >
          Maker
        </button>
        {page === "logs" && (
          <button
            className={selectedLink === "logs" ? "selectedLink" : null}
            onClick={() => {
              setSelectedLink("logs");
              updatePage("logs");
            }}
          >
            Logs
          </button>
        )}
      </div>
      {page === "maker" && (
        <div>
          <input
            type="text"
            placeholder="Untitled Quiz"
            className="marginRight"
            name="titleInput"
            id="titleInput"
            onChange={(event) => {
              let value = event.target.value;
              if (value.length > 27) {
                value = event.target.value.substring(0, 27) + "...";
              } else if (value === "") {
                value = "Untitled Quiz";
              }
              updateSelectedQuiz({
                title: value,
                questions: selectedQuiz.questions,
                answers: selectedQuiz.answers,
              });
            }}
          />
          <button
            onClick={() => {
              saveFunc(quizzesIndex);
              updatePage("home");
              setSelectedLink("home");
              updateSelectedQuiz({
                title: "Untitled Quiz",
                questions: [""],
                answers: [""],
              });
            }}
            id="saveBtn"
          >
            Save & Quit
          </button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
