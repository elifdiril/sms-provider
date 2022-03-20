import "./App.css";
import { SmsProvider } from "./context/SmsContext";
import SmsProviderTable from "./components/SmsProviderTable";
import SmsProviderButton from "./components/SmsProviderButton";

function App() {
  return (
    <div className="App">
      <SmsProvider>
        <SmsProviderButton isUpdate={true} />
        <SmsProviderButton />
        <SmsProviderTable />
      </SmsProvider>
    </div>
  );
}

export default App;
