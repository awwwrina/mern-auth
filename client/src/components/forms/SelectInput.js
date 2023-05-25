import { Field } from "formik";
import { Label } from "./Label";
import { Errors } from "./Errors";

export const SelectInput = ({name, label, options, touched, errors}) => {

	return (
		<>
			<Label name={name} label={label} />
			<Field name={name} as="select">
				<option disabled />
				{options.map((item) => (
					<option key={item.value} value={item.value}>
						{item.name}
					</option>
				))}
			</Field>
			<Errors errors={errors} touched={touched} name={name} />
		</>
	);
};
