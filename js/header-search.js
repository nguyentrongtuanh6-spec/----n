(function () {
  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .trim();
  }

  function getProducts() {
    const dbProducts = window.AuroraDB ? window.AuroraDB.getProducts() : [];
    return dbProducts && dbProducts.length ? dbProducts : window.productData || [];
  }

  function getRouteByText(value) {
    const normalized = normalizeText(value);

    if (normalized.includes("day chuyen") || normalized.includes("vong co") || normalized.includes("mat day") || normalized.includes("necklace")) {
      return "./tranglocdaychuyen.html";
    }
    if (normalized.includes("bong tai") || normalized.includes("hoa tai") || normalized.includes("khuyen tai") || normalized.includes("earring")) {
      return "./tranglocbongtai.html";
    }
    if (normalized.includes("vong tay") || normalized.includes("lac tay") || normalized.includes("lac chan") || normalized.includes("bracelet")) {
      return "./tranglocvongtay.html";
    }
    if (normalized.includes("charm")) {
      return "./trangloccharm.html";
    }
    if (normalized.includes("bo trang suc") || normalized.includes("trang suc bo") || normalized.includes("set")) {
      return "./trangsucbo.html";
    }
    if (normalized.includes("doi") || normalized.includes("cap doi") || normalized.includes("couple")) {
      return "./trangsucdoi.html";
    }

    return "./tranglocnhannam.html";
  }

  function getSearchUrl(query) {
    const normalized = normalizeText(query);
    const matchedProduct = getProducts().find(function (product) {
      const searchable = [product.name, product.category, product.type, product.gender]
        .map(normalizeText)
        .join(" ");
      return searchable.includes(normalized);
    });
    const page = matchedProduct
      ? getRouteByText([matchedProduct.name, matchedProduct.category, matchedProduct.type, matchedProduct.gender].join(" "))
      : getRouteByText(query);

    return page + "?search=" + encodeURIComponent(query);
  }

  function goToSearch(query) {
    const keyword = String(query || "").trim();
    if (!keyword) return;
    window.location.href = getSearchUrl(keyword);
  }

  function findMatches(query) {
    const keyword = normalizeText(query);
    if (!keyword) return [];

    return getProducts()
      .filter(function (product) {
        const searchable = [
          product.name,
          product.category,
          product.type,
          product.gender,
          product.description
        ]
          .map(normalizeText)
          .join(" ");

        return searchable.includes(keyword);
      })
      .slice(0, 8);
  }

  function formatPrice(price) {
    if (typeof price === "number") {
      return price.toLocaleString("vi-VN") + "đ";
    }
    return price || "";
  }

  function renderSuggestions(searchBox, suggestions, query) {
    if (!getProducts().length) {
      suggestions.style.display = "none";
      suggestions.innerHTML = "";
      return;
    }

    const matches = findMatches(query);

    if (!query.trim()) {
      suggestions.style.display = "none";
      suggestions.innerHTML = "";
      return;
    }

    if (!matches.length) {
      suggestions.innerHTML =
        '<div style="padding: 10px; font-size: 11px; color: #999;">Không tìm thấy sản phẩm</div>';
      suggestions.style.display = "block";
      return;
    }

    suggestions.innerHTML = matches
      .map(function (product) {
        return `
          <div class="suggestion-item" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}">
            <div class="suggestion-info">
              <div class="suggestion-name">${product.name}</div>
              <div class="suggestion-price">${formatPrice(product.price)}</div>
            </div>
          </div>
        `;
      })
      .join("");

    suggestions.style.display = "block";

    suggestions.onclick = function (event) {
      const item = event.target.closest(".suggestion-item");
      if (!item) return;
      window.location.href = "./trangchitiet.html?id=" + encodeURIComponent(item.dataset.id);
    };
  }

  function initSearchBox(searchBox) {
    const input = searchBox.querySelector("input");
    const icon = searchBox.querySelector(".search-icon");
    let suggestions = searchBox.querySelector(".search-suggestions");

    if (!input) return;

    if (!suggestions) {
      suggestions = document.createElement("div");
      suggestions.className = "search-suggestions";
      searchBox.appendChild(suggestions);
    }

    icon?.addEventListener("click", function (event) {
      event.preventDefault();
      goToSearch(input.value);
    });

    input.addEventListener("keydown", function (event) {
      if (event.key !== "Enter") return;
      event.preventDefault();
      event.stopImmediatePropagation();
      goToSearch(input.value);
    });

    input.addEventListener("input", function () {
      renderSuggestions(searchBox, suggestions, input.value);
    });
  }

  function applyQueryToCurrentPage() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("search") || params.get("q");
    if (!query) return;

    document.querySelectorAll(".search-box input").forEach(function (input) {
      input.value = query;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".search-box").forEach(initSearchBox);
    applyQueryToCurrentPage();

    document.addEventListener("click", function (event) {
      if (event.target.closest(".search-box")) return;
      document.querySelectorAll(".search-suggestions").forEach(function (suggestions) {
        suggestions.style.display = "none";
      });
    });
  });

  window.AuroraHeaderSearch = {
    go: goToSearch,
    getSearchUrl: getSearchUrl
  };
})();
