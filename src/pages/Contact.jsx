import { useState } from 'react';


export default function Contact() {
  const [f, setF] = useState({
    name: '',
    message: ''
  });

  const set = (k) => (e) =>
    setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();

    window.location.href = `mailto:support@learnhub.com?subject=${encodeURIComponent(
      'Message from ' + f.name
    )}&body=${encodeURIComponent(f.message)}`;
  };

  return (
    <div className="contact-page">

      <div className="contact-info">
        <span className="contact-tag">GET IN TOUCH</span>
        <h1>Contact <span>LearnHUB</span></h1>
        <p>
          Have a question, suggestion, or need help?
          We'd love to hear from you. Send us a message
          and connect with our team.
        </p>

        <div className="contact-detail">
          <span>📧</span>
          <div>
            <h3>Email Us</h3>
            <p>support@learnhub.com</p>
          </div>
        </div>

        <div className="contact-detail">
          <span>🚀</span>
          <div>
            <h3>Our Purpose</h3>
            <p>Learn • Teach • Practice • Grow</p>
          </div>
        </div>
      </div>

      <form className="glass contact-form" onSubmit={submit}>
        <h2>Send us a message</h2>
        <p className="muted">Fill in the details below.</p>

        <label htmlFor="contact-name">Your Name</label>
        <input
          id="contact-name"
          type="text"
          placeholder="Enter your name"
          value={f.name}
          onChange={set('name')}
          required
        />

        <label htmlFor="contact-message">Your Message</label>
        <textarea
          id="contact-message"
          rows="6"
          placeholder="Write your message here..."
          value={f.message}
          onChange={set('message')}
          required
        />

        <button className="btn contact-submit" type="submit">
          Send Message ↗
        </button>
      </form>

    </div>
  );
}
