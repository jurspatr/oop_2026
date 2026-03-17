// BATTERY CLASS - models real battery physics (3.6 joules = 1 mAh, 50W charger)
class Battery {
    // Private property: maximum battery capacity in milliamp-hours (e.g., 1000 mAh)
    private maxCapacitymAh: number;
    // Private property: current battery charge level in milliamp-hours
    private currentChargemAh: number;

    // Constructor: creates new battery with max capacity and initial charge
    constructor(maxCapacitymAh: number, currentChargemAh: number) {
        // Store maximum capacity value
        this.maxCapacitymAh = maxCapacitymAh;
        // Clamp initial charge between 0 and max capacity (can't be negative or over max)
        this.currentChargemAh = Math.max(0, Math.min(currentChargemAh, maxCapacitymAh));
    }

    // Returns charge as percentage (0-100) rounded to nearest whole number
    getChargePercentage(): number {
        // Calculate percentage: (current/max) * 100, then round
        return Math.round((this.currentChargemAh / this.maxCapacitymAh) * 100);
    }

    // Returns raw current charge level in mAh
    getCurrentCharge(): number {
        return this.currentChargemAh;
    }

    // Charges battery for specified seconds at 50W (default) charger power
    charge(seconds: number, chargerPowerW: number = 50): string {
        // Calculate total energy available: power (watts) × time (seconds) = joules
        const joulesAvailable = chargerPowerW * seconds;
        // Convert joules to mAh: joules ÷ 3.6 (since 1 mAh = 3.6 joules)
        const mAhAdded = joulesAvailable / 3.6;
        // Add charge but cap at maximum capacity (can't overcharge)
        this.currentChargemAh = Math.min(this.maxCapacitymAh, this.currentChargemAh + mAhAdded);
        // If reached 100%, return full charge message
        if (this.currentChargemAh >= this.maxCapacitymAh) {
            return "Battery fully charged!";
        }
        // No warning needed
        return "";
    }

    // Removes specified mAh from battery, warns if empty
    discharge(mAh: number): string {
        // Subtract mAh but never go below 0
        this.currentChargemAh = Math.max(0, this.currentChargemAh - mAh);
        // If charge hit exactly 0, return warning
        if (this.currentChargemAh === 0) {
            return "Battery empty! Warning!";
        }
        // No warning needed
        return "";
    }
}

// Global variable: stores current battery instance (null until created)
let battery: Battery | null = null;

// Creates new Battery instance from HTML input fields
function createBattery(): void {
    // Get max capacity value from input field, convert to number
    const maxCap = (document.getElementById("maxCap") as HTMLInputElement).valueAsNumber;
    // Get initial charge value from input field, convert to number
    const initCharge = (document.getElementById("initCharge") as HTMLInputElement).valueAsNumber;
    // Create new battery with those values
    battery = new Battery(maxCap, initCharge);
    // Update display with new battery info
    updateDisplay();
}

// Charges battery based on seconds input
function doCharge(): void {
    // Exit if no battery created yet
    if (!battery) return;
    // Get seconds from input field
    const seconds = (document.getElementById("seconds") as HTMLInputElement).valueAsNumber;
    // Charge battery and get any warning message
    const msg = battery.charge(seconds);
    // Show warning if any
    showWarning(msg);
    // Refresh display with new values
    updateDisplay();
}

// Quick discharge button: removes exactly 100 mAh
function discharge100(): void {
    // Exit if no battery
    if (!battery) return;
    // Discharge 100 mAh and get warning
    const msg = battery.discharge(100);
    // Show warning
    showWarning(msg);
    // Update display
    updateDisplay();
}

// Updates HTML display with current battery values
function updateDisplay(): void {
    // Exit if no battery
    if (!battery) return;
    // Set current charge text (toFixed(0) removes decimals)
    (document.getElementById("levelDisplay") as HTMLElement).textContent = 
        battery.getCurrentCharge().toFixed(0);
    // Set percentage text
    (document.getElementById("percentDisplay") as HTMLElement).textContent = 
        battery.getChargePercentage().toString();
}

// Shows/hides warning message with red styling
function showWarning(msg: string): void {
    // Get warning paragraph element
    const warnEl = document.getElementById("warning") as HTMLElement;
    // Set warning text
    warnEl.textContent = msg;
    // Add red bold class if message exists, remove if empty
    warnEl.className = msg ? "warning" : "";
}
