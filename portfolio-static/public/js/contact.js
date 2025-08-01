document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    statusEl.textContent = "Sending...";

    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    try {
      const response = await fetch("https://hamzamohammed.com/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        statusEl.textContent = "✅ Message sent successfully!";
        form.reset();
      } else {
        statusEl.textContent = "❌ Failed to send message. Please try again later.";
      }
    } catch (error) {
      console.error("Error:", error);
      statusEl.textContent = "❌ An error occurred. Please try again.";
    }
  });
});
