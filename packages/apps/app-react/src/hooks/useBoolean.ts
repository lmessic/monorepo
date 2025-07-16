import { useState } from "react";

export const useBoolean = (initialValue: boolean): [boolean, (value: boolean) => void] => {
	const [bool, setBool] = useState(initialValue);

	const toggle = (newValue: boolean) => {
		setBool(newValue);
	};

	return [bool, toggle];
};
