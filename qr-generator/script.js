// Generate QR Code
function generateQRCode() {
    const input = document.getElementById("qr-input").value;
    const qrcodeDiv = document.getElementById("qrcode");
    qrcodeDiv.innerHTML = ""; // clear previous
    if (!input.trim()) {
        qrcodeDiv.innerHTML = "<p>Please enter some text.</p>";
        return;
    }
    QRCode.toCanvas(input, function (err, canvas) {
        if (err) {
            console.error(err);
            qrcodeDiv.innerHTML = "<p>Error generating QR.</p>";
        } else {
            canvas.setAttribute("id", "qr_canvas");
            canvas.style.width = "200px";
            canvas.style.height = "200px";
            qrcodeDiv.appendChild(canvas);
        }
    });
}

// Scan QR Code from uploaded image
const fileInput = document.getElementById("file-input");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        const img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            );
            const code = jsQR(
                imageData.data,
                imageData.width,
                imageData.height
            );
            const result = document.getElementById("result");
            if (code) {
                result.innerHTML = "QR Code Data: </br> " + code.data;
            } else {
                result.textContent = "No QR code found in the image.";
            }
        };
        img.src = reader.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

const download = document.getElementById("download");

download.addEventListener("click", (e) => {
    e.preventDefault();
    let qr_canvas = document.getElementById("qr_canvas");
    const canvasUrl = qr_canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = canvasUrl;
    downloadLink.download = "qr-code.png";
    downloadLink.click();
});