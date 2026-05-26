// ===== DATA =====
const skillsData = {
  ai: [
    {name:'LangChain',icon:'🔗',level:90},
    {name:'LangGraph',icon:'🕸️',level:85},
    {name:'AI Agents',icon:'🤖',level:88},
    {name:'Prompt Engineering',icon:'✍️',level:92},
    {name:'Models Workflow',icon:'🔮',level:85},
    {name:'RAG Systems',icon:'📚',level:82},
    {name:'LLM Integration',icon:'⚡',level:87},
    {name:'AI Automation',icon:'⚙️',level:80},
    {name:'Conversational AI',icon:'💬',level:88},
    {name:'AI Workflows',icon:'🔄',level:83},
  ],
  ml: [
    {name:'Machine Learning',icon:'🧠',level:88},
    {name:'Deep Learning',icon:'🌊',level:82},
    {name:'CNN',icon:'🔭',level:80},
    {name:'ANN',icon:'🕸️',level:80},
    {name:'Logistic Regression',icon:'📉',level:90},
    {name:'K-Means Clustering',icon:'🔵',level:87},
    {name:'Decision Trees',icon:'🌳',level:85},
    {name:'PCA',icon:'📊',level:82},
    {name:'Data Analysis',icon:'📈',level:88},
    {name:'Scikit-learn',icon:'⚗️',level:90},
  ],
  web: [
    {name:'React.js',icon:'⚛️',level:88},
    {name:'Next.js',icon:'▲',level:85},
    {name:'TypeScript',icon:'💙',level:80},
    {name:'Node.js',icon:'🟢',level:82},
    {name:'Express.js',icon:'🚀',level:83},
    {name:'MongoDB',icon:'🍃',level:80},
    {name:'Tailwind CSS',icon:'🎨',level:90},
    {name:'REST APIs',icon:'🔌',level:87},
    {name:'MySQL',icon:'🐬',level:78},
    {name:'PHP',icon:'🐘',level:72},
  ],
  lang: [
    {name:'Python',icon:'🐍',level:93},
    {name:'JavaScript',icon:'🟡',level:88},
    {name:'TypeScript',icon:'💙',level:80},
    {name:'C++',icon:'⚙️',level:72},
    {name:'SQL',icon:'🗄️',level:80},
  ]
};

