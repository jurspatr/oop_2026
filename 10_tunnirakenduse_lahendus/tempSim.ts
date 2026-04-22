class MaterialAmount {
    protected mass: number;
    protected specificHeatCapacity: number;
    protected temperature: number;

    constructor(mass: number, specificHeatCapacity: number, temperature: number) {
        this.mass = mass;
        this.specificHeatCapacity = specificHeatCapacity;
        this.temperature = temperature;
    }

    getTemperature(): number {
        return this.temperature;
    }

    changeEnergy(energy: number): void {
        const deltaTemperature = energy / (this.mass * this.specificHeatCapacity);
        this.temperature = this.temperature + deltaTemperature;
    }

    getInfluence(): number {
        return this.mass * this.specificHeatCapacity;
    }
}

class AirAmount extends MaterialAmount {
    static air_density: number = 1.23;
    static air_specific_heat_capacity: number = 1012;

    constructor(length: number, width: number, height: number, temperature: number) {
        const mass = length * width * height * AirAmount.air_density;
        super(mass, AirAmount.air_specific_heat_capacity, temperature);
    }
}

function equalTemperature(materials: MaterialAmount[]): number {
    let totalWeightedTemperature = 0;
    let totalInfluence = 0;

    for (const material of materials) {
        totalWeightedTemperature += material.getTemperature() * material.getInfluence();
        totalInfluence += material.getInfluence();
    }

    return totalWeightedTemperature / totalInfluence;
}