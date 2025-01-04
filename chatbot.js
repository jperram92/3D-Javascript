// chatbot.js

const chatbotBody = document.getElementById('chatbot-body');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');

// Hugging Face API Configuration
const API_URL = 'https://api-inference.huggingface.co/models/google/flan-t5-small'; // Example free model
const API_TOKEN = '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'; // Replace with your API Token

async function getChatbotResponse(prompt) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    const data = await response.json();

    if (response.ok && data.length > 0) {
      return data[0]?.generated_text || "I couldn't understand that.";
    } else {
      return 'Something went wrong. Please try again later.';
    }
  } catch (error) {
    console.error('Error:', error);
    return 'Error connecting to chatbot.';
  }
}

// Send Message
chatbotSend.addEventListener('click', async () => {
  const userMessage = chatbotInput.value.trim();
  if (!userMessage) return;

  // Display user message
  chatbotBody.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
  chatbotInput.value = '';

  // Get bot response
  const botMessage = await getChatbotResponse(userMessage);
  chatbotBody.innerHTML += `<div><strong>Bot:</strong> ${botMessage}</div>`;

  chatbotBody.scrollTop = chatbotBody.scrollHeight; // Auto-scroll to bottom
});

// Enable 'Enter' key to send messages
chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') chatbotSend.click();
});