const projectsData = [
  {
    id:1, name:'Zoe AI Chatbot', category:'ai',
    icon:'🤖',
    catLabel:'AI / Agentic', catClass:'cat-ai',
    desc:'Intelligent AI chatbot with natural conversations, contextual responses, and AI-powered interactions using LangChain and MistralAI with a modern responsive UI.',
    stack:['Next.js','LangChain','MistralAI','TypeScript'],
    features:['Conversational AI','Context-Aware','Real-Time Responses'],
    color:'#22d3ee',
    link:"https://github.com/Anonymous-847/Zoe--AI-Chatbot.git",
    preview:"not-available"
  },
  {
    id:2, name:'Customer Segmentation', category:'ml',
    icon:'🔵',
    catLabel:'Machine Learning', catClass:'cat-ml',
    desc:'ML model that segments customers into groups based on purchasing behavior to help businesses improve marketing strategies using K-Means clustering.',
    stack:['Python','Scikit-learn','Pandas','NumPy','Matplotlib'],
    features:['K-Means Clustering','Data Visualization','Business Insights'],
    color:'#8b5cf6',
    link:"https://github.com/Anonymous-847/Customer-Segmentation-using-KMeans-Clustering",
    preview:"not-available"
  },
  {
    id:3, name:'Salary Prediction', category:'ml',
    icon:'📉',
    catLabel:'Machine Learning', catClass:'cat-ml',
    desc:'Predictive analytics model to estimate placement salaries based on academic and skill-related data using Logistic Regression techniques.',
    stack:['Python','Logistic Regression','Pandas','Scikit-learn'],
    features:['Regression Analysis','Feature Engineering','Prediction Model'],
    color:'#8b5cf6',
    link:"https://github.com/Anonymous-847/Placement-Salary-Prediction-System",
    preview:"not-available"
  },
  {
    id:4, name:'Heart Disease Predictor', category:'ml',
    icon:'❤️',
    catLabel:'Machine Learning', catClass:'cat-ml',
    desc:'Healthcare prediction system that predicts heart disease risks using Logistic Regression and PCA for dimensionality reduction and improved model performance.',
    stack:['Python','PCA','Logistic Regression','Data Visualization'],
    features:['Medical AI','PCA Reduction','Risk Prediction'],
    color:'#8b5cf6',
    link:"https://github.com/Anonymous-847/Heart-Disease-Prediction-using-PCA-Logistic-Regression",
    preview:"not-available"
  },
  {
    id:5, name:'Digit Classifier (CNN)', category:'dl',
    icon:'🔭',
    catLabel:'Deep Learning', catClass:'cat-dl',
    desc:'Convolutional Neural Network model capable of accurately recognizing and classifying handwritten digits from image datasets with high accuracy.',
    stack:['Python','TensorFlow','Keras','CNN'],
    features:['Image Recognition','CNN Architecture','High Accuracy'],
    color:'#3b82f6',
    link:"https://github.com/Anonymous-847/Handwritten-Digit-Classification-using-CNN",
    preview:"not-available"
  },
  {
    id:6, name:'Digit Classifier (ANN)', category:'dl',
    icon:'🕸️',
    catLabel:'Deep Learning', catClass:'cat-dl',
    desc:'Artificial Neural Network for handwritten digit recognition with optimized training pipeline and high classification accuracy.',
    stack:['Python','ANN','TensorFlow','Deep Learning'],
    features:['Neural Networks','Backpropagation','Classification'],
    color:'#3b82f6',
    link:"https://github.com/Anonymous-847/Handwritten-Digit-Recognition-using-ANN",
    preview:"not-available"
  },
  {
    id:7, name:'Smart Customer Intelligence', category:'ml',
    icon:'📊',
    catLabel:'ML + Analytics', catClass:'cat-ml',
    desc:'Smart analytics system combining K-Means clustering and Decision Tree algorithms to analyze customer behavior and generate intelligent business insights.',
    stack:['Python','K-Means','Decision Tree','Data Analysis'],
    features:['Business Intelligence','Multi-Algorithm','Analytics Dashboard'],
    color:'#8b5cf6',
    link:"https://github.com/Anonymous-847/Smart-Customer-Intelligence-System",
    preview:"not-available"
  }
  ,
  {
    id:8, name:'Burger Vibe', category:'wd',
    icon: '🍔',
    catLabel:'Web Development', catClass:'cat-web',
    desc:'Smart analytics system combining K-Means clustering and Decision Tree algorithms to analyze customer behavior and generate intelligent business insights.',
    stack:['Javascript','clerk','react','App Routing'],
    features:['Next JS 15','Cart Context','Clerk Authentication'],
    color:'#8b5cf6',
    link:"https://github.com/Anonymous-847/Burger-Vibe",
    preview:"not-available"
  },
  {
    id:9, name:'DocMind Rag Based App', category:'ai',
    icon:'📄',
    catLabel:'AI / Agentic', catClass:'cat-ai',
    desc:'A sleek, dark-themed Streamlit app that lets you upload any PDF and have a real-time, streaming conversation with its contents — powered by LangGraph, LangChain, and Mistral AI.',
    stack:['Langgraph','LangChain','MistralAI','Vector DB', "Loader and Splitter"],
    features:['Conversational AI','Context-Aware','Real-Time Responses'],
    color:'#22d3ee',
    link:"https://github.com/Anonymous-847/rag-using-langgraph",
    preview:"https://studentrag.streamlit.app/"
  }
];

