import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setParams } from "../../redux/quizeParams";
import { useNavigate } from "react-router-dom";
function NewExam() {
  // navigate hook
  const navigate = useNavigate();
  // redux hooks
  const { quiz, quizeParams } = useSelector((s) => s);
  const dispatch = useDispatch();
  // catergory params
  const [categories, setCategories] = useState(null);
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [searchCategories, setSearchCategories] = useState([]);

  // queez
  const [queez, setQueez] = useState([]);
  const [maxQueezNumber, setMaxQueezNumber] = useState(50);
  const [queezNumber, setQueezNumber] = useState(50);
  // examTime
  const [examTime, setExamTime] = useState({ minute: 30, heure: 0 });

  // events
  const queezNumberChange = (e) => {
    const { value } = e.target;
    setQueezNumber(+value);
  };

  const selectCategory = (e) => {
    const value = e.target.value;
    if (searchCategories.includes(value))
      setSearchCategories((curr) => curr.filter((c) => c !== value));
    else setSearchCategories((curr) => [...curr, value]);
  };

  const examTimeChange = (e) => {
    const { name, value } = e.target;
    setExamTime((curr) => ({ ...curr, [name]: value }));
  };

  const searchChange = (e) => {
    const value = e.target.value;
    let result = categories;
    if (value)
      result = categories.filter((c) => {
        const C = c.toUpperCase();
        const VALUE = value.toUpperCase();
        return C.indexOf(VALUE) !== -1;
      });
    setCategoriesSelected(result);
    setSearchCategories(result);
  };

  const submit = () => {
    const data = {
      categories: searchCategories,
      quizzeNumber: queezNumber,
    };
    dispatch(setParams(data));
    navigate("/quize");
  };

  // use effect
  useEffect(() => {
    const count = queez.reduce(
      (pre, curr) => (searchCategories.includes(curr.category) ? pre + 1 : pre),
      0
    );
    setMaxQueezNumber(count);
    setQueezNumber(count);
  }, [searchCategories]);

  useEffect(() => {
    (async function () {
      const res = await axios.get("data.json");
      setQueez(res.data.quizzes);
      setMaxQueezNumber(res.data.quizzes.length);
      setQueezNumber(res.data.quizzes.length);
      setCategoriesSelected(res.data.categories);
      setSearchCategories(res.data.categories);
      setCategories(res.data.categories);
    })();
  }, []);

  // loading logique
  if (!categories) return <div>loading</div>;

  // page
  return (
    <>
      {/* category choice */}
      <div className="w-4/5 min-h-[200px] bg-white mx-auto py-3 rounded-md mb-5">
        <input
          type="text"
          className="block mx-auto mb-3 max-w-[500px] min-w-[300px] border-2 border-gray-400 rounded-xl px-3 py-1 focus:outline-0 focus:border-gray-500"
          placeholder="search category"
          onChange={searchChange}
        />
        {categoriesSelected.map((category) => (
          <div key={category} className="ml-20 mb-5">
            <input
              type="checkBox"
              id={category}
              value={category}
              checked={searchCategories.includes(category)}
              onChange={selectCategory}
              className="mr-2"
            />
            <label htmlFor={category} className="cursor-pointer">
              {category}
            </label>
          </div>
        ))}
      </div>
      {/* exam time */}
      <div className="w-4/5 min-h-[200px] bg-white mx-auto p-3 mb-3 rounded-md">
        <h1 className="text-3xl font-semibold capitalize mb-4 ">
          quezz duration
        </h1>
        {/* exam time inputs */}
        <div className="flex justify-around items-center">
          <div className="flex items-center">
            <p className="capitalize mr-4 font-semibold">heure :</p>
            <input
              type="number"
              name="heure"
              className="border border-gray-400 px-3 py-1 rounded-lg focus:outline-0 focus:border-gray-500"
              min={0}
              max={2}
              value={examTime.heure}
              onChange={examTimeChange}
            />
          </div>
          <div className="flex items-center">
            <p className="capitalize mr-4 font-semibold">minute :</p>
            <input
              type="number"
              name="minute"
              className="border border-gray-400 px-3 py-1 rounded-lg focus:outline-0 focus:border-gray-500"
              min={0}
              max={59}
              value={examTime.minute}
              onChange={examTimeChange}
            />
          </div>
        </div>
        {/* exam time result */}
        <p className="w-full flex flex-col text-center mt-3">
          <span className="block">
            {examTime.heure} Heure and {examTime.minute} Minute
          </span>
          <span className="text-xl">{`${examTime.heure} : ${examTime.minute}`}</span>
        </p>
      </div>
      {/* quezz number */}
      <div className="w-4/5 min-h-[100px] bg-white mx-auto p-3 rounded-md flex items-center">
        <label
          htmlFor="queezNumber"
          className="capitalize cursor-pointer mr-3 font-semibold"
        >
          number of quezz :
        </label>
        <input
          type="number"
          id="queezNumber"
          className="border border-gray-400 px-3 py-1 rounded-lg focus:outline-0 focus:border-gray-500"
          min={0}
          max={maxQueezNumber}
          value={queezNumber}
          onChange={queezNumberChange}
        />
        <p className="ml-5">maximum : {maxQueezNumber}</p>
      </div>
      {/* submit button */}
      <button
        className="capitalize px-3 py-1 rounded-md mx-auto my-3 block bg-green-600 hover:bg-green-500 cursor-pointer text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={queezNumber === 0}
        onClick={submit}
      >
        generate exam
      </button>
    </>
  );
}

export default NewExam;
