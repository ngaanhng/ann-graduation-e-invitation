/* ==========================================================================
   VAN LANG UNIVERSITY GRADUATION E-INVITATION CARD JAVASCRIPT LOGIC
   Tân khoa: Nguyễn Nga Anh (Truyền thông đa phương tiện)
   Includes Continuous Sparkling White Glitter Stars Animation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Tự động nhận diện Mobile / iPhone / Samsung & chế độ xem ngay khi tải trang
    applyAutoMobileMode();

    // --- DEFAULT DATA MODEL ---
    const defaultData = {
        graduateName: "Nguyễn Nga Anh",
        guestInvitedName: "Quý Khách",
        degree: "Cử Nhân · Truyền thông đa phương tiện",
        ceremonyDate: "2027-08-10", // 10.08.2027
        displayDateText: "10.08.2027",
        ceremonyTime: "10:30 sáng",
        checkinMinutes: "10:00 sáng",
        venueName: "Trường Đại học Văn Lang",
        contactPhone: "0987 654 321"
    };

    // Load custom data from localStorage or use defaults
    let appData = JSON.parse(localStorage.getItem('vlu_grad_card_data')) || { ...defaultData };
    if (!appData.displayDateText || appData.displayDateText === "09.08.2027") {
        appData.displayDateText = "10.08.2027";
        appData.ceremonyDate = "2027-08-10";
    }

    // Parse personalized guest name from URL query parameters (e.g. ?to=Anh+Nam or ?guest=Anh+Nam or ?name=Anh+Nam or ?n=Anh+Nam)
    const urlParams = new URLSearchParams(window.location.search);
    const guestFromUrl = urlParams.get('to') || urlParams.get('guest') || urlParams.get('name') || urlParams.get('n');
    if (guestFromUrl && guestFromUrl.trim()) {
        appData.guestInvitedName = guestFromUrl.trim();
    }

    // --- DOM ELEMENTS ---
    const envelope = document.getElementById('envelope');
    const waxSeal = document.getElementById('waxSeal');
    const envelopeScreen = document.getElementById('envelopeScreen');
    const mainInvitation = document.getElementById('mainInvitation');
    const reopenEnvelopeBtn = document.getElementById('reopenEnvelopeBtn');
    
    // Display elements
    const previewGraduateName = document.getElementById('previewGraduateName');
    const displayGraduateName = document.getElementById('displayGraduateName');
    const displayGraduateDegree = document.getElementById('displayGraduateDegree');
    const displayDate = document.getElementById('displayDate');
    const displayTime = document.getElementById('displayTime');
    const displayCheckinMinutes = document.getElementById('displayCheckinMinutes');
    const displayPhone = document.getElementById('displayPhone');
    const displayVenueName = document.getElementById('displayVenueName');
    const displayVenueName2 = document.getElementById('displayVenueName2');

    // Hero Header guest invitation display element
    const heroGuestInvitedName = document.getElementById('heroGuestInvitedName');
    const heroBadgeDate = document.getElementById('heroBadgeDate');
    const heroBadgeNotice = document.getElementById('heroBadgeNotice');

    // Dedicated Invitation Letter elements
    const letterGuestName = document.getElementById('letterGuestName');
    const letterDateText = document.getElementById('letterDateText');
    const letterTimeText = document.getElementById('letterTimeText');

    // Music Elements
    const bgMusic = document.getElementById('bgMusic');
    const audioToggleBtn = document.getElementById('audioToggleBtn');
    let isPlayingAudio = false;

    // Countdown & Calendar
    const cdDays = document.getElementById('cdDays');
    const cdHours = document.getElementById('cdHours');
    const cdMinutes = document.getElementById('cdMinutes');
    const cdSeconds = document.getElementById('cdSeconds');
    let countdownInterval;

    // Modal elements
    const editModal = document.getElementById('editModal');
    const openEditModalBtn = document.getElementById('openEditModalBtn');
    const closeEditModalBtn = document.getElementById('closeEditModalBtn');
    const editCardForm = document.getElementById('editCardForm');
    const resetDefaultsBtn = document.getElementById('resetDefaultsBtn');

    // Form RSVP
    const rsvpForm = document.getElementById('rsvpForm');
    const rsvpStatusInput = document.getElementById('rsvpStatus');
    const pillOptBtns = document.querySelectorAll('.pill-opt-btn');

    // Utility buttons
    const shareBtn = document.getElementById('shareBtn');
    const toast = document.getElementById('toast');

    // --- INITIALIZATION ---
    function init() {
        applyAutoMobileMode();
        renderCardData();
        startCountdown();
        renderCalendar();
        initPillOptions();
        initSparklingGlitterStars();
        initVideoAudioSync();
    }

    // --- CONTINUOUS FALLING SPARKLING WHITE GLITTER STARS (KIM TUYẾN NGÔI SAO TRẮNG LẤP LÁNH) ---
    function initSparklingGlitterStars() {
        const canvas = document.getElementById('falling-icons-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const starSymbols = ['✦', '✧', '★', '☆', '✨', '✦', '✧'];
        const starColors = ['#FFFFFF', '#FFF8E7', '#F0F8FF', '#FFFFFF', '#FFF5EA'];
        const particleCount = 75;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                symbol: starSymbols[Math.floor(Math.random() * starSymbols.length)],
                color: starColors[Math.floor(Math.random() * starColors.length)],
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 16 + 10,
                speedY: Math.random() * 0.9 + 0.4,
                speedX: Math.random() * 0.5 - 0.25,
                angle: Math.random() * Math.PI * 2,
                spin: (Math.random() - 0.5) * 0.04,
                twinkleSpeed: Math.random() * 0.05 + 0.02,
                twinklePhase: Math.random() * Math.PI * 2,
                opacity: Math.random() * 0.6 + 0.4
            });
        }

        let frameTime = 0;

        function animate() {
            ctx.clearRect(0, 0, width, height);
            frameTime += 0.03;

            particles.forEach(p => {
                p.y += p.speedY;
                p.x += Math.sin(p.y * 0.012 + p.twinklePhase) * 0.5 + p.speedX;
                p.angle += p.spin;

                // Twinkle opacity effect for sparkling glitter
                const currentOpacity = (Math.sin(frameTime * p.twinkleSpeed * 10 + p.twinklePhase) * 0.35 + 0.65) * p.opacity;

                if (p.y > height + 25) {
                    p.y = -25;
                    p.x = Math.random() * width;
                }
                if (p.x > width + 25) p.x = -25;
                if (p.x < -25) p.x = width + 35;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);
                ctx.globalAlpha = Math.max(0.1, Math.min(1, currentOpacity));
                ctx.shadowColor = '#FFFFFF';
                ctx.shadowBlur = 12;
                ctx.fillStyle = p.color;

                ctx.font = `${p.size}px "Segoe UI Symbol", "Segoe UI Emoji", Arial, sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(p.symbol, 0, 0);

                ctx.restore();
            });

            requestAnimationFrame(animate);
        }

        animate();
    }

    // --- RENDER CARD DATA TO DOM (WITH ROBUST NULL CHECKS) ---
    function renderCardData() {
        if (previewGraduateName) previewGraduateName.textContent = appData.graduateName;
        if (displayGraduateName) displayGraduateName.textContent = appData.graduateName;
        if (displayGraduateDegree) displayGraduateDegree.textContent = appData.degree;
        
        if (displayDate) displayDate.textContent = appData.displayDateText || "10.08.2027";
        if (displayTime) displayTime.textContent = appData.ceremonyTime;
        if (displayCheckinMinutes) displayCheckinMinutes.textContent = appData.checkinMinutes;
        if (displayPhone) displayPhone.textContent = appData.contactPhone;
        if (displayVenueName) displayVenueName.textContent = appData.venueName;
        if (displayVenueName2) displayVenueName2.textContent = appData.venueName;

        // Hero Header Bindings
        if (heroGuestInvitedName) heroGuestInvitedName.textContent = appData.guestInvitedName || "Quý Khách";
        if (heroBadgeDate) heroBadgeDate.textContent = `${appData.displayDateText || "10.08.2027"} · ${appData.ceremonyTime}`;
        if (heroBadgeNotice) {
            const checkinVal = appData.checkinMinutes || "10:00 sáng";
            if (/^\d+$/.test(checkinVal)) {
                heroBadgeNotice.textContent = `Vui lòng có mặt trước ${checkinVal} phút để check-in`;
            } else {
                heroBadgeNotice.textContent = `Vui lòng có mặt vào khoảng lúc ${checkinVal} để check-in`;
            }
        }

        // Dedicated Letter Card Bindings
        if (letterGuestName) letterGuestName.textContent = appData.guestInvitedName || "Quý Khách";
        if (letterDateText) letterDateText.textContent = appData.displayDateText || "10.08.2027";
        if (letterTimeText) letterTimeText.textContent = appData.ceremonyTime;

        // Populate Edit Form Inputs safely
        const editGuestInvitedName = document.getElementById('editGuestInvitedName');
        const editGraduateName = document.getElementById('editGraduateName');
        const editDegree = document.getElementById('editDegree');
        const editDate = document.getElementById('editDate');
        const editTime = document.getElementById('editTime');
        const editCheckinMinutes = document.getElementById('editCheckinMinutes');
        const editPhone = document.getElementById('editPhone');

        if (editGuestInvitedName) editGuestInvitedName.value = appData.guestInvitedName || "Quý Khách";
        if (editGraduateName) editGraduateName.value = appData.graduateName;
        if (editDegree) editDegree.value = appData.degree;
        if (editDate) editDate.value = appData.displayDateText || "10.08.2027";
        if (editTime) editTime.value = appData.ceremonyTime;
        if (editCheckinMinutes) editCheckinMinutes.value = appData.checkinMinutes;
        if (editPhone) editPhone.value = appData.contactPhone;
    }

    // --- ENVELOPE / COVER POSTER OPEN ANIMATION ---
    if (waxSeal) {
        waxSeal.addEventListener('click', (e) => {
            e.stopPropagation();
            openEnvelope();
        });
    }

    if (envelope) {
        envelope.addEventListener('click', openEnvelope);
    }

    function openEnvelope() {
        triggerConfetti();
        playAudio();

        envelopeScreen.style.opacity = '0';
        envelopeScreen.style.transition = 'opacity 0.6s ease';
        
        setTimeout(() => {
            envelopeScreen.style.setProperty('display', 'none', 'important');
            envelopeScreen.classList.add('hidden');
            
            mainInvitation.style.removeProperty('display');
            mainInvitation.classList.remove('hidden');
            
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            
            applyAutoMobileMode();
            
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }, 50);
        }, 600);
    }

    if (reopenEnvelopeBtn) {
        reopenEnvelopeBtn.addEventListener('click', () => {
            mainInvitation.style.setProperty('display', 'none', 'important');
            mainInvitation.classList.add('hidden');
            
            envelopeScreen.style.removeProperty('display');
            envelopeScreen.classList.remove('hidden');
            envelopeScreen.style.opacity = '1';
            envelopeScreen.style.transition = 'opacity 0.3s ease';
            
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            
            applyAutoMobileMode();

            // Đảm bảo chữ "Nguyễn Nga Anh" bên ngoài trên iPad, iPhone và Samsung luôn lấp lánh liên tục
            const coverNameEl = document.getElementById('previewGraduateName') || document.querySelector('.cover-guest-name');
            if (coverNameEl) {
                coverNameEl.style.animation = 'none';
                coverNameEl.style.webkitAnimation = 'none';
                void coverNameEl.offsetWidth; // Force synchronous reflow / GPU repaint
                coverNameEl.style.animation = '';
                coverNameEl.style.webkitAnimation = '';
            }
        });
    }

    // --- AUDIO BACKGROUND MUSIC (LOCAL HIGH-QUALITY MP3) ---
    let audioActionPromise = null;
    let isVideoPlaying = false;           // Video đang trong trạng thái xem/phát
    let videoEndedPendingMusic = false;    // Video đã chiếu đến giây cuối cùng, sẵn sàng lên nhạc
    let wasMusicPlayingBeforeVideo = true; // Mặc định thiệp mở ra là có nhạc nền
    let musicPausedByVideo = false;        // Đánh dấu nhạc nền đang tạm tắt do xem video
    let userExplicitlyMuted = false;
    let videoResumeMusicTimer = null;
    let videoResumeCountdownInterval = null;
    let videoNaturalEndTimer = null;
    let activePlayingBox = null;
    let isCursorOverVideo = false;

    function isDesktopWide() {
        if (document.body.classList.contains('view-mode-wide')) return true;
        if (document.body.classList.contains('view-mode-mobile')) return false;
        return window.innerWidth > 768;
    }

    function cancelVideoResumeTimer() {
        if (videoResumeCountdownInterval) {
            clearInterval(videoResumeCountdownInterval);
            videoResumeCountdownInterval = null;
        }
        if (videoResumeMusicTimer) {
            clearTimeout(videoResumeMusicTimer);
            videoResumeMusicTimer = null;
        }
    }

    function cancelVideoNaturalEndTimer() {
        if (videoNaturalEndTimer) {
            clearTimeout(videoNaturalEndTimer);
            videoNaturalEndTimer = null;
        }
    }

    function isCurrentlyInFullscreen() {
        return !!(document.fullscreenElement || 
                  document.webkitFullscreenElement || 
                  document.mozFullScreenElement || 
                  document.msFullscreenElement);
    }

    // Hiển thị Khung hình 1 cho TẤT CẢ các video trên thiệp (chỉ ở chế độ xem mặc định)
    function showDesktopKhung1OnAllVideos() {
        if (isCurrentlyInFullscreen()) return;
        const allBoxes = document.querySelectorAll('.drive-video-frame-box');
        allBoxes.forEach(box => {
            updateVideoStatusBadge(box, "Đang xem video (nhạc tạm tắt)", "Bật lại nhạc", () => {
                resumeMusicFromBadge();
            });
        });
    }

    // Khi người dùng bấm nút vàng [Bật lại nhạc] trên khung video
    function resumeMusicFromBadge() {
        musicPausedByVideo = false;
        isVideoPlaying = false;
        videoEndedPendingMusic = false;
        userExplicitlyMuted = false;
        wasMusicPlayingBeforeVideo = true;
        cancelVideoResumeTimer();
        cancelVideoNaturalEndTimer();
        playAudio();
        removeAllVideoStatusBadges();
    }

    // Hàm cập nhật hoặc tạo huy hiệu trạng thái thông minh trên khung video
    function updateVideoStatusBadge(box, stateText, actionText = null, onAction = null) {
        if (!box) box = activePlayingBox || document.querySelector('.drive-video-frame-box');
        if (!box) return;
        let badge = box.querySelector('.video-playback-status-pill');
        if (!badge) {
            badge = document.createElement('div');
            badge.className = 'video-playback-status-pill';
            badge.innerHTML = `
                <span class="pill-dot"></span>
                <span class="pill-text"></span>
                <button type="button" class="pill-action-btn" style="display:none;"></button>
            `;
            // Ngăn chặn sự kiện chạm/click từ huy hiệu truyền lên khung video (để không bị hiểu nhầm là click phát video)
            badge.addEventListener('pointerdown', (e) => e.stopPropagation());
            badge.addEventListener('mousedown', (e) => e.stopPropagation());
            badge.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
            badge.addEventListener('click', (e) => e.stopPropagation());

            box.appendChild(badge);
        }
        const textEl = badge.querySelector('.pill-text');
        const btnEl = badge.querySelector('.pill-action-btn');
        if (textEl) textEl.textContent = stateText;
        if (btnEl) {
            if (actionText) {
                btnEl.textContent = actionText;
                btnEl.style.display = 'inline-block';
                btnEl.onclick = (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (onAction) onAction();
                };
            } else {
                btnEl.style.display = 'none';
            }
        }
        badge.onclick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (onAction) onAction();
        };
        badge.style.display = 'flex';
        badge.style.opacity = '1';
    }

    function removeAllVideoStatusBadges() {
        document.querySelectorAll('.video-playback-status-pill').forEach(b => {
            b.style.opacity = '0';
            b.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                if (b && b.parentNode) {
                    b.parentNode.removeChild(b);
                }
            }, 300);
        });
    }

    function removeVideoStatusBadge(box) {
        if (!box) {
            removeAllVideoStatusBadges();
            return;
        }
        const badge = box.querySelector('.video-playback-status-pill');
        if (badge) {
            badge.style.opacity = '0';
            badge.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                if (badge && badge.parentNode) {
                    badge.parentNode.removeChild(badge);
                }
            }, 300);
        }
    }

    function onVideoPlayStarted(targetBox, sourceInfo) {
        cancelVideoResumeTimer();
        cancelVideoNaturalEndTimer();
        isVideoPlaying = true;
        videoEndedPendingMusic = false;
        wasMusicPlayingBeforeVideo = true;
        musicPausedByVideo = true;
        if (targetBox) activePlayingBox = targetBox;

        if (isPlayingAudio) {
            pauseAudio();
            console.log("Đã tự động tắt nhạc nền khi bắt đầu phát video:", sourceInfo || "");
        }

        if (isDesktopWide()) {
            // Trên Desktop/Laptop (Màn hình rộng):
            // Hiển thị Khung hình 1 cho TẤT CẢ các video trên thiệp ở chế độ xem mặc định
            // KHÔNG tự động hẹn giờ bật nhạc khi xem xong video
            showDesktopKhung1OnAllVideos();
        } else {
            // Trên di động
            updateVideoStatusBadge(activePlayingBox, "Đang xem video (nhạc tạm tắt)", "Bật lại nhạc", () => {
                resumeMusicFromBadge();
            });
        }
    }

    function onVideoPaused() {
        if (isDesktopWide()) {
            // Trên Desktop/Laptop: Giữ nguyên Khung hình 1 trên các video, không đổi chữ, không tự động lên nhạc
            if (musicPausedByVideo) {
                showDesktopKhung1OnAllVideos();
            }
            return;
        }

        cancelVideoNaturalEndTimer();
        cancelVideoResumeTimer();
        updateVideoStatusBadge(activePlayingBox, "Đang xem video (nhạc tạm tắt)", "Bật lại nhạc", () => {
            resumeMusicFromBadge();
        });
    }

    function onVideoReachedLastSecond() {
        cancelVideoNaturalEndTimer();
        cancelVideoResumeTimer();

        if (isDesktopWide()) {
            // Yêu cầu của người dùng:
            // "chỉ chỉnh cho giao diện Máy tính (PC / Laptop màn hình rộng) là không cần tự động bật nhạc lên khi xem hết video nữa;
            // mà hãy chỉ hiển thị khung hình 1 này cho video đang ở chế độ xem mặc định ( chỉ hiển thị ở chế độ này);
            // và chỉnh khung này hiển thị cho các video luôn dù đang bật video này hay dừng bật video khác và phải bấm nút vàng mà bật lại nhạc được"
            if (musicPausedByVideo) {
                showDesktopKhung1OnAllVideos();
            }
            return;
        }

        // Trên di động (nếu có):
        triggerResumeMusicCountdown(2000);
    }

    function triggerResumeMusicCountdown(delay = 2000) {
        if (isDesktopWide()) return; // Tuyệt đối không tự động đếm ngược trên Desktop
        if (!wasMusicPlayingBeforeVideo || userExplicitlyMuted) return;

        cancelVideoResumeTimer();
        cancelVideoNaturalEndTimer();

        let remainingSec = Math.ceil(delay / 1000);
        if (delay === 0 || remainingSec <= 0) {
            videoEndedPendingMusic = false;
            isVideoPlaying = false;
            if (!userExplicitlyMuted && !isPlayingAudio) {
                playAudio();
            }
            removeVideoStatusBadge(activePlayingBox);
            wasMusicPlayingBeforeVideo = true;
            return;
        }

        updateVideoStatusBadge(activePlayingBox, `✨ Video đã đến giây cuối · Đang bật nhạc sau ${remainingSec}s...`, "Bật ngay", () => {
            triggerResumeMusicCountdown(0);
        });

        videoResumeCountdownInterval = setInterval(() => {
            remainingSec--;
            if (remainingSec > 0) {
                updateVideoStatusBadge(activePlayingBox, `✨ Video đã đến giây cuối · Đang bật nhạc sau ${remainingSec}s...`, "Bật ngay", () => {
                    triggerResumeMusicCountdown(0);
                });
            } else {
                clearInterval(videoResumeCountdownInterval);
                videoResumeCountdownInterval = null;
                videoResumeMusicTimer = null;
                videoEndedPendingMusic = false;
                isVideoPlaying = false;

                if (!userExplicitlyMuted && !isPlayingAudio) {
                    playAudio();
                }
                removeVideoStatusBadge(activePlayingBox);
                wasMusicPlayingBeforeVideo = true;
            }
        }, 1000);
    }

    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', () => {
            cancelVideoResumeTimer();
            videoEndedPendingMusic = false;
            isVideoPlaying = false;

            if (isPlayingAudio) {
                userExplicitlyMuted = true;
                wasMusicPlayingBeforeVideo = false;
                pauseAudio();
            } else {
                userExplicitlyMuted = false;
                wasMusicPlayingBeforeVideo = true;
                musicPausedByVideo = false;
                playAudio();
                removeAllVideoStatusBadges();
            }
        });
    }

    const audioStatusText = document.getElementById('audioStatusText');

    function playAudio() {
        if (!bgMusic || userExplicitlyMuted) return;
        if (isPlayingAudio) return;

        // Đảm bảo audio element luôn trỏ về file MP3 nội bộ cực nhanh và nhẹ
        if (!bgMusic.src || bgMusic.src.includes('google.com') || !bgMusic.src.includes('bg_music_custom.mp3')) {
            bgMusic.src = "assets/bg_music_custom.mp3";
        }

        audioActionPromise = bgMusic.play();
        if (audioActionPromise !== undefined) {
            audioActionPromise.then(() => {
                isPlayingAudio = true;
                audioActionPromise = null;
                if (audioToggleBtn) audioToggleBtn.classList.add('playing');
                if (audioStatusText) {
                    audioStatusText.textContent = "BẬT";
                    audioStatusText.classList.add('active');
                }
                // Nhạc đã được bật lại -> xóa toàn bộ huy hiệu trên tất cả khung video
                musicPausedByVideo = false;
                removeAllVideoStatusBadges();
            }).catch(err => {
                audioActionPromise = null;
                if (err && err.name === 'AbortError') {
                    // Do pauseAudio() ngắt kịp thời khi người dùng bấm xem video, hoàn toàn bình thường
                    return;
                }
                console.log("Audio play note:", err);
            });
        }
    }

    function pauseAudio() {
        if (!bgMusic) return;
        if (audioActionPromise) {
            audioActionPromise.then(() => {
                bgMusic.pause();
                isPlayingAudio = false;
                if (audioToggleBtn) audioToggleBtn.classList.remove('playing');
                if (audioStatusText) {
                    audioStatusText.textContent = "TẮT";
                    audioStatusText.classList.remove('active');
                }
            }).catch(() => {
                bgMusic.pause();
                isPlayingAudio = false;
                if (audioToggleBtn) audioToggleBtn.classList.remove('playing');
                if (audioStatusText) {
                    audioStatusText.textContent = "TẮT";
                    audioStatusText.classList.remove('active');
                }
            });
        } else {
            bgMusic.pause();
            isPlayingAudio = false;
            if (audioToggleBtn) audioToggleBtn.classList.remove('playing');
            if (audioStatusText) {
                audioStatusText.textContent = "TẮT";
                audioStatusText.classList.remove('active');
            }
        }
    }

    // --- DYNAMIC COUNTDOWN TIMER ---
    function startCountdown() {
        if (countdownInterval) clearInterval(countdownInterval);

        function updateTimer() {
            const targetTime = new Date(`2027-08-10T10:30:00`).getTime();
            const now = new Date().getTime();
            const difference = targetTime - now;

            if (difference <= 0) {
                if (cdDays) cdDays.textContent = "00";
                if (cdHours) cdHours.textContent = "00";
                if (cdMinutes) cdMinutes.textContent = "00";
                if (cdSeconds) cdSeconds.textContent = "00";
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (cdDays) cdDays.textContent = String(days).padStart(2, '0');
            if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
            if (cdMinutes) cdMinutes.textContent = String(minutes).padStart(2, '0');
            if (cdSeconds) cdSeconds.textContent = String(seconds).padStart(2, '0');
        }

        updateTimer();
        countdownInterval = setInterval(updateTimer, 1000);
    }

    // --- MONTH CALENDAR MATRIX RENDERER (MONDAY-FIRST ORDER: T2..CN) ---
    function renderCalendar() {
        const calMatrix = document.getElementById('calendarMatrix');
        const calMonthYear = document.getElementById('calMonthYear');
        if (!calMatrix) return;
        calMatrix.innerHTML = '';

        const year = 2027;
        const month = 7; // August
        const targetDay = 10; // 10.08.2027

        if (calMonthYear) calMonthYear.textContent = `Tháng 8`;

        const rawFirstDay = new Date(year, month, 1).getDay();
        const firstDayIndex = (rawFirstDay === 0) ? 6 : rawFirstDay - 1;
        const totalDays = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDayIndex; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('cc-day', 'empty');
            calMatrix.appendChild(emptyCell);
        }

        for (let day = 1; day <= totalDays; day++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('cc-day');
            dayCell.textContent = day;

            if (day === targetDay) {
                dayCell.classList.add('event-day');
                dayCell.title = "Ngày Lễ Tốt Nghiệp";
            }

            calMatrix.appendChild(dayCell);
        }
    }

    // --- PILL OPTION BUTTONS (FOR RSVP STATUS) ---
    function initPillOptions() {
        pillOptBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                pillOptBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                if (rsvpStatusInput) rsvpStatusInput.value = btn.dataset.status;
            });
        });
    }

    // --- RSVP FORM SUBMISSION ---
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('guestName').value.trim();

            if (!name) return;

            rsvpForm.reset();

            pillOptBtns.forEach(b => b.classList.remove('active'));
            if (pillOptBtns[0]) pillOptBtns[0].classList.add('active');
            if (rsvpStatusInput) rsvpStatusInput.value = "Chắc chắn có mặt";

            triggerConfetti();
            showToast("🎉 Cảm ơn bạn đã xác nhận thông tin!");
        });
    }

    // --- MODAL EDIT DATA LOGIC ---
    if (openEditModalBtn) {
        openEditModalBtn.addEventListener('click', () => {
            renderCardData();
            if (editModal) editModal.classList.remove('hidden');
        });
    }

    if (closeEditModalBtn) {
        closeEditModalBtn.addEventListener('click', () => {
            if (editModal) editModal.classList.add('hidden');
        });
    }

    // Close modal when clicking overlay outside card
    if (editModal) {
        editModal.addEventListener('click', (e) => {
            if (e.target === editModal) {
                editModal.classList.add('hidden');
            }
        });
    }

    if (editCardForm) {
        editCardForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const editGuestInvitedName = document.getElementById('editGuestInvitedName');
            const editGraduateName = document.getElementById('editGraduateName');
            const editDegree = document.getElementById('editDegree');
            const editDate = document.getElementById('editDate');
            const editTime = document.getElementById('editTime');
            const editCheckinMinutes = document.getElementById('editCheckinMinutes');
            const editPhone = document.getElementById('editPhone');

            if (editGuestInvitedName) appData.guestInvitedName = editGuestInvitedName.value.trim();
            if (editGraduateName) appData.graduateName = editGraduateName.value.trim();
            if (editDegree) appData.degree = editDegree.value.trim();
            if (editDate) appData.displayDateText = editDate.value.trim();
            if (editTime) appData.ceremonyTime = editTime.value.trim();
            if (editCheckinMinutes) appData.checkinMinutes = editCheckinMinutes.value.trim();
            if (editPhone) appData.contactPhone = editPhone.value.trim();

            localStorage.setItem('vlu_grad_card_data', JSON.stringify(appData));

            renderCardData();
            if (editModal) editModal.classList.add('hidden');
            showToast("✨ Đã cập nhật thông tin thiệp thành công!");
        });
    }

    if (resetDefaultsBtn) {
        resetDefaultsBtn.addEventListener('click', () => {
            if (confirm("Khôi phục tất cả thông tin thiệp về mặc định?")) {
                appData = { ...defaultData };
                localStorage.removeItem('vlu_grad_card_data');
                renderCardData();
                if (editModal) editModal.classList.add('hidden');
                showToast("Đã khôi phục thông tin!");
            }
        });
    }

    // --- CELEBRATION FIREWORKS & CONFETTI ---
    function triggerConfetti() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 }
            });
        }
    }

    // --- SMART PERSONALIZED SHARE LINK BUTTON ---
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            const guestName = prompt("Nhập tên người bạn muốn gửi thiệp (Ví dụ: Anh Nam, Chị Thảo, Bạn Thân...):", appData.guestInvitedName || "Quý Khách");
            if (guestName !== null && guestName.trim() !== "") {
                const cleanGuestName = guestName.trim();
                const baseUrl = window.location.origin + window.location.pathname;
                const personalizedUrl = `${baseUrl}?to=${encodeURIComponent(cleanGuestName)}`;
                
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(personalizedUrl);
                    showToast(`📋 Đã sao chép link cá nhân hóa dành riêng cho "${cleanGuestName}"!`);
                } else {
                    prompt(`Liên kết thiệp mời dành riêng cho "${cleanGuestName}":`, personalizedUrl);
                }
            }
        });
    }

    // --- TOAST NOTIFICATION ---
    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }



    // --- DEVICE VIEW MODE SWITCHER (HAMBURGER DROPDOWN ON LAPTOP/DESKTOP) ---
    const switcherToggleBtn = document.getElementById('switcherToggleBtn');
    const switcherDropdownMenu = document.getElementById('switcherDropdownMenu');
    const switcherIcon = document.getElementById('switcherIcon');
    const switcherBtns = document.querySelectorAll('.switcher-btn');

    if (switcherToggleBtn && switcherDropdownMenu) {
        switcherToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = switcherDropdownMenu.classList.toggle('open');
            if (switcherIcon) {
                if (isOpen) {
                    switcherIcon.classList.remove('fa-bars');
                    switcherIcon.classList.add('fa-xmark');
                } else {
                    switcherIcon.classList.remove('fa-xmark');
                    switcherIcon.classList.add('fa-bars');
                }
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#deviceSwitcherContainer')) {
                switcherDropdownMenu.classList.remove('open');
                if (switcherIcon) {
                    switcherIcon.classList.remove('fa-xmark');
                    switcherIcon.classList.add('fa-bars');
                }
            }
        });
    }

    if (switcherBtns && switcherBtns.length > 0) {
        switcherBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                switcherBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Close dropdown on selection
                if (switcherDropdownMenu) {
                    switcherDropdownMenu.classList.remove('open');
                    if (switcherIcon) {
                        switcherIcon.classList.remove('fa-xmark');
                        switcherIcon.classList.add('fa-bars');
                    }
                }

                const mode = btn.getAttribute('data-mode');
                document.body.classList.remove('view-mode-mobile', 'view-mode-wide');
                
                if (mode === 'mobile') {
                    document.body.classList.add('view-mode-mobile');
                    showToast("📱 Đã chuyển sang chế độ Khung Di Động!");
                } else {
                    document.body.classList.add('view-mode-wide');
                    showToast("🖥️ Đã chuyển sang chế độ Màn Hình Rộng!");
                }
            });
        });
    }

    // --- AUTO-DETECT REAL MOBILE DEVICE & SAMSUNG/ANDROID & IPHONE/IOS FIX ---
    function applyAutoMobileMode() {
        const isAndroid = /Android|Samsung|Linux arm/i.test(navigator.userAgent) || 
                          (!/iPhone|iPad|iPod/i.test(navigator.userAgent) && (('ontouchstart' in window) || navigator.maxTouchPoints > 0) && !navigator.userAgent.includes('Macintosh') && !navigator.userAgent.includes('Windows'));
        if (isAndroid) {
            document.body.classList.add('is-samsung-android');
            document.documentElement.classList.add('is-samsung-android');
        } else {
            document.body.classList.remove('is-samsung-android');
            document.documentElement.classList.remove('is-samsung-android');
        }

        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent) || 
                      (navigator.userAgent.includes('Macintosh') && navigator.maxTouchPoints > 1);
        if (isIOS) {
            document.body.classList.add('is-ios');
            document.documentElement.classList.add('is-ios');
        } else {
            document.body.classList.remove('is-ios');
            document.documentElement.classList.remove('is-ios');
        }

        const isSmallMobilePortrait = window.innerWidth <= 680;
        const isMobileLandscape = (window.innerHeight <= 650 && window.innerWidth <= 1050 && window.innerWidth > window.innerHeight) && 
                                  (('ontouchstart' in window) || navigator.maxTouchPoints > 0) &&
                                  !navigator.userAgent.includes('iPad');
        const isRealMobile = isSmallMobilePortrait || isMobileLandscape;
        const isTablet = !isRealMobile && (window.innerWidth <= 1180 || navigator.userAgent.includes('iPad') || (navigator.userAgent.includes('Macintosh') && navigator.maxTouchPoints > 1));
        const mobileBtn = document.querySelector('.switcher-btn[data-mode="mobile"]');
        const wideBtn = document.querySelector('.switcher-btn[data-mode="wide"]');

        if (isRealMobile) {
            // Trên điện thoại di động (cả dọc và xoay ngang): luôn áp dụng chế độ di động tràn viền
            document.body.classList.remove('view-mode-wide');
            document.body.classList.add('view-mode-mobile');
        } else if (isTablet) {
            // Trên iPad / Máy tính bảng: mặc định là chế độ Màn Hình Rộng và hỗ trợ chuyển đổi cả 2 chế độ
            document.body.classList.add('is-ipad', 'is-touch-device');
            if (!document.body.classList.contains('view-mode-mobile') &&
                !document.body.classList.contains('view-mode-wide')) {
                document.body.classList.add('view-mode-wide');
                if (wideBtn) wideBtn.classList.add('active');
            }
        } else {
            // Trên Laptop / PC: mặc định là chế độ Màn Hình Rộng
            if (!document.body.classList.contains('view-mode-mobile') &&
                !document.body.classList.contains('view-mode-wide')) {
                document.body.classList.add('view-mode-wide');
                if (wideBtn) wideBtn.classList.add('active');
            }
        }

        // ĐẶC TRỊ SAMSUNG / ANDROID KHI XOAY NGANG: ẨN RIÊNG PHẦN SASH BÊN TRONG THIỆP
        if (isAndroid && isMobileLandscape) {
            const mainSash = document.querySelector('.main-sash-ribbon');
            const coverSash = document.querySelector('.cover-sash-ribbon');
            if (mainSash) {
                mainSash.style.setProperty('display', 'none', 'important');
            }
            if (coverSash) {
                coverSash.style.setProperty('position', 'fixed', 'important');
                coverSash.style.setProperty('left', '4px', 'important');
                coverSash.style.setProperty('right', 'auto', 'important');
                coverSash.style.setProperty('top', '6px', 'important');
                coverSash.style.setProperty('bottom', '6px', 'important');
                coverSash.style.setProperty('height', 'calc(100vh - 12px)', 'important');
                coverSash.style.setProperty('max-height', 'calc(100vh - 12px)', 'important');
                coverSash.style.setProperty('width', 'auto', 'important');
                coverSash.style.setProperty('z-index', '99999', 'important');
                coverSash.style.setProperty('display', 'block', 'important');
            }
        }

        // ĐẶC TRỊ IPAD KHI ĐỂ MÀN HÌNH DỌC: ẨN SASH BÊN TRONG THIỆP ĐỂ KHÔNG CHE NỘI DUNG
        if (isTablet && window.innerHeight > window.innerWidth) {
            const mainSash = document.querySelector('.main-sash-ribbon');
            if (mainSash) mainSash.style.setProperty('display', 'none', 'important');
        }
    }

    window.addEventListener('resize', applyAutoMobileMode);
    window.addEventListener('orientationchange', () => {
        setTimeout(applyAutoMobileMode, 100);
    });

    // --- MOBILE & IPAD DIRECT DRIVE REDIRECT HANDLER ---
    document.querySelectorAll('.mobile-video-overlay-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const isIPadOrTablet = navigator.userAgent.includes('iPad') || 
                                   (navigator.userAgent.includes('Macintosh') && navigator.maxTouchPoints > 1) ||
                                   document.body.classList.contains('is-ipad') ||
                                   document.body.classList.contains('is-touch-device') ||
                                   (window.innerWidth <= 1180 && ('ontouchstart' in window || navigator.maxTouchPoints > 0));
            const isMobile = document.body.classList.contains('view-mode-mobile') || window.innerWidth <= 768;

            if (isMobile || isIPadOrTablet) {
                const url = link.getAttribute('href');
                if (url) {
                    window.open(url, '_blank');
                    e.preventDefault();
                }
            }
        });
    });

    // --- MOBILE / IPHONE / SAMSUNG ONLY DIRECT DRIVE IMAGE HANDLER ---
    document.querySelectorAll('.mobile-drive-image-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const isMobile = document.body.classList.contains('view-mode-mobile') || 
                             document.body.classList.contains('is-ios') || 
                             document.body.classList.contains('is-samsung-android') || 
                             window.innerWidth <= 768 ||
                             ('ontouchstart' in window);

            if (!isMobile) {
                // Strictly disable opening on desktop PC / Màn hình rộng
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });
    });

    // --- CUSTOM POSTER BOX DESKTOP HANDLER ---
    document.querySelectorAll('.custom-poster-box').forEach(box => {
        box.addEventListener('click', () => {
            const thumb = box.querySelector('.video-custom-thumbnail-img');
            const playBtn = box.querySelector('.video-play-center-btn');
            if (thumb) thumb.style.opacity = '0';
            if (playBtn) playBtn.style.opacity = '0';
            setTimeout(() => {
                if (thumb) thumb.style.display = 'none';
                if (playBtn) playBtn.style.display = 'none';
            }, 300);
        });
    });

    // --- VIDEO-AUDIO SYNCHRONIZATION (TỰ ĐỘNG TẮT NHẠC KHI XEM VIDEO VÀ PHỤC HỒI SAU ĐÚNG 2S THÀNH VÒNG LẶP LIÊN TỤC) ---
    function initVideoAudioSync() {
        const videoBoxes = document.querySelectorAll('.drive-video-frame-box');
        let lastPointerX = 0;
        let lastPointerY = 0;
        let isScrubbingNearEnd = false;

        // Kiểm tra vùng tương tác có thuộc về mốc "Giây cuối cùng" của thanh tiến trình video không
        function checkTimelineEndZone(box, clientX, clientY) {
            if (!box) return false;
            const rect = box.getBoundingClientRect();
            // Chiều dọc: Nằm ở dải điều khiển dưới đáy khung video (bottom 80px)
            const isNearBottom = (clientY >= rect.bottom - 80) && (clientY <= rect.bottom + 40);
            // Chiều ngang: Nằm ở mốc giây cuối cùng (khoảng 35% phía bên phải của khung video)
            const isNearRight = (clientX >= rect.right - (rect.width * 0.40)) && (clientX <= rect.right + 45);
            return isNearBottom && isNearRight;
        }

        // Theo dõi tọa độ chuột liên tục trên màn hình máy tính
        window.addEventListener('mousemove', (e) => {
            lastPointerX = e.clientX;
            lastPointerY = e.clientY;

            // Nếu đang xem video trên máy tính, phát hiện người dùng di chuyển chuột đến vùng giây cuối
            if (activePlayingBox && isVideoPlaying) {
                if (checkTimelineEndZone(activePlayingBox, e.clientX, e.clientY)) {
                    isScrubbingNearEnd = true;
                }
            }
        }, { passive: true });

        // Khi người dùng thả chuột (mouseup / pointerup) sau khi kéo tua:
        function onPointerRelease(e) {
            if (isDesktopWide()) return;
            const x = e ? e.clientX : lastPointerX;
            const y = e ? e.clientY : lastPointerY;
            const targetBox = activePlayingBox || (e && e.target && e.target.closest ? e.target.closest('.drive-video-frame-box') : null);

            if (targetBox && (isScrubbingNearEnd || checkTimelineEndZone(targetBox, x, y))) {
                console.log("Phát hiện người dùng vừa kéo/tua hoặc bấm vào mốc giây cuối cùng của video!");
                isScrubbingNearEnd = false;
                onVideoReachedLastSecond();
            }
        }
        window.addEventListener('mouseup', onPointerRelease);
        window.addEventListener('pointerup', onPointerRelease);

        videoBoxes.forEach(box => {
            // Theo dõi chuột khi hover vào khung video
            box.addEventListener('mouseenter', () => {
                isCursorOverVideo = true;
            });

            box.addEventListener('mouseleave', () => {
                isCursorOverVideo = false;
                if (!isDesktopWide()) {
                    // Khi người xem rê chuột ra ngoài khung video sau khi xem hoặc kéo tua đến cuối:
                    if (isVideoPlaying && !videoEndedPendingMusic) {
                        isScrubbingNearEnd = false;
                        onVideoReachedLastSecond();
                    }
                }
            });

            // Bắt sự kiện click / pointerdown vào khung video
            box.addEventListener('pointerdown', (e) => {
                // Bỏ qua nếu bấm vào huy hiệu trạng thái hoặc nút bật lại nhạc
                if (e.target && e.target.closest && e.target.closest('.video-playback-status-pill')) {
                    return;
                }
                activePlayingBox = box;
                lastPointerX = e.clientX;
                lastPointerY = e.clientY;
                if (!isDesktopWide() && checkTimelineEndZone(box, e.clientX, e.clientY)) {
                    isScrubbingNearEnd = true;
                    onVideoReachedLastSecond();
                    return;
                }
                onVideoPlayStarted(box, 'box pointerdown');
            });

            box.addEventListener('click', (e) => {
                // Bỏ qua nếu bấm vào huy hiệu trạng thái hoặc nút bật lại nhạc
                if (e.target && e.target.closest && e.target.closest('.video-playback-status-pill')) {
                    return;
                }
                activePlayingBox = box;
                lastPointerX = e.clientX;
                lastPointerY = e.clientY;
                if (!isDesktopWide() && checkTimelineEndZone(box, e.clientX, e.clientY)) {
                    isScrubbingNearEnd = true;
                    onVideoReachedLastSecond();
                    return;
                }
                onVideoPlayStarted(box, 'box click');
            });
        });

        // Trên Mobile / iPad: Bắt sự kiện khi chạm/bấm vào liên kết mở video Drive
        document.querySelectorAll('.mobile-video-overlay-link').forEach(link => {
            const parentBox = link.closest('.drive-video-frame-box');
            link.addEventListener('click', () => {
                activePlayingBox = parentBox;
                onVideoPlayStarted(parentBox, 'mobile overlay link click');
            });
            link.addEventListener('touchstart', () => {
                activePlayingBox = parentBox;
                onVideoPlayStarted(parentBox, 'mobile overlay touchstart');
            }, { passive: true });
        });

        // Bắt sự kiện click vào poster thumbnail của video ngang (nếu có)
        document.querySelectorAll('.custom-poster-box').forEach(box => {
            box.addEventListener('click', () => {
                activePlayingBox = box;
                onVideoPlayStarted(box, 'custom poster click');
            });
        });

        // Xử lý Desktop khi người dùng nhấp vào iframe video:
        // Cửa sổ chính sẽ mất focus (window.blur).
        window.addEventListener('blur', () => {
            if (isCursorOverVideo || (document.activeElement && document.activeElement.tagName === 'IFRAME')) {
                const parentBox = document.activeElement && document.activeElement.closest ? document.activeElement.closest('.drive-video-frame-box') : activePlayingBox;
                onVideoPlayStarted(parentBox, 'desktop iframe blur');
            }
        });

        // XỬ LÝ CHẾ ĐỘ PHÓNG TO TOÀN MÀN HÌNH (DESKTOP FULLSCREEN):
        // Quy tắc chuẩn: Chỉ hiển thị Khung hình 1 ở chế độ xem mặc định, ẩn khi phóng to toàn màn hình
        function handleFullscreenChange() {
            const isFullscreen = isCurrentlyInFullscreen();
            if (isFullscreen) {
                if (isPlayingAudio) pauseAudio();
                console.log("Đang hiển thị video ở chế độ phóng to toàn màn hình.");
                // Ẩn huy hiệu trên tất cả khung video khi phóng to toàn màn hình
                document.querySelectorAll('.video-playback-status-pill').forEach(b => {
                    b.style.display = 'none';
                });
            } else {
                console.log("Người xem đã thoát chế độ phóng to toàn màn hình.");
                if (isDesktopWide()) {
                    // Trên Desktop: Hiển thị lại Khung hình 1 ở chế độ xem mặc định nếu nhạc đang tắt do xem video
                    if (musicPausedByVideo && !isPlayingAudio) {
                        showDesktopKhung1OnAllVideos();
                    }
                } else {
                    if (isVideoPlaying || videoEndedPendingMusic || activePlayingBox) {
                        onVideoReachedLastSecond();
                    }
                }
            }
        }
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        // KHI NGƯỜI DÙNG QUAY TRỞ LẠI TAB THIỆP:
        function handleTabReturn() {
            if (isDesktopWide()) {
                if (musicPausedByVideo && !isPlayingAudio && !isCurrentlyInFullscreen()) {
                    showDesktopKhung1OnAllVideos();
                }
                return;
            }
            if (isVideoPlaying || videoEndedPendingMusic || activePlayingBox) {
                onVideoReachedLastSecond();
            }
        }
        window.addEventListener('focus', handleTabReturn);
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                handleTabReturn();
            }
        });

        // Khi người dùng bấm chuột hoặc chạm ra ngoài video (trên trang thiệp):
        function onInteractOutsideVideo(e) {
            // Nếu người xem bấm vào khung video thì bỏ qua
            if (e && e.target && e.target.closest && e.target.closest('.drive-video-frame-box')) {
                return;
            }
            if (isDesktopWide()) return; // Trên Desktop không tự động bật nhạc khi bấm ra ngoài

            if (isVideoPlaying && !videoEndedPendingMusic) {
                onVideoReachedLastSecond();
            }
        }
        document.addEventListener('click', onInteractOutsideVideo);
        document.addEventListener('touchstart', onInteractOutsideVideo, { passive: true });

        // Khi người dùng cuộn trang rời khỏi video đang phát:
        let scrollDebounceTimer = null;
        window.addEventListener('scroll', () => {
            if (isDesktopWide()) return; // Trên Desktop không tự động bật nhạc khi cuộn trang
            if (!activePlayingBox || !isVideoPlaying || videoEndedPendingMusic) return;
            clearTimeout(scrollDebounceTimer);
            scrollDebounceTimer = setTimeout(() => {
                if (activePlayingBox) {
                    const rect = activePlayingBox.getBoundingClientRect();
                    const isOutOfView = (rect.bottom < 50) || (rect.top > window.innerHeight - 50);
                    if (isOutOfView) {
                        onVideoReachedLastSecond();
                    }
                }
            }, 300);
        }, { passive: true });

        // Phím ESC trên máy tính:
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.keyCode === 27) {
                setTimeout(() => {
                    if (isDesktopWide()) {
                        if (musicPausedByVideo && !isPlayingAudio && !isCurrentlyInFullscreen()) {
                            showDesktopKhung1OnAllVideos();
                        }
                    } else {
                        if (isVideoPlaying || videoEndedPendingMusic || activePlayingBox) {
                            if (!isCurrentlyInFullscreen()) {
                                onVideoReachedLastSecond();
                            }
                        }
                    }
                }, 100);
            }
        });

        // HÀM PHÂN TÍCH TIN NHẮN TỪ DRIVE / YOUTUBE HTML5 PLAYER (HỖ TRỢ CẢ XEM HẾT & TUA / KÉO ĐẾN CUỐI)
        function parsePlayerMessage(eventData) {
            if (!eventData) return null;
            let data = eventData;
            let rawStr = typeof eventData === 'string' ? eventData : '';

            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data);
                } catch (_) {
                    data = null;
                }
            }

            // Trích xuất currentTime và duration
            let curTime = null;
            let totalDur = null;

            if (data && typeof data === 'object') {
                if (data.info && typeof data.info === 'object') {
                    if (typeof data.info.currentTime === 'number') curTime = data.info.currentTime;
                    if (typeof data.info.duration === 'number') totalDur = data.info.duration;
                }
                if (typeof data.currentTime === 'number') curTime = data.currentTime;
                if (typeof data.duration === 'number') totalDur = data.duration;
            }

            // Fallback trích xuất bằng regex nếu là chuỗi JSON
            if (rawStr && (curTime === null || totalDur === null)) {
                const curMatch = rawStr.match(/["']?currentTime["']?\s*:\s*(\d+(\.\d+)?)/i);
                const durMatch = rawStr.match(/["']?duration["']?\s*:\s*(\d+(\.\d+)?)/i);
                if (curMatch) curTime = parseFloat(curMatch[1]);
                if (durMatch) totalDur = parseFloat(durMatch[1]);
            }

            // KIỂM TRA ĐẾN GIÂY CUỐI CÙNG (Xem bình thường hoặc bấm tua / kéo đến cuối):
            // Nếu vị trí video cách cuối video <= 2.5 giây hoặc đạt từ 95% thời lượng trở lên:
            let isAtEnd = false;
            if (typeof curTime === 'number' && typeof totalDur === 'number' && totalDur > 0) {
                if (curTime >= totalDur - 2.5 || (totalDur >= 5 && curTime / totalDur >= 0.95)) {
                    isAtEnd = true;
                }
            }

            // Trích xuất trạng thái player (0: ended, 1: playing, 2: paused)
            let state = null;
            if (data && typeof data === 'object') {
                if (typeof data.info === 'number') state = data.info;
                if (data.info && typeof data.info.playerState === 'number') state = data.info.playerState;
                if (typeof data.playerState === 'number') state = data.playerState;
                if (data.event === 'onStateChange' && typeof data.info === 'number') state = data.info;
            } else if (rawStr) {
                if (rawStr.includes('"info":0') || rawStr.includes('"playerState":0') || rawStr.includes('"status":"ended"')) {
                    state = 0;
                } else if (rawStr.includes('"info":2') || rawStr.includes('"playerState":2') || rawStr.includes('"status":"paused"')) {
                    state = 2;
                } else if (rawStr.includes('"info":1') || rawStr.includes('"playerState":1') || rawStr.includes('"status":"playing"')) {
                    state = 1;
                }
            }

            // 1. Nếu chạm mốc giây cuối cùng (kể cả khi tua/kéo đến cuối hoặc hết video tự nhiên):
            if (isAtEnd || state === 0 || (data && (data.status === 'ended' || data.event === 'ended' || data.event === 'videoEnded'))) {
                return { ended: true, isAtEnd: true, curTime, totalDur };
            }

            // 2. Nếu người xem bấm tạm dừng ở giữa video (chưa đến giây cuối):
            if (state === 2 || (data && (data.status === 'paused' || data.event === 'paused'))) {
                return { paused: true, curTime, totalDur };
            }

            // 3. Nếu video đang phát:
            if (state === 1 || (data && (data.status === 'playing' || data.event === 'playing'))) {
                return { playing: true, curTime, totalDur };
            }

            return null;
        }

        // LẮNG NGHE SỰ KIỆN TỪ VIDEO PLAYER:
        window.addEventListener('message', (event) => {
            try {
                const result = parsePlayerMessage(event.data);
                if (!result) return;

                if (result.ended) {
                    console.log("Phát hiện video đến giây cuối cùng (kết thúc hoặc tua/kéo đến cuối qua message):", result);
                    onVideoReachedLastSecond();
                } else if (result.paused) {
                    onVideoPaused();
                } else if (result.playing) {
                    const targetBox = event.source && event.source.frameElement ? event.source.frameElement.closest('.drive-video-frame-box') : null;
                    onVideoPlayStarted(targetBox, 'player message playing');
                }
            } catch (_) {}
        });
    }

    // Run Init
    init();
});

