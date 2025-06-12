document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('paymentPopup');
    const closeBtn = document.getElementById('closePopup');
    const paymentMethodSpan = document.getElementById('paymentMethod');
    const qrPlaceholder = document.getElementById('qrPlaceholder');

    // Secure QR code mapping - Replace with your actual QR image paths
    const secureQRCodes = {
        'Trust Wallet': 'assets/qr/trust-wallet-qr.png',
        'Zain Cash': 'assets/qr/zain-cash-qr.png',
        'Super QI': 'assets/qr/super-qi-qr.png'
    };

    // Add click event listeners to payment links
    document.querySelectorAll('[data-payment]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const paymentType = link.getAttribute('data-payment');
            paymentMethodSpan.textContent = paymentType;
            
            // Display the corresponding QR code
            if (secureQRCodes[paymentType]) {
                qrPlaceholder.innerHTML = `
                    <img 
                        src="${secureQRCodes[paymentType]}" 
                        alt="${paymentType} QR Code"
                        style="width: 200px; height: 200px; pointer-events: none;"
                        oncontextmenu="return false;"
                    >`;
            }
            
            popup.style.display = 'flex';
        });
    });

    // Prevent right-click on QR codes
    qrPlaceholder.addEventListener('contextmenu', (e) => e.preventDefault());

    // Close popup when clicking close button
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        // Clear QR code when closing
        qrPlaceholder.innerHTML = '';
    });

    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
            // Clear QR code when closing
            qrPlaceholder.innerHTML = '';
        }
    });

    // Close popup when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.style.display === 'flex') {
            popup.style.display = 'none';
            // Clear QR code when closing
            qrPlaceholder.innerHTML = '';
        }
    });
});