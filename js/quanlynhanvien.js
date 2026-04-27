document.addEventListener('DOMContentLoaded', function () {
  const table = document.getElementById('staffTable');
  if (!table) return;

  const tbody = table.querySelector('tbody');
  const globalSearchInput = document.getElementById('globalSearchInput');
  const staffSearchInput = document.getElementById('staffSearchInput');
  const staffStatusFilter = document.getElementById('staffStatusFilter');
  const addStaffBtn = document.getElementById('addStaffBtn');
  const sidebarAddStaffBtn = document.getElementById('sidebarAddStaffBtn');
  const logoutLink = document.getElementById('logoutLink');
  const staffSummary = document.getElementById('staffSummary');
  const staffPagination = document.getElementById('staffPagination');

  const totalStaff = document.getElementById('totalStaff');
  const workingStaff = document.getElementById('workingStaff');
  const leaveStaff = document.getElementById('leaveStaff');

  const state = {
    keyword: '',
    status: 'Tất cả trạng thái',
    page: 1,
    pageSize: 8
  };

  function parseRows() {
    return Array.from(tbody.querySelectorAll('tr')).map((row) => {
      const id = row.dataset.id || '';
      const name = (row.querySelector('[data-read]')?.textContent || '').trim();
      const avatar = row.querySelector('img')?.getAttribute('src') || '';
      const role = (row.querySelector('td:nth-child(3)')?.textContent || '').trim();
      const contact = (row.querySelector('td:nth-child(4)')?.textContent || '').trim();
      const joinDate = (row.querySelector('td:nth-child(5)')?.textContent || '').trim();
      const status = (row.querySelector('td:nth-child(6) span')?.textContent || '').trim();
      return { id, name, avatar, role, contact, joinDate, status };
    });
  }

  const staffMembers = parseRows();

  function statusClass(status) {
    if (status === 'Đang làm việc') return 'bg-emerald-100 text-emerald-700';
    if (status === 'Nghỉ phép') return 'bg-amber-100 text-amber-700';
    return 'bg-stone-200 text-stone-600';
  }

  function renderStats() {
    totalStaff.textContent = staffMembers.length.toLocaleString('vi-VN');
    workingStaff.textContent = staffMembers.filter((item) => item.status === 'Đang làm việc').length.toLocaleString('vi-VN');
    leaveStaff.textContent = staffMembers.filter((item) => item.status === 'Nghỉ phép').length.toLocaleString('vi-VN');
  }

  function filteredStaff() {
    return staffMembers.filter((item) => {
      const pool = `${item.id} ${item.name} ${item.role} ${item.contact}`.toLowerCase();
      const keywordOk = !state.keyword || pool.includes(state.keyword);
      const statusOk = state.status === 'Tất cả trạng thái' || item.status === state.status;
      return keywordOk && statusOk;
    });
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
        <td class="px-6 py-4">${item.role}</td>
        <td class="px-6 py-4">${item.contact}</td>
        <td class="px-6 py-4">${item.joinDate}</td>
        <td class="px-6 py-4 text-center"><span class="px-3 py-1 rounded-full ${statusClass(item.status)} text-[10px] font-bold uppercase">${item.status}</span></td>
        <td class="px-6 py-4 text-right space-x-1">
          <button data-action="edit" class="p-1.5 hover:bg-surface-container-low rounded-lg text-stone-400 hover:text-primary"><span class="material-symbols-outlined text-lg">edit</span></button>
          <button data-action="delete" class="p-1.5 hover:bg-error-container/20 rounded-lg text-stone-400 hover:text-error"><span class="material-symbols-outlined text-lg">delete</span></button>
        </td>
      </tr>
    `;
  }

  function createPaginationButton(page, active) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = String(page);
    button.className = active
      ? 'w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary text-xs font-bold'
      : 'w-8 h-8 flex items-center justify-center rounded bg-surface-container-low text-on-surface-variant text-xs font-bold hover:bg-surface-container-high';
    button.addEventListener('click', function () {
      state.page = page;
      render();
    });
    return button;
  }

  function rebuildPagination(totalPages) {
    staffPagination.innerHTML = '';

    const prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'w-8 h-8 flex items-center justify-center rounded bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high';
    prev.innerHTML = '<span class="material-symbols-outlined text-lg">chevron_left</span>';
    prev.disabled = state.page === 1;
    prev.addEventListener('click', function () {
      if (state.page > 1) {
        state.page -= 1;
        render();
      }
    });
    staffPagination.appendChild(prev);

    for (let page = 1; page <= totalPages; page += 1) {
      staffPagination.appendChild(createPaginationButton(page, page === state.page));
    }

    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'w-8 h-8 flex items-center justify-center rounded bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high';
    next.innerHTML = '<span class="material-symbols-outlined text-lg">chevron_right</span>';
    next.disabled = state.page === totalPages;
    next.addEventListener('click', function () {
      if (state.page < totalPages) {
        state.page += 1;
        render();
      }
    });
    staffPagination.appendChild(next);
  }

  function openStaffModal(mode, staff) {
    const isView = mode === 'view';
    const title = mode === 'create' ? 'Thêm nhân viên' : mode === 'edit' ? 'Sửa thông tin nhân viên' : 'Chi tiết nhân viên';

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-2xl font-black">${title}</h3>
          <button type="button" data-close class="w-9 h-9 rounded-full hover:bg-stone-100"><span class="material-symbols-outlined">close</span></button>
        </div>
        <form id="staffForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="text-sm font-semibold">Mã NV
            <input name="id" class="mt-1 w-full rounded-lg border-stone-200" value="${staff?.id || ''}" ${mode !== 'create' ? 'readonly' : ''} required />
          </label>
          <label class="text-sm font-semibold">Họ tên
            <input name="name" class="mt-1 w-full rounded-lg border-stone-200" value="${staff?.name || ''}" ${isView ? 'readonly' : ''} required />
          </label>
          <label class="text-sm font-semibold">Chức vụ
            <input name="role" class="mt-1 w-full rounded-lg border-stone-200" value="${staff?.role || ''}" ${isView ? 'readonly' : ''} required />
          </label>
          <label class="text-sm font-semibold">Liên hệ
            <input name="contact" class="mt-1 w-full rounded-lg border-stone-200" value="${staff?.contact || ''}" ${isView ? 'readonly' : ''} required />
          </label>
          <label class="text-sm font-semibold">Ngày vào làm
            <input name="joinDate" placeholder="dd/mm/yyyy" class="mt-1 w-full rounded-lg border-stone-200" value="${staff?.joinDate || ''}" ${isView ? 'readonly' : ''} required />
          </label>
          <label class="text-sm font-semibold">Trạng thái
            <select name="status" class="mt-1 w-full rounded-lg border-stone-200" ${isView ? 'disabled' : ''}>
              <option ${staff?.status === 'Đang làm việc' ? 'selected' : ''}>Đang làm việc</option>
              <option ${staff?.status === 'Nghỉ phép' ? 'selected' : ''}>Nghỉ phép</option>
            </select>
          </label>
          <div class="md:col-span-2 flex justify-end gap-3 mt-2">
            <button type="button" data-close class="px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200">Đóng</button>
            ${isView ? '' : '<button type="submit" class="px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-dim">Lưu</button>'}
          </div>
        </form>
      </div>
    `;

    function close() {
      modal.remove();
    }

    modal.addEventListener('click', function (event) {
      if (event.target === modal || event.target.closest('[data-close]')) close();
    });

    const form = modal.querySelector('#staffForm');
    if (form && !isView) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        const data = new FormData(form);

        const payload = {
          id: String(data.get('id') || '').trim(),
          name: String(data.get('name') || '').trim(),
          role: String(data.get('role') || '').trim(),
          contact: String(data.get('contact') || '').trim(),
          joinDate: String(data.get('joinDate') || '').trim(),
          status: String(data.get('status') || 'Đang làm việc').trim(),
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(String(data.get('name') || 'User'))}&background=random`
        };

        if (!payload.id || !payload.name || !payload.role || !payload.contact || !payload.joinDate) {
          alert('Vui lòng nhập đầy đủ thông tin.');
          return;
        }

        if (mode === 'create') {
          const duplicate = staffMembers.some((item) => item.id.toLowerCase() === payload.id.toLowerCase());
          if (duplicate) {
            alert('Mã nhân viên đã tồn tại.');
            return;
          }
          staffMembers.unshift(payload);
          state.page = 1;
        } else if (mode === 'edit' && staff) {
          const idx = staffMembers.findIndex((item) => item.id === staff.id);
          if (idx >= 0) {
            staffMembers[idx] = { ...staffMembers[idx], ...payload, id: staff.id };
          }
        }

        close();
        render();
      });
    }

    document.body.appendChild(modal);
  }

  function render() {
    const rows = filteredStaff();
    const total = rows.length;
    const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
    if (state.page > totalPages) state.page = totalPages;

    const start = (state.page - 1) * state.pageSize;
    const visibleRows = rows.slice(start, start + state.pageSize);
    tbody.innerHTML = visibleRows.map(rowTemplate).join('');

    const from = total ? start + 1 : 0;
    const to = Math.min(start + state.pageSize, total);
    staffSummary.textContent = total ? `Hiển thị ${from}-${to} trên ${total} nhân viên` : 'Không có nhân viên phù hợp';

    rebuildPagination(totalPages);
    renderStats();
  }

  function handleSearch(value) {
    state.keyword = value.trim().toLowerCase();
    state.page = 1;
    render();
  }

  staffSearchInput?.addEventListener('input', function (event) {
    handleSearch(event.target.value);
    if (globalSearchInput) globalSearchInput.value = event.target.value;
  });

  globalSearchInput?.addEventListener('input', function (event) {
    handleSearch(event.target.value);
    if (staffSearchInput) staffSearchInput.value = event.target.value;
  });

  staffStatusFilter?.addEventListener('change', function (event) {
    state.status = event.target.value;
    state.page = 1;
    render();
  });

  function handleCreate() {
    openStaffModal('create');
  }

  addStaffBtn?.addEventListener('click', handleCreate);
  sidebarAddStaffBtn?.addEventListener('click', handleCreate);

  tbody.addEventListener('click', function (event) {
    const row = event.target.closest('tr');
    if (!row) return;

    const id = row.dataset.id;
    const staff = staffMembers.find((item) => item.id === id);
    if (!staff) return;

    if (event.target.closest('[data-read]')) {
      openStaffModal('view', staff);
      return;
    }

    const actionBtn = event.target.closest('button[data-action]');
    if (!actionBtn) return;

    if (actionBtn.dataset.action === 'edit') {
      openStaffModal('edit', staff);
      return;
    }

    if (actionBtn.dataset.action === 'delete') {
      const confirmed = confirm(`Bạn có chắc muốn xóa nhân viên ${staff.id}?`);
      if (!confirmed) return;

      const idx = staffMembers.findIndex((item) => item.id === staff.id);
      if (idx >= 0) {
        staffMembers.splice(idx, 1);
        render();
      }
    }
  });

  logoutLink?.addEventListener('click', async function (event) {
    event.preventDefault();
    const confirmed = await Aurora.showConfirm(
      "Đăng xuất",
      "Bạn muốn đăng xuất khỏi trang quản trị?",
      "Đăng xuất",
      "Hủy"
    );
    if (confirmed) {
      window.location.href = './trangdangnhap.html';
    }
  });

  render();
});
