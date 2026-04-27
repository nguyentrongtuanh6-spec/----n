document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("ordersTable");
  if (!table) return;

  const tbody = table.querySelector("tbody");
  const initialRows = Array.from(tbody.querySelectorAll("tr"));
  const tabButtons = Array.from(document.querySelectorAll(".tab-btn"));
  const searchInput = document.querySelector('header input[type="text"]');
  const exportBtn = document.getElementById("exportBtn");
  const addOrderBtn = document.getElementById("addOrderBtn");
  const footer = table.closest("div").querySelector("footer");
  const summaryLabel = footer ? footer.querySelector("p") : null;
  const paginationWrap = footer
    ? footer.querySelector("div.flex.items-center.gap-2")
    : null;

  const statusClassMap = {
    "Đã thanh toán": "bg-emerald-100 text-emerald-700",
    "Đang giao": "bg-sky-100 text-sky-700",
    "Chờ xử lý": "bg-amber-100 text-amber-700",
  };

  function parseInitialOrders() {
    return initialRows.map((row) => {
      const id = (
        row.querySelector("td:nth-child(1)")?.textContent || ""
      ).trim();
      const customerName = (
        row.querySelector("td:nth-child(2) p:nth-child(1)")?.textContent || ""
      ).trim();
      const customerEmail = (
        row.querySelector("td:nth-child(2) p:nth-child(2)")?.textContent || ""
      ).trim();
      const product = (
        row.querySelector("td:nth-child(3) span:last-child")?.textContent || ""
      ).trim();
      const total = (
        row.querySelector("td:nth-child(4)")?.textContent || ""
      ).trim();
      const status = (
        row.querySelector("td:nth-child(5) span")?.textContent || ""
      ).trim();
      const avatar =
        row.querySelector("td:nth-child(2) img")?.getAttribute("src") || "";
      const icon = (
        row.querySelector("td:nth-child(3) .material-symbols-outlined")
          ?.textContent || "diamond"
      ).trim();

      return {
        id,
        customerName,
        customerEmail,
        product,
        total,
        status,
        avatar,
        icon,
      };
    });
  }

  const orders = parseInitialOrders();

  const state = {
    activeStatus: "Tất cả",
    keyword: "",
    page: 1,
    pageSize: 4,
  };

  function filteredRows() {
    return orders.filter((order) => {
      const statusOk =
        state.activeStatus === "Tất cả" || order.status === state.activeStatus;
      const text =
        `${order.id} ${order.customerName} ${order.customerEmail} ${order.product} ${order.total} ${order.status}`.toLowerCase();
      const keywordOk = !state.keyword || text.includes(state.keyword);
      return statusOk && keywordOk;
    });
  }

  function updateSummary(total, showingFrom, showingTo) {
    if (!summaryLabel) return;
    if (total === 0) {
      summaryLabel.innerHTML = "Không có dữ liệu phù hợp";
      return;
    }
    summaryLabel.innerHTML = `Hiển thị <span class="font-bold">${showingFrom}-${showingTo}</span> trên <span class="font-bold">${total}</span> đơn hàng`;
  }

  function createPageButton(pageNumber, isActive) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = String(pageNumber);
    button.className = isActive
      ? "w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary text-xs font-bold"
      : "w-8 h-8 flex items-center justify-center rounded bg-surface-container-low text-on-surface-variant text-xs font-bold hover:bg-surface-container-high";
    button.addEventListener("click", function () {
      state.page = pageNumber;
      render();
    });
    return button;
  }

  function normalizeCurrency(input) {
    const digits = String(input).replace(/[^\d]/g, "");
    if (!digits) return "";
    return `${Number(digits).toLocaleString("vi-VN")}đ`;
  }

  function renderRow(order) {
    const statusClass =
      statusClassMap[order.status] || "bg-stone-200 text-stone-600";
    const safeAvatar =
      order.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(order.customerName || "User")}&background=random`;

    return `
      <tr class="hover:bg-surface/50 transition-colors" data-id="${order.id}">
        <td class="px-6 py-5 font-medium text-primary">${order.id}</td>
        <td class="px-6 py-5">
          <div class="flex items-center gap-3">
            <img class="w-8 h-8 rounded-full object-cover" src="${safeAvatar}" alt="Customer avatar" />
            <div>
              <p class="font-semibold text-on-surface">${order.customerName}</p>
              <p class="text-[10px] text-on-surface-variant">${order.customerEmail}</p>
            </div>
          </div>
        </td>
        <td class="px-6 py-5">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center">
              <span class="material-symbols-outlined text-xs">${order.icon || "diamond"}</span>
            </div>
            <span class="text-xs truncate max-w-[150px]">${order.product}</span>
          </div>
        </td>
        <td class="px-6 py-5 text-right font-bold text-on-surface">${order.total}</td>
        <td class="px-6 py-5 text-center">
          <span class="px-3 py-1 rounded-full ${statusClass} text-[10px] font-bold uppercase tracking-wider">${order.status}</span>
        </td>
        <td class="px-6 py-5 text-right space-x-1">
          <button data-action="view" class="p-1.5 hover:bg-surface-container-low rounded-lg transition-colors text-stone-400 hover:text-primary">
            <span class="material-symbols-outlined text-lg">visibility</span>
          </button>
          <button data-action="edit" class="p-1.5 hover:bg-surface-container-low rounded-lg transition-colors text-stone-400 hover:text-primary">
            <span class="material-symbols-outlined text-lg">edit</span>
          </button>
          <button data-action="delete" class="p-1.5 hover:bg-error-container/20 rounded-lg transition-colors text-stone-400 hover:text-error">
            <span class="material-symbols-outlined text-lg">delete</span>
          </button>
        </td>
      </tr>
    `;
  }

  function openOrderModal(mode, order) {
    const isView = mode === "view";
    const isEdit = mode === "edit";
    const title =
      mode === "create"
        ? "Tạo đơn hàng mới"
        : mode === "edit"
          ? "Chỉnh sửa đơn hàng"
          : "Chi tiết đơn hàng";

    const modal = document.createElement("div");
    modal.className =
      "fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4";
    modal.innerHTML = `
      <div class="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-2xl font-black">${title}</h3>
          <button type="button" data-close class="w-9 h-9 rounded-full hover:bg-stone-100">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <form id="orderForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="text-sm font-semibold">Mã đơn
            <input name="id" class="mt-1 w-full rounded-lg border-stone-200" value="${order?.id || ""}" ${isEdit || isView ? "readonly" : ""} required />
          </label>
          <label class="text-sm font-semibold">Khách hàng
            <input name="customerName" class="mt-1 w-full rounded-lg border-stone-200" value="${order?.customerName || ""}" ${isView ? "readonly" : ""} required />
          </label>
          <label class="text-sm font-semibold">Email
            <input name="customerEmail" type="email" class="mt-1 w-full rounded-lg border-stone-200" value="${order?.customerEmail || ""}" ${isView ? "readonly" : ""} required />
          </label>
          <label class="text-sm font-semibold">Sản phẩm
            <input name="product" class="mt-1 w-full rounded-lg border-stone-200" value="${order?.product || ""}" ${isView ? "readonly" : ""} required />
          </label>
          <label class="text-sm font-semibold">Tổng giá trị
            <input name="total" class="mt-1 w-full rounded-lg border-stone-200" value="${order?.total || ""}" ${isView ? "readonly" : ""} required />
          </label>
          <label class="text-sm font-semibold">Trạng thái
            <select name="status" class="mt-1 w-full rounded-lg border-stone-200" ${isView ? "disabled" : ""}>
              <option ${order?.status === "Đã thanh toán" ? "selected" : ""}>Đã thanh toán</option>
              <option ${order?.status === "Đang giao" ? "selected" : ""}>Đang giao</option>
              <option ${order?.status === "Chờ xử lý" ? "selected" : ""}>Chờ xử lý</option>
            </select>
          </label>
          <label class="text-sm font-semibold md:col-span-2">Icon sản phẩm
            <input name="icon" class="mt-1 w-full rounded-lg border-stone-200" value="${order?.icon || "diamond"}" ${isView ? "readonly" : ""} />
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
      if (event.target === modal) closeModal();
      if (event.target.closest("[data-close]")) closeModal();
    });

    const form = modal.querySelector("#orderForm");
    if (form && !isView) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const id = String(formData.get("id") || "").trim();
        const payload = {
          id,
          customerName: String(formData.get("customerName") || "").trim(),
          customerEmail: String(formData.get("customerEmail") || "").trim(),
          product: String(formData.get("product") || "").trim(),
          total: normalizeCurrency(formData.get("total")),
          status: String(formData.get("status") || "Chờ xử lý").trim(),
          icon: String(formData.get("icon") || "diamond").trim() || "diamond",
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(String(formData.get("customerName") || "User"))}&background=random`,
        };

        if (
          !payload.id ||
          !payload.customerName ||
          !payload.customerEmail ||
          !payload.product ||
          !payload.total
        ) {
          alert("Vui lòng nhập đầy đủ thông tin.");
          return;
        }

        if (mode === "create") {
          const exists = orders.some(
            (item) => item.id.toLowerCase() === payload.id.toLowerCase(),
          );
          if (exists) {
            alert("Mã đơn đã tồn tại. Vui lòng nhập mã khác.");
            return;
          }
          orders.unshift(payload);
          state.page = 1;
        }

        if (mode === "edit" && order) {
          const idx = orders.findIndex((item) => item.id === order.id);
          if (idx >= 0) {
            orders[idx] = { ...orders[idx], ...payload, id: order.id };
          }
        }

        closeModal();
        render();
      });
    }

    document.body.appendChild(modal);
  }

  function rebuildPagination(totalPages) {
    if (!paginationWrap) return;

    paginationWrap.innerHTML = "";

    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className =
      "w-8 h-8 flex items-center justify-center rounded bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors";
    prevBtn.innerHTML =
      '<span class="material-symbols-outlined text-lg">chevron_left</span>';
    prevBtn.disabled = state.page <= 1;
    prevBtn.addEventListener("click", function () {
      if (state.page > 1) {
        state.page -= 1;
        render();
      }
    });

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className =
      "w-8 h-8 flex items-center justify-center rounded bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors";
    nextBtn.innerHTML =
      '<span class="material-symbols-outlined text-lg">chevron_right</span>';
    nextBtn.disabled = state.page >= totalPages;
    nextBtn.addEventListener("click", function () {
      if (state.page < totalPages) {
        state.page += 1;
        render();
      }
    });

    paginationWrap.appendChild(prevBtn);

    const maxButtons = 3;
    const start = Math.max(1, state.page - 1);
    const end = Math.min(totalPages, start + maxButtons - 1);
    for (let pageNumber = start; pageNumber <= end; pageNumber += 1) {
      paginationWrap.appendChild(
        createPageButton(pageNumber, pageNumber === state.page),
      );
    }

    paginationWrap.appendChild(nextBtn);
  }

  function render() {
    const rows = filteredRows();
    const total = rows.length;
    const totalPages = Math.max(1, Math.ceil(total / state.pageSize));

    if (state.page > totalPages) {
      state.page = totalPages;
    }

    const startIndex = (state.page - 1) * state.pageSize;
    const visibleRows = rows.slice(startIndex, startIndex + state.pageSize);

    tbody.innerHTML = visibleRows.map(renderRow).join("");

    const showingFrom = total === 0 ? 0 : startIndex + 1;
    const showingTo = Math.min(startIndex + state.pageSize, total);

    updateSummary(total, showingFrom, showingTo);
    rebuildPagination(totalPages);
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      tabButtons.forEach((tab) => {
        tab.classList.remove("bg-primary", "text-on-primary", "font-semibold");
        tab.classList.add(
          "bg-surface-container-lowest",
          "text-on-surface-variant",
          "font-medium",
        );
      });

      this.classList.remove(
        "bg-surface-container-lowest",
        "text-on-surface-variant",
        "font-medium",
      );
      this.classList.add("bg-primary", "text-on-primary", "font-semibold");

      state.activeStatus = this.textContent.trim();
      state.page = 1;
      render();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", function (event) {
      state.keyword = event.target.value.trim().toLowerCase();
      state.page = 1;
      render();
    });
  }

  tbody.addEventListener("click", function (event) {
    const button = event.target.closest("button");
    if (!button) return;

    const orderId = button.closest("tr")?.dataset.id;
    const action = button.dataset.action;
    const order = orders.find((item) => item.id === orderId);
    if (!order) return;

    if (action === "view") {
      openOrderModal("view", order);
      return;
    }

    if (action === "edit") {
      openOrderModal("edit", order);
      return;
    }

    if (action === "delete") {
      const confirmed = confirm(`Bạn có chắc muốn xóa ${order.id}?`);
      if (!confirmed) return;

      const index = orders.findIndex((item) => item.id === order.id);
      if (index >= 0) {
        orders.splice(index, 1);
      }
      render();
    }
  });

  if (addOrderBtn) {
    addOrderBtn.addEventListener("click", function () {
      openOrderModal("create");
    });
  }

  function exportCsv() {
    const rows = filteredRows();
    if (!rows.length) {
      alert("Không có dữ liệu để xuất.");
      return;
    }

    const header = [
      "Ma don",
      "Khach hang",
      "San pham",
      "Tong gia tri",
      "Trang thai",
    ];
    const lines = [header.join(",")];

    rows.forEach((row) => {
      const csvRow = [
        row.id,
        row.customerName,
        row.product,
        row.total,
        row.status,
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",");

      lines.push(csvRow);
    });

    const blob = new Blob([`\uFEFF${lines.join("\n")}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `bao-cao-don-hang-${date}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  if (exportBtn) {
    exportBtn.addEventListener("click", exportCsv);
  }

  const logoutLink = Array.from(document.querySelectorAll("a")).find((item) =>
    item.textContent.includes("Đăng xuất"),
  );
  if (logoutLink) {
    logoutLink.addEventListener("click", async function (event) {
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
  }

  render();
});
