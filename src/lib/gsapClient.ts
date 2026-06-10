import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Single registration point so every component shares one ScrollTrigger.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
