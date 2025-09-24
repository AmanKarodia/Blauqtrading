// PartnerForm.jsx
import React, { useState } from "react";
import emailjs from "emailjs-com";

export default function PartnerForm() {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      to_name: "BLAUQTRADING Team",
      from_name: "Partner Form Submission", // generic sender name
      message: message || "No message provided",
    };

    emailjs
      .send(
        "service_j3jr175",   // Service ID
        "template_l2dzrwq",  // Template ID
        templateParams,
        "yDD1YqE3Fy2Qe-x60o" // User ID / Public Key
      )
      .then(
        () => {
          alert("Request sent successfully ✅");
          setMessage(""); // reset textarea
        },
        (error) => {
          console.error(error);
          alert("Something went wrong ❌");
        }
      );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Partner With Us</h1>

      {/* Google Translate widget */}
      <div id="google_translate_element" className="mb-6"></div>

      <form
        onSubmit={sendEmail}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-4"
      >
        <textarea
          name="message"
          placeholder="Please leave your full info here: Name, Contact, Company, Country, etc."
          value={message}
          onChange={handleChange}
          required
          className="w-full border-2 border-black p-2 text-black rounded h-48"
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
