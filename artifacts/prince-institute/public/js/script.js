/* =====================================================
   Prince Institute Of Computer Science
   Main JavaScript - all behavior in one file
   NOTE: All "data" is local-only (localStorage). For a real
   backend, replace the helper calls with fetch() to your API.
   ===================================================== */

// -------- Default Demo Data --------
const DEFAULT_DATA = {
  announcement: {
    text: 'Admissions Open for New Batch — Limited Seats. Call 9999999999',
    visible: true,
  },
  hero: {
    title: 'Build Your Career In <span>Computers</span>',
    subtitle:
      'Prince Institute Of Computer Science offers practical, job-ready computer training in CCC, ADCA, DCA, Excel, Tally Prime and Web Designing. Trusted, affordable and student-first.',
  },
  about: {
    text:
      'Prince Institute Of Computer Science is a leading computer training institute in Gorakhpur. We are dedicated to delivering quality computer education through expert trainers, modern labs and practical project work — helping students build real skills for real careers.',
  },
  contact: {
    address: 'Opp. Allahabad Bank, Shivpuri, New Colony, Gorakhpur, U.P.',
    phone: '+91 99999 99999',
    whatsapp: '919999999999',
    email: 'info@princeinstitute.in',
    hours: 'Mon – Sat, 9:00 AM – 7:00 PM',
  },
  payment: {
    upi: 'princeinstitute@upi',
    bankName: 'State Bank Of India',
    accountName: 'Prince Institute Of Computer Science',
    accountNo: 'XXXX XXXX XXXX 1234',
    ifsc: 'SBIN0001234',
  },
  courses: [
    { id: 1, title: 'CCC', level: 'Beginner', duration: '3 Months', mode: 'Online + Offline', fee: '₹ 2,500', desc: 'Course on Computer Concepts (CCC) by NIELIT — fundamentals, MS Office, internet, email.', img: 'images/classroom1.png' },
    { id: 2, title: 'ADCA', level: 'Advanced', duration: '12 Months', mode: 'Online + Offline', fee: '₹ 12,000', desc: 'Advanced Diploma in Computer Applications. Full stack of office, accounting, web & graphics.', img: 'images/lab1.png' },
    { id: 3, title: 'DCA', level: 'Diploma', duration: '6 Months', mode: 'Online + Offline', fee: '₹ 6,500', desc: 'Diploma in Computer Applications — office productivity, internet, basics of programming.', img: 'images/classroom2.png' },
    { id: 4, title: 'Advanced Excel', level: 'Skill', duration: '2 Months', mode: 'Online + Offline', fee: '₹ 3,500', desc: 'Master formulas, pivot tables, charts, dashboards and data analysis in MS Excel.', img: 'images/students1.png' },
    { id: 5, title: 'Tally Prime', level: 'Professional', duration: '3 Months', mode: 'Online + Offline', fee: '₹ 4,500', desc: 'Complete Tally Prime course with GST, billing, inventory and accounting practical.', img: 'images/event1.png' },
    { id: 6, title: 'Web Designing', level: 'Skill', duration: '4 Months', mode: 'Online + Offline', fee: '₹ 7,500', desc: 'HTML, CSS, JavaScript and responsive design — build real websites from scratch.', img: 'images/building.png' },
  ],
  testimonials: [
    { name: 'Aman Yadav', role: 'ADCA Student', text: 'Best computer institute in Gorakhpur. Trainers explain very clearly and lab is excellent.', rating: 5 },
    { name: 'Priya Singh', role: 'Tally Student', text: 'I learned Tally Prime with full practical here. Very supportive faculty and friendly staff.', rating: 5 },
    { name: 'Rohit Kumar', role: 'Web Designing', text: 'After this course I built my own website and started freelancing. Highly recommended!', rating: 5 },
  ],
  gallery: [
    { title: 'Computer Lab', category: 'Lab', img: 'images/lab1.png' },
    { title: 'Classroom', category: 'Classroom', img: 'images/classroom1.png' },
    { title: 'Group Class', category: 'Classroom', img: 'images/classroom2.png' },
    { title: 'Students', category: 'Students', img: 'images/students1.png' },
    { title: 'Faculty', category: 'Faculty', img: 'images/faculty1.png' },
    { title: 'Faculty', category: 'Faculty', img: 'images/faculty2.png' },
    { title: 'Institute Building', category: 'Building', img: 'images/building.png' },
    { title: 'Certificate Day', category: 'Events', img: 'images/event1.png' },
    { title: 'Certificates', category: 'Certificates', img: 'images/cert1.png' },
  ],
  theme: 'light',
};

