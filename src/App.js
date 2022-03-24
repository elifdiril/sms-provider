import "./App.css";
import { SmsProvider } from "./context/SmsContext";
import SmsProviderTable from "./components/SmsProviderTable";
import SmsProviderButton from "./components/SmsProviderButton";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddOrUpdateSms from "./components/AddOrUpdateSms";
import ChangeStatusButton from "./components/ChangeStatusButton";

function App() {
  return (
    <div className="App">
      <SmsProvider>
        <Router>
          <Routes>
            <Route
              path="/add-new"
              element={
                <div>
                  <AddOrUpdateSms />
                </div>
              }
            />
            <Route
              path="/update/:id"
              element={
                <div>
                  <AddOrUpdateSms />
                </div>
              }
            />
            <Route
              path="/"
              element={
                <div className="list">
                  <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                  />

                  <div className="smsButton">
                    <ChangeStatusButton/>
                    <SmsProviderButton />
                    <SmsProviderButton isUpdate={true} />
                  </div>
                  <SmsProviderTable />
                </div>
              }
            />
          </Routes>
        </Router>
      </SmsProvider>
    </div>
  );
}

export default App;
