import { sum } from "../src/utils/math";
import { describe, test, expect } from "@jest/globals";

describe("math test", () => {
	test("sum test", () => {
		expect(sum(1, 2)).toBe(3);
	});
});
