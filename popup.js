// popup.js

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('validateLink').addEventListener('click', async () => {
        const apiKey = document.getElementById('linkInput').value;
        const resultMessage = document.getElementById('resultMessage');

        if (!apiKey) {
            resultMessage.textContent = "Veuillez entrer une clé API.";
            resultMessage.style.color = "red";
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/key/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ key_value: apiKey })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Réponse non valide');
            }

            const data = await response.json();

            if (data.message) {
                resultMessage.textContent = data.message; 
                resultMessage.style.color = (data.expirationDate && data.expirationDate !== 'lifetime') ? 'green' : 'green';
                alert(data.message);
            }

        } catch (error) {
            console.error("Erreur lors de la validation de la clé API :", error);
            resultMessage.textContent = "Erreur lors de la validation. Veuillez réessayer.";
            resultMessage.style.color = "red";
        }
    });
});
