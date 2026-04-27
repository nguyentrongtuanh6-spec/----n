document.addEventListener('DOMContentLoaded', function () {
  const table = document.getElementById('postsTable');
  if (!table) return;

  const tbody = table.querySelector('tbody');
  const postSearchInput = document.getElementById('postSearchInput');
  const globalSearchInput = document.getElementById('globalSearchInput');
  const postStatusFilter = document.getElementById('postStatusFilter');
  const addPostBtn = document.getElementById('addPostBtn');
  const addPostSidebarBtn = document.getElementById('addPostSidebarBtn');
  const logoutLink = document.getElementById('logoutLink');
  const postsSummary = document.getElementById('postsSummary');
  const postsPagination = document.getElementById('postsPagination');

  const state = {
    keyword: '',
    status: 'Tất cả trạng thái',
    page: 1,
    pageSize: 8
  };

  function parseInitialPosts() {
    return Array.from(tbody.querySelectorAll('tr')).map((row) => {
      const id = row.dataset.id || '';
      const title = (row.querySelector('[data-read]')?.textContent || '').trim();
      const excerpt = (row.querySelector('td:nth-child(1) p')?.textContent || '').trim();
      const category = (row.querySelector('td:nth-child(2)')?.textContent || '').trim();
      const publishDate = (row.querySelector('td:nth-child(3)')?.textContent || '').trim();
      const views = Number((row.querySelector('td:nth-child(4)')?.textContent || '0').replace(/[^\d]/g, ''));
      const status = (row.querySelector('td:nth-child(5) span')?.textContent || '').trim();
      return { id, title, excerpt, category, publishDate, views, status };
    });
  }

  const posts = parseInitialPosts();

  function statusClass(status) {
    if (status === 'Đã xuất bản') return 'bg-emerald-100 text-emerald-700';
    if (status === 'Bản nháp') return 'bg-amber-100 text-amber-700';
    return 'bg-stone-200 text-stone-600';
  }

  function formatViews(value) {
    return Number(value || 0).toLocaleString('vi-VN');
  }

  function rowTemplate(post) {
    return `
      <tr data-id="${post.id}">
        <td class="px-6 py-4">
          <button data-read class="font-semibold text-left hover:underline">${post.title}</button>
          <p class="text-[11px] text-on-surface-variant mt-1">${post.excerpt}</p>
        </td>
        <td class="px-6 py-4">${post.category}</td>
        <td class="px-6 py-4">${post.publishDate}</td>
        <td class="px-6 py-4 text-right font-bold">${formatViews(post.views)}</td>
        <td class="px-6 py-4 text-center"><span class="px-3 py-1 rounded-full ${statusClass(post.status)} text-[10px] font-bold uppercase">${post.status}</span></td>
        <td class="px-6 py-4 text-right space-x-1">
          <button data-action="edit" class="p-1.5 hover:bg-surface-container-low rounded-lg text-stone-400 hover:text-primary"><span class="material-symbols-outlined text-lg">edit</span></button>
          <button data-action="delete" class="p-1.5 hover:bg-error-container/20 rounded-lg text-stone-400 hover:text-error"><span class="material-symbols-outlined text-lg">delete</span></button>
        </td>
      </tr>
    `;
  }

  function filteredPosts() {
    return posts.filter((post) => {
      const keywordPool = `${post.id} ${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
      const keywordOk = !state.keyword || keywordPool.includes(state.keyword);
      const statusOk = state.status === 'Tất cả trạng thái' || post.status === state.status;
      return keywordOk && statusOk;
    });
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
    postsPagination.innerHTML = '';

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
    postsPagination.appendChild(prev);

    for (let page = 1; page <= totalPages; page += 1) {
      postsPagination.appendChild(createPaginationButton(page, page === state.page));
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
    postsPagination.appendChild(next);
  }

  function openPostModal(mode, post) {
    const isView = mode === 'view';
    const title = mode === 'create' ? 'Thêm bài viết' : mode === 'edit' ? 'Sửa bài viết' : 'Chi tiết bài viết';

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-2xl font-black">${title}</h3>
          <button type="button" data-close class="w-9 h-9 rounded-full hover:bg-stone-100"><span class="material-symbols-outlined">close</span></button>
        </div>
        <form id="postForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="text-sm font-semibold">Mã bài viết
            <input name="id" class="mt-1 w-full rounded-lg border-stone-200" value="${post?.id || ''}" ${mode !== 'create' ? 'readonly' : ''} required />
          </label>
          <label class="text-sm font-semibold">Danh mục
            <input name="category" class="mt-1 w-full rounded-lg border-stone-200" value="${post?.category || ''}" ${isView ? 'readonly' : ''} required />
          </label>
          <label class="text-sm font-semibold md:col-span-2">Tiêu đề
            <input name="title" class="mt-1 w-full rounded-lg border-stone-200" value="${post?.title || ''}" ${isView ? 'readonly' : ''} required />
          </label>
          <label class="text-sm font-semibold md:col-span-2">Mô tả ngắn
            <textarea name="excerpt" class="mt-1 w-full rounded-lg border-stone-200" rows="3" ${isView ? 'readonly' : ''} required>${post?.excerpt || ''}</textarea>
          </label>
          <label class="text-sm font-semibold">Ngày đăng
            <input name="publishDate" placeholder="dd/mm/yyyy" class="mt-1 w-full rounded-lg border-stone-200" value="${post?.publishDate || ''}" ${isView ? 'readonly' : ''} required />
          </label>
          <label class="text-sm font-semibold">Lượt xem
            <input name="views" type="number" min="0" class="mt-1 w-full rounded-lg border-stone-200" value="${post?.views || 0}" ${isView ? 'readonly' : ''} required />
          </label>
          <label class="text-sm font-semibold md:col-span-2">Trạng thái
            <select name="status" class="mt-1 w-full rounded-lg border-stone-200" ${isView ? 'disabled' : ''}>
              <option ${post?.status === 'Đã xuất bản' ? 'selected' : ''}>Đã xuất bản</option>
              <option ${post?.status === 'Bản nháp' ? 'selected' : ''}>Bản nháp</option>
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
      if (event.target === modal || event.target.closest('[data-close]')) {
        close();
      }
    });

    const form = modal.querySelector('#postForm');
    if (form && !isView) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        const data = new FormData(form);

        const payload = {
          id: String(data.get('id') || '').trim(),
          title: String(data.get('title') || '').trim(),
          excerpt: String(data.get('excerpt') || '').trim(),
          category: String(data.get('category') || '').trim(),
          publishDate: String(data.get('publishDate') || '').trim(),
          views: Number(data.get('views') || 0),
          status: String(data.get('status') || 'Bản nháp').trim()
        };

        if (!payload.id || !payload.title || !payload.category || !payload.publishDate) {
          alert('Vui lòng nhập đầy đủ thông tin.');
          return;
        }

        if (mode === 'create') {
          const duplicate = posts.some((item) => item.id.toLowerCase() === payload.id.toLowerCase());
          if (duplicate) {
            alert('Mã bài viết đã tồn tại.');
            return;
          }
          posts.unshift(payload);
          state.page = 1;
        } else if (mode === 'edit' && post) {
          const idx = posts.findIndex((item) => item.id === post.id);
          if (idx >= 0) {
            posts[idx] = { ...posts[idx], ...payload, id: post.id };
          }
        }

        close();
        render();
      });
    }

    document.body.appendChild(modal);
  }

  function render() {
    const rows = filteredPosts();
    const total = rows.length;
    const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
    if (state.page > totalPages) state.page = totalPages;

    const start = (state.page - 1) * state.pageSize;
    const visibleRows = rows.slice(start, start + state.pageSize);
    tbody.innerHTML = visibleRows.map(rowTemplate).join('');

    const from = total ? start + 1 : 0;
    const to = Math.min(start + state.pageSize, total);
    postsSummary.textContent = total ? `Hiển thị ${from}-${to} trên ${total} bài viết` : 'Không có bài viết phù hợp';

    rebuildPagination(totalPages);
  }

  postSearchInput?.addEventListener('input', function (event) {
    state.keyword = event.target.value.trim().toLowerCase();
    state.page = 1;
    render();
  });

  globalSearchInput?.addEventListener('input', function (event) {
    state.keyword = event.target.value.trim().toLowerCase();
    state.page = 1;
    if (postSearchInput) postSearchInput.value = event.target.value;
    render();
  });

  postStatusFilter?.addEventListener('change', function (event) {
    state.status = event.target.value;
    state.page = 1;
    render();
  });

  function handleCreate() {
    openPostModal('create');
  }

  addPostBtn?.addEventListener('click', handleCreate);
  addPostSidebarBtn?.addEventListener('click', handleCreate);

  tbody.addEventListener('click', function (event) {
    const row = event.target.closest('tr');
    if (!row) return;

    const id = row.dataset.id;
    const post = posts.find((item) => item.id === id);
    if (!post) return;

    if (event.target.closest('[data-read]')) {
      openPostModal('view', post);
      return;
    }

    const actionBtn = event.target.closest('button[data-action]');
    if (!actionBtn) return;

    if (actionBtn.dataset.action === 'edit') {
      openPostModal('edit', post);
      return;
    }

    if (actionBtn.dataset.action === 'delete') {
      const confirmed = confirm(`Bạn có chắc muốn xóa bài viết ${post.id}?`);
      if (!confirmed) return;

      const idx = posts.findIndex((item) => item.id === post.id);
      if (idx >= 0) {
        posts.splice(idx, 1);
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
