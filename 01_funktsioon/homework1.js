// Homework 1
// Arvuta jooksu tempo (min/km)
function calculatePace(distanceKm, timeMinutes) {
    //tempo kümnendvormis (minutit kilomeetri kohta)
    var totalPace = timeMinutes / distanceKm;
    //eraldan täisminutid
    var minutes = Math.floor(totalPace);
    //sekundid jääkosast (murdarv * 60)
    var seconds = Math.round((totalPace - minutes) * 60);
    //vormindan sekundid tekstiks ja lisan vajadusel ette nulli
    var secondsText = seconds < 10 ? "0" + seconds : seconds;
    //tulemus loetaval kujul
    return minutes + ":" + secondsText + " min/km";
}
//5km jooks ajaga 25 minutit
console.log("Test (5km, 25min): " + calculatePace(5, 25));
//distantsid(kilomeetrites), mida läbiti 60 minutiga
var distances = [8, 10, 12, 13.5, 15];
//tempo iga distantsi kohta, kui aeg on fikseeritud 60 min peale
var paceResults = distances.map(function (d) {
    return calculatePace(d, 60);
});
console.log("Tempod, kui joosta 60 minutit erinevatel distantsidel:");
console.log(paceResults);
//tabel erinevate aegadega 10km distantsi puhul
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
