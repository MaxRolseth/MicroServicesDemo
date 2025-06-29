//made these global, be careful. This is so I can manually rescan the same code twice
var lastResult, countResults = 0;

function docReady(fn) {
    if (document.readyState === "complete"
        || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
let modalOpen = false;
docReady(function () {
    var resultContainer = document.getElementById('myfield');
    function onScanSuccess(decodedText, decodedResult) {
        if (decodedText !== lastResult) {
            ++countResults;
            lastResult = decodedText;
            console.log(`Scan result ${decodedText}`, decodedResult);
            if (localStorage.getItem(decodedText) === null && modalOpen === false) {
                document.getElementById("myfield").value = decodedText;
                document.getElementById("wrapper").classList.add("bkgGreen");

            }
            else if (modalOpen === true) {
                document.getElementById("myfield2").value = decodedText;
                let newData = document.getElementById("myfield").value + ": " + decodedText;
                console.log(newData);
                document.getElementById("myfield").value = newData;
                document.getElementById("modalBkg").classList.add("bkgGreen");
                

            }
            else {
                //trigger modal prompt
                let currentID = decodedText;
                document.getElementById("myfield").value = decodedText;
                //console.log("modal goes here");
                showModal();

            }


        }
    }

    var html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader", { fps: 10, qrbox: 250 });
    html5QrcodeScanner.render(onScanSuccess);
});

document.getElementById("logButton").addEventListener("click", logAndClearInput);

//turn background green on scan?
var firstField = document.getElementById("myfield");
firstField.oninput = function () {
    if(firstField === "")
    {
        document.getElementById("wrapper").classList.remove("bkgGreen");
    }
    else
    {
        document.getElementById("wrapper").classList.add("bkgGreen");
    }
};


//enter button support
document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (modalOpen === true) {
            event.preventDefault();
            document.getElementById("logButton2").click();
        }
        else {
            event.preventDefault();
            document.getElementById("logButton").click();
        }
    }
});

document.getElementById("clearLastScan").onclick = function () {
    //console.log(lastResult);
    lastResult = "";
    //console.log(lastResult);
}

var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    modalOpen = false;
}
document.getElementById("logButton2").onclick = function () {
    modal.style.display = "none";
    modalOpen = false;
}

document.getElementById("openModal").onclick = function () {
    showModal();
    console.log(modalOpen);
}

document.getElementById("clearLog").onclick = function () {
    let text = "Are you sure you want to clear the log?";
    if (confirm(text) == true) {
        const elements = document.getElementsByClassName("logged");
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    } else {

    }


}

document.getElementById("clearLocalStorage").onclick = function () {

    let text = "Are you sure you want to clear the log history?";
    if (confirm(text) == true) {
        localStorage.clear();
    } else {

    }

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modalOpen = false;
    }
}

function showModal() {
    modal.style.display = "block";
    modalOpen = true;
    console.log(modalOpen);

    function docReady(fn) {
        if (document.readyState === "complete"
            || document.readyState === "interactive") {
            setTimeout(fn, 1);
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }

    docReady(function () {
        var resultContainer2 = document.getElementById('myfield2');
        var lastResult, countResults = 0;
        function onScanSuccess(decodedText, decodedResult) {
            if (decodedText !== lastResult) {
                ++countResults;
                lastResult = decodedText;
                console.log(`Scan result ${decodedText}`, decodedResult);
                //let newData = data + ":" + decodedText;
                //console.log(newData);
                //document.getElementById("myfield").value = newData;


            }
        }
        var html5QrcodeScanner = new Html5QrcodeScanner(
            "qr-reader2", { fps: 10, qrbox: 250 });
        html5QrcodeScanner.render(onScanSuccess);
    });
    document.getElementById("myfield2").value = decodedText;

    //document.getElementById("logButton2").addEventListener("click", logAndClearInput
    // );

}


function logAndClearInput() {


    var data = document.getElementById("myfield").value;
    console.log(data);



    localStorage.setItem(data, true);
    const para = document.createElement("p");
    para.classList.add("logged");
    para.innerText = data;
    if (para.innerText.includes("Succeeded")) {
        para.classList.add("green");

    }
    else if (para.innerText.includes("Failed")) {
        para.classList.add("red");
    }

    document.getElementById("log").appendChild(para);
    document.getElementById("myfield").value = "";
    document.getElementById("myfield2").value = "";
    document.getElementById("wrapper").classList.remove("bkgGreen");
    document.getElementById("modalBkg").classList.remove("bkgGreen");


}