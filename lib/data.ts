/**
 * All portfolio content lives here. Edit this file to update the site.
 */

export const site = {
  name: "Faizan Ahmed",
  title: "Agentic AI Engineer & Full-Stack Developer",
  url: "https://anonymous-847.github.io",
  email: "faizan34038@gmail.com",
  linkedin: "https://www.linkedin.com/in/faizanxahmed/",
  github: "https://github.com/Anonymous-847",
  resume: "/pdf/cv.pdf", // put your CV at public/pdf/cv.pdf
  photo: "/Faizan.jpeg", // put your photo at public/Faizan.jpeg
};

export const heroLine =
  "Information Technology student at the University of Gujrat, graduating in 2027. I build intelligent systems with LangChain and LangGraph, and ship them as Next.js web apps.";

export const rolling = [
  "autonomous AI agents",
  "RAG applications",
  "full-stack web platforms",
  "machine learning models",
];

export const marqueeItems = [
  "LangChain",
  "LangGraph",
  "RAG systems",
  "Next.js",
  "TypeScript",
  "Python",
  "MistralAI",
  "FastAPI",
  "MongoDB",
  "React",
  "Tailwind CSS",
  "Scikit-learn",
  "TensorFlow",
];

export const aboutParagraph =
  "I'm an Information Technology student who builds agentic AI systems and the full-stack products around them. On one side I work with Python, LangChain and LangGraph. On the other, Next.js, Node.js and MongoDB. What I want to build next are autonomous systems that combine automation, reasoning and memory.";

export const aboutFacts = [
  { icon: "pin", label: "Based in", text: "ChakJamal, Jhelum, Punjab, Pakistan" },
  { icon: "cap", label: "Education", text: "B.IT, University of Gujrat (2027)" },
  { icon: "globe", label: "Languages", text: "English, Urdu" },
  { icon: "bolt", label: "Status", text: "Available for projects" },
] as const;

export type Kind = "ai" | "web" | "ml";

export const focusAreas: {
  title: string;
  text: string;
  kind: Kind;
  stack: string[];
  projectIds: number[];
}[] = [
  {
    title: "Agentic AI and RAG",
    text: "Agents and retrieval pipelines built with LangChain and LangGraph on Mistral models, from PDF chat to assistants with persistent memory.",
    kind: "ai",
    stack: ["LangChain", "LangGraph", "MistralAI", "Vector DB"],
    projectIds: [9, 1, 10],
  },
  {
    title: "Full-stack web",
    text: "Next.js and React products with admin panels, authentication and MongoDB behind them, including a company site and an e-commerce store.",
    kind: "web",
    stack: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    projectIds: [100, 101, 8],
  },
  {
    title: "Machine learning",
    text: "Classical machine learning and neural networks in Python: clustering, regression, PCA, and CNN and ANN image classifiers.",
    kind: "ml",
    stack: ["Scikit-learn", "TensorFlow", "Pandas", "NumPy"],
    projectIds: [2, 4, 5],
  },
];

export type ProjectCategory = "ai" | "ml" | "dl" | "wd";

export interface Project {
  id: number;
  name: string;
  category: ProjectCategory;
  catLabel: string;
  desc: string;
  stack: string[];
  features: string[];
  link: string;
  preview: string | null;
  featured?: boolean;
  /** Optional screenshot in /public, e.g. "/projects/docmind.png". Replaces the generated cover. */
  image?: string;
}

