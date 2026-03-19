// Intersection Observer – fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
fadeEls.forEach((el) => observer.observe(el));

// Animated stat counters
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1500;
  const step = Math.ceil(target / (duration / 16));
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString() + (el.dataset.suffix || '');
    if (current >= target) clearInterval(timer);
  }, 16);
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll('.stat-number').forEach((el) => statObserver.observe(el));

// Live demo
const demoInput = document.getElementById('demo-input');
const demoOutput = document.getElementById('demo-output');
const demoBtn = document.getElementById('demo-btn');

const responses = [
  (msg) => `Tool call: echo\nInput:  "${msg}"\nOutput: "${msg}"`,
  (msg) => `Tool call: uppercase\nInput:  "${msg}"\nOutput: "${msg.toUpperCase()}"`,
  (msg) => `Tool call: reverse\nInput:  "${msg}"\nOutput: "${msg.split('').reverse().join('')}"`,
  (msg) => `Tool call: word_count\nInput:  "${msg}"\nOutput: ${msg.trim().split(/\s+/).filter(Boolean).length} word(s)`,
  (msg) => `Tool call: char_count\nInput:  "${msg}"\nOutput: ${msg.length} character(s)`,
];
let responseIndex = 0;

function runDemo() {
  const msg = demoInput.value.trim();
  if (!msg) {
    demoOutput.textContent = '// Type a message above and click Run ↑';
    return;
  }
  const fn = responses[responseIndex % responses.length];
  responseIndex++;
  demoOutput.textContent = fn(msg);
}

demoBtn.addEventListener('click', runDemo);
demoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') runDemo();
});
