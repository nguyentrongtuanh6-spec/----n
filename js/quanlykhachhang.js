document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("customersTable");
  if (!table) return;

  const tbody = table.querySelector("tbody");
  const summary = document.getElementById("customersSummary");
  const paginationWrap = document.getElementById("customersPagination");
  const searchInput = document.getElementById("globalSearchInput");
  const addBtn = document.getElementById("addCustomerBtn");
  const sidebarAddBtn = document.getElementById("sidebarAddCustomerBtn");
  const logoutLink = document.getElementById("logoutLink");

  const totalCustomers = document.getElementById("totalCustomers");
  const newCustomers = document.getElementById("newCustomers");
  const loyalCustomers = document.getElementById("loyalCustomers");

  const state = {
    keyword: "",
    page: 1,
    pageSize: 8,
  };

  function parseMoney(value) {
    const digits = String(value).replace(/[^\d]/g, "");
    return Number(digits || 0);
  }

  function formatMoney(value) {
    return `${Number(value || 0).toLocaleString("vi-VN")}đ`;
  }

  function parseRows() {
    return Array.from(tbody.querySelectorAll("tr")).map((row) => {
      const id = row.dataset.id || "";
      const name = (row.querySelector("[data-read]")?.textContent || "").trim();
      const avatar = row.querySelector("img")?.getAttribute("src") || "";
      const email = (
        row.querySelector("td:nth-child(3)")?.textContent || ""
      ).trim();
      const username = (
        row.querySelector("td:nth-child(4) p:nth-child(1)")?.textContent || ""
      ).trim();
      const status = (
        row.querySelector("td:nth-child(4) p:nth-child(2)")?.textContent || ""
      ).trim();
      const totalSpent = parseMoney(
        row.querySelector("td:nth-child(5)")?.textContent || "0",
      );
      return { id, name, avatar, email, username, status, totalSpent };
    });
  }

  const customers = parseRows();

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

  function filteredCustomers() {
    return customers.filter((item) => {
      const pool =
        `${item.id} ${item.name} ${item.email} ${item.username}`.toLowerCase();
      return !state.keyword || pool.includes(state.keyword);
    });
  }

  function renderStats() {
    const all = customers.length;
    const newMonth = Math.min(42, all);
    const loyal = customers.filter(
      (item) => item.totalSpent >= 70000000,
    ).length;

    totalCustomers.textContent = all.toLocaleString("vi-VN");
    newCustomers.textContent = newMonth.toLocaleString("vi-VN");
    loyalCustomers.textContent = loyal.toLocaleString("vi-VN");
  }

  function rowTemplate(item) {
    return `
      <tr data-id="${item.id}">
        <td class="px-6 py-4 font-semibold">${item.id}</td>
        <td class="px-6 py-4">
          <div class="flex items-center gap-3">
            <img class="w-9 h-9 rounded-lg object-cover" src="${item.avatar}" alt="avatar" />
            <button data-read class="font-semibold text-left hover:underline">${item.name}</button>
          </div>
        </td>
        <td class="px-6 py-4 text-on-surface-variant">${item.email}</td>
        <td class="px-6 py-4">
          <p class="font-medium">${item.username}</p>
          <p class="text-[10px] text-emerald-600 font-bold uppercase">${item.status}</p>
        </td>
        <td class="px-6 py-4 text-right font-bold">${formatMoney(item.totalSpent)}</td>
        <td class="px-6 py-4 text-right space-x-1">
          <button data-action="edit" class="p-1.5 hover:bg-surface-container-low rounded-lg text-stone-400 hover:text-primary"><span class="material-symbols-outlined text-lg">edit</span></button>
          <button data-action="delete" class="p-1.5 hover:bg-error-container/20 rounded-lg text-stone-400 hover:text-error"><span class="material-symbols-outlined text-lg">delete</span></button>
        </td>
      </tr>
    `;
  }

  function openModal(mode, customer) {
    const isView = mode === "view";
    const title =
      mode === "create"
        ? "Thêm khách hàng"
        : mode === "edit"
          ? "Sửa thông tin khách hàng"
          : "Chi tiết khách hàng";

    const modal = document.createElement("div");
    modal.className =
      "fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4";
    modal.innerHTML = `
      <div class="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-2xl font-black">${title}</h3>
          <button type="button" data-close class="w-9 h-9 rounded-full hover:bg-stone-100"><span class="material-symbols-outlined">close</span></button>
        </div>
        <form id="customerForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="text-sm font-semibold">Mã KH
            <input name="id" class="mt-1 w-full rounded-lg border-stone-200" value="${customer?.id || ""}" ${mode !== "create" ? "readonly" : ""} required />
          </label>
          <label class="text-sm font-semibold">Họ tên
            <input name="name" class="mt-1 w-full rounded-lg border-stone-200" value="${customer?.name || ""}" ${isView ? "readonly" : ""} required />
          </label>
          <label class="text-sm font-semibold">Email
            <input name="email" type="email" class="mt-1 w-full rounded-lg border-stone-200" value="${customer?.email || ""}" ${isView ? "readonly" : ""} required />
          </label>
          <label class="text-sm font-semibold">Username
            <input name="username" class="mt-1 w-full rounded-lg border-stone-200" value="${customer?.username || ""}" ${isView ? "readonly" : ""} required />
          </label>
          <label class="text-sm font-semibold">Chi tiêu (VND)
            <input name="totalSpent" type="number" min="0" class="mt-1 w-full rounded-lg border-stone-200" value="${customer?.totalSpent || 0}" ${isView ? "readonly" : ""} required />
          </label>
          <label class="text-sm font-semibold">Trạng thái
            <input name="status" class="mt-1 w-full rounded-lg border-stone-200" value="${customer?.status || "Đang hoạt động"}" ${isView ? "readonly" : ""} required />
          </label>
          <div class="md:col-span-2 flex justify-end gap-3 mt-2">
            <button type="button" data-close class="px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200">Đóng</button>
            ${isView ? "" : '<button type="submit" class="px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-dim">Lưu</button>'}
          </div>
        </form>
      </div>
    `;

    function close() {
      modal.remove();
    }

    modal.addEventListener("click", function (event) {
      if (event.target === modal || event.target.closest("[data-close]")) {
        close();
      }
    });

    const form = modal.querySelector("#customerForm");
    if (form && !isView) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        const data = new FormData(form);

        const payload = {
          id: String(data.get("id") || "").trim(),
          name: String(data.get("name") || "").trim(),
          email: String(data.get("email") || "").trim(),
          username: String(data.get("username") || "").trim(),
          totalSpent: Number(data.get("totalSpent") || 0),
          status: String(data.get("status") || "Đang hoạt động").trim(),
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(String(data.get("name") || "User"))}&background=random`,
        };

        if (
          !payload.id ||
          !payload.name ||
          !payload.email ||
          !payload.username
        ) {
          alert("Vui lòng nhập đầy đủ thông tin.");
          return;
        }

        if (mode === "create") {
          const duplicate = customers.some(
            (item) => item.id.toLowerCase() === payload.id.toLowerCase(),
          );
          if (duplicate) {
            alert("Mã khách hàng đã tồn tại.");
            return;
          }
          customers.unshift(payload);
          state.page = 1;
        } else if (mode === "edit" && customer) {
          const idx = customers.findIndex((item) => item.id === customer.id);
          if (idx >= 0) {
            customers[idx] = { ...customers[idx], ...payload, id: customer.id };
          }
        }

        close();
        render();
      });
    }

    document.body.appendChild(modal);
  }

  function render() {
    const rows = filteredCustomers();
    const total = rows.length;
    const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
    if (state.page > totalPages) state.page = totalPages;

    const start = (state.page - 1) * state.pageSize;
    const visibleRows = rows.slice(start, start + state.pageSize);
    tbody.innerHTML = visibleRows.map(rowTemplate).join("");

    const from = total ? start + 1 : 0;
    const to = Math.min(start + state.pageSize, total);
    summary.textContent = total
      ? `Hiển thị ${from}-${to} trên ${total} khách hàng`
      : "Không có khách hàng phù hợp";

    rebuildPagination(totalPages);
    renderStats();
  }

  searchInput?.addEventListener("input", function (event) {
    state.keyword = event.target.value.trim().toLowerCase();
    state.page = 1;
    render();
  });

  function handleAdd() {
    openModal("create");
  }

  addBtn?.addEventListener("click", handleAdd);
  sidebarAddBtn?.addEventListener("click", handleAdd);

  tbody.addEventListener("click", function (event) {
    const row = event.target.closest("tr");
    if (!row) return;

    const id = row.dataset.id;
    const customer = customers.find((item) => item.id === id);
    if (!customer) return;

    if (event.target.closest("[data-read]")) {
      openModal("view", customer);
      return;
    }

    const actionBtn = event.target.closest("button[data-action]");
    if (!actionBtn) return;

    const action = actionBtn.dataset.action;
    if (action === "edit") {
      openModal("edit", customer);
      return;
    }

    if (action === "delete") {
      const confirmed = confirm(
        `Bạn có chắc muốn xóa khách hàng ${customer.id}?`,
      );
      if (!confirmed) return;

      const idx = customers.findIndex((item) => item.id === customer.id);
      if (idx >= 0) {
        customers.splice(idx, 1);
        render();
      }
    }
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