// -------- Storage helpers --------
function loadData() {
  try {
    const raw = localStorage.getItem('pics-data');
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
    const stored = JSON.parse(raw);
    return Object.assign(JSON.parse(JSON.stringify(DEFAULT_DATA)), stored);
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}
function saveData(d) {
  localStorage.setItem('pics-data', JSON.stringify(d));
}

let DATA = loadData();

// -------- Theme --------
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀' : '☾';
  DATA.theme = theme;
  saveData(DATA);
}
function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(cur === 'dark' ? 'light' : 'dark');
}

// -------- Mobile menu --------
function setupMenu() {
  const t = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (!t || !nav) return;
  t.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// -------- Announcement --------
function setupAnnouncement() {
  const bar = document.getElementById('announcement');
  if (!bar) return;
  if (!DATA.announcement.visible) { bar.style.display = 'none'; return; }
  bar.querySelector('.ann-text').textContent = DATA.announcement.text;
  bar.querySelector('.close-ann').addEventListener('click', () => {
    bar.style.display = 'none';
  });
}

// -------- Hero text --------
function fillHero() {
  const t = document.getElementById('heroTitle');
  const s = document.getElementById('heroSubtitle');
  if (t) t.innerHTML = DATA.hero.title;
  if (s) s.textContent = DATA.hero.subtitle;
  const ab = document.getElementById('aboutText');
  if (ab) ab.textContent = DATA.about.text;
}

// -------- Courses --------
function renderCourses(target, limit) {
  const grid = document.getElementById(target);
  if (!grid) return;
  const list = limit ? DATA.courses.slice(0, limit) : DATA.courses;
  grid.innerHTML = list.map(c => `
    <article class="course-card reveal">
      <div class="img" style="background-image:url('${c.img}')">
        <span class="level">${c.level}</span>
      </div>
      <div class="body">
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <div class="meta">
          <span>${c.duration}</span>
          <span>${c.mode}</span>
        </div>
        <div class="price">${c.fee}</div>
        <div class="actions">
          <a href="contact.html?course=${encodeURIComponent(c.title)}" class="btn btn-primary btn-block">Enroll Now</a>
        </div>
      </div>
    </article>
  `).join('');
}

// Course filter (courses page)
function setupCourseFilter() {
  const search = document.getElementById('courseSearch');
  const filterChips = document.querySelectorAll('[data-course-filter]');
  if (!search && !filterChips.length) return;
  function apply() {
    const q = (search?.value || '').toLowerCase();
    const active = document.querySelector('[data-course-filter].active')?.dataset.courseFilter || 'all';
    document.querySelectorAll('#allCourses .course-card').forEach((card, i) => {
      const c = DATA.courses[i];
      const match = (active === 'all' || c.level === active) && c.title.toLowerCase().includes(q);
      card.style.display = match ? '' : 'none';
    });
  }
  search?.addEventListener('input', apply);
  filterChips.forEach(ch => ch.addEventListener('click', () => {
    filterChips.forEach(c => c.classList.remove('active'));
    ch.classList.add('active');
    apply();
  }));
}

// -------- Testimonials --------
function renderTestimonials() {
  const grid = document.getElementById('testimonials');
  if (!grid) return;
  grid.innerHTML = DATA.testimonials.map(t => `
    <div class="testimonial reveal">
      <div class="stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
      <p>"${t.text}"</p>
      <div class="who">
        <div class="avatar">${t.name.charAt(0)}</div>
        <div class="who-meta"><strong>${t.name}</strong><small>${t.role}</small></div>
      </div>
    </div>
  `).join('');
}

// -------- Gallery --------
function renderGallery(target) {
  const grid = document.getElementById(target);
  if (!grid) return;
  grid.innerHTML = DATA.gallery.map(g => `
    <div class="item reveal" data-cat="${g.category}" data-img="${g.img}">
      <img src="${g.img}" alt="${g.title}" loading="lazy">
      <span class="label">${g.title}</span>
    </div>
  `).join('');
  grid.querySelectorAll('.item').forEach(it => {
    it.addEventListener('click', () => openLightbox(it.dataset.img));
  });
}
function setupGalleryFilters() {
  const chips = document.querySelectorAll('[data-gallery-filter]');
  if (!chips.length) return;
  chips.forEach(ch => ch.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    ch.classList.add('active');
    const cat = ch.dataset.galleryFilter;
    document.querySelectorAll('#galleryFull .item').forEach(it => {
      it.style.display = (cat === 'all' || it.dataset.cat === cat) ? '' : 'none';
    });
  }));
}

