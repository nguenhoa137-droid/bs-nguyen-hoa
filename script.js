/* ==========================================================================
   BS. NGUYỄN HOA - BÁC SĨ NỘI KHOA & SIÊU ÂM | NĂNG LƯỢNG SỐNG KHỎE
   Interactive Client-Side Logic (100% Static & GitHub Pages Compatible)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark / Light Theme Toggle
    const themeToggleBtn = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('bshoa_theme') || 'light';

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('bshoa_theme', next);
            updateThemeIcon(next);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (!icon) return;
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // 2. Sticky Header & Mobile Menu
    const header = document.querySelector('.site-header');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    window.addEventListener('scroll', () => {
        if (!header) return;
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.className = navMenu.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
            }
        });

        // Close mobile menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    // 3. Filter Tabs for "Năng Lượng Sống Khỏe"
    const filterButtons = document.querySelectorAll('.filter-btn');
    const wellnessCards = document.querySelectorAll('.wellness-card');

    if (filterButtons.length > 0 && wellnessCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.getAttribute('data-filter');
                wellnessCards.forEach(card => {
                    const cardCat = card.getAttribute('data-category');
                    if (category === 'all' || cardCat === category) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 4. BMI & Cardiovascular Wellness Calculator
    const bmiForm = document.getElementById('bmiForm');
    const bmiResult = document.getElementById('bmiResult');

    if (bmiForm && bmiResult) {
        bmiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const heightCm = parseFloat(document.getElementById('heightCm').value);
            const weightKg = parseFloat(document.getElementById('weightKg').value);
            const age = parseInt(document.getElementById('ageInput').value || '40', 10);

            if (!heightCm || !weightKg || heightCm < 80 || weightKg < 20) {
                bmiResult.innerHTML = `<p style="color:#fca5a5;font-weight:600;">Vui lòng nhập chiều cao (cm) và cân nặng (kg) hợp lệ.</p>`;
                bmiResult.classList.add('show');
                return;
            }

            const heightM = heightCm / 100;
            const bmi = (weightKg / (heightM * heightM)).toFixed(1);

            let status = '';
            let advice = '';
            let badgeColor = '#4ade80';

            if (bmi < 18.5) {
                status = 'Cân nặng thấp (Gầy)';
                badgeColor = '#fbbf24';
                advice = 'Bạn nên bổ sung dinh dưỡng cân đối giàu đạm thực vật, vitamin và khám nội khoa tổng quát để đánh giá khả năng hấp thu.';
            } else if (bmi >= 18.5 && bmi < 23) {
                status = 'Cân nặng lý tưởng (Chuẩn Á Đông)';
                badgeColor = '#4ade80';
                advice = 'Tuyệt vời! Hãy duy trì vận động 30 phút mỗi ngày, hít thở sâu và siêu âm kiểm tra sức khỏe định kỳ 6 tháng/lần.';
            } else if (bmi >= 23 && bmi < 25) {
                status = 'Thừa cân nhẹ (Tiền béo phì)';
                badgeColor = '#f59e0b';
                advice = 'Cần lưu ý giảm tinh bột tinh chế, tăng rau xanh và kiểm tra mỡ máu, đường huyết, siêu âm gan nhiễm mỡ sớm.';
            } else {
                status = 'Béo phì (Nguy cơ Tim mạch & Chuyển hóa)';
                badgeColor = '#f43f5e';
                advice = 'Khuyến nghị kiểm tra huyết áp, đường huyết (HbA1c), mỡ máu và siêu âm ổ bụng/tim mạch cùng BS. Nguyễn Hoa để có phác đồ điều chỉnh an toàn.';
            }

            const ageNote = age >= 45
                ? '<br><small style="color:#99f6e4;">💡 Ở độ tuổi ' + age + ', BS. Hoa khuyên bạn nên kiểm tra định kỳ Huyết áp, Đường huyết và Siêu âm Tuyến giáp/Ổ bụng.</small>'
                : '';

            bmiResult.innerHTML = `
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                    <strong style="font-size:1.1rem;">Chỉ số BMI của bạn: <span style="color:${badgeColor};font-size:1.3rem;">${bmi}</span></strong>
                    <span style="background:${badgeColor};color:#0f172a;padding:3px 10px;border-radius:99px;font-size:0.78rem;font-weight:800;">${status}</span>
                </div>
                <p style="font-size:0.9rem;color:#f1f5f9;margin:0;"><strong>Lời khuyên từ BS. Nguyễn Hoa:</strong> ${advice}${ageNote}</p>
            `;
            bmiResult.classList.add('show');
        });
    }

    // 5. Image Lightbox Modal
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    document.querySelectorAll('[data-lightbox]').forEach(item => {
        item.addEventListener('click', () => {
            if (!lightboxModal || !lightboxImg) return;
            const imgEl = item.querySelector('img') || item;
            const src = imgEl.getAttribute('src');
            const caption = item.getAttribute('data-caption') || imgEl.getAttribute('alt') || 'BS. Nguyễn Thị Hoa';
            lightboxImg.setAttribute('src', src);
            if (lightboxCaption) lightboxCaption.textContent = caption;
            lightboxModal.classList.add('active');
        });
    });

    if (lightboxClose && lightboxModal) {
        lightboxClose.addEventListener('click', () => lightboxModal.classList.remove('active'));
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('active');
            }
        });
    }

    // 6. Appointment / Consultation Form Handler
    const bookingForm = document.getElementById('bookingForm');
    const bookingFeedback = document.getElementById('bookingFeedback');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = (document.getElementById('patientName')?.value || '').trim();
            const phone = (document.getElementById('patientPhone')?.value || '').trim();
            const service = (document.getElementById('patientService')?.value || 'Khám Nội khoa & Siêu âm').trim();
            const note = (document.getElementById('patientNote')?.value || '').trim();

            const summaryText = `Xin chào BS. Nguyễn Hoa, tôi là ${fullName} (SĐT: ${phone}). Tôi muốn đăng ký tư vấn: ${service}. Ghi chú: ${note || 'Không có'}.`;

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(summaryText).catch(() => {});
            }

            if (bookingFeedback) {
                bookingFeedback.style.display = 'block';
                bookingFeedback.innerHTML = `
                    <div style="padding:16px;border-radius:12px;background:rgba(13,148,136,0.12);border:1px solid #0d9488;margin-top:14px;">
                        <strong style="color:#0d9488;display:block;margin-bottom:6px;">
                            <i class="fas fa-check-circle"></i> Đã tạo thông tin đăng ký khám thành công!
                        </strong>
                        <p style="font-size:0.9rem;margin-bottom:12px;">
                            Nội dung: <em>"${summaryText}"</em>
                        </p>
                        <div style="display:flex;gap:10px;flex-wrap:wrap;">
                            <a href="tel:0385168303" class="btn btn-primary" style="padding:9px 18px;font-size:0.86rem;">
                                <i class="fas fa-phone-alt"></i> Gọi ngay: 0385.168.303
                            </a>
                            <a href="https://zalo.me/0385168303" target="_blank" rel="noopener" class="btn btn-accent" style="padding:9px 18px;font-size:0.86rem;">
                                <i class="fas fa-comment-medical"></i> Nhắn Zalo BS. Hoa
                            </a>
                            <a href="https://www.facebook.com/nguyen.thi.hoa.527569/" target="_blank" rel="noopener" class="btn btn-facebook" style="padding:9px 18px;font-size:0.86rem;">
                                <i class="fab fa-facebook-messenger"></i> Nhắn qua Facebook
                            </a>
                        </div>
                    </div>
                `;
            }
        });
    }
});
