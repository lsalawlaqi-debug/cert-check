function handleCert(data) {
  const container = document.getElementById("result");

  if (data.error) {
    container.innerHTML = `<div class="error">لا يوجد شهادة بهذا الرمز</div>`;
    return;
  }

  // قاموس ترجمة الأعمدة
  const labels = {
    certificate_id: "رقم الشهادة",
    status: "الحالة",
    arabic_name: "اسم المتدرب",
    program: "البرنامج التدريبي",
    hours: "مجموع الساعات التدريبية",
    date_from: "تاريخ بداية البرنامج",
    date_to: "تاريخ نهاية البرنامج",
    issue_date: "تاريخ اصدار الشهادة",
    issuer: "الجهة المصدّرة"
  };

  // دالة لتنسيق التاريخ (YYYY-MM-DD فقط)
  function formatDate(str) {
    if (!str) return "";
    const d = new Date(str);
    if (isNaN(d)) return str;
    return d.toISOString().split("T")[0];
  }

  let rows = "";
  for (const key in data) {
    let value = data[key];

    // تنسيق للتواريخ
    if (["date_from", "date_to", "issue_date"].includes(key)) {
      value = formatDate(value);
    }

    // إذا المفتاح موجود في القاموس نعرض اسمه بالعربي
    const label = labels[key] || key;
    rows += `<tr><th>${label}</th><td>${value}</td></tr>`;
  }

  container.innerHTML = `
   
    <table border="1" style="border-collapse: collapse; width: 100%; text-align: right;">
      ${rows}
    </table>
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
    `https://script.google.com/macros/s/AKfycbykKD1MO4VWywUHm0EQ8FIATXZNEfPPyxTk1LETVV8xKPj4RIiONrHhEcuA3PdA3E7eCw/exec/exec?token=${token}&callback=handleCert`;

  let s = document.createElement("script");
  s.src = url;
  document.body.appendChild(s);
}
