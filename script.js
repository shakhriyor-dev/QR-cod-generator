const textInput = document.getElementById('text-input');
const colorInput = document.getElementById('color-input');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const qrContainer = document.getElementById('qrcode');

// Yaratish tugmasi hodisasi
generateBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    const color = colorInput.value;

    if (text !== "") {
        // Avvalgi QR kodni tozalash
        qrContainer.innerHTML = "";

        // Yangi QR kod yaratish
        new QRCode(qrContainer, {
            text: text,
            width: 200,
            height: 200,
            colorDark: color,
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Rasm tayyor bo'lishi uchun biroz kutish va tugmani ko'rsatish
        setTimeout(() => {
            const img = qrContainer.querySelector('img');
            if (img && img.src) {
                downloadBtn.style.display = "block";
            }
        }, 400);

    } else {
        alert("Iltimos, biror matn yoki URL kiriting!");
        qrContainer.innerHTML = "";
        downloadBtn.style.display = "none";
    }
});

// Yuklab olish tugmasi hodisasi
downloadBtn.addEventListener('click', () => {
    const img = qrContainer.querySelector('img');
    const canvas = qrContainer.querySelector('canvas');

    if (img || canvas) {
        // Rasm manbasi (URL) ni olish
        const qrImageSrc = img ? img.src : canvas.toDataURL("image/png");
        
        const link = document.createElement('a');
        link.href = qrImageSrc;
        link.download = 'my-custom-qr.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});

// Input tozalansa, natijalarni ham tozalash
textInput.addEventListener('input', () => {
    if (textInput.value.trim() === "") {
        qrContainer.innerHTML = "";
        downloadBtn.style.display = "none";
    }
});