export const projectsData: Project[] = [
  {
    id: 9,
    name: "DocMind",
    category: "ai",
    catLabel: "AI / Agentic",
    desc: "A dark-themed Streamlit app where you upload a PDF and chat with its contents in real time, powered by LangGraph, LangChain and Mistral AI.",
    stack: ["LangGraph", "LangChain", "MistralAI", "Vector DB", "Loader & Splitter"],
    features: ["Conversational AI", "Context-aware", "Real-time responses"],
    link: "https://github.com/Anonymous-847/rag-using-langgraph",
    preview: "https://studentrag.streamlit.app/",
    featured: true,
  },
  {
    id: 1,
    name: "Zoe AI Chatbot",
    category: "ai",
    catLabel: "AI / Agentic",
    desc: "An AI chatbot with natural conversations and contextual responses, built with LangChain and MistralAI behind a modern, responsive interface.",
    stack: ["Next.js", "LangChain", "MistralAI", "TypeScript"],
    features: ["Conversational AI", "Context-aware", "Real-time responses"],
    link: "https://github.com/Anonymous-847/Zoe--AI-Chatbot.git",
    preview: "https://zoe-ai-chatbot.vercel.app/",
    featured: true,
  },
  {
    id: 10,
    name: "Nova AI",
    category: "ai",
    catLabel: "AI / Agentic",
    desc: "An AI assistant built with Next.js, FastAPI, LangGraph, Mistral AI and MongoDB, with intelligent conversations, persistent chat history and scalable agent workflows.",
    stack: ["Next.js", "LangGraph", "MistralAI", "TypeScript", "MongoDB"],
    features: ["Conversational AI", "Persistent chat history", "Agent workflows"],
    link: "https://github.com/Anonymous-847/Nova-AI.git",
    preview: null,
    featured: true,
  },
  {
    id: 100,
    name: "Elite Digital Hub",
    category: "wd",
    catLabel: "Web development",
    desc: "A company website that presents services and offers courses, with a modern responsive interface and an admin panel.",
    stack: ["Next.js", "Tailwind CSS", "JavaScript", "Framer Motion", "MongoDB"],
    features: ["Modern design", "Admin panel", "Interactive and responsive"],
    link: "https://github.com/Anonymous-847/Elite-Digital-Hub",
    preview: "https://www.elitedigitalhub.click",
    featured: true,
  },
  {
    id: 101,
    name: "Elite Digital Store",
    category: "wd",
    catLabel: "Web development",
    desc: "An e-commerce website selling sublimation-printed shirts, mugs, plates, keychains, caps and cushions.",
    stack: ["Next.js", "Tailwind CSS", "JavaScript", "Framer Motion", "MongoDB"],
    features: ["Modern design", "Admin panel", "Interactive and responsive"],
    link: "https://github.com/Anonymous-847/Elite-Store",
    preview: "https://www.store.elitedigitalhub.click",
    featured: true,
  },
  {
    id: 8,
    name: "Burger Vibe",
    category: "wd",
    catLabel: "Web development",
    desc: "A full-stack food ordering app with cart context, authenticated checkout and the Next.js 15 App Router.",
    stack: ["JavaScript", "Clerk", "React", "App Router"],
    features: ["Next.js 15", "Cart context", "Clerk authentication"],
    link: "https://github.com/Anonymous-847/Burger-Vibe",
    preview: null,
  },
  {
    id: 7,
    name: "Smart Customer Intelligence",
    category: "ml",
    catLabel: "ML and analytics",
    desc: "Combines K-Means clustering and Decision Tree algorithms to analyse customer behaviour and generate business insights.",
    stack: ["Python", "K-Means", "Decision Tree", "Data Analysis"],
    features: ["Business intelligence", "Multi-algorithm", "Analytics"],
    link: "https://github.com/Anonymous-847/Smart-Customer-Intelligence-System",
    preview: null,
  },
  {
    id: 2,
    name: "Customer Segmentation",
    category: "ml",
    catLabel: "Machine learning",
    desc: "Segments customers into groups by purchasing behaviour with K-Means clustering to help improve marketing strategy.",
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    features: ["K-Means clustering", "Data visualisation", "Business insights"],
    link: "https://github.com/Anonymous-847/Customer-Segmentation-using-KMeans-Clustering",
    preview: null,
  },
  {
    id: 4,
    name: "Heart Disease Predictor",
    category: "ml",
    catLabel: "Machine learning",
    desc: "Predicts heart disease risk using Logistic Regression, with PCA for dimensionality reduction and better model performance.",
    stack: ["Python", "PCA", "Logistic Regression", "Data Visualisation"],
    features: ["Medical AI", "PCA reduction", "Risk prediction"],
    link: "https://github.com/Anonymous-847/Heart-Disease-Prediction-using-PCA-Logistic-Regression",
    preview: null,
  },
  {
    id: 3,
    name: "Salary Prediction",
    category: "ml",
    catLabel: "Machine learning",
    desc: "Predictive model that estimates placement salaries from academic and skill-related data using Logistic Regression.",
    stack: ["Python", "Logistic Regression", "Pandas", "Scikit-learn"],
    features: ["Regression analysis", "Feature engineering", "Prediction model"],
    link: "https://github.com/Anonymous-847/Placement-Salary-Prediction-System",
    preview: null,
  },
  {
    id: 5,
    name: "Digit Classifier (CNN)",
    category: "dl",
    catLabel: "Deep learning",
    desc: "A convolutional neural network that recognises and classifies handwritten digits from image datasets.",
    stack: ["Python", "TensorFlow", "Keras", "CNN"],
    features: ["Image recognition", "CNN architecture", "Classification"],
    link: "https://github.com/Anonymous-847/Handwritten-Digit-Classification-using-CNN",
    preview: null,
  },
  {
    id: 6,
    name: "Digit Classifier (ANN)",
    category: "dl",
    catLabel: "Deep learning",
    desc: "An artificial neural network for handwritten digit recognition with an optimised training pipeline.",
    stack: ["Python", "ANN", "TensorFlow", "Deep Learning"],
    features: ["Neural networks", "Backpropagation", "Classification"],
    link: "https://github.com/Anonymous-847/Handwritten-Digit-Recognition-using-ANN",
    preview: null,
  },
];

