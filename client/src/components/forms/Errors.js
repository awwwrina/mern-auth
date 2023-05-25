export const Errors = ({ errors, name, touched }) => {
	return (
		<div className="form__error">{errors[name] && touched[name] ? errors[name] : null}</div>
	);
};