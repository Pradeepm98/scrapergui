const express = require('express');
const excel = require('exceljs');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

 // Import the cors middleware

const app = express();
const port = 3000;

// Use the cors middleware
app.use(cors());

app.use(express.static('public'));

let rows;

// Read the JSON file
fs.readFile('userdata/users.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Parse the JSON data
  try {
     rows = JSON.parse(data);

    // Now 'rows' contains the data from users.json
    console.log(rows);
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});




app.use(bodyParser.json());

app.post('/api/authenticate', async (req, res) => {
  try {
    // Assuming you have some authentication logic here
    const { email, password } = req.body;

    // Example authentication logic (replace this with your actual logic)
    if (email   && password ) {
      // Successful authentication
      const userData = {
        // Include relevant user data here
        userId: email,
        username: password,
      };

      res.status(200).json(userData);
    } else {
      // Authentication failed
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.get('/api/rows', (req, res) => {
  // Send the rows data as JSON
  res.json(rows);
});

app.get('/data', async (req, res) => {
  try {
    const query = req.query.text; // Extract the query parameter from the request
    console.log(query);
    const workbook = new excel.Workbook();
    await workbook.xlsx.readFile('sample_data.xlsx');
    
    const sheet = workbook.getWorksheet(1);
    const data = [];

    sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber !== 1) {
        let hasQuery = false; // Flag to check if the query is present in any cell

        row.eachCell((cell, colNumber) => {
          const cellText = cell.text.toString().toLowerCase(); // Convert to lowercase for case-insensitive comparison
          if (cellText.includes(query)) {
            hasQuery = true;
          }
        });

        if (hasQuery) {
          const rowData = {};
          row.eachCell((cell, colNumber) => {
            const headerCell = sheet.getRow(1).getCell(colNumber);
            rowData[headerCell.text] = cell.text;
          });
          data.push(rowData);
        }
      }
    });

    res.json(data);
  } catch (error) {
    console.error('Error reading Excel file:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

const host = '0.0.0.0'

app.listen(port,host ,() => {
  console.log(`Server is running at http://localhost:${port}`);
});
