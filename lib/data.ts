export type SkillTab = "ai" | "ml" | "web" | "lang";

export interface Skill {
  name: string;
  icon: string;
  level: number;
}

export const skillsData: Record<SkillTab, Skill[]> = {
  ai: [
    { name: "LangChain", icon: "🔗", level: 90 },
    { name: "LangGraph", icon: "🕸️", level: 85 },
    { name: "AI Agents", icon: "🤖", level: 88 },
    { name: "Prompt Engineering", icon: "✍️", level: 92 },
    { name: "Models Workflow", icon: "🔮", level: 85 },
    { name: "RAG Systems", icon: "📚", level: 82 },
    { name: "LLM Integration", icon: "⚡", level: 87 },
    { name: "AI Automation", icon: "⚙️", level: 80 },
    { name: "Conversational AI", icon: "💬", level: 88 },
    { name: "AI Workflows", icon: "🔄", level: 83 },
  ],
  ml: [
    { name: "Machine Learning", icon: "🧠", level: 88 },
    { name: "Deep Learning", icon: "🌊", level: 82 },
    { name: "CNN", icon: "🔭", level: 80 },
    { name: "ANN", icon: "🕸️", level: 80 },
    { name: "Logistic Regression", icon: "📉", level: 90 },
    { name: "K-Means Clustering", icon: "🔵", level: 87 },
    { name: "Decision Trees", icon: "🌳", level: 85 },
    { name: "PCA", icon: "📊", level: 82 },
    { name: "Data Analysis", icon: "📈", level: 88 },
    { name: "Scikit-learn", icon: "⚗️", level: 90 },
  ],
  web: [
    { name: "React.js", icon: "⚛️", level: 88 },
    { name: "Next.js", icon: "▲", level: 85 },
    { name: "TypeScript", icon: "💙", level: 80 },
    { name: "Node.js", icon: "🟢", level: 82 },
    { name: "Express.js", icon: "🚀", level: 83 },
    { name: "MongoDB", icon: "🍃", level: 80 },
    { name: "Tailwind CSS", icon: "🎨", level: 90 },
    { name: "REST APIs", icon: "🔌", level: 87 },
    { name: "MySQL", icon: "🐬", level: 78 },
    { name: "PHP", icon: "🐘", level: 72 },
  ],
  lang: [
    { name: "Python", icon: "🐍", level: 93 },
    { name: "JavaScript", icon: "🟡", level: 88 },
    { name: "TypeScript", icon: "💙", level: 80 },
    { name: "C++", icon: "⚙️", level: 72 },
    { name: "SQL", icon: "🗄️", level: 80 },
  ],
};

export type ProjectCategory = "ai" | "ml" | "dl" | "wd";

