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
        // QR kodni tozalab qayta yaratish
        qrContainer.innerHTML = ""; 
        new QRCode(qrContainer, {
            text: value,
            width: 200,
            height: 200
        });

        // Rasm tayyor bo'lishi bilan yuklab olish tugmasini ko'rsatish
        setTimeout(() => {
            downloadBtn.style.display = "block";
        }, 300);
    } else {
        // Agar input bo'sh bo'lsa
        alert("Iltimos, matn yoki link kiriting!");
        qrContainer.innerHTML = ""; // QR kodni o'chirish
        downloadBtn.style.display = "none"; // Tugmani yashirish
    }
});

// Yuklab olish funksiyasi
downloadBtn.addEventListener('click', () => {
    const img = qrContainer.querySelector('img');
    const canvas = qrContainer.querySelector('canvas');

    if (img || canvas) {
        const src = img ? img.src : canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = src;
        link.download = 'qrcode.png';
        link.click();
    }
});

// Input yozilayotgan paytda tugmani tekshirish (ixtiyoriy)
textInput.addEventListener('input', () => {
    if (textInput.value.trim() === "") {
        downloadBtn.style.display = "none";
        qrContainer.innerHTML = "";
    }
});