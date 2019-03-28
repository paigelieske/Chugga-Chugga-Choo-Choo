var config = {
  apiKey: "AIzaSyBceOHKZnP6npNfLIWm1m-DnKFlFMRabuA",
  authDomain: "chugga-chugga-choo-choo.firebaseapp.com",
  databaseURL: "https://chugga-chugga-choo-choo.firebaseio.com",
  projectId: "chugga-chugga-choo-choo",
  storageBucket: "chugga-chugga-choo-choo.appspot.com",
  messagingSenderId: "490608094466"
};
firebase.initializeApp(config);

var database = firebase.database();

$(".add").on("click", function (event) {
  event.preventDefault();

  var trainName = $("#inputName").val().trim();
  var trainDest = $("#inputDest").val().trim();
  var trainTime = $("#inputTime").val().trim();
  var trainFreq = $("#inputFreq").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDest,
    start: trainTime,
    frequency: trainFreq
  };

  database.ref().push(newTrain);

  console.log("name " + newTrain.name);
  console.log("dest " + newTrain.destination);
  console.log("start " + newTrain.start);
  console.log("freq " + newTrain.frequency);

  $("#inputName").val("");
  $("#inputDest").val("");
  $("#inputTime").val("");
  $("#inputFreq").val("");
});

database.ref().on("child_added", function (childSnap) {
  console.log(childSnap.val());

  var trainName = childSnap.val().name;
  var trainDest = childSnap.val().destination;
  var trainTime = childSnap.val().start;
  var trainFreq = childSnap.val().frequency;

  console.log("Name: " + trainName);
  console.log("Destination: " + trainDest);
  console.log("First Train: " + trainTime);
  console.log("Frequency: " + trainFreq);

  var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
  console.log("Train Time Converted: " + trainTimeConverted);

  var currentTime = moment();
  console.log("Current Time: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
  console.log("Time Difference: " + diffTime);

  var timeRemainder = diffTime & trainFreq;
  console.log("Time Remainder: " + timeRemainder);

  var minutesAway = trainFreq - timeRemainder;
  console.log("Minutes away: " + minutesAway);

  var nextArrival = moment().add(minutesAway, "minutes");
  nextArrival = moment(nextArrival).format("HH:mm");
  console.log("Next Arrival: " + nextArrival);

  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFreq),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway)
  );

  $("#train-table > tbody").append(newRow);
});

$("#success").on("shown.bs.modal", function () {
  $(".mclose").focus();
})