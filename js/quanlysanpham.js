document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("productsTable");
  if (!table) return;

  const tbody = table.querySelector("tbody");
  const productSearch = document.getElementById("productSearch");
  const globalSearch = document.getElementById("globalSearchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const stockFilter = document.getElementById("stockFilter");
  const addProductBtn = document.getElementById("addProductBtn");
  const sidebarAddProductBtn = document.getElementById("sidebarAddProductBtn");
  const exportProductBtn = document.getElementById("exportProductBtn");
  const logoutLink = document.getElementById("logoutLink");
  const summary = document.getElementById("productSummary");
  const paginationWrap = document.getElementById("productPagination");

  const statusClassMap = {
    "Còn hàng": "bg-emerald-100 text-emerald-700",
    "Hết hàng": "bg-rose-100 text-rose-600",
  };

  function parseCurrencyToNumber(value) {
    const digits = String(value).replace(/[^\d]/g, "");
    return Number(digits || 0);
  }

  function formatCurrency(value) {
    return `${Number(value || 0).toLocaleString("vi-VN")}đ`;
  }

  function parseRows() {
    return Array.from(tbody.querySelectorAll("tr")).map((row) => {
      const id = row.dataset.id || `SP${Date.now()}`;
      const category = row.dataset.category || "Nhẫn";
      const name = (row.querySelector("[data-read]")?.textContent || "").trim();
      const subtitle = (row.querySelector("p")?.textContent || "").trim();
      const image = row.querySelector("img")?.getAttribute("src") || "";
      const price = parseCurrencyToNumber(
        row.querySelector("td:nth-child(2)")?.textContent || "0",
      );
      const stock = Number(
        (row.querySelector("td:nth-child(3)")?.textContent || "0").replace(
          /[^\d]/g,
          "",
        ),
      );
      const status =
        (row.querySelector("td:nth-child(4) span")?.textContent || "").trim() ||
        (stock > 0 ? "Còn hàng" : "Hết hàng");
      return { id, category, name, subtitle, image, price, stock, status };
    });
  }

  const products = parseRows();

  const state = {
    keyword: "",
    category: "Tất cả danh mục",
    stock: "Trạng thái kho",
    page: 1,
    pageSize: 8,
  };

  function createPaginationButton(page, active) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = String(page);
    button.className = active
      ? "w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary text-xs font-bold"
      : "w-8 h-8 flex items-center justify-center rounded bg-surface-container-low text-on-surface-variant text-xs font-bold hover:bg-surface-container-high";
    button.addEventListener("click", function () {
      state.page = page;
      render();
    });
    return button;
  }

  function rebuildPagination(totalPages) {
    paginationWrap.innerHTML = "";

    const prev = document.createElement("button");
    prev.type = "button";
    prev.className =
      "w-8 h-8 flex items-center justify-center rounded bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high";
    prev.innerHTML =
      '<span class="material-symbols-outlined text-lg">chevron_left</span>';
    prev.disabled = state.page === 1;
    prev.addEventListener("click", function () {
      if (state.page > 1) {
        state.page -= 1;
        render();
      }
    });
    paginationWrap.appendChild(prev);

    for (let page = 1; page <= totalPages; page += 1) {
      paginationWrap.appendChild(
        createPaginationButton(page, page === state.page),
      );
    }

    const next = document.createElement("button");
    next.type = "button";
    next.className =
      "w-8 h-8 flex items-center justify-center rounded bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high";
    next.innerHTML =
      '<span class="material-symbols-outlined text-lg">chevron_right</span>';
    next.disabled = state.page === totalPages;
    next.addEventListener("click", function () {
      if (state.page < totalPages) {
        state.page += 1;
        render();
      }
    });
    paginationWrap.appendChild(next);
  }

  function openProductModal(mode, product) {
    const isView = mode === "view";
    const title =
      mode === "create"
        ? "Thêm sản phẩm mới"
        : mode === "edit"
          ? "Cập nhật sản phẩm"
          : "Chi tiết sản phẩm";

    const modal = document.createElement("div");
    modal.className =
      "fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4";
    modal.innerHTML = `
      <div class="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-2xl font-black">${title}</h3>
          <button type="button" data-close class="w-9 h-9 rounded-full hover:bg-stone-100"><span class="material-symbols-outlined">close</span></button>
        </div>
        <form id="productForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="text-sm font-semibold">Mã sản phẩm
            <input name="id" class="mt-1 w-full rounded-lg border-stone-200" value="${product?.id || ""}" ${mode !== "create" ? "readonly" : ""} required />
          </label>
          <label class="text-sm font-semibold">Danh mục
            <select name="category" class="mt-1 w-full rounded-lg border-stone-200" ${isView ? "disabled" : ""}>
              <option ${product?.category === "Nhẫn" ? "selected" : ""}>Nhẫn</option>
              <option ${product?.category === "Bông tai" ? "selected" : ""}>Bông tai</option>
              <option ${product?.category === "Dây chuyền" ? "selected" : ""}>Dây chuyền</option>
              <option ${product?.category === "Vòng tay" ? "selected" : ""}>Vòng tay</option>
              <option ${product?.category === "Charm" ? "selected" : ""}>Charm</option>
            </select>
          </label>
          <label class="text-sm font-semibold md:col-span-2">Tên sản phẩm
            <input name="name" class="mt-1 w-full rounded-lg border-stone-200" value="${product?.name || ""}" ${isView ? "readonly" : ""} required />
          </label>
          <label class="text-sm font-semibold md:col-span-2">Mô tả ngắn
            <input name="subtitle" class="mt-1 w-full rounded-lg border-stone-200" value="${product?.subtitle || ""}" ${isView ? "readonly" : ""} />
          </label>
          <label class="text-sm font-semibold">Giá bán
            <input name="price" type="number" min="0" class="mt-1 w-full rounded-lg border-stone-200" value="${product?.price || 0}" ${isView ? "readonly" : ""} required />
          </label>
          <label class="text-sm font-semibold">Tồn kho
            <input name="stock" type="number" min="0" class="mt-1 w-full rounded-lg border-stone-200" value="${product?.stock ?? 0}" ${isView ? "readonly" : ""} required />
          </label>
          <label class="text-sm font-semibold md:col-span-2">Link ảnh
            <input name="image" class="mt-1 w-full rounded-lg border-stone-200" value="${product?.image || ""}" ${isView ? "readonly" : ""} />
          </label>
          <div class="md:col-span-2 flex justify-end gap-3 mt-2">
            <button type="button" data-close class="px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200">Đóng</button>
            ${isView ? "" : '<button type="submit" class="px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-dim">Lưu</button>'}
          </div>
        </form>
      </div>
    `;

    function closeModal() {
      modal.remove();
    }

    modal.addEventListener("click", function (event) {
      if (event.target === modal || event.target.closest("[data-close]")) {
        closeModal();
      }
    });

    const form = modal.querySelector("#productForm");
    if (form && !isView) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const payload = {
          id: String(formData.get("id") || "").trim(),
          category: String(formData.get("category") || "Nhẫn").trim(),
          name: String(formData.get("name") || "").trim(),
          subtitle: String(formData.get("subtitle") || "").trim(),
          price: Number(formData.get("price") || 0),
          stock: Number(formData.get("stock") || 0),
          image:
            String(formData.get("image") || "").trim() ||
            "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=200&auto=format&fit=crop",
        };

        if (!payload.id || !payload.name) {
          alert("Vui lòng nhập mã và tên sản phẩm.");
          return;
        }

        payload.status = payload.stock > 0 ? "Còn hàng" : "Hết hàng";

        if (mode === "create") {
          const duplicate = products.some(
            (item) => item.id.toLowerCase() === payload.id.toLowerCase(),
          );
          if (duplicate) {
            alert("Mã sản phẩm đã tồn tại.");
            return;
          }
          products.unshift(payload);
          state.page = 1;
        } else if (mode === "edit" && product) {
          const idx = products.findIndex((item) => item.id === product.id);
          if (idx >= 0) {
            products[idx] = { ...products[idx], ...payload, id: product.id };
          }
        }

        closeModal();
        render();
      });
    }

    document.body.appendChild(modal);
  }

  function filteredProducts() {
    return products.filter((item) => {
      const keywordPool =
        `${item.id} ${item.name} ${item.subtitle} ${item.category}`.toLowerCase();
      const keywordOk = !state.keyword || keywordPool.includes(state.keyword);
      const categoryOk =
        state.category === "Tất cả danh mục" ||
        item.category === state.category;
      const stockOk =
        state.stock === "Trạng thái kho" || item.status === state.stock;
      return keywordOk && categoryOk && stockOk;
    });
  }

  function rowTemplate(item) {
    const statusClass =
      statusClassMap[item.status] || "bg-stone-200 text-stone-600";
    return `
      <tr data-id="${item.id}" data-category="${item.category}">
        <td class="px-6 py-4">
          <div class="flex items-center gap-3">
            <img class="w-12 h-12 rounded-md object-cover" src="${item.image}" alt="product" />
            <div>
              <button data-read class="font-semibold text-left hover:underline">${item.name}</button>
              <p class="text-[11px] text-on-surface-variant">${item.subtitle || ""}</p>
            </div>
          </div>
        </td>
        <td class="px-6 py-4 text-right font-bold">${formatCurrency(item.price)}</td>
        <td class="px-6 py-4 text-center ${item.stock === 0 ? "text-red-500" : ""}">${item.stock}</td>
        <td class="px-6 py-4 text-center"><span class="px-3 py-1 rounded-full ${statusClass} text-[10px] font-bold uppercase">${item.status}</span></td>
        <td class="px-6 py-4 text-right space-x-1">
          <button data-action="edit" class="p-1.5 hover:bg-surface-container-low rounded-lg text-stone-400 hover:text-primary"><span class="material-symbols-outlined text-lg">edit</span></button>
          <button data-action="delete" class="p-1.5 hover:bg-error-container/20 rounded-lg text-stone-400 hover:text-error"><span class="material-symbols-outlined text-lg">delete</span></button>
        </td>
      </tr>
    `;
  }

  function render() {
    const rows = filteredProducts();
    const total = rows.length;
    const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
    if (state.page > totalPages) state.page = totalPages;

    const startIndex = (state.page - 1) * state.pageSize;
    const pageRows = rows.slice(startIndex, startIndex + state.pageSize);

    tbody.innerHTML = pageRows.map(rowTemplate).join("");

    const from = total ? startIndex + 1 : 0;
    const to = Math.min(startIndex + state.pageSize, total);
    summary.textContent = total
      ? `Hiển thị ${from}-${to} trên ${total} sản phẩm`
      : "Không có sản phẩm phù hợp";

    rebuildPagination(totalPages);
  }

  productSearch?.addEventListener("input", function (event) {
    state.keyword = event.target.value.trim().toLowerCase();
    state.page = 1;
    render();
  });

  globalSearch?.addEventListener("input", function (event) {
    state.keyword = event.target.value.trim().toLowerCase();
    state.page = 1;
    if (productSearch) productSearch.value = event.target.value;
    render();
  });

  categoryFilter?.addEventListener("change", function (event) {
    state.category = event.target.value;
    state.page = 1;
    render();
  });

  stockFilter?.addEventListener("change", function (event) {
    state.stock = event.target.value;
    state.page = 1;
    render();
  });

  function handleCreate() {
    openProductModal("create");
  }

  addProductBtn?.addEventListener("click", handleCreate);
  sidebarAddProductBtn?.addEventListener("click", handleCreate);

  tbody.addEventListener("click", function (event) {
    const readBtn = event.target.closest("[data-read]");
    const actionBtn = event.target.closest("button[data-action]");
    const row = event.target.closest("tr");
    if (!row) return;

    const id = row.dataset.id;
    const product = products.find((item) => item.id === id);
    if (!product) return;

    if (readBtn) {
      openProductModal("view", product);
      return;
    }

    if (!actionBtn) return;

    const action = actionBtn.dataset.action;
    if (action === "edit") {
      openProductModal("edit", product);
      return;
    }

    if (action === "delete") {
      const confirmed = confirm(`Bạn có chắc muốn xóa sản phẩm ${product.id}?`);
      if (!confirmed) return;

      const index = products.findIndex((item) => item.id === product.id);
      if (index >= 0) {
        products.splice(index, 1);
        render();
      }
    }
  });

  exportProductBtn?.addEventListener("click", function () {
    const rows = filteredProducts();
    if (!rows.length) {
      alert("Không có dữ liệu để xuất.");
      return;
    }

    const header = [
      "Ma san pham",
      "Danh muc",
      "Ten san pham",
      "Mo ta",
      "Gia ban",
      "Ton kho",
      "Trang thai",
    ];
    const lines = [header.join(",")];

    rows.forEach((item) => {
      const line = [
        item.id,
        item.category,
        item.name,
        item.subtitle,
        formatCurrency(item.price),
        item.stock,
        item.status,
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",");
      lines.push(line);
    });

    const blob = new Blob([`\uFEFF${lines.join("\n")}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bao-cao-san-pham-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  logoutLink?.addEventListener("click", function (event) {
    event.preventDefault();
    if (confirm("Bạn muốn đăng xuất khỏi trang quản trị?")) {
      window.location.href = "./trangdangnhap.html";
    }
  });

  render();
});
