import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptionWheel from "./OptionWheel";

export const SERVICES_DATA = [
  {
    id: "brand-development",
    name: "Brand Development",
    introLines: [
      " Built to stand out, designed to mean something. We turn ideas into distinctive brand identities",
      "giving every detail a purpose and every brand a world of its own.",
    ],
    items: [
      "Brand Strategy & Positioning",
      "Brand Identity & Logo Development",
      "Visual Language & Art Direction",
      "Typography & Color Systems",
      "Brand Guidelines & Identity Standards",
      "Stationery & Branded Collateral",
      "Packaging & Brand Applications",
      "Brand Assets & Visual Storytelling",
    ],
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Design",
    introLines: [
      " Digital products designed with intent, balance, and human intuition. We shape interfaces",
      "that feel natural to touch, intuitive to navigate, and impossible to forget.",
    ],
    items: [
      "Design Systems & Modular UI Kits",
      "High-Fidelity Interactive Prototyping",
      "Wireframing & Comprehensive User Flows",
      "Micro-Interactions & Motion Choreography",
      "Usability Audits & User Journey Testing",
      "Responsive Web & Mobile Architecture",
      "Design-to-Code Precision Handoff",
    ],
  },
  {
    id: "web-development",
    name: "Web Development",
    introLines: [
      " Engineered with clean code, unmatched performance, and seamless interactive polish. We",
      "turn complex visions into lightweight, modern web applications.",
    ],
    items: [
      "Bespoke Creative Frontend Engineering",
      "Full-Stack Architecture & APIs",
      "Headless CMS & Custom Workflows",
      "Interactive 3D, WebGL & Canvas Experiences",
      "Core Web Vitals & Load Speed Optimization",
      "SEO & Semantic Web Standards",
    ],
  },
  {
    id: "software-solutions",
    name: "Software Solutions",
    introLines: [
      "Purpose-built technology, engineered with precision, from custom platforms ",
      "to integrated systems, we build tailored software solutions that simplify operations,",
      "connect systems and turn ambitious ideas into tools built to perform.",
    ],
    items: [
      "Custom Software & Application Development",
      "SaaS Product Development",
      "Business Process Automation",
      "API Development & System Integrations",
      "Database Architecture & Backend Development",
      "Software Maintenance & Optimization",
    ],
  },
  {
    id: "graphic-design",
    name: "Graphic Design",
    introLines: [
      " High-impact visual language crafted for contemporary culture. From printed artifacts to",
      "digital mediums, we bring clarity and presence to every touchpoint.",
    ],
    items: [
      "Visual Identity & Brand Guidelines",
      "Editorial, Book & Publication Design",
      "Tactile Goods & Premium Packaging",
      "Custom Typography & Logotype Craft",
      "Spatial Graphics & Exhibition Art Direction",
      "Custom Iconography & Vector Illustration",
      "Print Production & Finishes Oversight",
    ],
  },
  {
    id: "social-media-campaigns",
    name: "Social Media",
    introLines: [
      " Strategic narratives built to engage communities and ignite cultural conversation across",
      "modern social platforms.",
    ],
    items: [
      "Campaign Concept & Visual Narrative",
      "Motion Design & Short-Form Video Content",
      "Social Art Direction & Asset Libraries",
      "Platform-Native Storytelling & Rollouts",
      "Community Growth & Engagement Strategy",
      "Creator & Cultural Collab Direction",
      "Performance Analytics & Creative Iteration",
    ],
  },
  {
    id: "creative-partner",
    name: "Creative Partner",
    introLines: [
      " Long-term creative guardianship for founders and visionary teams. We work alongside you",
      "as an embedded partner to direct, build, and evolve.",
    ],
    items: [
      "Dedicated Creative Direction Oversight",
      "Strategic Product & Brand Advisory",
      "Sprint-Based Collaborative Execution",
      "Continuous Brand Evolution & Refinement",
      "Direct Founder-Level Collaboration",
      "Cross-Platform Ecosystem Cohesion",
      "Quarterly Vision Alignment & Audits",
    ],
  },
  {
    id: "consultation",
    name: "Consultation",
    introLines: [
      " Deep-dive strategic sessions to audit, diagnose, and unlock growth for your brand, product",
      "architecture, or digital ecosystem.",
    ],
    items: [
      "Brand & Digital Experience Audits",
      "Technical Architecture & Code Review",
      "Go-to-Market Advisory & Roadmaps",
      "UX Pain Point Diagnosis & Optimizations",
      "Design Leadership & Team Mentorship",
      "Design Ops & Workflow Scalability",
      "Future Tech & AI Integration Roadmaps",
    ],
  },
];

