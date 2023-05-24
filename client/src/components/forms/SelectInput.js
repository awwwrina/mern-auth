import { Field } from "formik";

export const SelectInput = ({name, label, options, touched, errors}) => {

	return (
		<>
			<label htmlFor={name}>{label}</label>
			<Field name={name} as="select">
				<option disabled />
				{options.map((item) => (
					<option key={item.value} value={item.value}>
						{item.name}
					</option>
				))}
			</Field>

			{errors[name] && touched[name] ? <div>{errors[name]}</div> : null}
		</>
	);
};
