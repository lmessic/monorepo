import React from "react";
import { describe, expect, it } from "@jest/globals";
import renderer from "react-test-renderer";
import Button from "./index";

describe("button 快照测试", () => {
	it("should render", () => {
		const component = renderer.create(<Button type="primary">按钮333</Button>);

		let tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
