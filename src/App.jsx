import "./App.css";
import { useState } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Maker from "./pages/Maker";
import Quiz from "./pages/Quiz";
import Logs from "./pages/Logs";

function App() {
  // set up filesystem
  let quizzes = null;
  if (localStorage.getItem("quizzes")) {
    quizzes = JSON.parse(localStorage.getItem("quizzes"));
  } else {
    localStorage.setItem("quizzes", JSON.stringify([]));
    quizzes = JSON.parse(localStorage.getItem("quizzes"));
  }
  // save Function
  const saveFunc = (quizzesIndex) => {
    let newQuizzes = quizzes;
    if (quizzesIndex === false) {
      newQuizzes.push(selectedQuiz);
    } else {
      newQuizzes[quizzesIndex] = selectedQuiz;
    }
    localStorage.setItem("quizzes", JSON.stringify(newQuizzes));
  };
  // remove Function
  const remFunc = (index) => {
    quizzes.splice(index, 1);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
  };
  // use state page
  const [page, setPage] = useState("home");
  const updatePage = (newPage) => {
    setPage(newPage);
  };
  // use state quiz
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const updateSelectedQuiz = (newQuiz) => {
    setSelectedQuiz(newQuiz);
  };
  // use state link
  const [selectedLink, setSelectedLink] = useState("home");
  const updateSelectedLink = (link) => {
    setSelectedLink(link);
  };
  // edit or not variable
  const [quizzesIndex, setQuizzesIndex] = useState(false);
  // share useState
  const [share, setShare] = useState(false);
  // import function
  const importFunc = (quiz) => {
    const importedQuiz = JSON.parse(quiz);
    const newQuizzes = quizzes;
    newQuizzes.push(importedQuiz);
    localStorage.setItem("quizzes", JSON.stringify(newQuizzes));
  };

  // jsx
  return (
    <>
      <Nav
        page={page}
        updatePage={updatePage}
        selectedLink={selectedLink}
        updateSelectedLink={updateSelectedLink}
        selectedQuiz={selectedQuiz}
        updateSelectedQuiz={updateSelectedQuiz}
        saveFunc={saveFunc}
        quizzesIndex={quizzesIndex}
        setQuizzesIndex={setQuizzesIndex}
        share={share}
        setShare={setShare}
        importFunc={importFunc}
      />
      {page === "home" && (
        <Home
          remFunc={remFunc}
          quizzes={quizzes}
          updatePage={updatePage}
          updateSelectedQuiz={updateSelectedQuiz}
          updateSelectedLink={updateSelectedLink}
          page={page}
          quizzesIndex={quizzesIndex}
          setQuizzesIndex={setQuizzesIndex}
          setShare={setShare}
        />
      )}
      {page === "maker" && (
        <Maker
          selectedQuiz={selectedQuiz}
          updateSelectedQuiz={updateSelectedQuiz}
          page={page}
        />
      )}
      {page === "quiz" && (
        <Quiz page={page} updatePage={updatePage} selectedQuiz={selectedQuiz} />
      )}
      {page === "logs" && <Logs />}
    </>
  );
}

export default App;
