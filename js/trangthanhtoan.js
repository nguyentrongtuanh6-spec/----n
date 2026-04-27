window.addEventListener('DOMContentLoaded', () => {
    // Select all sections that contain option boxes
    const sections = document.querySelectorAll('.checkout-section');

    sections.forEach(section => {
        const optionBoxes = section.querySelectorAll('.option-box');
        
        optionBoxes.forEach(box => {
            box.addEventListener('click', () => {
                // Remove active class from all boxes in this specific section
                optionBoxes.forEach(b => b.classList.remove('active'));
                
                // Add active class to the clicked box
                box.classList.add('active');
            });
        });
    });

    // Calculate total price dynamically
    function calculateTotal() {
        const itemPrices = document.querySelectorAll('.summary-item-price');
        let subtotal = 0;
        
        itemPrices.forEach(priceEl => {
            // Extract number from string like "1.210.000đ"
            const priceText = priceEl.textContent.replace(/[.đ]/g, '');
            subtotal += parseInt(priceText) || 0;
        });

        const subtotalEl = document.querySelector('.summary-calc .calc-row:first-child span:last-child');
        const totalEl = document.querySelector('.total-price');

        if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
        if (totalEl) totalEl.textContent = formatCurrency(subtotal);
    }

    function formatCurrency(val) {
        return val.toLocaleString('vi-VN') + 'đ';
    }

    calculateTotal();

    // Handle complete order button with Success Modal
    const completeBtn = document.querySelector('.btn-complete');
    const successModal = document.getElementById('successModal');
    
    if (completeBtn && successModal) {
        completeBtn.addEventListener('click', () => {
            successModal.classList.add('active');
        });
    }
});
