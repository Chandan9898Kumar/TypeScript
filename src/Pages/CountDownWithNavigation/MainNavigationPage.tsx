import { useState } from "react";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationCounter from "./Navigation";
import "./navigationCounter.css";
// Lazy load route components
const CounterPage = lazy(() => import("./CounterPage"));
const AccountPage = lazy(() => import("./AccountPage"));
const ContactPage = lazy(() => import("./ContactPage"));

const MainNavigationPage = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="main-navigation-page">
      <BrowserRouter>
        <NavigationCounter />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <CounterPage counter={counter} setCounter={setCounter} />
              }
            />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default MainNavigationPage;
