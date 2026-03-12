const textInput = document.getElementById('text-input');
const colorInput = document.getElementById('color-input');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const qrContainer = document.getElementById('qrcode');

generateBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    const color = colorInput.value;

    if (text !== "") {
        // Tozalash va ko'rsatish
        qrContainer.innerHTML = "";
        qrContainer.style.display = "flex";

        // QR yaratish
        new QRCode(qrContainer, {
            text: text,
            width: 200,
            height: 200,
            colorDark: color,
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Tugmani birozdan so'ng ko'rsatish
        setTimeout(() => {
            if (qrContainer.querySelector('img')) {
                downloadBtn.style.display = "flex";
            }
        }, 300);
    } else {
        alert("Iltimos, ma'lumot kiriting!");
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
    link.download = 'studio-qr.png';
    link.click();
});

textInput.addEventListener('input', () => {
    if (textInput.value.trim() === "") {
        qrContainer.style.display = "none";
        downloadBtn.style.display = "none";
    }
});