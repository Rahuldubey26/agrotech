const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler")
let userMessage;
// const API_KEY ="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";
// const API_KEY = "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";
// const API_KEY="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";
const API_KEY="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";

const createChatLi = (message,className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent = className === "outgoing" ? `<p></p>`
    :`<span class="material-symbols-outlined">smart_toy</span>
    <p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}
const generateResponse = (incomingChatLi)=>{
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");
    const requestOptions = {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${API_KEY}`
        },
        body:JSON.stringify({
            model: "gpt-3.5-turbo",
            messages:[{role:"user",content:userMessage}]
        })
    }
    fetch(API_URL,requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.textContent = "Oops! something went wrong. PLease try again.";
    }).finally(() => chatbox.scrollTo(0,chatbox.scrollHeight));
}
const handleChat = ()=>{
    userMessage = chatInput.value.trim();
    if(!userMessage)
    return;
chatInput.value="";
chatbox.appendChild(createChatLi(userMessage,"outgoing"));
chatbox.scrollTo(0,chatbox.scrollHeight);
setTimeout(() => {
    const incomingChatLi = createChatLi("Thinking...","incoming")
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0,chatbox.scrollHeight);

    generateResponse(incomingChatLi);
},600)
}
chatbotToggler.addEventListener("click",()=> document.body.classList.toggle("show-chatbot"));
sendChatBtn.addEventListener("click",handleChat);