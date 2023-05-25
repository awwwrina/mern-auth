
import { Label } from "./Label";
import { Errors } from "./Errors";
import { useState } from "react";

export const FileInput = ({ name, errors, touched, setFieldValue }) => {
    const [label, setLabel] = useState('Выберите фото')
	return (
		<>
			<div className="form__file-input">
				<Label name={"file"} label={label} />

				<input
					hidden
					id="file"
					name="photo"
					accept="image/*"
					type="file"
					onChange={(event) => {
						const fileReader = new FileReader();
						fileReader.onload = () => {
							if (fileReader.readyState === 2) {
								setFieldValue("photo", fileReader.result);  
							}
						};
                        fileReader.readAsDataURL(event.target.files[0]);
                        setLabel("Фото выбрано")
						
					}}
				/>
			</div>

			<Errors errors={errors} touched={touched} name={name} />
		</>
	);
};