// -------- Lightbox --------
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.querySelector('img').src = src;
  lb.classList.add('open');
}
function setupLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.addEventListener('click', (e) => {
    if (e.target === lb || e.target.classList.contains('close-lb')) lb.classList.remove('open');
  });
}

// -------- Forms --------
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
function setupInquiryForm() {
  const form = document.getElementById('inquiryForm');
  if (!form) return;
  // Pre-fill course from URL
  const params = new URLSearchParams(location.search);
  const courseSel = form.querySelector('[name="course"]');
  if (courseSel && params.get('course')) courseSel.value = params.get('course');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    let valid = true;
    form.querySelectorAll('small.error').forEach(s => s.textContent = '');
    if (name.length < 2) { form.querySelector('[data-err="name"]').textContent = 'Please enter your name'; valid = false; }
    if (!/^[6-9][0-9]{9}$/.test(phone.replace(/\D/g, '').slice(-10))) { form.querySelector('[data-err="phone"]').textContent = 'Enter a valid 10-digit phone'; valid = false; }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { form.querySelector('[data-err="email"]').textContent = 'Enter a valid email'; valid = false; }
    if (!valid) return;
    // Save inquiry locally for the admin panel
    const inquiries = JSON.parse(localStorage.getItem('pics-inquiries') || '[]');
    inquiries.unshift({ name, phone, email, course: form.course.value, message: form.message.value, at: new Date().toISOString() });
    localStorage.setItem('pics-inquiries', JSON.stringify(inquiries));
    document.getElementById('inquirySuccess')?.classList.add('show');
    form.reset();
    showToast('Thank you! We will contact you shortly.');
  });
}
function setupPaymentForm() {
  const form = document.getElementById('paymentForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const payments = JSON.parse(localStorage.getItem('pics-payments') || '[]');
    payments.unshift({
      name: form.name.value, course: form.course.value,
      method: form.method.value, txn: form.txn.value,
      at: new Date().toISOString(),
    });
    localStorage.setItem('pics-payments', JSON.stringify(payments));
    showToast('Payment details submitted. We will verify and confirm.');
    form.reset();
  });
}

// -------- FAQ --------
function setupFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q')?.addEventListener('click', () => item.classList.toggle('open'));
  });
}

// -------- Floating buttons --------
function setupFloating() {
  const top = document.getElementById('backTop');
  if (!top) return;
  window.addEventListener('scroll', () => {
    top.classList.toggle('show', window.scrollY > 400);
  });
  top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// -------- Reveal on scroll --------
function setupReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// -------- Offline support --------
function setupOffline() {
  const banner = document.getElementById('offlineBanner');
  function update() {
    if (!banner) return;
    banner.classList.toggle('show', !navigator.onLine);
    banner.textContent = navigator.onLine ? '' : '⚠ You are offline. Some features may be limited.';
  }
  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  update();
  // Optional service worker registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch(() => {/* offline fallback only */});
  }
}

