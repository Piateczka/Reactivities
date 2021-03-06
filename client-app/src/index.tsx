import React from "react";
import ReactDOM from "react-dom/client";
//import 'semantic-ui-css/semantic.min.css'
import "./app/layout/styles.css";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import { store, StoreContext } from '../src/app/stores/store'
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(


	<StoreContext.Provider value={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StoreContext.Provider>


);

reportWebVitals();
