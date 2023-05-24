import {Field} from "formik";

export const Input = ({ name, label,  type, touched, errors }) => {
	return (
		<>
			<label htmlFor={name}>{label}</label>
			<Field name={name} type={type} autoComplete="off" />
			{errors[name] && touched[name] ? <div>{errors[name]}</div> : null}
		</>
	);
};
