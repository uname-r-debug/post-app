import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { LoginForm } from "./components/login-form.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import SignupForm from "./components/signup-form.tsx";
import Page from "./components/page.tsx";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LoginForm className="min-h-[inherit] justify-center items-center w-[50%] mx-auto" />
            }
          ></Route>
          <Route path="/0" element={<SignupForm />} />
          <Route path="/1" element={<Page />}>
            <Route path=":context" element={<Outlet />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
