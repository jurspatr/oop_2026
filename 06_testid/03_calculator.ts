export class Calculator {
    protected panel: string = "";

    pressButton(b: string): void {
        if (b === "=") {
            try {
                const result = new Function(`return ${this.panel}`)();
                this.panel = String(result);
            } catch (e) {
                this.panel = "Error";
            }
        } else if (b === "C") {
            this.panel = "";
        } else {
            this.panel += b;
        }
    }

    getPanelContent(): string {
        return this.panel;
    }
}


if (typeof window !== 'undefined') {
    (window as any).Calculator = Calculator;
}