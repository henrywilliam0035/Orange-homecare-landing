/* =========================================================
   Orange Homecare — site script
   Change prices ONLY here. Cards, buttons, the order form
   and every WhatsApp message read from this table.
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
    const win = window.open(url, '_blank', 'noopener');
    if (!win) window.location.href = url; // pop-up blocked: open in same tab
}

/* ---------- WhatsApp message for a plan button ---------- */
function planMessage(planKey, billing) {
    const plan = PLANS[planKey];
    const p = planPricing(planKey, billing);
    const priceLine = billing === 'yearly'
        ? `${p.label} (instead of ${naira(p.regular)} — I save ${naira(p.saving)})`
        : p.label;

    return [
        'Hello Orange Homecare!',
        "I'd like to order Gleam Dish Wash.",
        '',
        `*Plan:* ${plan.name} — ${plan.size} monthly refill`,
        `*Billing:* ${billingText(billing)}`,
        `*Price:* ${priceLine}`,
        '',
        '*My name:* ',
        '*Delivery address:* '
    ].join('\n');
}

/* ---------- Pricing cards + billing toggle ---------- */
let currentBilling = 'monthly';

function renderPricing() {
    document.querySelectorAll('.pricing-card[data-plan]').forEach((card) => {
        const key = card.dataset.plan;
        if (!PLANS[key]) return;
        const p = planPricing(key, currentBilling);
        const yearlyP = planPricing(key, 'yearly');

        const amount = card.querySelector('.price-amount');
        const period = card.querySelector('.pricing-period');
        const note = card.querySelector('.price-note');
        if (amount) amount.textContent = naira(p.amount);
        if (period) period.textContent = p.period;

        if (note) {
            note.innerHTML = currentBilling === 'yearly'
                ? `<span class="was">${naira(p.regular)}</span>Works out to ${naira(p.perMonth)}/month<br><span class="saving">You save ${naira(p.saving)}</span>`
                : `or ${naira(yearlyP.amount)}/year when you pay yearly<br><span class="saving">Save ${naira(yearlyP.saving)}</span>`;
        }
    });

    document.querySelectorAll('.plan-cta[data-plan]').forEach((btn) => {
        const key = btn.dataset.plan;
        if (!PLANS[key]) return;
        const p = planPricing(key, currentBilling);
        const value = btn.querySelector('.cta-value');
        if (value) value.textContent = currentBilling === 'yearly' ? `${p.label} · save 10%` : p.label;
        btn.href = whatsappLink(planMessage(key, currentBilling));
        btn.setAttribute('aria-label', `Order ${PLANS[key].name} plan, ${p.label}, on WhatsApp`);
    });

    document.querySelectorAll('.billing-option').forEach((opt) => {
        opt.setAttribute('aria-pressed', String(opt.dataset.billing === currentBilling));
    });
}

document.querySelectorAll('.billing-option').forEach((opt) => {
    opt.addEventListener('click', () => {
        currentBilling = opt.dataset.billing === 'yearly' ? 'yearly' : 'monthly';
        renderPricing();
    });
});

renderPricing();

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
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

function setMenu(open) {
    navMenu.classList.toggle('active', open);
    menuToggle.classList.toggle('active', open);
    menuToggle.setAttribute('aria-expanded', String(open));
}

if (menuToggle && navMenu) {
    menuToggle.setAttribute('role', 'button');
    menuToggle.setAttribute('tabindex', '0');
    menuToggle.setAttribute('aria-label', 'Open menu');
    menuToggle.setAttribute('aria-expanded', 'false');

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        setMenu(!navMenu.classList.contains('active'));
    });
    menuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setMenu(!navMenu.classList.contains('active'));
        }
    });
    navMenu.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) setMenu(false);
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
