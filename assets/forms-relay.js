// Routes this page's forms through a small Netlify site whose only job is
// to register the form schema with Netlify Forms (see netlify_forms_relay/
// in the repo root). Netlify emails the submission privately -- no email
// address ever appears in this site's source.
//
// Netlify Forms doesn't send CORS headers on its submission endpoint, so a
// fetch()/XHR POST from a different origin gets blocked by the browser
// before it ever reaches Netlify. A classic form-post-to-hidden-iframe
// sidesteps that: browsers only enforce CORS on script-readable fetch/XHR
// responses, not on a plain form submission -- so posting to a hidden
// iframe target works cross-origin with no CORS involved at all.
const RELAY_URL = "https://fascinating-elf-93a9b6.netlify.app/";

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("form[data-relay]").forEach(function (form, i) {
    const frameName = "relay-frame-" + i;
    const iframe = document.createElement("iframe");
    iframe.name = frameName;
    iframe.style.display = "none";
    iframe.setAttribute("aria-hidden", "true");
    document.body.appendChild(iframe);

    form.setAttribute("action", RELAY_URL);
    form.setAttribute("method", "POST");
    form.setAttribute("target", frameName);

    let submitted = false;
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function () {
      submitted = true;
      if (submitBtn) submitBtn.disabled = true;
    });

    iframe.addEventListener("load", function () {
      if (!submitted) return; // ignore the iframe's initial blank load
      submitted = false;
      form.reset();
      let status = form.querySelector(".form-status");
      if (!status) {
        status = document.createElement("p");
        status.className = "form-status note";
        form.appendChild(status);
      }
      status.textContent = "Sent — thanks, you'll hear back soon.";
      status.style.color = "var(--moss)";
      if (submitBtn) submitBtn.disabled = false;
    });
  });
});
