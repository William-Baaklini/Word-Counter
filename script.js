document.getElementById('countButton').addEventListener('click', function() {
  var text = document.getElementById('textInput').value;

  // Remove punctuation and replace it with space
  text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()«»]/g," ");
  text = text.replace(/\s{2,}/g," ");

  var words = text.split(' ');
  var wordCount = {};

  words.forEach(function(word) {
      if(word !== '') {
          wordCount[word] = (wordCount[word] || 0) + 1;
      }
  });

  // Create and display results in a table
  var resultTable = document.getElementById('resultTable');
  resultTable.innerHTML = createTable(wordCount);

  // Generate CSV content
  var csvRows = ['Word,Count'];
  for (var word in wordCount) {
      if (wordCount.hasOwnProperty(word)) {
          csvRows.push(word + ',' + wordCount[word]);
      }
  }
  var csvString = csvRows.join('\n');

  // Create a Blob for CSV data
  var blob = new Blob(["\ufeff", csvString], { type: 'text/csv;charset=utf-8;' });

  // Create download link
  var link = document.getElementById('downloadLink');
  link.href = URL.createObjectURL(blob);
  link.download = 'word_count.csv';
  link.style.display = 'block';
  link.textContent = 'Download CSV';

  // Display results
  var resultDiv = document.getElementById('result');
  resultDiv.innerHTML = JSON.stringify(wordCount, null, 2);
});

function createTable(wordCount) {
  var table = '<table><tr><th>Word</th><th>Count</th></tr>';
  for (var word in wordCount) {
      if (wordCount.hasOwnProperty(word)) {
          table += '<tr><td>' + word + '</td><td>' + wordCount[word] + '</td></tr>';
      }
  }
  table += '</table>';
  return table;
}