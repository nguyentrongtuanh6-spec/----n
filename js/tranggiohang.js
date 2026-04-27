window.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.querySelectorAll('.cart-item');
    
    cartItems.forEach(item => {
        const minusBtn = item.querySelector('.minus');
        const plusBtn = item.querySelector('.plus');
        const qtyInput = item.querySelector('.qty-selector input');
        const removeBtn = item.querySelector('.btn-remove');
        
        minusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            if (val > 1) {
                qtyInput.value = val - 1;
                updateTotal();
            }
        });
        
        plusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            qtyInput.value = val + 1;
            updateTotal();
        });
        
        removeBtn.addEventListener('click', () => {
            if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
                item.remove();
                updateTotal();
            }
        });
    });
    
    function updateTotal() {
        // Simple mock update since we don't have a real cart state yet
        // In a real app, this would recalculate based on qty * price
        console.log('Updating total...');
    }
});
