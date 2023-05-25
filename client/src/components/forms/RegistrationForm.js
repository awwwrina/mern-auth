import { Formik, Form, Field, useFormik } from "formik";
import * as yup from "yup";

import { SelectInput } from "./SelectInput";
import { Input } from "./Input";
import { DateInput } from "./DateInput";
import { FileInput } from "./FileInput";

export const RegistrationForm = () => {
	const validationSchema = yup.object().shape({
		name: yup.string().required('Поле "Имя" обязательно для заполнения'),
		email: yup
			.string()
			.email("Введите действительный адрес электронной почты")
			.required('Поле "Email" обязательно для заполнения'),
		password: yup
			.string()
			.min(6, "Пароль должен содержать минимум 6 символов")
			.required('Поле "Пароль" обязательно для заполнения'),
		birthDate: yup
			.date()
			.nullable()
			.required('Поле "Дата рождения" обязательно для заполнения'),
		gender: yup
			.string()
			.oneOf(
				["male", "female", "other"],
				"Выберите действительное значение пола"
			)
			.required('Поле "Пол" обязательно для заполнения'),
		photo: yup.mixed().required('Поле "Фото" обязательно для заполнения'),
	});
	return (
		<>
			<Formik
				initialValues={{
					name: "",
					email: "",
					password: "",
					birthDate: "",
					gender: "",
					photo: "",
				}}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				{({ setFieldValue, errors, touched }) => (
					<Form className="form">
						<Input
							name="name"
							label="Имя"
							type="text"
							touched={touched}
							errors={errors}
						/>
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

						<SelectInput
							name="gender"
							label="Пол"
							options={[
								{ name: "Женский", value: "female" },
								{ name: "Мужской", value: "male" },
							]}
							touched={touched}
							errors={errors}
						/>

						<DateInput
							name="birthDate"
							label="Дата рождения"
							touched={touched}
							errors={errors}
							setFieldValue={setFieldValue}
						/>
						<FileInput
							name="photo"
							label="Фото"
							touched={touched}
							errors={errors}
							setFieldValue={setFieldValue}
						/>
						<button className="form__submit" type="submit">
							Зарегистрироваться
						</button>
					</Form>
				)}
			</Formik>
		</>
	);
};
