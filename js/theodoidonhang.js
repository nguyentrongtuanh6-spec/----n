window.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('orderSearchInput');
    const searchBtn = document.getElementById('btnSearchOrder');
    const displayOrderId = document.getElementById('displayOrderId');

    function searchOrder() {
        const query = searchInput.value.trim();
        if (query) {
            // Show loading state (mockup)
            displayOrderId.textContent = 'Đang tìm...';
            
            setTimeout(() => {
                // In a real app, you'd fetch order data here
                // For now, we just update the displayed ID
                displayOrderId.textContent = query.startsWith('#') ? query : '#' + query;
                console.log('Searching for order:', query);
            }, 500);
        } else {
            alert('Vui lòng nhập mã đơn hàng');
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
});
