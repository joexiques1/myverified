gsap.registerPlugin(ScrollTrigger);

// ── NAV SCROLL BEHAVIOR ──
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav-scrolled', window.scrollY > 60);
}, { passive: true });

// ── HERO LOAD-IN ──
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
tl.to('#hero-title',  { opacity: 1, y: 0, duration: 1.2 }, 0.5)
  .to('#hero-logo',   { opacity: 1, y: 0, duration: 1.1 }, 1.0)
  .to('#hero-wave',   { opacity: 0.5, y: 0, duration: 1.0 }, 1.45)
  .to('#hero-sub',    { opacity: 1, y: 0, duration: 1.1 }, 1.75)
  .to('#photo-left',  { opacity: 1, y: 0, duration: 1.5 }, 1.35)
  .to('#photo-right', { opacity: 1, y: 0, duration: 1.5 }, 1.95);

// ── SCROLL ANIMATIONS ──

// Section reach: heading + subtext
gsap.utils.toArray('.gsap-fade').forEach((el, i) => {
  gsap.fromTo(el,
    { opacity: 0, y: 32 },
    { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out', delay: i * 0.1,
      scrollTrigger: { trigger: el, start: 'top 88%' } });
});

// Cards: staggered fade up, icon gets a subtle scale pop
gsap.utils.toArray('.card').forEach((card, i) => {
  gsap.fromTo(card,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', delay: i * 0.14,
      scrollTrigger: { trigger: card, start: 'top 90%' } });

  const icon = card.querySelector('.card-icon');
  if (icon) {
    gsap.fromTo(icon,
      { opacity: 0, scale: 0.75 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)', delay: i * 0.14 + 0.18,
        scrollTrigger: { trigger: card, start: 'top 90%' } });
  }
});

// Analytics section: container slides up, then text and card come in separately
gsap.fromTo('.section-analytics',
  { opacity: 0, y: 48 },
  { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out',
    scrollTrigger: { trigger: '.section-analytics', start: 'top 85%' } });

gsap.fromTo('.analytics-text h2',
  { opacity: 0, y: 24 },
  { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.15,
    scrollTrigger: { trigger: '.analytics-text', start: 'top 85%' } });

gsap.fromTo('.analytics-text p',
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.28,
    scrollTrigger: { trigger: '.analytics-text', start: 'top 85%' } });

gsap.fromTo('.analytics-card',
  { opacity: 0, x: 32 },
  { opacity: 1, x: 0, duration: 0.75, ease: 'power2.out', delay: 0.2,
    scrollTrigger: { trigger: '.analytics-card', start: 'top 85%' } });

// Analytics rows: stagger in one by one
gsap.utils.toArray('.analytics-row').forEach((row, i) => {
  gsap.fromTo(row,
    { opacity: 0, x: 20 },
    { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', delay: 0.35 + i * 0.1,
      scrollTrigger: { trigger: '.analytics-card', start: 'top 85%' } });
});

// Footer fade
gsap.fromTo('footer',
  { opacity: 0, y: 16 },
  { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
    scrollTrigger: { trigger: 'footer', start: 'top 95%' } });

// ── STAGGERED CHAT ──
const conversation = [
  { side: 'left',  text: "Hey, just found your channel and I'm obsessed 👀" },
  { side: 'right', text: "Thank you, that genuinely means a lot 🙏" },
  { side: 'left',  text: "That last video hit different, didn't expect to feel that" },
  { side: 'right', text: "I'm really glad it landed — took a while to get right" },
  { side: 'left',  text: "Do you ever do 1-on-1 calls with subscribers?" },
  { side: 'right', text: "Yes! You can book time through my profile page" },
  { side: 'left',  text: "Seriously thank you for being so real about this" },
  { side: 'right', text: "Always. People can tell when it's not, you know?" },
  { side: 'left',  text: "When's the next drop? I need to know 😭" },
  { side: 'right', text: "Next Friday — subscribers get the link first" },
];

const MAX_PER_SIDE = 2;
let convIndex = 0;

function buildBubble(text, isTyping) {
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  const inner = document.createElement('div');
  inner.className = 'bubble-text';
  if (isTyping) {
    inner.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
  } else {
    inner.textContent = text;
  }
  bubble.appendChild(inner);
  return bubble;
}

function pruneContainer(container) {
  const bubbles = container.querySelectorAll('.chat-bubble');
  if (bubbles.length > MAX_PER_SIDE) {
    const oldest = bubbles[0];
    oldest.style.opacity = '0';
    oldest.style.transform = 'translateY(-8px)';
    setTimeout(() => oldest.remove(), 500);
  }
}

function showMessage(item, onDone) {
  const container = document.getElementById(item.side === 'left' ? 'chat-left' : 'chat-right');
  const typing = buildBubble('', true);
  container.appendChild(typing);
  requestAnimationFrame(() => requestAnimationFrame(() => typing.classList.add('visible')));

  setTimeout(() => {
    typing.remove();
    const real = buildBubble(item.text, false);
    container.appendChild(real);
    requestAnimationFrame(() => requestAnimationFrame(() => real.classList.add('visible')));
    pruneContainer(container);
    onDone();
  }, 1400);
}

function nextMessage() {
  const item = conversation[convIndex % conversation.length];
  convIndex++;
  showMessage(item, () => {
    const delay = item.side === 'right' ? 3200 : 1800;
    setTimeout(nextMessage, delay);
  });
}

setTimeout(nextMessage, 3800);
