window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cartItemsContainer');
    const subtotalEl = document.getElementById('subtotalPrice');
    const totalEl = document.getElementById('totalPrice');

    function parsePrice(priceText) {
        if (typeof priceText === 'number') return priceText;
        return Number(String(priceText).replace(/[^\d]/g, ""));
    }

    function formatPrice(value) {
        return new Intl.NumberFormat("vi-VN").format(value) + "đ";
    }

    function renderCart() {
        if (!container) return;

        const cart = window.AuroraDB ? window.AuroraDB.getCart() : [];
        
        if (cart.length === 0) {
            container.innerHTML = '<div class="empty-cart-msg" style="text-align: center; padding: 40px;">' +
                                  '<h3>Giỏ hàng của bạn đang trống</h3>' +
                                  '<p>Hãy tiếp tục khám phá các sản phẩm tuyệt vời của AURORA.</p>' +
                                  '<a href="./trangchu.html" class="btn-checkout" style="display: inline-block; margin-top: 20px; width: auto; padding: 10px 30px;">MUA SẮM NGAY</a>' +
                                  '</div>';
            updateSummary(0);
            return;
        }

        let subtotal = 0;
        container.innerHTML = cart.map(item => {
            const price = parsePrice(item.price);
            const itemTotal = price * item.qty;
            subtotal += itemTotal;

            return `
                <article class="cart-item" data-id="${item.id}">
                    <div class="cart-item-thumb">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <div class="cart-item-details">Sản phẩm chính hãng AURORA</div>
                        <div class="qty-selector">
                            <button type="button" class="minus" data-id="${item.id}">-</button>
                            <input type="text" value="${item.qty}" readonly>
                            <button type="button" class="plus" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <div class="cart-item-price-col">
                        <div class="cart-item-price">${formatPrice(price)}</div>
                        <button type="button" class="btn-remove" data-id="${item.id}">
                            <i class="fa-regular fa-trash-can"></i> XÓA
                        </button>
                    </div>
                </article>
            `;
        }).join('');

        updateSummary(subtotal);
        attachEvents();
    }

    function updateSummary(subtotal) {
        if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
        if (totalEl) totalEl.textContent = formatPrice(subtotal);
    }

    function attachEvents() {
        container.querySelectorAll('.minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const cart = window.AuroraDB.getCart();
                const item = cart.find(p => String(p.id) === String(id));
                if (item && item.qty > 1) {
                    window.AuroraDB.updateCartQty(id, item.qty - 1);
                    renderCart();
                }
            });
        });

        container.querySelectorAll('.plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const cart = window.AuroraDB.getCart();
                const item = cart.find(p => String(p.id) === String(id));
                if (item) {
                    window.AuroraDB.updateCartQty(id, item.qty + 1);
                    renderCart();
                }
            });
        });

        container.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
                    window.AuroraDB.removeFromCart(id);
                    renderCart();
                }
            });
        });
    }

    renderCart();

    // Lắng nghe sự kiện cập nhật giỏ hàng từ các trang khác (nếu dùng chung window)
    window.addEventListener('cartUpdated', renderCart);
});
