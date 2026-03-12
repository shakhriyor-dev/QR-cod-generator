const textInput = document.getElementById('text-input');
const generateBtn = document.getElementById('generate-btn');
const qrContainer = document.getElementById('qrcode');

// QR Kod obyektini yaratish (bir marta)
const qrcode = new QRCode(qrContainer, {
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});

generateBtn.addEventListener('click', () => {
    const text = textInput.value;

    if (text.trim() !== "") {
        qrcode.makeCode(text); // Kiritilgan matndan QR kod yaratadi
    } else {
        alert("Iltimos, biror matn kiriting!");
    }
});