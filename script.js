// Elementlarni tanlab olamiz
const textInput = document.getElementById('text-input');
const colorInput = document.getElementById('color-input');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const qrContainer = document.getElementById('qrcode');

/**
 * QR kod yaratish funksiyasi
 */
generateBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    const qrColor = colorInput.value;

    if (text !== "") {
        // 1. Avvalgi natijalarni butunlay tozalash
        qrContainer.innerHTML = "";
        
        // 2. Elementni 'flex' qilish (Muhim: QR kod chizilishidan oldin ko'rinishi shart)
        qrContainer.style.display = "flex";

        // 3. Yangi QR kodni yaratish
        // Kenglik va balandlikni aniq beramiz
        new QRCode(qrContainer, {
            text: text,
            width: 200,
            height: 200,
            colorDark: qrColor,
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // 4. Kutubxona DOM-ga elementlarni joylashiga biroz vaqt beramiz
        setTimeout(() => {
            const img = qrContainer.querySelector('img');
            if (img) {
                downloadBtn.style.display = "flex";
                // Rasm markazda bo'lishini ta'minlash uchun qo'shimcha stil
                img.style.margin = "0 auto";
            }
        }, 100);

    } else {
        // Agar input bo'sh bo'lsa, ogohlantirish va tozalash
        alert("Iltimos, biror matn yoki havola kiriting!");
        qrContainer.style.display = "none";
        downloadBtn.style.display = "none";
    }
});

/**
 * Rasmni yuklab olish funksiyasi
 */
downloadBtn.addEventListener('click', () => {
    const img = qrContainer.querySelector('img');
    const canvas = qrContainer.querySelector('canvas');

    // QRCode.js ba'zida faqat canvas, ba'zida img yaratadi. Ikkalasini ham tekshiramiz.
    if (img || canvas) {
        const qrImageSrc = img ? img.src : canvas.toDataURL("image/png");
        
        const link = document.createElement('a');
        link.href = qrImageSrc;
        link.download = 'neo-qr-code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});

/**
 * Foydalanuvchi matnni o'chirib tashlasa, interfeysni boshlang'ich holatga qaytarish
 */
textInput.addEventListener('input', () => {
    if (textInput.value.trim() === "") {
        qrContainer.innerHTML = "";
        qrContainer.style.display = "none";
        downloadBtn.style.display = "none";
    }
});