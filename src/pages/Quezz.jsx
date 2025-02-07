import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsideBar from "./components/AsideBar";
import axios from "axios";
import { setQuizData } from "../../redux/quiz";
import PageContainer from "./components/PageContainer";
import { ArrowBigLeft, ArrowBigRight, Check } from "lucide-react";

function Quezz() {
  let isDone = false;
  // redux hooks
  const dispatch = useDispatch();
  const { quizeParams, exams } = useSelector((s) => s);
  // quize params
  const [quizzes, setQuizzes] = useState(null);
  const [subbmit, setSubmit] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  function submitQuize() {
    setSubmit(true);
    const p = quizzes.quizzes.map((ele, index) => {
      if (index === currentQuestion) {
        ele.isSubmmited = true;
      }
      return ele;
    });
    setQuizzes((curr) => ({ ...curr, quizzes: p }));
  }

  function changeQuestion(number) {
    setCurrentQuestion((curr) => curr + number);
    setSubmit(quizzes.quizzes[currentQuestion + number].isSubmmited);
  }
  function handleAnswer(index) {
    if (subbmit) return;
    const currAnswer = quizzes.quizzes[currentQuestion].userAnswer;

    const answer = !currAnswer.includes(index)
      ? [...currAnswer, index]
      : currAnswer.filter((i) => i !== index);
    const newQuizzes = quizzes.quizzes.map((quize, index) => {
      if (index === currentQuestion) {
        quize.userAnswer = answer;
      }
      return quize;
    });
    setQuizzes((curr) => ({ ...curr, quizzes: newQuizzes }));
  }

  function getRandomElements(arr, count) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  useEffect(() => {
    (async function () {
      const {
        data: { quizzes },
      } = await axios.get("data.json");
      let result = quizzes.filter((quizze) =>
        quizeParams.categories.includes(quizze.category)
      );
      result = getRandomElements(result, quizeParams.quizzeNumber);
      setQuizzes({ quizzes: result, id: exams.length + 1, currentQuestion: 0 });
      if (!isDone) {
        dispatch(setQuizData({ quizzes: result, id: exams.length + 1 }));
        isDone = !isDone;
      }
    })();
  }, []);

  // loadin logique

  if (!quizzes) return <div>Loading</div>;

  // component
  return (
    <div className="w-screen min-h-screen flex">
      <AsideBar>
        {quizzes.quizzes.map((quize, i) => (
          <li className="list-none pl-2 flex items-center mb-2 duration-300 hover:bg-gray-200 rounded-lg mx-2 py-1 cursor-pointer">
            <p className="w-[30px] h-[30px] rounded-[50%] text-center bg-orange-400 text-white font-semibold text-xl ">
              {i + 1}
            </p>
            <p className="pl-2 font-semibold w-[95%]">
              {quize.question.slice(0, 21)}...
            </p>
          </li>
        ))}
      </AsideBar>
      <PageContainer>
        <div className="w-4/5 h-max p-3 rounded-md bg-white mx-auto mt-auto">
          <h1 className="flex items-center pb-2 mb-2 border-b border-orange-300">
            <span className="w-[30px] h-[30px] mr-2 block rounded-[50%] text-center bg-orange-400 text-white font-semibold text-xl ">
              {currentQuestion + 1}
            </span>
            <span className="w-[90%]">
              {quizzes.quizzes[currentQuestion].question}
            </span>
          </h1>
          {quizzes.quizzes[currentQuestion].choices.map((option, index) => (
            <div key={`oprion-${index}`} onClick={() => handleAnswer(index)}>
              <div
                className={`flex items-center mb-2 duration-300 cursor-pointer rounded-md p-2 hover:bg-gray-200 
                  ${
                    // * in submit mode
                    subbmit
                      ? // ? if is user choice
                        quizzes.quizzes[currentQuestion].userAnswer.includes(
                          index
                        )
                        ? // * if is correct choice
                          quizzes.quizzes[
                            currentQuestion
                          ].answerNumber.includes(index)
                          ? "bg-green-300"
                          : // ! if is wrong choice
                            "bg-red-300"
                        : // ! if isn't the user whoice but is correct choice
                          quizzes.quizzes[
                            currentQuestion
                          ].answerNumber.includes(index) && "bg-orange-300"
                      : // * in normal mode
                        quizzes.quizzes[currentQuestion].userAnswer.includes(
                          index
                        ) && "bg-gray-200"
                  }
                  `}
              >
                <p className="w-[30px] h-[30px] mr-2 rounded-[50%] text-center uppercase border border-gray-200 font-semibold text-xl ">
                  {"abcd"[index]}
                </p>
                <p className="">{option.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-4/5 flex items-center justify-center h-max p-3 rounded-md bg-white mx-auto mb-auto mt-3">
          <button
            disabled={currentQuestion <= 0}
            onClick={() => {
              changeQuestion(-1);
            }}
            className="cursor-pointer duration-300 border border-gray-500 hover:bg-gray-500 hover:text-white rounded-[50%] mx-4 w-10 h-10 p-1 disabled:hidden"
          >
            <ArrowBigLeft size={24} className=" w-full h-full " />
          </button>
          <Check
            onClick={() => submitQuize(true)}
            size={24}
            className="border border-green-500 rounded-[50%] mx-4 w-10 h-10 p-1 cursor-pointer duration-300 hover:bg-green-500 hover:text-white"
          />
          <button
            disabled={currentQuestion >= quizzes.quizzes.length}
            onClick={() => {
              changeQuestion(1);
            }}
            className="cursor-pointer duration-300 border border-gray-500 hover:bg-gray-500 hover:text-white rounded-[50%] mx-4 w-10 h-10 p-1 disabled:hidden"
          >
            <ArrowBigRight size={24} className=" w-full h-full " />
          </button>
        </div>
      </PageContainer>
    </div>
  );
}

export default Quezz;
