// PartnerForm.jsx
import React, { useState } from "react";
import emailjs from "emailjs-com";

export default function PartnerForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    business: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_j3jr175",   // from EmailJS
        "template_l2dzrwq",  // from EmailJS
        formData,
        "yDD1YqE3Fy2Qe-x60o"       // from EmailJS
      )
      .then(
        (result) => {
          alert("Request sent successfully ✅");
        },
        (error) => {
          alert("Something went wrong ❌");
        }
      );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Partner With Us</h1>

      {/* Google Translate widget */}
      <div id="google_translate_element" className="mb-6">
      </div>

      <form
        onSubmit={sendEmail}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border-2 border-black p-2 text-black rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border-2 border-black p-2 text-black rounded"
        />
        <input
          type="text"
          name="number"
          placeholder="Phone Number"
          value={formData.number}
          onChange={handleChange}
          required
          className="w-full border-2 border-black p-2 text-black rounded"
        />
        <input
          type="text"
          name="business"
          placeholder="Business Name"
          value={formData.business}
          onChange={handleChange}
          required
          className="w-full border-2 border-black p-2 text-black rounded"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
          className="w-full border-2 border-black p-2 text-black rounded"
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 text-black py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
