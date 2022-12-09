const fs = require('fs')
const path = require('path')

function fillTable() {
    let table = document.getElementById('soundBody');
    
    const directoryPath = path.join(__dirname, 'sounds')

    fs.readdir(directoryPath, function(err, files) {
        if (err) {
          return console.log('Unable to scan directory: ' + err);
        }
      
        files.forEach(function(file) {
            const tr = document.createElement('tr');
            const tdName = document.createElement('td');
            const tdOpen = document.createElement('td');
            const tdPause = document.createElement('td')
            const btnOpen = document.createElement('button');
            const btnPause = document.createElement('button')
        
            tdName.innerText = file;
            btnOpen.innerText = 'Play';
            btnPause.innerText = 'Pause';
            let beat = new Audio(path.join(directoryPath, file))
            btnOpen.addEventListener('click', function() {    
                beat.play();
            });
            btnPause.addEventListener('click', function() {
                beat.load();
            })
        
            tdOpen.appendChild(btnOpen);
            tdPause.appendChild(btnPause)
            tr.appendChild(tdName);
            tr.appendChild(tdOpen);
            tr.appendChild(tdPause)
            table.appendChild(tr);
        });
    });
}

fillTable();