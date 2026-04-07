import { test, expect } from "@jest/globals";
import { IDCode } from "../02_IDNumber";

test("Male gender", ()=>{
    expect(new IDCode("50411212714").gender()).toBe("M")
})