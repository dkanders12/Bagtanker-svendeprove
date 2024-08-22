import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./FormKontakt.scss";
const supabaseUrl = "https://bvuhlmojkmmydcepmwpf.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const kontaktForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("messages")
      .insert([{ name, email, message }]);

    if (error) {
      setStatus("Error sending message");
    } else {
      setStatus("Message sent successfully");
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="contact-form">
      <h1>kontakt os</h1>
      <p>
        Udfyld og send formularen og vi vil hurtist muligt besvare dine
        spørgsmål.
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            placeholder="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <textarea
            placeholder="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>
        <button type="submit">Send</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default kontaktForm;
