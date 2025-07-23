import React from "react";

interface CardProps {
	className: string;
	children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children }) => {
	return <div className={`bg-card border m-2 rounded-sm shadow-md ${className}`}>{children}</div>;
};

export default Card;
