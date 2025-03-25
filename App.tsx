if (__DEV__) {
  require("./ReactotronConfig");
}

import { Provider } from "react-redux";
import { persistor, store } from "./src/store/store";
import "./global.css";
import { PersistGate } from "redux-persist/integration/react";
import RootNavigator from "./src/navigation/RootNavigator";
import { useFonts } from "expo-font";

export default function App() {
  useFonts({
    Inter: require("./assets/fonts/Inter_18pt-Regular.ttf"),
    InterMedium: require("./assets/fonts/Inter_18pt-Medium.ttf"),
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}
