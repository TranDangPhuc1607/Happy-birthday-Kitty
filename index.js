document.addEventListener('DOMContentLoaded', () => {
    const heart = document.getElementById('heart');

    heart.addEventListener('click', function () {
        heart.style.position = 'absolute';
        heart.style.top = '10%';
        heart.style.left = '50%';
        heart.style.transform = 'translateX(-50%) rotate(-45deg)';

        startAnimations();

        setTimeout(() => {
            const iframe = document.getElementById('bg-music');
            iframe.src = iframe.src.replace("mute=1", "mute=0");

            document.getElementById('message').style.display = 'block';

            startMediaSlideshow(); // ✅ Images + Videos
        }, 1500);
    });
});

function startAnimations() {
    document.getElementById('fireworks').style.display = 'block';
    createFireworks();
    document.getElementById('sparkles').style.display = 'block';
    createSparkles();
    document.getElementById('ripples').style.display = 'block';
    createRipples();
}

function createFireworks() {
    const container = document.getElementById('fireworks');
    for (let i = 0; i < 30; i++) {
        const el = document.createElement('div');
        el.classList.add('explosion');
        el.style.top = `${Math.random() * 100}vh`;
        el.style.left = `${Math.random() * 100}vw`;
        el.style.animationDelay = `${Math.random() * 1.5}s`;
        container.appendChild(el);
    }
}

function createSparkles() {
    const container = document.getElementById('sparkles');
    for (let i = 0; i < 50; i++) {
        const el = document.createElement('div');
        el.classList.add('sparkle');
        el.style.top = `${Math.random() * 100}vh`;
        el.style.left = `${Math.random() * 100}vw`;
        el.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(el);
    }
}

function createRipples() {
    const container = document.getElementById('ripples');
    for (let i = 0; i < 20; i++) {
        const el = document.createElement('div');
        el.classList.add('ripple');
        el.style.top = `${Math.random() * 100}vh`;
        el.style.left = `${Math.random() * 100}vw`;
        el.style.animationDelay = `${Math.random() * 2.5}s`;
        container.appendChild(el);
    }
}

function startMediaSlideshow() {
    const mediaList = [
        { type: 'image', src: './PUBLIC/IMAGE/IMG_20230118_014927.jpg' },
        { type: 'image', src: './PUBLIC/IMAGE/IMG_20230118_014934.jpg' },
        { type: 'video', src: './PUBLIC/VIDEO/b4ecf8b6ac3b006b6c0f69c529eca42e.mp4' },
        { type: 'video', src: './PUBLIC/VIDEO/SnapTik_App_7284972090703351047-HD.mp4' },
        { type: 'video', src: './PUBLIC/VIDEO/SnapTik_App_7281814028060544264-HD.mp4' }
    ];

    const mediaContainer = document.getElementById('media-container');
    const videoElement = document.getElementById('media-video');
    let currentIndex = 0;

    function showNextMedia() {
        const current = mediaList[currentIndex];

        if (current.type === 'image') {
            // Show image as background
            videoElement.style.display = 'none';
            videoElement.pause();
            videoElement.removeAttribute('src');
            videoElement.load();
            mediaContainer.style.backgroundImage = `url('${current.src}')`;

            // After 3 seconds, move to next
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % mediaList.length;
                showNextMedia();
            }, 3000);

        } else if (current.type === 'video') {
            // Show video centered
            mediaContainer.style.backgroundImage = 'none';
            videoElement.src = current.src;
            videoElement.style.display = 'block';
            videoElement.play();

            // When video ends, go to next
            videoElement.onended = () => {
                videoElement.style.display = 'none';
                currentIndex = (currentIndex + 1) % mediaList.length;
                showNextMedia();
            };
        }
    }

    showNextMedia(); // start the carousel
}