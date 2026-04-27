document.addEventListener("DOMContentLoaded", function () {
  const newsGrid = document.getElementById("newsGrid");
  const featuredSection = document.getElementById("featuredArticle");
  const tabItems = document.querySelectorAll(".tab-item");
  const searchInput = document.querySelector(".news-filter-search input");
  const newsData = window.newsData || [];

  let currentCategory = "TẤT CẢ";
  let searchQuery = "";

  function renderNews() {
    if (!newsGrid) return;

    // Filter data
    const filteredNews = newsData.filter(item => {
      const matchCategory = currentCategory === "TẤT CẢ" || item.category === currentCategory;
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch && !item.isFeatured;
    });

    // Render Featured (only on first load or if searching all)
    if (featuredSection && currentCategory === "TẤT CẢ" && searchQuery === "") {
      const featured = newsData.find(item => item.isFeatured);
      if (featured) {
        featuredSection.style.display = "flex";
        featuredSection.innerHTML = `
          <div class="featured-image">
            <img src="${featured.image}" alt="${featured.title}" />
          </div>
          <div class="featured-content">
            <span class="label">XU HƯỚNG TIÊU ĐIỂM</span>
            <h2>${featured.title}</h2>
            <p>${featured.desc}</p>
            <a href="#" class="btn-read-more">XEM BÀI VIẾT +</a>
          </div>
        `;
      }
    } else if (featuredSection) {
      featuredSection.style.display = "none";
    }

    // Render Grid
    if (filteredNews.length === 0) {
      newsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 50px; color: #888;">Không tìm thấy tin tức nào phù hợp.</div>`;
      return;
    }

    newsGrid.innerHTML = filteredNews.map(item => `
      <div class="news-card">
        <div class="news-card-thumb">
          <img src="${item.image}" alt="${item.title}" />
        </div>
        <div class="news-card-meta">${item.date}</div>
        <h3 class="news-card-title">${item.title}</h3>
        <p class="news-card-desc">${item.desc}</p>
      </div>
    `).join("");
  }

  // Handle Tabs
  tabItems.forEach(tab => {
    tab.addEventListener("click", function () {
      tabItems.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      currentCategory = this.textContent.trim();
      renderNews();
    });
  });

  // Handle Search
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      searchQuery = e.target.value;
      renderNews();
    });
  }

  // Initial render
  renderNews();
});
