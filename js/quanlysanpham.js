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

  // Load dữ liệu từ Database thay vì parse DOM
  let products = window.AuroraDB ? window.AuroraDB.getProducts() : [];
  if (products.length === 0) {
    // Nếu DB trống, thử lấy từ data-products.js
    products = window.productData || [];
  }

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
          <label class="text-sm font-semibold">Danh mục hiển thị (Home)
            <select name="category" class="mt-1 w-full rounded-lg border-stone-200" ${isView ? "disabled" : ""}>
              <option value="couple" ${product?.category === "couple" ? "selected" : ""}>Sản phẩm cặp đôi</option>
              <option value="favorite" ${product?.category === "favorite" ? "selected" : ""}>Yêu thích nhất</option>
              <option value="custom" ${product?.category === "custom" ? "selected" : ""}>Sáng tạo / Charm</option>
              <option value="others" ${product?.category === "others" ? "selected" : ""}>Khác</option>
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
          <div class="md:col-span-2 grid grid-cols-2 gap-4 border-y border-stone-100 py-4 my-2">
            <label class="text-sm font-semibold">Loại sản phẩm
              <select name="type" class="mt-1 w-full rounded-lg border-stone-200" ${isView ? "disabled" : ""}>
                <option ${product?.type === "Nhẫn" ? "selected" : ""}>Nhẫn</option>
                <option ${product?.type === "Bông tai" ? "selected" : ""}>Bông tai</option>
                <option ${product?.type === "Dây chuyền" ? "selected" : ""}>Dây chuyền</option>
                <option ${product?.type === "Vòng tay" ? "selected" : ""}>Vòng tay</option>
                <option ${product?.type === "Lắc chân" ? "selected" : ""}>Lắc chân</option>
                <option ${product?.type === "Charm" ? "selected" : ""}>Charm</option>
              </select>
            </label>
            <label class="text-sm font-semibold">Màu sắc
              <input name="color" class="mt-1 w-full rounded-lg border-stone-200" value="${product?.color || ""}" ${isView ? "readonly" : ""} placeholder="VD: Bạc" />
            </label>
            <label class="text-sm font-semibold">Chất liệu
              <input name="material" class="mt-1 w-full rounded-lg border-stone-200" value="${product?.material || ""}" ${isView ? "readonly" : ""} placeholder="VD: Bạc 925" />
            </label>
            <label class="text-sm font-semibold">Đá
              <input name="stone" class="mt-1 w-full rounded-lg border-stone-200" value="${product?.stone || ""}" ${isView ? "readonly" : ""} placeholder="VD: Moissanite" />
            </label>
            <label class="text-sm font-semibold">Giới tính
              <input name="gender" class="mt-1 w-full rounded-lg border-stone-200" value="${product?.gender || ""}" ${isView ? "readonly" : ""} placeholder="VD: Nam" />
            </label>
            <label class="text-sm font-semibold">Độ hoàn thiện
              <input name="finish" class="mt-1 w-full rounded-lg border-stone-200" value="${product?.finish || ""}" ${isView ? "readonly" : ""} placeholder="VD: Xuất sắc" />
            </label>
          </div>
          <div class="md:col-span-2 space-y-2">
            <label class="text-sm font-semibold">Hình ảnh sản phẩm</label>
            <div class="flex items-center gap-4">
              <div id="imagePreview" class="w-16 h-16 rounded-lg bg-stone-100 border border-stone-200 overflow-hidden flex items-center justify-center">
                ${product?.image ? `<img src="${product.image}" class="w-full h-full object-cover">` : '<span class="material-symbols-outlined text-stone-400">image</span>'}
              </div>
              <div class="flex-1">
                <input type="file" id="imageFileInput" accept="image/*" class="hidden" ${isView ? "disabled" : ""} />
                <button type="button" onclick="document.getElementById('imageFileInput').click()" class="px-4 py-2 border border-stone-200 rounded-lg text-sm font-medium hover:bg-stone-50 ${isView ? "hidden" : "block"}">
                  Chọn ảnh từ máy tính
                </button>
                <p class="text-[11px] text-stone-500 mt-1">Lưu ý: Ảnh sẽ được lưu vào thư mục /ảnh/</p>
              </div>
            </div>
            <input type="hidden" name="image" id="imagePath" value="${product?.image || ""}" />
          </div>
          <div class="md:col-span-2 space-y-2 border-t border-stone-100 pt-4">
            <label class="text-sm font-semibold">Thư viện ảnh (Các góc sản phẩm)</label>
            <div class="flex flex-wrap gap-3" id="galleryPreviewContainer">
              ${(product?.images || []).map(img => `<div class="w-16 h-16 rounded-lg border border-stone-200 overflow-hidden"><img src="${img}" class="w-full h-full object-cover"></div>`).join('')}
              <button type="button" onclick="document.getElementById('galleryFileInput').click()" class="w-16 h-16 rounded-lg border-2 border-dashed border-stone-200 flex items-center justify-center text-stone-400 hover:border-primary hover:text-primary ${isView ? "hidden" : ""}">
                <span class="material-symbols-outlined">add</span>
              </button>
            </div>
            <input type="file" id="galleryFileInput" accept="image/*" multiple class="hidden" />
            <input type="hidden" name="images" id="galleryPaths" value='${JSON.stringify(product?.images || [])}' />
          </div>
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
    const imageFileInput = modal.querySelector("#imageFileInput");
    const imagePreview = modal.querySelector("#imagePreview");
    const imagePathInput = modal.querySelector("#imagePath");

    if (imageFileInput && !isView) {
      imageFileInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (event) {
            imagePreview.innerHTML = `<img src="${event.target.result}" class="w-full h-full object-cover">`;
            // LƯU TOÀN BỘ DỮ LIỆU ẢNH (Base64) ĐỂ KHÔNG BỊ LỖI LINK
            imagePathInput.value = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    const galleryFileInput = modal.querySelector("#galleryFileInput");
    const galleryPreviewContainer = modal.querySelector("#galleryPreviewContainer");
    const galleryPathsInput = modal.querySelector("#galleryPaths");

    if (galleryFileInput && !isView) {
      galleryFileInput.addEventListener("change", function (e) {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
          const galleryData = JSON.parse(galleryPathsInput.value || "[]");
          let loadedCount = 0;

          files.forEach(file => {
            const reader = new FileReader();
            reader.onload = function (event) {
              const base64 = event.target.result;
              galleryData.push(base64);
              
              // Thêm preview mới
              const div = document.createElement("div");
              div.className = "w-16 h-16 rounded-lg border border-stone-200 overflow-hidden";
              div.innerHTML = `<img src="${base64}" class="w-full h-full object-cover">`;
              galleryPreviewContainer.insertBefore(div, galleryPreviewContainer.lastElementChild);
              
              loadedCount++;
              if (loadedCount === files.length) {
                galleryPathsInput.value = JSON.stringify(galleryData);
              }
            };
            reader.readAsDataURL(file);
          });
        }
      });
    }

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
          type: String(formData.get("type") || "").trim(),
          color: String(formData.get("color") || "").trim(),
          material: String(formData.get("material") || "").trim(),
          stone: String(formData.get("stone") || "").trim(),
          gender: String(formData.get("gender") || "").trim(),
          finish: String(formData.get("finish") || "").trim(),
          image: String(formData.get("image") || "").trim(),
          images: JSON.parse(formData.get("images") || "[]"),
        };

        if (mode === "create") {
          if (window.AuroraDB) {
            window.AuroraDB.addProduct(payload);
          } else {
            products.unshift(payload);
          }
          state.page = 1;
        } else if (mode === "edit" && product) {
          if (window.AuroraDB) {
            window.AuroraDB.updateProduct(product.id, payload);
          } else {
            const idx = products.findIndex((item) => String(item.id) === String(product.id));
            if (idx >= 0) products[idx] = { ...payload, id: product.id };
          }
        }

        // Refresh dữ liệu local
        if (window.AuroraDB) products = window.AuroraDB.getProducts();

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
    const placeholder = "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=200&auto=format&fit=crop";
    const imageSrc = item.image || placeholder;
    return `
      <tr data-id="${item.id}" data-category="${item.category}">
        <td class="px-6 py-4">
          <div class="flex items-center gap-3">
            <img class="w-12 h-12 rounded-md object-cover" src="${imageSrc}" alt="product" />
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
    const product = products.find((item) => String(item.id) === String(id));
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

      if (window.AuroraDB) {
        window.AuroraDB.deleteProduct(product.id);
        products = window.AuroraDB.getProducts();
      } else {
        const index = products.findIndex((item) => String(item.id) === String(product.id));
        if (index >= 0) products.splice(index, 1);
      }
      render();
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

  logoutLink?.addEventListener("click", async function (event) {
    event.preventDefault();
    const confirmed = await Aurora.showConfirm(
      "Đăng xuất",
      "Bạn muốn đăng xuất khỏi trang quản trị?",
      "Đăng xuất",
      "Hủy"
    );
    if (confirmed) {
      window.location.href = "./trangdangnhap.html";
    }
  });

  render();
});
