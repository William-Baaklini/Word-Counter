document.getElementById("countButton").addEventListener("click", function () {
  var text = document.getElementById("textInput").value;

  // Remove punctuation and replace it with space
  text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ");
  text = text.replace(/\s{2,}/g, " ");

  var words = text.split(" ");
  var wordCount = {};

  words.forEach(function (word) {
    if (word !== "") {
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  });

  // Generate CSV string
  var csvContent = "data:text/csv;charset=utf-8,Word,Count\n";
  for (var word in wordCount) {
    if (wordCount.hasOwnProperty(word)) {
      csvContent += word + "," + wordCount[word] + "\n";
    }
  }

  // Create download link
  var encodedUri = encodeURI(csvContent);
  var link = document.getElementById("downloadLink");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "word_count.csv");
  link.style.display = "block";
  link.textContent = "Download CSV";

  // Display results
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = JSON.stringify(wordCount, null, 2);
});
