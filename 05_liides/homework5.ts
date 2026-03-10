interface CalculationFunction{
    calculate(x:number):number;

    inputUnit(): string;

    outputUnit(): string;
}

class EurToDollar implements CalculationFunction{
    calculate (euro: number): number {
        return euro*1.1640;
    }
    inputUnit(): string {
        return "€";
    }
    outputUnit(): string {
        return "$";
    }
}

class DollarToEur implements CalculationFunction{
    calculate(dollars: number): number {
        return dollars*0.8591;
    }
    inputUnit(): string {
        return "$";
    }
    outputUnit(): string {
        return "€";
    }
}

class DollarToPound implements CalculationFunction{
    calculate(dollars: number): number {
        return dollars*0.7437;
    }
    inputUnit(): string {
        return "$";
    }
    outputUnit(): string {
        return "£";
    }
}

class PoundToDollar implements CalculationFunction{
    calculate(pounds: number): number {
        return pounds*1.3446;
    }
    inputUnit(): string {
        return "£";
    }
    outputUnit(): string {
        return "$";
    }
}

class EurToPound implements CalculationFunction{
    calculate(euro: number): number {
        return euro*0.8652;
    }
    inputUnit(): string {
        return "€";
    }
    outputUnit(): string {
        return "£";
    }
}

class PoundToEur implements CalculationFunction{
    calculate(pounds: number): number {
        return pounds*1.1558;
    }
    inputUnit(): string {
        return "£";
    }
    outputUnit(): string {
        return "€";
    }
}