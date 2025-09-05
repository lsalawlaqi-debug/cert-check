function handleCert(data) {
  const container = document.getElementById("result");

  if (data.error) {
    container.innerHTML = `<div class="error">${data.error}</div>`;
    return;
  }

  // دالة لتنسيق التاريخ
  function formatDate(str) {
    if (!str) return "";
    const d = new Date(str);
    if (isNaN(d)) return str;
    return d.toISOString().split("T")[0]; // YYYY-MM-DD
  }

  container.innerHTML = `
    <div class="card">
      <h2>التحقق من الشهادة</h2>
      <div><span class="label">رقم الشهادة:</span> ${data.certificate_id}</div>
      <div><span class="label">الحالة:</span> <span class="status">${data.status}</span></div>
      <div><span class="label">الاسم:</span> ${data.arabic_name}</div>
      <div><span class="label">رقم الهوية:</span> ${data.ID}</div>
      <div><span class="label">البرنامج:</span> ${data.program}</div>
      <div><span class="label">الساعات:</span> ${data.hours}</div>
      <div><span class="label">الفترة:</span> ${formatDate(data.date_from)} — ${formatDate(data.date_to)}</div>
      <div><span class="label">تاريخ الإصدار:</span> ${formatDate(data.issue_date)}</div>
      <div><span class="label">الجهة المصدّرة:</span> ${data.issuer}</div>
    </div>
  `;
}

// قراءة التوكن من الرابط
const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (!token) {
  document.getElementById("result").innerHTML =
    `<div class="error">لم يتم العثور على التوكن في الرابط</div>`;
} else {
  const url =
    `https://script.google.com/macros/s/AKfycbz9cbK-fxe7RyKi1U7wnHySSuWctlrUiAoZ2LaLe1dbnVZH9X8IjdYiElhoTWPhUASc/exec?token=${token}&callback=handleCert`;

  let s = document.createElement("script");
  s.src = url;
  document.body.appendChild(s);
}
