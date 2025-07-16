import React from "react";
import { useBoolean } from "../../hooks/useBoolean";

const buttonTypes = ["default", "primary"] as const;

type Buttontypes = (typeof buttonTypes)[number];

interface ButtonProps {
	type: Buttontypes;
	children: React.ReactNode;
	onClick?: () => void;
}
const Button: React.FC<ButtonProps> = (props) => {
	const { children, type } = props;
	const [disabled, setDisabled] = useBoolean(false);

	// @ts-ignore
	return <button disabled={disabled}>{children}</button>;
};

export default Button;
