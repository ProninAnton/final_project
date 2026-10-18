// Флаг: идёт ли ответ от ИИ
            let isAiResponding = false;
// Элемент индикатора
            let typingIndicatorElement = null;

const chatBox = document.getElementById('chatMessages');
function scrollToBottom() {
                chatBox.scrollTop = chatBox.scrollHeight;
            }
function addMessage(text, sender) {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message', sender);
                const bubble = document.createElement('div');
                bubble.classList.add('bubble');
                bubble.innerHTML = text; // Используем innerHTML для форматирования
                messageDiv.appendChild(bubble);
                chatMessages.appendChild(messageDiv);
                scrollToBottom();
            }

function showTypingIndicator() {
                if (typingIndicatorElement) return;
                const indicatorDiv = document.createElement('div');
                indicatorDiv.classList.add('message', 'ai');
                const bubble = document.createElement('div');
                bubble.classList.add('bubble');
                bubble.style.padding = '8px 18px';
                const typingDiv = document.createElement('div');
                typingDiv.classList.add('typing-indicator');
                typingDiv.innerHTML = '<span></span><span></span><span></span>';
                bubble.appendChild(typingDiv);
                indicatorDiv.appendChild(bubble);
                chatMessages.appendChild(indicatorDiv);
                typingIndicatorElement = indicatorDiv;
                scrollToBottom();
            }
function removeTypingIndicator() {
                if (typingIndicatorElement) {
                    typingIndicatorElement.remove();
                    typingIndicatorElement = null;
                    //const child = chatMessages.getElementById('myChild');
                    //child.remove();
                }
            }

document.getElementById('input-form').addEventListener('submit', async function(e) {
    e.preventDefault();


    const input = document.getElementById('chatInput');
    const chatBox = document.getElementById('chatMessages');
    const userMessage = input.value.trim();
    if (!userMessage) return;

                // Добавляем сообщение пользователя
                addMessage(userMessage, 'user');
                chatInput.value = '';
                chatInput.style.height = 'auto'; // сброс высоты
                isAiResponding = true;
                sendBtn.disabled = true;

                // Показываем индикатор набора
                showTypingIndicator();  

    input.value = '';

    // Send to backend (adjust endpoint as needed)
    const response = await fetch('/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message: userMessage})
    });
    const data = await response.json();

    // Display LLM response
removeTypingIndicator();
addMessage(data.reply, 'ai');
isAiResponding = false;
sendBtn.disabled = false;
chatInput.focus();

    chatBox.scrollTop = chatBox.scrollHeight;
});