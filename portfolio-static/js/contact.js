document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");

  if (!form) return;

  const setStatus = (msg) => {
    if (statusEl) statusEl.textContent = msg;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    setStatus("Sending...");

    const formData = {
      name: form.company.value, // use company name as contact name for now
      company: form.company.value,
      role: form.role.value,
      volume: form.volume.value,
      email: form.email.value,
      message: form.problem.value,
    };

    try {
      const response = await fetch("/api/send-email", {
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
