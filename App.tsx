import { Provider } from "react-redux";
import { persistor, store } from "./src/store/store";
import "./global.css";
import { PersistGate } from "redux-persist/integration/react";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}
