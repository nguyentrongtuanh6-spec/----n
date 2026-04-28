window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('checkoutItemsContainer');
    const subtotalEl = document.getElementById('checkoutSubtotal');
    const totalEl = document.getElementById('checkoutTotal');
    const completeBtn = document.querySelector('.btn-complete');
    const successModal = document.getElementById('successModal');

    // Select all sections that contain option boxes
    const sections = document.querySelectorAll('.checkout-section');

    sections.forEach(section => {
        const optionBoxes = section.querySelectorAll('.option-box');
        optionBoxes.forEach(box => {
            box.addEventListener('click', () => {
                optionBoxes.forEach(b => b.classList.remove('active'));
                box.classList.add('active');
            });
        });
    });

    function parsePrice(priceText) {
        if (typeof priceText === 'number') return priceText;
        return Number(String(priceText).replace(/[^\d]/g, ""));
    }

    function formatPrice(value) {
        return new Intl.NumberFormat("vi-VN").format(value) + "đ";
    }

    function renderSummary() {
        if (!container) return;

        const cart = window.AuroraDB ? window.AuroraDB.getCart() : [];
        
        if (cart.length === 0) {
            // Nếu giỏ hàng trống mà vào trang thanh toán, điều hướng về giỏ hàng
            window.location.href = './tranggiohang.html';
            return;
        }

        let subtotal = 0;
        container.innerHTML = cart.map(item => {
            const price = parsePrice(item.price);
            const itemTotal = price * item.qty;
            subtotal += itemTotal;

            return `
                <div class="summary-item">
                    <div class="summary-item-img">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="summary-item-info">
                        <h4>${item.name}</h4>
                        <p>Số lượng: ${item.qty}</p>
                        <p>${formatPrice(price)}</p>
                    </div>
                    <div class="summary-item-price">${formatPrice(itemTotal)}</div>
                </div>
            `;
        }).join('');

        if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
        if (totalEl) totalEl.textContent = formatPrice(subtotal);
    }

    renderSummary();

    if (completeBtn && successModal) {
        completeBtn.addEventListener('click', () => {
            // 1. Kiểm tra thông tin (giả định đã nhập đủ)
            // 2. Lưu đơn hàng vào database (giả lập)
            if (window.AuroraDB) {
                const cart = window.AuroraDB.getCart();
                // window.AuroraDB.saveOrder(cart); // Nếu có hàm này
                
                // 3. Xóa giỏ hàng
                window.AuroraDB.clearCart();
            }

            // 4. Hiển thị modal thành công
            successModal.classList.add('active');
        });
    }
});
