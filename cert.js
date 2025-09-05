function handleCert(data) {
  const container = document.getElementById("result");

  if (data.error) {
    container.innerHTML = `<pre>❌ ${data.error}</pre>`;
    return;
  }

  // عرض البيانات بصيغة JSON منسقة
  let output = "";
  for (const key in data) {
    output += `${key}\t"${data[key]}"\n`;
  }
  container.innerHTML = `<pre>${output}</pre>`;
}

// قراءة التوكن من رابط الصفحة
const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (!token) {
  document.getElementById("result").innerHTML =
    `<pre>❌ لم يتم العثور على التوكن في الرابط</pre>`;
} else {
  // رابط Google Script API (استبدلي بالخاص بك)
  const url =
    `https://script.google.com/macros/s/AKfycbyR3kY-Fzf6Fba2GzcqQmTUoOMDpp7yGP4f3np2FrYUzMyzALzTzHo-XPbbehIVs9WUCA/exec?token=${token}&callback=handleCert`;

  let s = document.createElement("script");
  s.src = url;
  document.body.appendChild(s);
}
