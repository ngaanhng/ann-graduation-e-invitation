/* ==========================================================================
   VAN LANG UNIVERSITY GRADUATION E-INVITATION CARD JAVASCRIPT LOGIC
   Tân khoa: Nguyễn Nga Anh (Truyền thông đa phương tiện)
   Includes Continuous Sparkling White Glitter Stars Animation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

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
        renderCardData();
        startCountdown();
        renderCalendar();
        initPillOptions();
        initSparklingGlitterStars();
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
            envelopeScreen.classList.add('hidden');
            mainInvitation.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            applyAutoMobileMode();
        }, 600);
    }

    if (reopenEnvelopeBtn) {
        reopenEnvelopeBtn.addEventListener('click', () => {
            mainInvitation.classList.add('hidden');
            envelopeScreen.classList.remove('hidden');
            envelopeScreen.style.opacity = '1';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            applyAutoMobileMode();
        });
    }

    // --- AUDIO BACKGROUND MUSIC ---
    const audioStreamUrls = [
        "assets/bg_music_custom.mp3",
        "https://docs.google.com/uc?export=download&id=1-KwzbdjwwSYXmTSmGKDw95d0FGd9l_a1",
        "https://drive.google.com/uc?export=download&id=1-KwzbdjwwSYXmTSmGKDw95d0FGd9l_a1"
    ];
    let currentAudioUrlIndex = 0;

    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', () => {
            if (isPlayingAudio) {
                pauseAudio();
            } else {
                playAudio();
            }
        });
    }

    const audioStatusText = document.getElementById('audioStatusText');

    function playAudio() {
        if (!bgMusic) return;
        bgMusic.play().then(() => {
            isPlayingAudio = true;
            if (audioToggleBtn) {
                audioToggleBtn.classList.add('playing');
            }
            if (audioStatusText) {
                audioStatusText.textContent = "BẬT";
                audioStatusText.classList.add('active');
            }
        }).catch(err => {
            console.log("Autoplay / Audio load note:", err);
            // Attempt fallback Google Drive stream URL if primary source fails
            if (currentAudioUrlIndex < audioStreamUrls.length - 1) {
                currentAudioUrlIndex++;
                bgMusic.src = audioStreamUrls[currentAudioUrlIndex];
                bgMusic.load();
                bgMusic.play().then(() => {
                    isPlayingAudio = true;
                    if (audioToggleBtn) audioToggleBtn.classList.add('playing');
                    if (audioStatusText) {
                        audioStatusText.textContent = "BẬT";
                        audioStatusText.classList.add('active');
                    }
                }).catch(e => console.log("Audio fallback notice:", e));
            }
        });
    }

    function pauseAudio() {
        if (!bgMusic) return;
        bgMusic.pause();
        isPlayingAudio = false;
        if (audioToggleBtn) {
            audioToggleBtn.classList.remove('playing');
        }
        if (audioStatusText) {
            audioStatusText.textContent = "TẮT";
            audioStatusText.classList.remove('active');
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



    // --- DEVICE VIEW MODE SWITCHER (MOBILE / DESKTOP WIDE) ---
    const switcherBtns = document.querySelectorAll('.switcher-btn');
    if (switcherBtns && switcherBtns.length > 0) {
        switcherBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                switcherBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
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

        // ĐẶC TRỊ SAMSUNG / ANDROID KHI XOAY NGANG
        if (isAndroid && isMobileLandscape) {
            const mainSash = document.querySelector('.main-sash-ribbon');
            const coverSash = document.querySelector('.cover-sash-ribbon');
            [mainSash, coverSash].forEach(sash => {
                if (sash) {
                    sash.style.setProperty('position', 'fixed', 'important');
                    sash.style.setProperty('left', '8px', 'important');
                    sash.style.setProperty('right', 'auto', 'important');
                    sash.style.setProperty('top', '6px', 'important');
                    sash.style.setProperty('bottom', '6px', 'important');
                    sash.style.setProperty('height', 'calc(100vh - 12px)', 'important');
                    sash.style.setProperty('max-height', 'calc(100vh - 12px)', 'important');
                    sash.style.setProperty('width', 'auto', 'important');
                    sash.style.setProperty('z-index', '99999', 'important');
                    sash.style.setProperty('display', 'block', 'important');
                }
            });
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

    // Run Init
    init();
});

