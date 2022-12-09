const fs = require('fs')
const path = require('path')
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let mediaDevices;

function fillTable() {
    let table = document.getElementById('soundBody');

    const directoryPath = path.join(__dirname, 'sounds')

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        files.forEach(function (file) {
            const tr = document.createElement('tr');
            const tdName = document.createElement('td');
            const tdOpen = document.createElement('td');
            const tdPause = document.createElement('td')
            const btnOpen = document.createElement('button');
            const btnPause = document.createElement('button');
            const audioElement = document.createElement('audio')

            tdName.innerText = file;
            audioElement.src = path.join(directoryPath, file)
            btnOpen.innerText = 'Play';
            btnPause.innerText = 'Pause';
            let beat = new Audio(path.join(directoryPath, file))
            btnOpen.addEventListener('click', function () {
                var dropdown = document.getElementById("devices");
                var deviceId = dropdown.options[dropdown.selectedIndex].value;
                if (deviceId) {
                    beat.setSinkId(deviceId);
                }
                beat.play();
            });
            btnPause.addEventListener('click', function () {
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

function getAudioOutputDevices() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log("Your browser does not support this feature.");
        return;
    }

    navigator.mediaDevices.enumerateDevices()
        .then(function (devices) {
            devices = devices.filter(function (device) {
                return device.kind === "audiooutput";
            });

            if (devices.length === 0) {
                console.log("No audio output devices were found.");
            } else {
                var dropdown = document.getElementById("devices");
                for (var i = 0; i < devices.length; i++) {
                    var option = document.createElement("option");
                    option.value = devices[i].deviceId;
                    option.text = devices[i].label;
                    dropdown.add(option);
                }
            }
        })
        .catch(function (err) {
            console.log("An error occurred: ", err);
        });
}

getAudioOutputDevices();
fillTable();