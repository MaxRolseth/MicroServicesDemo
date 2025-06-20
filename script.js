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
    var lastResult, countResults = 0;
    function onScanSuccess(decodedText, decodedResult) {
        if (decodedText !== lastResult) {
            ++countResults;
            lastResult = decodedText;
            console.log(`Scan result ${decodedText}`, decodedResult);
            if (localStorage.getItem(decodedText) === null && modalOpen === false) {
                document.getElementById("myfield").value = decodedText;

            }
            else if (modalOpen === true) {
                document.getElementById("myfield2").value = decodedText;
                let newData = document.getElementById("myfield").value + ": " + decodedText;
                console.log(newData);
                document.getElementById("myfield").value = newData;

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

document.getElementById("logButton").addEventListener("click", myFunction);

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

    //document.getElementById("logButton2").addEventListener("click", myFunction);

}


function myFunction() {


    var data = document.getElementById("myfield").value;
    console.log(data);





    localStorage.setItem(data, true);
    const para = document.createElement("p");
    para.innerText = data;
    document.getElementById("log").appendChild(para);
    document.getElementById("myfield").value = "";
    document.getElementById("myfield2").value = "";


}