const journeySteps = [
  {icon:'🌐', label:'Web Development', active:true},
  {icon:'⚛️', label:'Full-Stack Dev', active:true},
  {icon:'🤖', label:'AI & Automation', active:true},
  {icon:'🧠', label:'Machine Learning', active:true},
  {icon:'🌊', label:'Deep Learning', active:true},
  {icon:'🔗', label:'LangChain & RAG', active:true},
  {icon:'🚀', label:'Agentic AI Systems', active:true},
];

const achievementsData = [
  {icon:'🤖', title:'AI Chatbot Engineer', desc:'Built Zoe AI, an intelligent conversational assistant with LangChain and MistralAI integration.'},
  {icon:'🧠', title:'7+ AI/ML Projects', desc:'Delivered multiple end-to-end machine learning and deep learning projects with real-world applications.'},
  {icon:'🌐', title:'Full-Stack Developer', desc:'Built scalable web applications using Next.js, React, Node.js, MongoDB, and modern web technologies.'},
  {icon:'📊', title:'ML Model Specialist', desc:'Trained and deployed predictive models for healthcare, salary, and customer analytics use cases.'},
  {icon:'🔮', title:'Agentic AI Pioneer', desc:'Mastered LangGraph, autonomous agent architectures, and RAG-based intelligent systems.'},
  {icon:'⚡', title:'Problem Solver', desc:'Passionate about applying AI/ML to solve complex real-world problems across multiple domains.'},
];

// ===== SKILL TABS =====
let activeTab = 'ai';
function renderSkills(tab) {
  const grid = document.getElementById('skill-grid');
  const data = skillsData[tab];
  grid.innerHTML = data.map((s,i) => `
    <div class="skill-card fade-up" style="transition-delay:${i*0.06}s">
      <div class="skill-icon">${s.icon}</div>
      <div class="skill-name">${s.name}</div>
      <div class="skill-bar">
        <div class="skill-fill" style="width:${s.level}%"></div>
      </div>
      <div class="skill-pct">${s.level}%</div>
    </div>
  `).join('');
  setTimeout(() => {
    grid.querySelectorAll('.skill-card').forEach(c => c.classList.add('visible'));
    grid.querySelectorAll('.skill-fill').forEach(f => f.classList.add('animate'));
  }, 50);
}
document.querySelectorAll('.skill-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.skill-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeTab = btn.dataset.tab;
    renderSkills(activeTab);
  });
});
renderSkills('ai');

// ===== PROJECTS =====
let activeFilter = 'all';
function renderProjects(filter) {
  const grid = document.getElementById('projects-grid');
  const data = filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter);
  grid.innerHTML = data.map((p,i) => `
    <div class="project-card fade-up" style="transition-delay:${i*0.1}s">
      <div class="project-header">
        <div class="project-bg" style="background:linear-gradient(135deg, var(--surface) 0%, var(--bg3) 100%)"></div>
        <svg class="project-pattern" viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg">
          ${Array.from({length:8},(_,r) => Array.from({length:12},(_,c) => 
            `<circle cx="${c*28+14}" cy="${r*22+11}" r="${Math.random()>0.7?2:1}" fill="${p.color}" opacity="${0.1+Math.random()*0.2}"/>`
          ).join('')).join('')}
        </svg>
        <div class="project-icon-large">${p.icon}</div>
        <span class="project-category-badge ${p.catClass}">${p.catLabel}</span>
      </div>
      <div class="project-body">
        <div class="project-name">${p.name}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-stack">
          ${p.stack.map(s => `<span class="stack-tag">${s}</span>`).join('')}
        </div>
        <div class="project-actions">
<a ${p.preview && p.preview !== "not-available" 
    ? `href="${p.preview}" target="_blank"` 
    : `onclick="alert('Live Demo not available')"`}>
  <button class="proj-btn primary">⚡ Live Demo</button>
</a>
        <a href="${p.link}" target="_blank"> <button class="proj-btn">⚙️ GitHub</button> </a>
        </div>
      </div>
    </div>
  `).join('');
  setTimeout(() => {
    grid.querySelectorAll('.project-card').forEach(c => c.classList.add('visible'));
  }, 50);
}
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderProjects(activeFilter);
  });
});
renderProjects('all');

