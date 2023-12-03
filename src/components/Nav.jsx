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
  const share = props.share;
  const setShare = props.setShare;
  const importFunc = props.importFunc;
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
              setShare(false);
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
            setShare(false);
            updateSelectedQuiz({
              title: "Untitled Quiz",
              questions: [""],
              answers: [""],
              displayMode: "default",
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
              setShare(false);
              updatePage("logs");
            }}
          >
            Logs
          </button>
        )}
      </div>
      {page === "quiz" && (
        <div>
          <button
            className={
              selectedQuiz.displayMode === "default"
                ? "selectedLink marginRight"
                : "marginRight"
            }
            onClick={() => {
              updateSelectedQuiz({
                title: selectedQuiz.title,
                questions: selectedQuiz.questions,
                answers: selectedQuiz.answers,
                displayMode: "default",
              });
            }}
          >
            Default
          </button>
          <button
            className={
              selectedQuiz.displayMode === "q-cards" ? "selectedLink" : ""
            }
            onClick={() => {
              updateSelectedQuiz({
                title: selectedQuiz.title,
                questions: selectedQuiz.questions,
                answers: selectedQuiz.answers,
                displayMode: "q-cards",
              });
            }}
          >
            Q-Cards
          </button>
        </div>
      )}
      {page === "maker" && (
        <>
          <div className="makerNav">
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
                  displayMode: selectedQuiz.displayMode,
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
                  displayMode: "default",
                });
              }}
              id="saveBtn"
            >
              Save & Quit
            </button>
          </div>
          <div className="makerNav">
            <input
              type="text"
              id="importedQuizInput"
              placeholder="Paste Quiz Here"
              className="marginRight"
            />
            <button
              onClick={() => {
                const el = document.getElementById("importedQuizInput");
                const quiz = el.value.trim();
                importFunc(quiz);
                updatePage("home");
                setSelectedLink("home");
                updateSelectedQuiz({
                  title: "Untitled Quiz",
                  questions: [""],
                  answers: [""],
                  displayMode: "default",
                });
              }}
            >
              Import
            </button>
          </div>
        </>
      )}
      {page === "home" && share !== false ? (
        <div>
          <input
            type="text"
            id="shareDisplay"
            className="marginRight shareDisplay"
            contentEditable="false"
            value={share}
          />
          <button
            onClick={() => {
              const el = document.getElementById("shareDisplay");
              el.select();
              el.setSelectionRange(0, 99999);
              navigator.clipboard.writeText(el.value);
            }}
          >
            Copy
          </button>
        </div>
      ) : null}
    </nav>
  );
};

export default Nav;
