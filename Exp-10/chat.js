// chatbot.js — AI Chatbot Logic for TechNexus 2026

// ── FAQ KNOWLEDGE BASE ──────────────────────────────────
// Each entry has keywords to match and a response to give
const faqs = [
    {
        keywords: ["what is technexus", "about technexus", "tell me about", "what is this event"],
        response: "TechNexus 2026 is India's premier student web technology symposium! It brings together students, developers, and industry experts for talks, workshops, and competitions. 🚀"
    },
    {
        keywords: ["when", "date", "schedule", "timing"],
        response: "TechNexus 2026 is scheduled for <strong>April 20–21, 2026</strong>. Day 1 focuses on workshops and Day 2 features talks and competitions. ⏰"
    },
    {
        keywords: ["where", "venue", "location", "place", "held"],
        response: "The event is held at <strong>NIT Auditorium, New Delhi</strong>. Online participants can join via our live stream link shared after registration. 📍"
    },
    {
        keywords: ["register", "registration", "sign up", "how to join", "enroll"],
        response: "To register, go back to the <a href='event.html'>Registration Page</a> and fill out the form. It only takes 2 minutes! ✅"
    },
    {
        keywords: ["fee", "cost", "price", "paid", "free", "charges"],
        response: "Registration is <strong>FREE for students</strong> with a valid college ID. For professionals, the fee is <strong>₹199 only</strong>. 💰"
    },
    {
        keywords: ["track", "topics", "subjects", "session", "what will"],
        response: "We have 5 exciting tracks: <br>1. 🤖 Artificial Intelligence<br>2. 🌐 Web Development<br>3. 🔒 Cybersecurity<br>4. 📊 Data Science<br>5. 📡 Internet of Things"
    },
    {
        keywords: ["certificate", "certification"],
        response: "Yes! All registered participants will receive a <strong>digital certificate of participation</strong> after the event. 🎓"
    },
    {
        keywords: ["online", "offline", "hybrid", "mode", "virtual"],
        response: "TechNexus 2026 is a <strong>hybrid event</strong>. You can attend online via live stream or offline at the venue. Choose your preference during registration. 💻"
    },
    {
        keywords: ["contact", "help", "support", "email", "reach"],
        response: "You can reach us at 📧 <strong>support@technexus2026.in</strong> or call <strong>+91 98765 43210</strong> between 9 AM – 5 PM on weekdays."
    },
    {
        keywords: ["wifi", "internet", "connectivity"],
        response: "High-speed Wi-Fi will be available at the venue for all offline attendees. Online participants will need their own internet connection. 📶"
    },
    {
        keywords: ["food", "lunch", "refreshment", "snacks"],
        response: "Complimentary lunch and refreshments will be provided to all offline participants on both days. 🍱"
    },
    {
        keywords: ["competition", "hackathon", "contest", "prize", "win"],
        response: "Yes! We have a <strong>Hackathon</strong> and a <strong>Web Design Contest</strong> with cash prizes up to <strong>₹50,000</strong>. Register separately for competitions after event registration. 🏆"
    },
    {
        keywords: ["speaker", "guest", "keynote"],
        response: "We have amazing speakers from top companies including Google, Microsoft, and several AI startups. Full speaker lineup will be announced soon! 🎤"
    },
    {
        keywords: ["t-shirt", "tshirt", "merchandise", "kit"],
        response: "All offline attendees will receive a <strong>TechNexus 2026 T-shirt</strong> and a swag kit. Select your size during registration. 👕"
    },
    {
        keywords: ["ticket", "tickets", "how many"],
        response: "Each participant can register up to <strong>5 tickets</strong> — great if you're bringing friends! All tickets are tied to one email. 🎟️"
    }
];

// ── HELPER: Find a matching FAQ response ────────────────
function getBotResponse(userText) {
    const text = userText.toLowerCase();

    // Check each FAQ entry for a keyword match
    for (let faq of faqs) {
        for (let keyword of faq.keywords) {
            if (text.includes(keyword)) {
                return faq.response;
            }
        }
    }

    // Default fallback response
    return "I'm sorry, I didn't quite understand that. 🤔 Try asking about <strong>registration, venue, fees, tracks, schedule,</strong> or <strong>certificates</strong>. You can also use the quick buttons above!";
}

// ── SEND MESSAGE ────────────────────────────────────────
function sendMessage() {
    const input = document.getElementById("userInput");
    const userText = input.value.trim();

    if (userText === "") return; // Don't send empty messages

    // 1. Display user's message
    appendMessage(userText, "user");

    // 2. Clear input field
    input.value = "";

    // 3. Show typing indicator
    const typingId = showTyping();

    // 4. After a short delay, show bot response (simulates thinking)
    setTimeout(function () {
        removeTyping(typingId);
        const response = getBotResponse(userText);
        appendMessage(response, "bot");
    }, 800);
}

// ── QUICK QUESTION BUTTON ───────────────────────────────
function askQuick(question) {
    document.getElementById("userInput").value = question;
    sendMessage();
}

// ── APPEND A MESSAGE TO CHAT WINDOW ────────────────────
function appendMessage(text, sender) {
    const chatWindow = document.getElementById("chatWindow");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");

    if (sender === "user") {
        messageDiv.classList.add("user-message");
        messageDiv.innerHTML = `
      <span class="msg-icon">👤</span>
      <div class="msg-bubble">${text}</div>
    `;
    } else {
        messageDiv.classList.add("bot-message");
        messageDiv.innerHTML = `
      <span class="msg-icon">🤖</span>
      <div class="msg-bubble">${text}</div>
    `;
    }

    chatWindow.appendChild(messageDiv);

    // Auto scroll to the latest message
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ── TYPING INDICATOR ────────────────────────────────────
function showTyping() {
    const chatWindow = document.getElementById("chatWindow");
    const id = "typing-" + Date.now();

    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message", "bot-message", "typing");
    typingDiv.id = id;
    typingDiv.innerHTML = `
    <span class="msg-icon">🤖</span>
    <div class="msg-bubble">NexusBot is typing...</div>
  `;

    chatWindow.appendChild(typingDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return id;
}

function removeTyping(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}