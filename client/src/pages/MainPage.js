import { RegistrationForm } from "../components/forms/RegistrationForm";
import { Tabs } from "../components/Tabs";
import { useState } from "react";
import { LoginForm } from "../components/forms/LoginForm";

export const MainPage = () => {
	const tabs = [
		{ type: "registration", name: "Зарегистрироваться" },
		{ type: "login", name: "Войти" },
	];
	const [tab, setTab] = useState("registration");
	return (
		<div className="homepage">
			<Tabs tabs={tabs} tab={tab} setTab={setTab} />

			{tab === "registration" ? <RegistrationForm /> : <LoginForm />}
		</div>
	);
};
