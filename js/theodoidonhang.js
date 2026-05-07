window.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('orderSearchInput');
    const searchBtn = document.getElementById('btnSearchOrder');
    const displayOrderId = document.getElementById('displayOrderId');
    const statusContainer = document.getElementById('trackingStatusContainer');
    const itemsContainer = document.getElementById('orderItemsContainer');
    const calcContainer = document.getElementById('orderCalcContainer');
    const actionsContainer = document.getElementById('trackingActions');

    function formatPrice(value) {
        return new Intl.NumberFormat("vi-VN").format(value) + "đ";
    }

    function searchOrder() {
        const query = searchInput.value.trim().toUpperCase().replace('#', '');
        if (!query) return alert('Vui lòng nhập mã đơn hàng');

        if (window.AuroraDB) {
            const order = window.AuroraDB.getOrderById(query);
            
            if (order) {
                renderOrder(order);
            } else {
                alert('Không tìm thấy đơn hàng: #' + query);
                statusContainer.style.display = 'none';
            }
        }
    }

    function renderOrder(order) {
        displayOrderId.textContent = '#' + order.id;
        statusContainer.style.display = 'block';

        // Render Items
        if (itemsContainer) {
            itemsContainer.innerHTML = order.items.map(item => `
                <div class="summary-item">
                    <div class="summary-item-img">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="summary-item-info">
                        <h4>${item.name}</h4>
                        <p>Số lượng: ${item.qty}</p>
                        <p>${item.price}</p>
                    </div>
                    <div class="summary-item-price">${item.price}</div>
                </div>
            `).join('');
        }

        // Render Calc
        if (calcContainer) {
            calcContainer.innerHTML = `
                <div class="calc-row">
                    <span>Tạm tính</span>
                    <span>${formatPrice(order.total)}</span>
                </div>
                <div class="calc-row">
                    <span>Phí vận chuyển</span>
                    <span>Miễn phí</span>
                </div>
                <div class="calc-row total">
                    <span>Tổng cộng</span>
                    <span class="total-price" style="font-size: 20px; font-weight: 800;">${formatPrice(order.total)}</span>
                </div>
                <div class="calc-row" style="margin-top: 10px; color: #666; font-size: 13px;">
                    <span>Trạng thái:</span>
                    <span style="font-weight: 700; color: #f28f9f;">${order.status}</span>
                </div>
            `;
        }

        // Render Actions (Add Return button if Delivered)
        if (actionsContainer) {
            let actionsHtml = `
                <a href="./trangchu.html" class="btn-back-shop">QUAY LẠI CỬA HÀNG</a>
                <a href="./lienhe.html" class="btn-contact-support">LIÊN HỆ HỖ TRỢ</a>
            `;

            if (order.status === "Đã giao hàng") {
                actionsHtml += `
                    <button id="btnReturnOrder" style="margin-top: 10px; width: 100%; padding: 12px; background: #333; color: #fff; border: none; border-radius: 4px; font-weight: 700; cursor: pointer; transition: background 0.3s;">
                        HOÀN TRẢ ĐƠN HÀNG
                    </button>
                `;
            } else if (order.status === "Yêu cầu hoàn trả") {
                actionsHtml += `
                    <div style="margin-top: 10px; padding: 10px; background: #fff3cd; color: #856404; border: 1px solid #ffeeba; border-radius: 4px; font-size: 13px; text-align: center; font-weight: 600;">
                        Đơn hàng đang chờ xử lý hoàn trả
                    </div>
                `;
            } else if (order.status === "Đã hoàn trả") {
                actionsHtml += `
                    <div style="margin-top: 10px; padding: 10px; background: #d4edda; color: #155724; border: 1px solid #c3e6cb; border-radius: 4px; font-size: 13px; text-align: center; font-weight: 600;">
                        Đơn hàng đã hoàn trả thành công
                    </div>
                `;
            }

            actionsContainer.innerHTML = actionsHtml;

            // Add event listener for return button
            const returnBtn = document.getElementById('btnReturnOrder');
            if (returnBtn) {
                returnBtn.addEventListener('click', () => {
                    if (confirm('Bạn có chắc chắn muốn yêu cầu hoàn trả đơn hàng này?')) {
                        window.AuroraDB.updateOrderStatus(order.id, "Yêu cầu hoàn trả");
                        alert('Yêu cầu hoàn trả đã được gửi. Chúng tôi sẽ liên hệ với bạn sớm nhất!');
                        renderOrder(window.AuroraDB.getOrderById(order.id));
                    }
                });
                returnBtn.addEventListener('mouseover', function() { this.style.background = '#000'; });
                returnBtn.addEventListener('mouseout', function() { this.style.background = '#333'; });
            }
        }
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', searchOrder);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchOrder();
            }
        });
    }

    // Tự động tìm kiếm nếu có ID trong URL
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('id');
    if (idFromUrl && searchInput) {
        searchInput.value = idFromUrl;
        searchOrder();
    }
});

