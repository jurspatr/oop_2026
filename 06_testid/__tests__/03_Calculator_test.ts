import { Calculator } from "../03_calculator"

let calcobj:Calculator;

beforeEach(()=>{
    calcobj=new Calculator();
})

test('empty init', ()=>{
    expect(calcobj.getPanelContent()).toBe("");
})

test('simple input', ()=>{
    calcobj.pressButton('7');
    expect(calcobj.getPanelContent()).toBe("7");
});

test('calculation test', () => {
    calcobj.pressButton('5');
    calcobj.pressButton('+');
    calcobj.pressButton('3');
    calcobj.pressButton('=');
    expect(calcobj.getPanelContent()).toBe("8");
});

test('subtraction test', () => {
    calcobj.pressButton('1');
    calcobj.pressButton('0');
    calcobj.pressButton('-');
    calcobj.pressButton('4');
    calcobj.pressButton('=');
    expect(calcobj.getPanelContent()).toBe("6");
});