export interface Project {
  id: number;
  name: string;
  category: ProjectCategory;
  icon: string;
  catLabel: string;
  desc: string;
  stack: string[];
  features: string[];
  color: string;
  link: string;
  preview: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    name: "Zoe AI Chatbot",
    category: "ai",
    icon: "🤖",
    catLabel: "AI / Agentic",
    desc: "Intelligent AI chatbot with natural conversations, contextual responses, and AI-powered interactions using LangChain and MistralAI with a modern responsive UI.",
    stack: ["Next.js", "LangChain", "MistralAI", "TypeScript"],
    features: ["Conversational AI", "Context-Aware", "Real-Time Responses"],
    color: "#22d3ee",
    link: "https://github.com/Anonymous-847/Zoe--AI-Chatbot.git",
    preview: "https://zoe-ai-chatbot.vercel.app/",
  },
  {
    id: 2,
    name: "Customer Segmentation",
    category: "ml",
    icon: "🔵",
    catLabel: "Machine Learning",
    desc: "ML model that segments customers into groups based on purchasing behavior to help businesses improve marketing strategies using K-Means clustering.",
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    features: ["K-Means Clustering", "Data Visualization", "Business Insights"],
    color: "#8b5cf6",
    link: "https://github.com/Anonymous-847/Customer-Segmentation-using-KMeans-Clustering",
    preview: "not-available",
  },
  {
    id: 3,
    name: "Salary Prediction",
    category: "ml",
    icon: "📉",
    catLabel: "Machine Learning",
    desc: "Predictive analytics model to estimate placement salaries based on academic and skill-related data using Logistic Regression techniques.",
    stack: ["Python", "Logistic Regression", "Pandas", "Scikit-learn"],
    features: ["Regression Analysis", "Feature Engineering", "Prediction Model"],
    color: "#8b5cf6",
    link: "https://github.com/Anonymous-847/Placement-Salary-Prediction-System",
    preview: "not-available",
  },
  {
    id: 4,
    name: "Heart Disease Predictor",
    category: "ml",
    icon: "❤️",
    catLabel: "Machine Learning",
    desc: "Healthcare prediction system that predicts heart disease risks using Logistic Regression and PCA for dimensionality reduction and improved model performance.",
    stack: ["Python", "PCA", "Logistic Regression", "Data Visualization"],
    features: ["Medical AI", "PCA Reduction", "Risk Prediction"],
    color: "#8b5cf6",
    link: "https://github.com/Anonymous-847/Heart-Disease-Prediction-using-PCA-Logistic-Regression",
    preview: "not-available",
  },
  {
    id: 5,
    name: "Digit Classifier (CNN)",
    category: "dl",
    icon: "🔭",
    catLabel: "Deep Learning",
    desc: "Convolutional Neural Network model capable of accurately recognizing and classifying handwritten digits from image datasets with high accuracy.",
    stack: ["Python", "TensorFlow", "Keras", "CNN"],
    features: ["Image Recognition", "CNN Architecture", "High Accuracy"],
    color: "#3b82f6",
    link: "https://github.com/Anonymous-847/Handwritten-Digit-Classification-using-CNN",
    preview: "not-available",
  },
  {
    id: 6,
    name: "Digit Classifier (ANN)",
    category: "dl",
    icon: "🕸️",
    catLabel: "Deep Learning",
    desc: "Artificial Neural Network for handwritten digit recognition with optimized training pipeline and high classification accuracy.",
    stack: ["Python", "ANN", "TensorFlow", "Deep Learning"],
    features: ["Neural Networks", "Backpropagation", "Classification"],
    color: "#3b82f6",
    link: "https://github.com/Anonymous-847/Handwritten-Digit-Recognition-using-ANN",
    preview: "not-available",
  },
  {
    id: 7,
    name: "Smart Customer Intelligence",
    category: "ml",
    icon: "📊",
    catLabel: "ML + Analytics",
    desc: "Smart analytics system combining K-Means clustering and Decision Tree algorithms to analyze customer behavior and generate intelligent business insights.",
    stack: ["Python", "K-Means", "Decision Tree", "Data Analysis"],
    features: ["Business Intelligence", "Multi-Algorithm", "Analytics Dashboard"],
    color: "#8b5cf6",
    link: "https://github.com/Anonymous-847/Smart-Customer-Intelligence-System",
    preview: "not-available",
  },
  {
    id: 8,
    name: "Burger Vibe",
    category: "wd",
    icon: "🍔",
    catLabel: "Web Development",
    desc: "Full-stack food ordering web app with cart context, authenticated checkout, and a modern App Router architecture built on Next.js 15.",
    stack: ["JavaScript", "Clerk", "React", "App Routing"],
    features: ["Next.js 15", "Cart Context", "Clerk Authentication"],
    color: "#8b5cf6",
    link: "https://github.com/Anonymous-847/Burger-Vibe",
    preview: "not-available",
  },
  {
    id: 9,
    name: "DocMind — RAG Based App",
    category: "ai",
    icon: "📄",
    catLabel: "AI / Agentic",
    desc: "A sleek, dark-themed Streamlit app that lets you upload any PDF and have a real-time, streaming conversation with its contents — powered by LangGraph, LangChain, and Mistral AI.",
    stack: ["LangGraph", "LangChain", "MistralAI", "Vector DB", "Loader & Splitter"],
    features: ["Conversational AI", "Context-Aware", "Real-Time Responses"],
    color: "#22d3ee",
    link: "https://github.com/Anonymous-847/rag-using-langgraph",
    preview: "https://studentrag.streamlit.app/",
  },
  {
    id: 10,
    name: "Nova AI",
    category: "ai",
    icon: "🧠",
    catLabel: "AI / Agentic",
    desc: "Nova AI is an AI-powered assistant built with Next.js, FastAPI, LangGraph, Mistral AI, and MongoDB, featuring intelligent conversations, persistent chat history, and scalable agent workflows.",
    stack: ["Next.js", "LangGraph", "MistralAI", "TypeScript", "MongoDB"],
    features: ["Conversational AI", "Context-Aware", "Real-Time Responses"],
    color: "#22d3ee",
    link: "https://github.com/Anonymous-847/Nova-AI.git",
    preview: "not-available",
  },
];