// -------- Highlight active nav --------
function setupActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const target = a.getAttribute('href');
    if (target === path) a.classList.add('active');
  });
}

// -------- ADMIN PANEL --------
// !!! NOT SECURE — front-end only demo. For real production, build a backend with proper auth. !!!
const ADMIN_USER = 'Hello';
const ADMIN_PASS = 'Sirji';

function adminInit() {
  if (!document.querySelector('.admin-shell')) return;
  const shell = document.querySelector('.admin-shell');
  const login = document.getElementById('loginForm');
  const dash = document.getElementById('adminDash');

  function checkSession() {
    if (sessionStorage.getItem('pics-admin') === '1') {
      shell.classList.add('logged');
      dash.classList.add('show');
      login.style.display = 'none';
      renderDashboard();
    }
  }
  checkSession();

  login?.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = login.username.value.trim();
    const p = login.password.value;
    const err = login.querySelector('.login-error');
    if (u === ADMIN_USER && p === ADMIN_PASS) {
      sessionStorage.setItem('pics-admin', '1');
      err.textContent = '';
      checkSession();
    } else {
      err.textContent = 'Invalid credentials';
    }
  });

  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    sessionStorage.removeItem('pics-admin');
    location.reload();
  });

  document.querySelectorAll('.dash-side li').forEach(li => {
    li.addEventListener('click', () => {
      document.querySelectorAll('.dash-side li').forEach(x => x.classList.remove('active'));
      document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));
      li.classList.add('active');
      document.getElementById(li.dataset.section)?.classList.add('active');
    });
  });

  document.getElementById('resetData')?.addEventListener('click', () => {
    if (confirm('Reset all demo data to defaults?')) {
      localStorage.removeItem('pics-data');
      localStorage.removeItem('pics-inquiries');
      localStorage.removeItem('pics-payments');
      DATA = loadData();
      renderDashboard();
      showToast('Data reset to defaults.');
    }
  });

  // Save handlers
  document.getElementById('saveAnnouncement')?.addEventListener('click', () => {
    DATA.announcement.text = document.getElementById('annText').value;
    DATA.announcement.visible = document.getElementById('annVisible').checked;
    saveData(DATA); showToast('Announcement saved.');
  });
  document.getElementById('saveContent')?.addEventListener('click', () => {
    DATA.hero.title = document.getElementById('heroT').value;
    DATA.hero.subtitle = document.getElementById('heroS').value;
    DATA.about.text = document.getElementById('aboutT').value;
    saveData(DATA); showToast('Homepage content saved.');
  });
  document.getElementById('saveContact')?.addEventListener('click', () => {
    DATA.contact.address = document.getElementById('cAddr').value;
    DATA.contact.phone = document.getElementById('cPhone').value;
    DATA.contact.whatsapp = document.getElementById('cWa').value;
    DATA.contact.email = document.getElementById('cEmail').value;
    DATA.contact.hours = document.getElementById('cHours').value;
    saveData(DATA); showToast('Contact info saved.');
  });
  document.getElementById('savePayment')?.addEventListener('click', () => {
    DATA.payment.upi = document.getElementById('pUpi').value;
    DATA.payment.bankName = document.getElementById('pBank').value;
    DATA.payment.accountName = document.getElementById('pAcName').value;
    DATA.payment.accountNo = document.getElementById('pAcNo').value;
    DATA.payment.ifsc = document.getElementById('pIfsc').value;
    saveData(DATA); showToast('Payment info saved.');
  });

  // Course CRUD
  document.getElementById('addCourse')?.addEventListener('click', () => {
    const id = Date.now();
    DATA.courses.push({ id, title: 'New Course', level: 'Beginner', duration: '1 Month', mode: 'Online', fee: '₹ 0', desc: 'Course description', img: 'images/classroom1.png' });
    saveData(DATA); renderDashboard();
  });
  // Testimonials
  document.getElementById('addTestimonial')?.addEventListener('click', () => {
    DATA.testimonials.push({ name: 'New Student', role: 'Course', text: 'Great experience.', rating: 5 });
    saveData(DATA); renderDashboard();
  });
  // Gallery
  document.getElementById('addImage')?.addEventListener('click', () => {
    DATA.gallery.push({ title: 'New Image', category: 'Classroom', img: 'images/classroom1.png' });
    saveData(DATA); renderDashboard();
  });
}

