document.addEventListener('DOMContentLoaded', () => {
    const videoUrlInput = document.getElementById('videoUrl');
    const formatSelect = document.getElementById('formatSelect');
    const convertBtn = document.getElementById('convertBtn');
    const statusDiv = document.getElementById('status');
    const downloadLinkDiv = document.getElementById('downloadLink');

    convertBtn.addEventListener('click', async () => {
        const videoUrl = videoUrlInput.value;
        const format = formatSelect.value;

        if (!videoUrl) {
            statusDiv.textContent = 'Please enter a YouTube URL';
            return;
        }

        statusDiv.textContent = 'Converting... Please wait';
        downloadLinkDiv.innerHTML = '';

        try {
            // Use a free YouTube to MP3 conversion API
            const apiUrl = `https://youtube-mp3-converter.p.rapidapi.com/convert?url=${encodeURIComponent(videoUrl)}`;
            
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY', // Replace with your actual key
                    'X-RapidAPI-Host': 'youtube-mp3-converter.p.rapidapi.com'
                }
            });

            const result = await response.json();

            if (result.downloadLink) {
                statusDiv.textContent = 'Conversion Complete!';
                downloadLinkDiv.innerHTML = `
                    <a href="${result.downloadLink}" target="_blank" download>
                        Download ${format.toUpperCase()} File
                    </a>
                `;
            } else {
                statusDiv.textContent = 'Conversion failed. Please check the URL.';
            }
        } catch (error) {
            statusDiv.textContent = 'Error during conversion';
            console.error('Conversion error:', error);
        }
    });
});