export const skillGroups: { title: string; note: string; items: string[] }[] = [
  {
    title: "Agentic AI",
    note: "Agents, retrieval and LLM workflows",
    items: [
      "LangChain",
      "LangGraph",
      "AI Agents",
      "RAG Systems",
      "Prompt Engineering",
      "LLM Integration",
      "Conversational AI",
      "AI Automation",
      "AI Workflows",
    ],
  },
  {
    title: "Machine learning",
    note: "Models and data analysis in Python",
    items: [
      "Machine Learning",
      "Deep Learning",
      "CNN",
      "ANN",
      "Logistic Regression",
      "K-Means Clustering",
      "Decision Trees",
      "PCA",
      "Data Analysis",
      "Scikit-learn",
    ],
  },
  {
    title: "Web development",
    note: "Interfaces, APIs and data layers",
    items: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "MySQL",
      "Tailwind CSS",
      "REST APIs",
      "PHP",
    ],
  },
  {
    title: "Languages",
    note: "What I write day to day",
    items: ["Python", "JavaScript", "TypeScript", "C++", "SQL"],
  },
];

export const experience: {
  period: string;
  title: string;
  org: string;
  desc: string;
}[] = [
  {
    period: "Freelance",
    title: "Full-stack developer and AI engineer",
    org: "Codexiva Solutions",
    desc: "Independent engineering work under the Codexiva Solutions brand, covering Next.js websites, LangChain and LangGraph systems, RAG applications and n8n automation.",
  },
  {
    period: "Internship",
    title: "Web development intern",
    org: "Elite Digital Hub",
    desc: "Worked on three projects: the Elite Digital website, the Elite Digital Store and the Elite Digital Portal.",
  },
  {
    period: "2023 to 2027 (expected)",
    title: "Bachelor's in Information Technology",
    org: "University of Gujrat, Punjab, Pakistan",
    desc: "Core computer science fundamentals with a focus on AI and ML, software engineering, data structures, algorithms and modern web technologies, applied through hands-on projects.",
  },
  {
    period: "Self-directed",
    title: "Agentic AI and LangChain specialisation",
    org: "Online platforms and project-based learning",
    desc: "Study of LangChain, LangGraph, autonomous agent architectures, RAG systems, prompt engineering and LLM integration, applied in the projects above.",
  },
];

export const focusPath = [
  "Web development",
  "Full-stack",
  "AI and automation",
  "Machine learning",
  "Deep learning",
  "LangChain and RAG",
  "Agentic systems",
];
