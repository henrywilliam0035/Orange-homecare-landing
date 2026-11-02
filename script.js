/* =========================================================
   Orange Homecare — site script
   Prices for the ORDER FORM live in PLANS below.
   The pricing cards are plain HTML in index.html and product.html.
   ========================================================= */
const WHATSAPP_NUMBER = '2348134566721';
const YEARLY_DISCOUNT = 0.10; // 10% off when paying for 12 months upfront

const PLANS = {
    basic:    { name: 'Basic',    size: '1L', monthly: 3000,  audience: 'small households' },
    family:   { name: 'Family',   size: '3L', monthly: 8000,  audience: 'families' },
    business: { name: 'Business', size: '5L', monthly: 14000, audience: 'hotels & restaurants' }
};

/* ---------- Price helpers ---------- */
const naira = (n) => '₦' + Math.round(n).toLocaleString('en-US');

function planPricing(planKey, billing) {
    const plan = PLANS[planKey];
    const fullYear = plan.monthly * 12;
    const yearly = Math.round(fullYear * (1 - YEARLY_DISCOUNT));
    if (billing === 'yearly') {
        return {
            amount: yearly,
            period: '/year',
            label: naira(yearly) + '/year',
            regular: fullYear,
            saving: fullYear - yearly,
            perMonth: yearly / 12
        };
    }
    return {
        amount: plan.monthly,
        period: '/month',
        label: naira(plan.monthly) + '/month',
        regular: plan.monthly,
        saving: 0,
        perMonth: plan.monthly
    };
}

function billingText(billing) {
    return billing === 'yearly' ? 'Yearly (12 months, 10% off)' : 'Monthly';
}

function whatsappLink(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
}

function openWhatsApp(url) {
    // Note: passing 'noopener' makes window.open return null even when it works,
    // which used to trigger the fallback and open WhatsApp twice.
    const win = window.open(url, '_blank');
    if (win) {
        try { win.opener = null; } catch (err) { /* ignore */ }
    } else {
        window.location.href = url; // pop-up genuinely blocked: open in same tab
    }
}

/* ---------- Order form (contact page) ---------- */
const orderForm = document.getElementById('orderForm');

function readOrder() {
    const planKey = document.getElementById('plan').value;
    const billing = document.getElementById('billing').value === 'yearly' ? 'yearly' : 'monthly';
    const qty = Math.max(1, parseInt(document.getElementById('quantity').value, 10) || 1);
    return { planKey, billing, qty };
}

function renderOrderSummary() {
    const box = document.getElementById('orderSummary');
    if (!box) return;
    const { planKey, billing, qty } = readOrder();
    if (!PLANS[planKey]) {
        box.innerHTML = '<p class="order-summary-empty">Choose a plan to see your price.</p>';
        return;
    }
    const plan = PLANS[planKey];
    const p = planPricing(planKey, billing);
    const total = p.amount * qty;
    const saving = p.saving * qty;

    box.innerHTML = `
        <p class="order-summary-title">Your order</p>
        <div class="order-summary-line"><span>${plan.name} — ${plan.size} monthly refill</span><span>${p.label}</span></div>
        <div class="order-summary-line"><span>Billing</span><span>${billingText(billing)}</span></div>
        <div class="order-summary-line"><span>Number of plans</span><span>× ${qty}</span></div>
        ${saving ? `<div class="order-summary-line saving"><span>Yearly saving</span><span>− ${naira(saving)}</span></div>` : ''}
        <div class="order-summary-line order-summary-total"><span>Total</span><span>${naira(total)}${p.period}</span></div>`;
}

if (orderForm) {
    // Pre-select from links like contact.html?plan=family&billing=yearly#order
    const params = new URLSearchParams(window.location.search);
    if (PLANS[params.get('plan')]) document.getElementById('plan').value = params.get('plan');
    if (params.get('billing') === 'yearly') document.getElementById('billing').value = 'yearly';

    ['plan', 'billing', 'quantity'].forEach((id) => {
        const el = document.getElementById(id);
        el.addEventListener('change', renderOrderSummary);
        el.addEventListener('input', renderOrderSummary);
    });
    renderOrderSummary();

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const { planKey, billing, qty } = readOrder();
        const plan = PLANS[planKey];
        const p = planPricing(planKey, billing);
        const city = document.getElementById('city');
        const notes = document.getElementById('message').value.trim();

        const lines = [
            '*New Order from Website*',
            '',
            `*Name:* ${document.getElementById('fullName').value.trim()}`,
            `*Phone:* ${document.getElementById('phone').value.trim()}`,
            `*Email:* ${document.getElementById('email').value.trim()}`,
            '',
            `*Plan:* ${plan.name} — ${plan.size} monthly refill`,
            `*Billing:* ${billingText(billing)}`,
            `*Price per plan:* ${p.label}` + (p.saving ? ` (save ${naira(p.saving)})` : ''),
            `*Number of plans:* ${qty}`,
            `*Total:* ${naira(p.amount * qty)}${p.period}`,
            '',
            `*City:* ${city.options[city.selectedIndex].text}`,
            `*Delivery address:* ${document.getElementById('address').value.trim()}`,
            `*Notes:* ${notes || 'None'}`
        ];

        openWhatsApp(whatsappLink(lines.join('\n')));
        orderForm.reset();
        renderOrderSummary();
    });
}

/* ---------- Contact form ---------- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const subject = document.getElementById('subject');
        const lines = [
            '*New Message from Website*',
            '',
            `*Name:* ${document.getElementById('contactName').value.trim()}`,
            `*Email:* ${document.getElementById('contactEmail').value.trim()}`,
            `*Phone:* ${document.getElementById('contactPhone').value.trim() || 'Not provided'}`,
            `*Subject:* ${subject.options[subject.selectedIndex].text}`,
            '',
            document.getElementById('contactMessage').value.trim()
        ];
        openWhatsApp(whatsappLink(lines.join('\n')));
        contactForm.reset();
    });
}

/* ---------- Mobile menu ---------- */
// The menu opens and closes on its own via a hidden checkbox (pure HTML/CSS).
// This script only adds: close after tapping a link, tapping outside, or Escape,
// plus keyboard support and screen-reader state.
const navCheckbox = document.getElementById('nav-toggle');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

function syncMenuState() {
    if (!navCheckbox || !menuToggle) return;
    const open = navCheckbox.checked;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

function setMenu(open) {
    if (!navCheckbox) return;
    navCheckbox.checked = open;
    syncMenuState();
}

if (navCheckbox && menuToggle && navMenu) {
    navCheckbox.addEventListener('change', syncMenuState);
    menuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setMenu(!navCheckbox.checked);
        }
    });
    navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('click', (e) => {
        // Ignore clicks on the menu, the ☰ label, and the hidden checkbox the label toggles
        if (navMenu.contains(e.target) || menuToggle.contains(e.target) || e.target === navCheckbox) return;
        setMenu(false);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setMenu(false);
    });
}

/* ---------- Smooth scroll for in-page links ---------- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ---------- Fade sections in on scroll ---------- */
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'none';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('section:not(.hero):not(.page-header)').forEach((section) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(24px)';
        section.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
        observer.observe(section);
    });
}
