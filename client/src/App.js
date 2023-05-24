import {
	Routes,
	Route,
	Outlet,
} from "react-router-dom";

import {MainPage} from "./pages/MainPage";
import {Users} from "./pages/Users";
import { Header } from "./components/Header";

function App() {
  
	return (
		<>
			<Header />
			<div className="container">
				<Outlet />
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/people" element={<Users />} />
					{/* <Route path="/account" element={
							<RequireAuth>
								<PersonalAccountPage/>
							</RequireAuth>
						}/> */}
				</Routes>
			</div>
		</>
	);
}

export default App;
