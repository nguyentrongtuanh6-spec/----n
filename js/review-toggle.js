document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("loadMoreReviews");
  const reviewCards = Array.from(document.querySelectorAll(".review-card"));

  if (!toggleBtn || reviewCards.length <= 1) {
    return;
  }

  function setExpandedState(expanded) {
    reviewCards.forEach(function (card, index) {
      if (index === 0) {
        card.classList.remove("hidden");
        return;
      }

      card.classList.toggle("hidden", !expanded);
    });

    toggleBtn.style.display = "block";
    toggleBtn.innerHTML = expanded
      ? 'Thu gọn nhận xét <i class="fa-solid fa-angle-up"></i>'
      : 'Xem thêm nhận xét <i class="fa-solid fa-angle-down"></i>';
    toggleBtn.dataset.expanded = expanded ? "true" : "false";
  }

  setExpandedState(false);

  toggleBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const expanded = this.dataset.expanded === "true";
    setExpandedState(!expanded);

    if (expanded) {
      this.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
});
