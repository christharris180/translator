class TranslatorElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Traductor Rápido Español-Inglés</title>
    <meta name="description" content="Traductor rápido y fácil de español a inglés y viceversa.">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- FontAwesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <style>
        :root {
            --bg-color: #0a192f;
            --card-bg: rgba(17, 34, 64, 0.7);
            --text-primary: #ccd6f6;
            --text-secondary: #8892b0;
            --accent-color: #ffd700;
            /* Gold */
            --accent-hover: #e5c100;
            --border-color: rgba(255, 215, 0, 0.2);
            --font-family: 'Inter', sans-serif;
            --transition-speed: 0.3s;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-primary);
            font-family: var(--font-family);
            line-height: 1.6;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
            background-image: radial-gradient(circle at 10% 20%, rgba(255, 215, 0, 0.05) 0%, transparent 20%),
                radial-gradient(circle at 90% 80%, rgba(255, 215, 0, 0.05) 0%, transparent 20%);
        }

        .app-container {
            width: 100%;
            max-width: 600px;
            display: flex;
            flex-direction: column;
            gap: 30px;
        }

        header {
            text-align: center;
            margin-bottom: 10px;
        }

        header h1 {
            color: var(--accent-color);
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 5px;
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.2);
        }

        header p {
            color: var(--text-secondary);
            font-size: 1.1rem;
        }

        main {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        /* Language Controls */
        .language-controls {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            background: var(--card-bg);
            padding: 15px;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            backdrop-filter: blur(10px);
        }

        .lang-label {
            font-weight: 600;
            color: var(--text-secondary);
            transition: color var(--transition-speed);
        }

        .lang-label.active {
            color: var(--accent-color);
        }

        #swap-lang-btn {
            background: transparent;
            border: 1px solid var(--border-color);
            color: var(--accent-color);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            transition: all var(--transition-speed);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #swap-lang-btn:hover {
            background: rgba(255, 215, 0, 0.1);
            transform: rotate(180deg);
        }

        /* Cards */
        .card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            box-shadow: 0 10px 30px -10px rgba(2, 12, 27, 0.7);
            transition: transform var(--transition-speed);
        }

        .card:focus-within {
            border-color: var(--accent-color);
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.1);
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .output-actions {
            display: flex;
            gap: 10px;
        }

        .card-header label {
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--text-secondary);
            font-weight: 600;
        }

        /* Icons Buttons */
        .icon-btn {
            background: transparent;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            font-size: 1.1rem;
            transition: color var(--transition-speed);
            position: relative;
            padding: 5px;
        }

        .icon-btn:hover {
            color: var(--accent-color);
        }

        .icon-btn.recording {
            color: #ff4d4d;
            animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
            0% {
                transform: scale(1);
            }

            50% {
                transform: scale(1.1);
            }

            100% {
                transform: scale(1);
            }
        }

        /* Inputs */
        textarea {
            width: 100%;
            background: #ffffff;
            border: 1px solid #ccc;
            border-radius: 8px;
            color: #333;
            font-family: var(--font-family);
            font-size: 1.1rem;
            resize: none;
            min-height: 120px;
            outline: none;
            padding: 15px;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        textarea::placeholder {
            color: #999;
        }

        .char-count {
            text-align: right;
            font-size: 0.8rem;
            color: var(--text-secondary);
            margin-top: 5px;
        }

        /* Action Area */
        .action-area {
            display: flex;
            justify-content: center;
        }

        .primary-btn {
            background-color: var(--accent-color);
            color: var(--bg-color);
            border: none;
            padding: 12px 40px;
            border-radius: 30px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all var(--transition-speed);
            box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .primary-btn:hover {
            background-color: var(--accent-hover);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
        }

        .primary-btn:active {
            transform: translateY(0);
        }

        .primary-btn:disabled {
            background-color: var(--text-secondary);
            cursor: not-allowed;
            box-shadow: none;
        }

        /* Promo Banner */
        .promo-banner {
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--accent-color);
            /* Gold background */
            border: 2px solid var(--accent-hover);
            border-radius: 12px;
            padding: 15px;
            text-decoration: none;
            transition: all var(--transition-speed);
            gap: 15px;
            margin-bottom: 20px;
        }

        .promo-banner img {
            height: 50px;
            width: auto;
            border-radius: 4px;
        }

        .promo-banner p {
            color: #000000;
            /* Black text */
            font-size: 1rem;
            font-weight: 700;
            text-align: center;
            margin: 0;
        }

        .promo-banner i {
            color: #000000;
        }

        .promo-banner:hover {
            background: var(--accent-hover);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
        }

        /* Output */
        .output-content {
            font-size: 1.1rem;
            min-height: 120px;
            white-space: pre-wrap;
            word-break: break-word;
            background: #ffffff;
            color: #333;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #ccc;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .output-content.empty {
            color: rgba(136, 146, 176, 0.5);
            font-style: italic;
        }

        /* Spinner */
        .spinner {
            width: 30px;
            height: 30px;
            border: 3px solid rgba(255, 215, 0, 0.3);
            border-radius: 50%;
            border-top-color: var(--accent-color);
            animation: spin 1s ease-in-out infinite;
            margin: 45px auto;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }

        .hidden {
            display: none;
        }

        /* Tooltip */
        .tooltip {
            position: relative;
        }

        .tooltip-text {
            visibility: hidden;
            width: 60px;
            background-color: var(--bg-color);
            color: var(--accent-color);
            text-align: center;
            border-radius: 6px;
            padding: 5px 0;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            margin-left: -30px;
            opacity: 0;
            transition: opacity 0.3s;
            font-size: 0.8rem;
            border: 1px solid var(--border-color);
        }

        .tooltip:hover .tooltip-text {
            visibility: visible;
            opacity: 1;
        }

        footer {
            text-align: center;
            color: var(--text-secondary);
            font-size: 0.8rem;
            margin-top: 20px;
            opacity: 0.7;
        }

        /* Responsive */
        @media (max-width: 480px) {
            header h1 {
                font-size: 2rem;
            }

            .app-container {
                gap: 20px;
            }

            textarea,
            .output-content {
                font-size: 1rem;
            }
        }
    </style>
</head>

<body>

    <div class="app-container">
        <header>
            <h1>Traductor Rápido</h1>
            <p>Traduce texto o audio al instante.</p>
        </header>

        <main>
            <!-- Language Controls -->
            <div class="language-controls">
                <span class="lang-label active" id="source-lang-label">Español</span>
                <button id="swap-lang-btn" class="icon-btn" aria-label="Cambiar idiomas">
                    <i class="fa-solid fa-arrow-right-arrow-left"></i>
                </button>
                <span class="lang-label" id="target-lang-label">Inglés</span>
            </div>

            <!-- Input Area -->
            <div class="card input-card">
                <div class="card-header">
                    <label for="input-text">Entrada</label>
                    <button id="record-btn" class="icon-btn tooltip" aria-label="Grabar audio">
                        <i class="fa-solid fa-microphone"></i>
                        <span class="tooltip-text">Grabar</span>
                    </button>
                </div>
                <textarea id="input-text" placeholder="Escribe o pega tu texto aquí..."></textarea>
                <div class="char-count">0 caracteres</div>
            </div>

            <!-- Action Area -->
            <div class="action-area">
                <button id="translate-btn" class="primary-btn">Traducir</button>
            </div>

            <!-- Promo Banner -->
            <a href="https://oxbridge-english-courses.coursify.me" target="_blank" class="promo-banner">
                <!-- Embedded Base64 Image -->
                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAEAAQADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9k="
                    alt="Oxbridge Logo">
                <p>¿Cansado de traducir todo el tiempo? Empieza hoy un curso de inglés online, 100% autodidacta, con
                    Oxbridge English.</p>
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>

            <!-- Output Area -->
            <div class="card output-card">
                <div class="card-header">
                    <label for="output-text">Resultado</label>
                    <div class="output-actions">
                        <button id="speak-btn" class="icon-btn tooltip" aria-label="Escuchar traducción">
                            <i class="fa-solid fa-volume-high"></i>
                            <span class="tooltip-text">Escuchar</span>
                        </button>
                        <button id="copy-btn" class="icon-btn tooltip" aria-label="Copiar traducción">
                            <i class="fa-regular fa-copy"></i>
                            <span class="tooltip-text">Copiar</span>
                        </button>
                    </div>
                </div>
                <div class="output-wrapper">
                    <div id="output-text" class="output-content empty">La traducción aparecerá aquí...</div>
                    <div id="loading-spinner" class="spinner hidden"></div>
                </div>
            </div>
        </main>

        <footer>
            <p>&copy; 2024 Traductor Rápido.</p>
        </footer>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Elements
            const inputText = document.getElementById('input-text');
            const outputText = document.getElementById('output-text');
            const translateBtn = document.getElementById('translate-btn');
            const copyBtn = document.getElementById('copy-btn');
            const recordBtn = document.getElementById('record-btn');
            const swapLangBtn = document.getElementById('swap-lang-btn');
            const sourceLangLabel = document.getElementById('source-lang-label');
            const targetLangLabel = document.getElementById('target-lang-label');
            const charCount = document.querySelector('.char-count');
            const loadingSpinner = document.getElementById('loading-spinner');

            // State
            let isSpanishToEnglish = true;
            let isRecording = false;

            // Translations Dictionary (Mock)
            const translations = {
                es: {
                    placeholder: "Escribe o pega tu texto aquí...",
                    processing: "Traduciendo...",
                    resultPlaceholder: "La traducción aparecerá aquí...",
                    btnTranslate: "Traducir",
                    copied: "¡Copiado!",
                    copy: "Copiar",
                    listening: "Escuchando..."
                },
                en: {
                    // Note: Even if source is EN, the UI controls remain Spanish per user request.
                    // But we might want to guide the user input placeholder.
                    placeholder: "Enter English text here...",
                }
            };

            // Events

            // Update character count
            inputText.addEventListener('input', () => {
                charCount.textContent = `${inputText.value.length} caracteres`;
            });

            // Swap Languages
            swapLangBtn.addEventListener('click', () => {
                isSpanishToEnglish = !isSpanishToEnglish;

                // Visual toggle
                if (isSpanishToEnglish) {
                    sourceLangLabel.classList.add('active');
                    targetLangLabel.classList.remove('active');
                    inputText.placeholder = translations.es.placeholder;
                } else {
                    sourceLangLabel.classList.remove('active');
                    targetLangLabel.classList.add('active');
                    inputText.placeholder = translations.en.placeholder; // "Enter English text here..."
                }

                // Swap Text content if any
                const currentInput = inputText.value;
                const currentOutput = outputText.textContent;

                if (currentOutput !== translations.es.resultPlaceholder && currentOutput !== "") {
                    inputText.value = currentOutput;
                    outputText.textContent = currentInput;
                    charCount.textContent = `${inputText.value.length} caracteres`;
                }
            });

            // Translate Action
            translateBtn.addEventListener('click', async () => {
                const text = inputText.value.trim();
                if (!text) {
                    // If empty, just show placeholder
                    outputText.textContent = translations.es.resultPlaceholder;
                    return;
                }

                // UI Loading State
                setLoading(true);
                outputText.textContent = ""; // Clear previous

                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Mock Translation Logic
                let result = "";
                try {
                    if (isSpanishToEnglish) {
                        result = await mockTranslateToEnglish(text);
                    } else {
                        result = await mockTranslateToSpanish(text);
                    }
                } catch (e) {
                    console.error(e);
                    result = "Error en la traducción. Intente de nuevo.";
                }

                outputText.textContent = result;
                outputText.classList.remove('empty');
                setLoading(false);
            });

            // Copy Action
            copyBtn.addEventListener('click', () => {
                const text = outputText.textContent;
                if (!text || text === translations.es.resultPlaceholder) return;

                navigator.clipboard.writeText(text).then(() => {
                    const originalTooltip = copyBtn.querySelector('.tooltip-text').textContent;
                    copyBtn.querySelector('.tooltip-text').textContent = translations.es.copied;

                    setTimeout(() => {
                        copyBtn.querySelector('.tooltip-text').textContent = translations.es.copy;
                    }, 2000);
                });
            });

            // Speak Action (Text-to-Speech)
            const speakBtn = document.getElementById('speak-btn');
            speakBtn.addEventListener('click', () => {
                const text = outputText.textContent;
                if (!text || text === translations.es.resultPlaceholder) return;

                // Cancel any current speech
                window.speechSynthesis.cancel();

                const utterance = new SpeechSynthesisUtterance(text);

                // Set language based on translation direction
                // If Translating Spanish -> English, output is English (en-US)
                // If Translating English -> Spanish, output is Spanish (es-ES)
                utterance.lang = isSpanishToEnglish ? 'en-US' : 'es-ES';

                // Optional: Select a specific voice if desired, but default usually works fine

                window.speechSynthesis.speak(utterance);
            });

            // Record Action (Web Speech API)
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            let recognition;

            if (SpeechRecognition) {
                recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.lang = 'es-ES';
                recognition.interimResults = false;

                recognition.onstart = () => {
                    isRecording = true;
                    recordBtn.classList.add('recording');
                    inputText.placeholder = translations.es.listening;
                };

                recognition.onend = () => {
                    isRecording = false;
                    recordBtn.classList.remove('recording');
                    // Reset placeholder based on current language
                    if (isSpanishToEnglish) {
                        inputText.placeholder = translations.es.placeholder;
                        recognition.lang = 'es-ES';
                    } else {
                        inputText.placeholder = translations.en.placeholder;
                        recognition.lang = 'en-US';
                    }
                };

                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    inputText.value = transcript;
                    charCount.textContent = `${inputText.value.length} caracteres`;
                };

                recognition.onerror = (event) => {
                    console.error("Speech recognition error", event.error);
                    isRecording = false;
                    recordBtn.classList.remove('recording');
                    alert("Error con el micrófono: " + event.error);
                };
            } else {
                recordBtn.style.display = 'none';
                console.warn("Speech Recognition not supported in this browser.");
            }

            recordBtn.addEventListener('click', () => {
                if (!recognition) {
                    alert("Tu navegador no soporta reconocimiento de voz.");
                    return;
                }

                if (isRecording) {
                    recognition.stop();
                } else {
                    // Set language based on direction
                    recognition.lang = isSpanishToEnglish ? 'es-ES' : 'en-US';
                    try {
                        recognition.start();
                    } catch (err) {
                        console.error("Error starting recognition:", err);
                    }
                }
            });

            // Helper Functions
            function setLoading(isLoading) {
                if (isLoading) {
                    translateBtn.disabled = true;
                    translateBtn.textContent = translations.es.processing;
                    loadingSpinner.classList.remove('hidden');
                    outputText.classList.add('hidden');
                } else {
                    translateBtn.disabled = false;
                    translateBtn.textContent = translations.es.btnTranslate;
                    loadingSpinner.classList.add('hidden');
                    outputText.classList.remove('hidden');
                }
            }

            // Real Translation via MyMemory API
            async function translateText(text, fromLang, toLang) {
                const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`;
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    if (data && data.responseData) {
                        return data.responseData.translatedText;
                    }
                    throw new Error("Invalid response");
                } catch (error) {
                    console.error("Translation error:", error);
                    return "Error: No se pudo conectar con el servicio de traducción.";
                }
            }

            async function mockTranslateToEnglish(text) {
                return await translateText(text, 'es', 'en');
            }

            async function mockTranslateToSpanish(text) {
                return await translateText(text, 'en', 'es');
            }
        });
    </script>
</body>

</html>`;
  }
}
customElements.define('translator-app', TranslatorElement);
