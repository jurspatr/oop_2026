import {isPositive} from "../01_PositiveNo";

test("positivity", ()=>{
    expect(isPositive(3)).toBe(true);
    expect(isPositive(-5)).toBe(false);
});