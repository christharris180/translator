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
