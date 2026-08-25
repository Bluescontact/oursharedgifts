// Routes this page's forms through a small Netlify site whose only job is
// to register the form schema with Netlify Forms (see netlify_forms_relay/
// in the repo root). Netlify emails the submission privately -- no email
// address ever appears in this site's source.
//
const RELAY_URL = "https://fascinating-elf-93a9b6.netlify.app/";

function encodeForm(form) {
  const data = new FormData(form);
  return Array.from(data.entries())
    .map(([k, v]) => encodeURIComponent(k) + "=" + encodeURIComponent(v))
    .join("&");
}

function showStatus(form, message, isError) {
  let status = form.querySelector(".form-status");
  if (!status) {
    status = document.createElement("p");
    status.className = "form-status note";
    form.appendChild(status);
  }
  status.textContent = message;
  status.style.color = isError ? "var(--ember-deep)" : "var(--moss)";
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("form[data-relay]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      fetch(RELAY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm(form),
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            showStatus(form, "Sent — thanks, you'll hear back soon.", false);
          } else {
            showStatus(form, "Something went wrong sending this. Try again, or email directly.", true);
          }
        })
        .catch(function () {
          showStatus(form, "Something went wrong sending this. Try again, or email directly.", true);
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  });
});
