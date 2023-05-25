import { Formik, Form } from "formik";
import * as yup from "yup";

import { Input } from "./Input";

export const LoginForm = () => {
	const validationSchema = yup.object().shape({
		email: yup
			.string()
			.email("Введите действительный адрес электронной почты")
			.required('Поле "Email" обязательно для заполнения'),
		password: yup
			.string()
			.min(6, "Пароль должен содержать минимум 6 символов")
			.required('Поле "Пароль" обязательно для заполнения'),
	});
	return (
		<>
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				{({ errors, touched }) => (
					<Form className="form">
						<Input
							name="email"
							label="Email"
							type="email"
							touched={touched}
							errors={errors}
						/>
						<Input
							name="password"
							label="Пароль"
							type="password"
							touched={touched}
							errors={errors}
						/>
						<button className="form__submit" type="submit">
							Войти
						</button>
					</Form>
				)}
			</Formik>
		</>
	);
};
