import { Field } from "formik";
import { Label } from "./Label";
import { Errors } from "./Errors";
import { DatePickerComponent } from "./DatePickerComponent";

export const DateInput = ({ name, errors, label, touched, setFieldValue }) => {
	return (
		<>
			<Label name={name} label={label} />
			<Field
				name={name}
				as={DatePickerComponent}
				setFieldValue={setFieldValue}
			/>
			<Errors errors={errors} touched={touched} name={name} />
		</>
	);
};
