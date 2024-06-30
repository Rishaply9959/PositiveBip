function loadHome() {
    const transaction = db.transaction(['videos'], 'readonly');
    const objectStore = transaction.objectStore('videos');
    const request = objectStore.getAll();

    request.onsuccess = function(event) {
        const videos = event.target.result;
        const videoContainer = document.getElementById('videoContainer');
        videoContainer.innerHTML = '';

        videos.forEach(video => {
            const videoElement = document.createElement('div');
            videoElement.classList.add('video');
            
            const videoTitle = document.createElement('div');
            videoTitle.classList.add('video-title');
            videoTitle.textContent = video.title;
            
            const videoTag = document.createElement('video');
            videoTag.controls = true;
            const source = document.createElement('source');
            source.src = video.dataURL;
            source.type = 'video/mp4';
            videoTag.appendChild(source);

            videoElement.appendChild(videoTag);
            videoElement.appendChild(videoTitle);
            
            videoContainer.appendChild(videoElement);
        });
    };
}

function uploadVideo() {
    const videoFile = document.getElementById('videoUpload').files[0];
    const videoTitle = document.getElementById('videoTitle').value;
    if (videoFile && videoTitle) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const dataURL = event.target.result;
            const transaction = db.transaction(['videos'], 'readwrite');
            const objectStore = transaction.objectStore('videos');
            const request = objectStore.add({ title: videoTitle, dataURL: dataURL });

            request.onsuccess = function() {
                loadHome();
                document.getElementById('uploadModal').style.display = 'none';
                document.getElementById('videoUpload').value = '';
                document.getElementById('videoTitle').value = '';
            };

            request.onerror = function() {
                alert('Error uploading video.');
            };
        };
        reader.readAsDataURL(videoFile);
    } else {
        alert('Please select a video file and enter a title.');
    }
                                             }
              