export default function ServicesHeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeService = SERVICES_DATA[activeIndex] || SERVICES_DATA[0];
  const serviceNames = SERVICES_DATA.map((s) => s.name);

  return (
    <section
      id="services-hero"
      className="relative w-full min-h-screen bg-black text-white px-[0.8333vw] pt-[2.5vw] pb-[2.5vw] flex flex-col justify-center"
    >
      {/* 12-column responsive grid matching Universal Navbar */}
      <div className="w-full grid grid-cols-12 gap-[0.8333vw] items-start">
        {/* Left Side: Columns 1 to 6 - Wheel Component */}
        <div className="col-span-6 h-[42vw] max-h-[720px] min-h-[820px] relative flex items-center pr-[1vw]">
          <OptionWheel
            items={serviceNames}
            selectedIndex={activeIndex}
            onChange={(idx) => setActiveIndex(idx)}
            className="w-full h-full"
            loop={true}
          />
        </div>

        {/* Right Side: Columns 7 to 12 (Starts at Col 7, aligned with live clock in Navbar) */}
        {/* Fixed top side anchoring so height is variable downwards only */}
        <div className="col-start-7 col-span-6 flex flex-col items-start relative pt-[8.5vw]">
          {/* Eyebrow Label */}
          <div className="overflow-hidden pb-[0.2vw] mb-[1.2vw]">
            <span className="block text-[0.5556vw] font-semibold tracking-[-0.03em] text-white/50 uppercase select-none">
              SCROLL THE WHEEL OR SELECT A SERVICE TO KNOW MORE
            </span>
          </div>

          {/* Description Container with strictly fixed top side & variable height downwards only */}
          <div className="relative w-full max-w-[40.625vw] min-h-[22vw]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                className="w-full flex flex-col items-start"
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* Intro Paragraph: Animated in masked stagger strictly by line */}
                <div className="w-full flex flex-col space-y-[0.1vw] mb-[1.2vw]">
                  {activeService.introLines.map((line, lineIdx) => (
                    <div
                      key={lineIdx}
                      className="overflow-hidden w-full pb-[0.08em] -mb-[0.08em] block"
                    >
                      <motion.div
                        variants={{
                          initial: { y: "105%", opacity: 1 },
                          animate: {
                            y: "0%",
                            opacity: 1,
                            transition: {
                              duration: 1.5,
                              ease: [0.315, -0.011, 0, 0.986],
                              delay: lineIdx * 0.035,
                            },
                          },
                          exit: {
                            y: "-105%",
                            opacity: 1,
                            transition: {
                              duration: 0.8,
                              ease: [0.315, -0.011, 0, 0.986],
                              delay: lineIdx * 0.02,
                            },
                          },
                        }}
                        className="text-[0.9722vw] font-medium leading-[1] text-white tracking-[-0.03em] whitespace-nowrap block"
                      >
                        {line}
                      </motion.div>
                    </div>
                  ))}
                </div>

                {/* Core Capabilities List: Each item is animated in masked stagger by line */}
                <div className="w-full flex flex-col space-y-[0.35vw]">
                  {activeService.items.map((item, itemIdx) => {
                    const globalLineIndex =
                      activeService.introLines.length + itemIdx;
                    return (
                      <div
                        key={item}
                        className="overflow-hidden w-full pb-[0.08em] -mb-[0.08em] block"
                      >
                        <motion.div
                          variants={{
                            initial: { y: "105%", opacity: 1 },
                            animate: {
                              y: "0%",
                              opacity: 1,
                              transition: {
                                duration: 1.5,
                                ease: [0.315, -0.011, 0, 0.986],
                                delay: globalLineIndex * 0.035,
                              },
                            },
                            exit: {
                              y: "-105%",
                              opacity: 1,
                              transition: {
                                duration: 0.8,
                                ease: [0.315, -0.011, 0, 0.986],
                                delay: globalLineIndex * 0.02,
                              },
                            },
                          }}
                          className="text-[0.9722vw] font-medium text-white/80 tracking-[-0.03em] leading-tight-[] whitespace-nowrap block"
                        >
                          {item}
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