function renderDashboard() {
  // Stats
  const inquiries = JSON.parse(localStorage.getItem('pics-inquiries') || '[]');
  const payments = JSON.parse(localStorage.getItem('pics-payments') || '[]');
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('statCourses', DATA.courses.length);
  set('statGallery', DATA.gallery.length);
  set('statInq', inquiries.length);
  set('statPay', payments.length);

  // Form values
  const v = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  v('annText', DATA.announcement.text);
  const annVis = document.getElementById('annVisible');
  if (annVis) annVis.checked = !!DATA.announcement.visible;
  v('heroT', DATA.hero.title);
  v('heroS', DATA.hero.subtitle);
  v('aboutT', DATA.about.text);
  v('cAddr', DATA.contact.address);
  v('cPhone', DATA.contact.phone);
  v('cWa', DATA.contact.whatsapp);
  v('cEmail', DATA.contact.email);
  v('cHours', DATA.contact.hours);
  v('pUpi', DATA.payment.upi);
  v('pBank', DATA.payment.bankName);
  v('pAcName', DATA.payment.accountName);
  v('pAcNo', DATA.payment.accountNo);
  v('pIfsc', DATA.payment.ifsc);

  // Courses table
  const cTable = document.getElementById('coursesTable');
  if (cTable) {
    cTable.innerHTML = DATA.courses.map((c, i) => `
      <tr>
        <td><input data-c="${i}" data-f="title" value="${c.title}"></td>
        <td><input data-c="${i}" data-f="level" value="${c.level}"></td>
        <td><input data-c="${i}" data-f="duration" value="${c.duration}"></td>
        <td><input data-c="${i}" data-f="fee" value="${c.fee}"></td>
        <td><input data-c="${i}" data-f="img" value="${c.img}"></td>
        <td><button data-del-c="${i}">Delete</button></td>
      </tr>`).join('');
    cTable.querySelectorAll('input').forEach(inp => inp.addEventListener('change', () => {
      DATA.courses[+inp.dataset.c][inp.dataset.f] = inp.value;
      saveData(DATA);
    }));
    cTable.querySelectorAll('[data-del-c]').forEach(btn => btn.addEventListener('click', () => {
      DATA.courses.splice(+btn.dataset.delC, 1); saveData(DATA); renderDashboard();
    }));
  }

  // Testimonials table
  const tTable = document.getElementById('testimonialsTable');
  if (tTable) {
    tTable.innerHTML = DATA.testimonials.map((t, i) => `
      <tr>
        <td><input data-t="${i}" data-f="name" value="${t.name}"></td>
        <td><input data-t="${i}" data-f="role" value="${t.role}"></td>
        <td><input data-t="${i}" data-f="text" value="${t.text}"></td>
        <td><input data-t="${i}" data-f="rating" type="number" min="1" max="5" value="${t.rating}"></td>
        <td><button data-del-t="${i}">Delete</button></td>
      </tr>`).join('');
    tTable.querySelectorAll('input').forEach(inp => inp.addEventListener('change', () => {
      const f = inp.dataset.f;
      DATA.testimonials[+inp.dataset.t][f] = f === 'rating' ? Number(inp.value) : inp.value;
      saveData(DATA);
    }));
    tTable.querySelectorAll('[data-del-t]').forEach(btn => btn.addEventListener('click', () => {
      DATA.testimonials.splice(+btn.dataset.delT, 1); saveData(DATA); renderDashboard();
    }));
  }

  // Gallery table
  const gTable = document.getElementById('galleryTable');
  if (gTable) {
    gTable.innerHTML = DATA.gallery.map((g, i) => `
      <tr>
        <td><input data-g="${i}" data-f="title" value="${g.title}"></td>
        <td>
          <select data-g="${i}" data-f="category">
            ${['Classroom','Lab','Students','Faculty','Events','Certificates','Building'].map(c =>
              `<option ${c===g.category?'selected':''}>${c}</option>`).join('')}
          </select>
        </td>
        <td><input data-g="${i}" data-f="img" value="${g.img}"></td>
        <td><button data-del-g="${i}">Delete</button></td>
      </tr>`).join('');
    gTable.querySelectorAll('input,select').forEach(inp => inp.addEventListener('change', () => {
      DATA.gallery[+inp.dataset.g][inp.dataset.f] = inp.value;
      saveData(DATA);
    }));
    gTable.querySelectorAll('[data-del-g]').forEach(btn => btn.addEventListener('click', () => {
      DATA.gallery.splice(+btn.dataset.delG, 1); saveData(DATA); renderDashboard();
    }));
  }

  // Inquiries
  const iTable = document.getElementById('inquiriesTable');
  if (iTable) {
    iTable.innerHTML = inquiries.length
      ? inquiries.map(i => `<tr><td>${new Date(i.at).toLocaleString()}</td><td>${i.name}</td><td>${i.phone}</td><td>${i.email||'-'}</td><td>${i.course}</td><td>${i.message||'-'}</td></tr>`).join('')
      : '<tr><td colspan="6" style="text-align:center;color:var(--text-muted)">No inquiries yet.</td></tr>';
  }
  // Payments
  const pTable = document.getElementById('paymentsTable');
  if (pTable) {
    pTable.innerHTML = payments.length
      ? payments.map(i => `<tr><td>${new Date(i.at).toLocaleString()}</td><td>${i.name}</td><td>${i.course}</td><td>${i.method}</td><td>${i.txn}</td></tr>`).join('')
      : '<tr><td colspan="5" style="text-align:center;color:var(--text-muted)">No payments yet.</td></tr>';
  }
}

