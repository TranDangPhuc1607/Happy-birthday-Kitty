document.addEventListener('DOMContentLoaded', () => {
    const heart = document.getElementById('heart');

    const clickEvent = ('ontouchstart' in window || navigator.maxTouchPoints) ? 'touchstart' : 'click';

    heart.addEventListener(clickEvent, function () {
        // Always reposition
        heart.style.position = 'absolute';
        heart.style.top = '10%';
        heart.style.left = '50%';
        heart.style.transform = 'translateX(-50%) rotate(-45deg)';

        // ✅ Hide heart for better media viewing on tablets/phones
        if (window.innerWidth <= 1024) {
            heart.style.display = 'none';
        }

        startAnimations();

        setTimeout(() => {
            const iframe = document.getElementById('bg-music');
            iframe.src = iframe.src.replace("mute=1", "mute=0");

            const message = document.getElementById('message');

            // ✅ If small screen, stack text vertically
            if (window.innerWidth <= 480) {
                const original = "HAPPY BIRTHDAY KITTY THANH TUYỀN";
                const stacked = original.split(" ").join("\n");
                message.classList.add("break-vertical");
                message.textContent = stacked;
            }

            message.style.display = 'block';
            startMediaSlideshow();
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
            videoElement.style.display = 'none';
            videoElement.pause();
            videoElement.removeAttribute('src');
            videoElement.load();
            mediaContainer.style.backgroundImage = `url('${current.src}')`;

            setTimeout(() => {
                currentIndex = (currentIndex + 1) % mediaList.length;
                showNextMedia();
            }, 3000);

        } else if (current.type === 'video') {
            mediaContainer.style.backgroundImage = 'none';
            videoElement.src = current.src;
            videoElement.style.display = 'block';
            videoElement.play();

            videoElement.onended = () => {
                videoElement.style.display = 'none';
                currentIndex = (currentIndex + 1) % mediaList.length;
                showNextMedia();
            };
        }
    }

    showNextMedia();
}
