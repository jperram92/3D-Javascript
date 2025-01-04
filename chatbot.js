const API_URL = 'https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct';
const API_TOKEN = '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' //API Token
;

// Fetch with Retry Logic
async function fetchWithRetry(url, options, retries = 3, delay = 2000) {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (response.ok) return await response.json();
        console.warn(`Retrying... (${i + 1}/${retries})`);
      } catch (error) {
        console.error('Fetch Error:', error);
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    throw new Error('Failed after multiple retries');
  }
  
  // Chatbot Response Handler
  async function getChatbotResponse(prompt) {
    console.log('User prompt:', prompt);
  
    try {
      const data = await fetchWithRetry(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `${prompt}`,
        }),
      });
  
      console.log('API Response:', data);
  
      let responseText = '';
  
      if (data && data.generated_text) {
        responseText = data.generated_text;
      } else if (Array.isArray(data) && data[0]?.generated_text) {
        responseText = data[0]?.generated_text;
      } else if (data.error) {
        console.error('API Error:', data.error);
        return `Error: ${data.error}`;
      } else {
        return 'The chatbot did not return a valid response.';
      }
  
      // 🧹 Clean the response from prefixes
      return responseText.replace(/Instruction:/i, '').trim();
    } catch (error) {
      console.error('Fetch Error:', error.message);
      return 'Failed to connect to the chatbot API.';
    }
  }
  
  // Chat UI Interaction
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');
  const chatbotBody = document.getElementById('chatbot-body');
  
  chatbotSend.addEventListener('click', async () => {
    const userMessage = chatbotInput.value.trim();
    if (!userMessage) return;
  
    chatbotBody.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
    chatbotInput.value = '';
  
    const botMessage = await getChatbotResponse(userMessage);
    chatbotBody.innerHTML += `<div><strong>Bot:</strong> ${botMessage}</div>`;
  
    chatbotBody.scrollTop = chatbotBody.scrollHeight; // Auto-scroll to bottom
  });
  
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') chatbotSend.click();
  });