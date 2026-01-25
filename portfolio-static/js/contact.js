document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");

  if (!form) return;

  const API_URL =
    location.hostname === "localhost"
      ? "http://localhost:5002/api/send-email"
      : "/api/send-email";

  const setStatus = (msg) => {
    if (statusEl) statusEl.textContent = msg;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const formData = {
      name: form.name.value,
      email: form.email.value,
      issues: form.issues.value,
      website: form.website.value || "", // honeypot
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("✅ Audit request sent successfully!");
        form.reset();
      } else {
        setStatus("❌ Failed to send. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Network error. Please try again.");
    }
  });
});
