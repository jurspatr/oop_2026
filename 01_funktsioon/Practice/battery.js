// BATTERY CLASS - models real battery physics (3.6 joules = 1 mAh, 50W charger)
var Battery = /** @class */ (function () {
    // Constructor: creates new battery with max capacity and initial charge
    function Battery(maxCapacitymAh, currentChargemAh) {
        // Store maximum capacity value
        this.maxCapacitymAh = maxCapacitymAh;
        // Clamp initial charge between 0 and max capacity (can't be negative or over max)
        this.currentChargemAh = Math.max(0, Math.min(currentChargemAh, maxCapacitymAh));
    }
    // Returns charge as percentage (0-100) rounded to nearest whole number
    Battery.prototype.getChargePercentage = function () {
        // Calculate percentage: (current/max) * 100, then round
        return Math.round((this.currentChargemAh / this.maxCapacitymAh) * 100);
    };
    // Returns raw current charge level in mAh
    Battery.prototype.getCurrentCharge = function () {
        return this.currentChargemAh;
    };
    // Charges battery for specified seconds at 50W (default) charger power
    Battery.prototype.charge = function (seconds, chargerPowerW) {
        if (chargerPowerW === void 0) { chargerPowerW = 50; }
        // Calculate total energy available: power (watts) × time (seconds) = joules
        var joulesAvailable = chargerPowerW * seconds;
        // Convert joules to mAh: joules ÷ 3.6 (since 1 mAh = 3.6 joules)
        var mAhAdded = joulesAvailable / 3.6;
        // Add charge but cap at maximum capacity (can't overcharge)
        this.currentChargemAh = Math.min(this.maxCapacitymAh, this.currentChargemAh + mAhAdded);
        // If reached 100%, return full charge message
        if (this.currentChargemAh >= this.maxCapacitymAh) {
            return "Battery fully charged!";
        }
        // No warning needed
        return "";
    };
    // Removes specified mAh from battery, warns if empty
    Battery.prototype.discharge = function (mAh) {
        // Subtract mAh but never go below 0
        this.currentChargemAh = Math.max(0, this.currentChargemAh - mAh);
        // If charge hit exactly 0, return warning
        if (this.currentChargemAh === 0) {
            return "Battery empty! Warning!";
        }
        // No warning needed
        return "";
    };
    return Battery;
}());
// Global variable: stores current battery instance (null until created)
var battery = null;
// Creates new Battery instance from HTML input fields
function createBattery() {
    // Get max capacity value from input field, convert to number
    var maxCap = document.getElementById("maxCap").valueAsNumber;
    // Get initial charge value from input field, convert to number
    var initCharge = document.getElementById("initCharge").valueAsNumber;
    // Create new battery with those values
    battery = new Battery(maxCap, initCharge);
    // Update display with new battery info
    updateDisplay();
}
// Charges battery based on seconds input
function doCharge() {
    // Exit if no battery created yet
    if (!battery)
        return;
    // Get seconds from input field
    var seconds = document.getElementById("seconds").valueAsNumber;
    // Charge battery and get any warning message
    var msg = battery.charge(seconds);
    // Show warning if any
    showWarning(msg);
    // Refresh display with new values
    updateDisplay();
}
// Quick discharge button: removes exactly 100 mAh
function discharge100() {
    // Exit if no battery
    if (!battery)
        return;
    // Discharge 100 mAh and get warning
    var msg = battery.discharge(100);
    // Show warning
    showWarning(msg);
    // Update display
    updateDisplay();
}
// Updates HTML display with current battery values
function updateDisplay() {
    // Exit if no battery
    if (!battery)
        return;
    // Set current charge text (toFixed(0) removes decimals)
    document.getElementById("levelDisplay").textContent =
        battery.getCurrentCharge().toFixed(0);
    // Set percentage text
    document.getElementById("percentDisplay").textContent =
        battery.getChargePercentage().toString();
}
// Shows/hides warning message with red styling
function showWarning(msg) {
    // Get warning paragraph element
    var warnEl = document.getElementById("warning");
    // Set warning text
    warnEl.textContent = msg;
    // Add red bold class if message exists, remove if empty
    warnEl.className = msg ? "warning" : "";
}
