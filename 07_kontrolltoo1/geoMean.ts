class GeometricMean {
    squareRoot(nr1: number, nr2: number): number {
        return Math.sqrt(nr1 * nr2);
    }

    sqrtArr(arr: number[]): number {
        let multiplication = 1;

        for (let i = 0; i < arr.length; i++) {
            multiplication *= arr[i];
        }

        return Math.pow(multiplication, 1 / arr.length);
    }

    updateCoeff(changePercent: number): number {
        return changePercent;
    }
}