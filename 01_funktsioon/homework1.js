// Function 01
// Arvuta jooksu tempo (min/km)
function calculatePace(distanceKm, timeMinutes) {
    // Step 01: Arvuta tempo kümnendvormis (minutit kilomeetri kohta)
    var totalPace = timeMinutes / distanceKm;
    // Step 02: Eralda täisminutid
    var minutes = Math.floor(totalPace);
    // Step 03: Arvuta sekundid jääkosast (murdarv * 60)
    var seconds = Math.round((totalPace - minutes) * 60);
    // Step 04: Vorminda sekundid tekstiks ja lisa vajadusel ette null
    var secondsText = seconds < 10 ? "0" + seconds : seconds;
    // Return: Tagasta tulemus loetaval kujul
    return minutes + ":" + secondsText + " min/km";
}
// Üksik test: 5km jooks ajaga 25 minutit
console.log("Üksik test (5km, 25min): " + calculatePace(5, 25));
// Erinevate distantside massiiv (kilomeetrites), mida läbiti näiteks 60 minutiga
var distances = [8, 10, 12, 13.5, 15];
// Kasuta map-meetodit, et arvutada tempo iga distantsi kohta, kui aeg on fikseeritud 60 min peale
var paceResults = distances.map(function (d) {
    return calculatePace(d, 60);
});
console.log("Tempod, kui joosta 60 minutit erinevatel distantsidel:");
console.log(paceResults);
// Koosta tabel erinevate aegadega 10km distantsi puhul
var runningTable = [];
for (var time = 40; time <= 60; time += 5) {
    runningTable.push({
        "Distants": "10 km",
        "Aeg": time + " min",
        "Tempo": calculatePace(10, time)
    });
}
console.log("10km jooksu tempotabel:");
console.table(runningTable);
