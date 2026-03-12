const textInput = document.getElementById('text-input');
const colorInput = document.getElementById('color-input');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const qrContainer = document.getElementById('qrcode');

// Dastlab tugmani va QRni yashirish mantiqi o'zgarmadi
generateBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    const color = colorInput.value;

    if (text !== "") {
        qrContainer.innerHTML = "";
        qrContainer.style.display = "flex"; // Ko'rinadigan qilish

        new QRCode(qrContainer, {
            text: text,
            width: 180,
            height: 180,
            colorDark: color,
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        setTimeout(() => {
            downloadBtn.style.display = "flex";
        }, 400);
    } else {
        alert("Iltimos, matn kiriting!");
        qrContainer.style.display = "none";
        downloadBtn.style.display = "none";
    }
});

downloadBtn.addEventListener('click', () => {
    const img = qrContainer.querySelector('img');
    const canvas = qrContainer.querySelector('canvas');
    const src = img ? img.src : canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = src;
    link.download = 'neo-qr.png';
    link.click();
});