export interface JourneyStep {
  icon: string;
  label: string;
}

export const journeySteps: JourneyStep[] = [
  { icon: "🌐", label: "Web Development" },
  { icon: "⚛️", label: "Full-Stack Dev" },
  { icon: "🤖", label: "AI & Automation" },
  { icon: "🧠", label: "Machine Learning" },
  { icon: "🌊", label: "Deep Learning" },
  { icon: "🔗", label: "LangChain & RAG" },
  { icon: "🚀", label: "Agentic AI Systems" },
];

export interface Achievement {
  icon: string;
  title: string;
  desc: string;
}

export const achievementsData: Achievement[] = [
  {
    icon: "🤖",
    title: "AI Chatbot Engineer",
    desc: "Built Zoe AI, an intelligent conversational assistant with LangChain and MistralAI integration.",
  },
  {
    icon: "🧠",
    title: "10+ AI/ML Projects",
    desc: "Delivered multiple end-to-end machine learning, deep learning, and agentic AI projects with real-world applications.",
  },
  {
    icon: "🌐",
    title: "Full-Stack Developer",
    desc: "Built scalable web applications using Next.js, React, Node.js, MongoDB, and modern web technologies.",
  },
  {
    icon: "📊",
    title: "ML Model Specialist",
    desc: "Trained and deployed predictive models for healthcare, salary, and customer analytics use cases.",
  },
  {
    icon: "🔮",
    title: "Agentic AI Pioneer",
    desc: "Working with LangGraph, autonomous agent architectures, and RAG-based intelligent systems.",
  },
  {
    icon: "⚡",
    title: "Problem Solver",
    desc: "Passionate about applying AI/ML to solve complex real-world problems across multiple domains.",
  },
];

export const heroRoles: string[] = [
  "Agentic AI Engineer",
  "Full-Stack Web Developer",
  "ML & DL Enthusiast",
  "LangChain Developer",
  "Autonomous Systems Builder",
];

export const heroStats = [
  { value: 10, suffix: "+", label: "AI/ML Projects" },
  { value: 4, suffix: "", label: "Tech Stacks" },
  { value: 2, suffix: "+", label: "Years Building" },
];

export const socialLinks = {
  email: "faizan34038@gmail.com",
  linkedin: "https://www.linkedin.com/in/faizanxahmed/",
  github: "https://github.com/Anonymous-847",
};

export const aboutInfo = [
  { icon: "📍", text: "ChakJamal, Jhelum, Punjab, Pakistan" },
  { icon: "🎓", text: "B.IT — Univ. of Gujrat (2027)" },
  { icon: "🌐", text: "English · Urdu" },
  { icon: "🤖", text: "Agentic AI Systems" },
  { icon: "⚡", text: "Available for Projects" },
];

export const aboutTags = [
  "LangChain",
  "LangGraph",
  "React",
  "Next.js",
  "Pandas",
  "Numpy",
  "Matplotlib",
  "Scikit Learn",
  "PyTorch",
  "Autonomous Agents",
  "RAG Systems",
];

export const educationTimeline = [
  {
    icon: "🎓",
    year: "2023 — 2027 (Expected)",
    title: "Bachelor's in Information Technology",
    sub: "University of Gujrat, Punjab, Pakistan",
    desc: "Studying core computer science fundamentals with a deep focus on AI/ML, software engineering, data structures, algorithms, and modern web technologies. Actively applying academic knowledge through hands-on AI and ML projects.",
  },
  {
    icon: "🤖",
    year: "Self-Directed Learning",
    title: "Agentic AI & LangChain Specialization",
    sub: "Online Platforms & Project-Based Learning",
    desc: "Advanced study of LangChain, LangGraph, autonomous agent architectures, RAG systems, prompt engineering, and LLM integrations. Built multiple real-world projects applying these technologies.",
  },
];
