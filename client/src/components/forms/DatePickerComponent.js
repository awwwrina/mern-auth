import React, { useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";


export const DatePickerComponent = ({setFieldValue}) => {
	const [date, setDate] = useState(null);
	registerLocale("ru", ru);
	return (
		<DatePicker
			locale="ru"
			selected={date}
			onChange={(date) => {
				setDate(date);
				setFieldValue("birthDate", date);
			}}
			placeholderText={"Выберите дату"}
			isClearable={false}
			showYearDropdown={true}
			dateFormatCalendar="MMMM"
			dropdownMode="select"
			dateFormat="dd MMMM yyyy"
			minDate={moment().subtract(100, "years")._d}
			maxDate={moment().subtract(18, "years")._d}
		/>
	);
};
