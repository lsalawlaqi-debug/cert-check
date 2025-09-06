function handleCert(data) {
  const container = document.getElementById("result");

  if (data.error) {
    container.innerHTML = `<div class="error">${data.error}</div>`;
    return;
  }

  let rows = "";
  for (const key in data) {
    rows += `<tr><th>${key}</th><td>${data[key]}</td></tr>`;
  }

  container.innerHTML = `
    <table>
      ${rows}
    </table>
  `;
}

// قراءة التوكن من الرابط
const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (!token) {
  document.getElementById("result").innerHTML =
    `<div class="error">لم يتم العثور على الرمز في الرابط</div>`;
} else {
  const url =
    `https://script.google.com/macros/s/AKfycbyNxNV1WaqX7iLq86XfvWDtNEUYf4S82-DP837gUfR9Y-aiUCX1HhUc0kIa07wxD-SE-Q/exec?token=${token}&callback=handleCert`;

  let s = document.createElement("script");
  s.src = url;
  document.body.appendChild(s);
}
