import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApi } from "./store/githubSlice";
import { RootState, AppDispatch } from "./store";

import "./App.css";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchApi("app"));
  }, [dispatch]);

  const { data } = useSelector((state: RootState) => state.gs);

  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
