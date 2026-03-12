const textInput = document.getElementById('text-input');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const qrContainer = document.getElementById('qrcode');

// QR Kod obyektini sozlash
const qrcode = new QRCode(qrContainer, {
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});

// Yaratish funksiyasi
generateBtn.addEventListener('click', () => {
    const value = textInput.value.trim();

    if (value) {
        qrcode.makeCode(value);
        
        // QR kod rasm bo'lib shakllanishi uchun ozgina kutamiz
        setTimeout(() => {
            downloadBtn.style.display = "block";
        }, 300);
    } else {
        alert("Iltimos, matn yoki link kiriting!");
        downloadBtn.style.display = "none";
    }
});

// Yuklab olish funksiyasi
downloadBtn.addEventListener('click', () => {
    // QR kod rasm (img) yoki canvas elementida bo'ladi
    const img = qrContainer.querySelector('img');
    const canvas = qrContainer.querySelector('canvas');

    // Rasm manzilini olish
    const src = img ? img.src : canvas.toDataURL("image/png");

    // Virtual link yaratish va bosish
    const link = document.createElement('a');
    link.href = src;
    link.download = 'qrcode-by-me.png';
    link.click();
});