// ===== JOURNEY =====
document.getElementById('journey-path').innerHTML = journeySteps.map((s,i) => `
  <div class="journey-step ${s.active ? 'active' : ''} fade-up" style="transition-delay:${i*0.1}s">
    <div class="journey-node">${s.icon}</div>
    <div class="journey-label">${s.label}</div>
  </div>
`).join('');

// ===== ACHIEVEMENTS =====
document.getElementById('ach-grid').innerHTML = achievementsData.map((a,i) => `
  <div class="ach-card fade-up" style="transition-delay:${i*0.1}s">
    <div class="ach-icon">${a.icon}</div>
    <div class="ach-text">
      <h4>${a.title}</h4>
      <p>${a.desc}</p>
    </div>
  </div>
`).join('');

// ===== TYPED TEXT =====
const roles = [
  'Agentic AI Engineer',
  'Full-Stack Web Developer',
  'ML & DL Enthusiast',
  'LangChain Developer',
  'Autonomous Systems Builder'
];
let roleIdx = 0, charIdx = 0, deleting = false;
function typeRole() {
  const el = document.getElementById('typed-role');
  const current = roles[roleIdx];
  if (!deleting) {
    el.innerHTML = current.slice(0, charIdx) + '<span class="cursor-blink">|</span>';
    charIdx++;
    if (charIdx > current.length) { deleting = true; setTimeout(typeRole, 1800); return; }
  } else {
    el.innerHTML = current.slice(0, charIdx) + '<span class="cursor-blink">|</span>';
    charIdx--;
    if (charIdx < 0) { deleting = false; roleIdx = (roleIdx+1) % roles.length; charIdx = 0; }
  }
  setTimeout(typeRole, deleting ? 60 : 80);
}
setTimeout(typeRole, 2500);

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.dataset.count;
    let current = 0;
    const inc = target / 40;
    const timer = setInterval(() => {
      current = Math.min(current + inc, target);
      el.textContent = Math.round(current) + (target > 10 ? '' : '+');
      if (current >= target) clearInterval(timer);
    }, 40);
  });
}

// ===== INTERSECTION OBSERVER =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      if (e.target.closest('#hero')) animateCounters();
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

// Re-observe on project/skill render
const mutObs = new MutationObserver(() => {
  document.querySelectorAll('.fade-up:not(.visible)').forEach(el => io.observe(el));
});
mutObs.observe(document.body, { childList: true, subtree: true });

// ===== CURSOR =====
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', scrollY > 40);
});

// ===== HAMBURGER =====
function closeMobile() { document.getElementById('mobile-menu').classList.remove('open');}
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});
// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.querySelectorAll('#hero .fade-up').forEach(el => el.classList.add('visible'));
    animateCounters();
  }, 2200);
});

// ===== FORM =====
function handleFormSubmit(btn) {
  btn.textContent = '✓ Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
  }, 3000);
}

// ===== CANVAS BACKGROUND =====
(function() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], animId;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Node {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.r = Math.random() * 1.5 + 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(34,211,238,${this.opacity})`;
      ctx.fill();
    }
  }

  const N = Math.min(80, Math.floor(W*H/20000));
  for (let i=0;i<N;i++) nodes.push(new Node());

  function draw() {
    ctx.clearRect(0,0,W,H);
    nodes.forEach(n => { n.update(); n.draw(); });
    for (let i=0;i<nodes.length;i++) {
      for (let j=i+1;j<nodes.length;j++) {
        const dx = nodes[i].x-nodes[j].x, dy = nodes[i].y-nodes[j].y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(34,211,238,${(1-d/130)*0.15})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    animId = requestAnimationFrame(draw);
  }
  draw();
})();
