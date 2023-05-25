import { Field } from "formik";
import { Label } from "./Label";
import { Errors } from "./Errors";

export const Input = ({ name, label, type, touched, errors }) => {
	return (
		<>
			<Label name={name} label={label} />
			<Field name={name} type={type} />
			<Errors errors={errors} touched={touched} name={name} />
		</>
	);
};
