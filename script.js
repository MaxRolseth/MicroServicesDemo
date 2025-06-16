function docReady(fn) {
    if (document.readyState === "complete"
        || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function () {
    var resultContainer = document.getElementById('myfield');
    var lastResult, countResults = 0;
    function onScanSuccess(decodedText, decodedResult) {
        if (decodedText !== lastResult) {
            ++countResults;
            lastResult = decodedText;
            console.log(`Scan result ${decodedText}`, decodedResult);
            if (localStorage.getItem(data) === null) {
                document.getElementById("myfield").value = decodedText;

            }
            else {
                //trigger modal prompt
                console.log("modal goes here");
                showModal(data);
            }


        }
    }

    var html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader", { fps: 10, qrbox: 250 });
    html5QrcodeScanner.render(onScanSuccess);
});

document.getElementById("logButton").addEventListener("click", myFunction);

var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}
document.getElementById("logButton2").onclick = function () {
    modal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function showModal(data) {
    modal.style.display = "block";

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

                document.getElementById("myfield2").value = decodedText;
            }
        }

        var html5QrcodeScanner = new Html5QrcodeScanner(
            "qr-reader2", { fps: 10, qrbox: 250 });
        html5QrcodeScanner.render(onScanSuccess);
    });
    let originalID = localStorage.getItem(data);
    document.getElementById("myfield").value = originalID + ": " + decodedText;
    document.getElementById("logButton2").addEventListener("click", myFunction);

}


function myFunction() {


    var data = document.getElementById("myfield").value;
    console.log(data);





    localStorage.setItem(data, true);
    const para = document.createElement("p");
    para.innerText = data;
    document.getElementById("log").appendChild(para);

}