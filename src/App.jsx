import { Route, Routes } from "react-router-dom";
import Page from "./pages/components/Page";
import Main from "./pages/Main";
import NewExam from "./pages/NewExam";
import PageContainer from "./pages/components/PageContainer";
import Quezz from "./pages/Quezz";

function App() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden overflow-y-auto flex">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Page text={"page 1"} />} />
          <Route
            path="new"
            element={<PageContainer children={<NewExam />} />}
          />
        </Route>
        <Route path="/quize" element={<Quezz />} />
      </Routes>
    </div>
  );
}

export default App;
