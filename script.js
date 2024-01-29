function countWords() {
  var text = document.getElementById("textInput").value;

  // Remove punctuation and replace it with space
  text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()«»]/g, " ");
  text = text.replace(/\s{2,}/g, " ");

  var words = text.split(" ");
  var wordCount = {};

  words.forEach(function (word) {
    if (word !== "") {
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  });

  // Convert wordCount into an array of objects
  var wordCountArray = Object.keys(wordCount).map(function (word) {
    return { word: word, count: wordCount[word] };
  });

  // Sort the array alphabetically
  wordCountArray.sort(function (a, b) {
    return a.word.localeCompare(b.word);
  });

  // Create and display results in a table
  var resultTable = document.getElementById("resultTable");
  resultTable.innerHTML = createTable(wordCountArray);

  // Generate CSV content
  var csvRows = ["Word,Count"];
  for (var i = 0; i < wordCountArray.length; i++) {
    var wordObj = wordCountArray[i];
    csvRows.push(wordObj.word + "," + wordObj.count);
  }
  var csvString = csvRows.join("\n");

  // Create a Blob for CSV data
  var blob = new Blob(["\ufeff", csvString], {
    type: "text/csv;charset=utf-8;",
  });

  var link = document.getElementById("downloadLink");
  // Create download link
  if (wordCountArray.length > 0) {
    link.href = URL.createObjectURL(blob);
    link.download = "word_count.csv";
    link.style.display = "block";
    link.textContent = "Download CSV";
  } else {
    link.style.display = "none";
  }

  var resultCount = document.getElementById("word-count");
  resultCount.innerHTML = wordCountArray.length;
}

function createTable(wordCountArray) {
  var table = "<table><tr><th>Word</th><th>Count</th></tr>";
  for (var i = 0; i < wordCountArray.length; i++) {
    var wordObj = wordCountArray[i];
    table +=
      "<tr><td>" + wordObj.word + "</td><td>" + wordObj.count + "</td></tr>";
  }
  table += "</table>";
  return table;
}

document.getElementById("countButton").addEventListener("click", countWords);
document.getElementById("textInput").addEventListener("input", countWords);