// -------- Page-specific contact info fill --------
function fillContactInfo() {
  const m = {
    'cInfoAddr': DATA.contact.address,
    'cInfoPhone': DATA.contact.phone,
    'cInfoEmail': DATA.contact.email,
    'cInfoHours': DATA.contact.hours,
    'pInfoUpi': DATA.payment.upi,
    'pInfoBank': DATA.payment.bankName,
    'pInfoAcName': DATA.payment.accountName,
    'pInfoAcNo': DATA.payment.accountNo,
    'pInfoIfsc': DATA.payment.ifsc,
  };
  Object.keys(m).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = m[id];
  });
  document.querySelectorAll('[data-wa-link]').forEach(a => {
    a.href = `https://wa.me/${DATA.contact.whatsapp}?text=${encodeURIComponent('Hi, I want to know about courses at Prince Institute.')}`;
  });
  document.querySelectorAll('[data-tel-link]').forEach(a => {
    a.href = `tel:${DATA.contact.phone.replace(/\s/g,'')}`;
  });
}

// -------- Init --------
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(DATA.theme || 'light');
  document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
  setupMenu();
  setupAnnouncement();
  fillHero();
  renderCourses('featuredCourses', 6);
  renderCourses('allCourses');
  renderTestimonials();
  renderGallery('galleryPreview');
  renderGallery('galleryFull');
  setupGalleryFilters();
  setupCourseFilter();
  setupLightbox();
  setupInquiryForm();
  setupPaymentForm();
  setupFAQ();
  setupFloating();
  setupActiveNav();
  fillContactInfo();
  setupReveal();
  adminInit();
  setupOffline();
});
