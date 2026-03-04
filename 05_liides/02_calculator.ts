interface CalculatingFunction {
    calculate(x: number): number;

    inPutUnit(): string;

    outPutUnit(): string;
}

class CmToIn implements CalculatingFunction{
    calculate(cm: number): number {
        return cm/2.54;}
        
    inPutUnit(): string {
        return "cm";
    }

    outPutUnit(): string {
        return "in";
    }

}





