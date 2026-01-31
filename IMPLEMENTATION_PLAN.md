# Landing Page Implementation Plan

## Current State (Main Branch - Working)
- Hero with hand holding iPhone
- Scroll animation: phone moves to center of screen
- Text: "Feel the difference in 5 questions. No signup. Scroll to scrub the demo."
- This transition animation is EXACTLY what we want to keep

## Goal (Scrolly-Telling Demo)
After the phone reaches center position:
- Transition to scroll-scrub DEMO section
- Use VIDEO FRAMES (not MP4) at 15fps
- Frames extracted from: `raw_video/raw_orlistat_demo.mp4`
- Frames location: `public/demo/frames/` (827 frames at 15fps)
- Phone stays in SAME POSITION as where the video was tested
- Text overlays sync to frame/scroll position

## Technical Requirements

### Phase 1: Video Processing (COMPLETE)
✅ Source video: `raw_video/raw_orlistat_demo.mp4` (76.5s)
✅ EDL edits applied:
   - Cut: 00:06-00:08 (loading spinner)
   - Cut: 00:42-00:48 (Ask Tutor delay)
   - Cut: 01:03-01:05 (blank transition)
   - Speed 400%: 00:08-00:18 (cursor fly)
   - Speed 300%: 01:05-01:09 (zip to History)
   - Speed 200%: 01:09-01:12 (click History)
✅ Output: `public/demo/app-demo-edited.mp4`
✅ Frame extraction: 827 frames at 15fps in `public/demo/frames/`

### Phase 2: Scroll-Scrub Implementation (TODO)
- Replace video element with canvas-based frame renderer
- Use existing PhoneScreenDemo.tsx structure
- Sync frame advancement to scroll position
- **CRITICAL: Smooth frame interpolation**
  - Use requestAnimationFrame for buttery 60fps
  - Interpolate between frames (don't jump)
  - Frame = Math.floor(scrollProgress * totalFrames)
  - Preload nearby frames (window of 5-10) for instant response
  - Never show partial/jittery transitions
- Keep phone positioning identical to video test
- **Test readability**: Text should be clearly readable at all scroll speeds

### Phase 3: Text Overlays (TODO)
5 sections with text fading in/out based on scroll:

**Section 1 - Dashboard (Frames 1-90)**
Headline: "Stop Guessing. Start Passing."
Subtext: "You don't have time for vague feedback. See your exact probability of passing and visualise your curriculum coverage in real-time."

**Section 2 - Question (Frames 91-180)**
Headline: "The '10-Minute Gap' Revision."
Subtext: "Designed for the car park or between consults. High-yield clinical vignettes that fit into the tightest schedule."

**Section 3 - The Moat (Frames 181-630)**
Headline: "The Examiner's Playbook."
Subtext: "Don't just know the answer. Understand the clinical clues, the red herrings, and exactly why the other options were wrong."

**Section 4 - AI Tutor (Frames 631-780)**
Headline: "Your On-Demand Clinical Supervisor."
Subtext: "Stuck? Ask 'Why?' Challenge the guidelines or clarify a concept. Your AI Supervisor bridges the gap between the textbook and real practice."

**Section 5 - History (Frames 781-827)**
Headline: "Active Recall, Automated."
Subtext: "Every mistake becomes a lesson. We auto-generate high-yield Learning Points for you to review minutes before the exam."

### Phase 4: Transition Handoff (TODO)
- Detect when hero phone animation reaches center
- Smooth crossfade from hero phone to demo phone
- Maintain exact same phone position, size, angle
- No visible jump or position change

### Phase 5: Hero Text Update (TODO)
Replace current hero text:
- FROM: "Feel the difference in 5 questions. No signup. Scroll to scrub the demo."
- TO: "BUILT FOR THE 10-MINUTE GAP" / "Stop Revising Blindly." / "High-yield clinical vignettes..." / "↓ Scroll to take a test drive. No signup."

## Files to Modify
1. `src/components/HeroNarration.tsx` - Update hero copy
2. `src/components/PhoneScreenDemo.tsx` - Implement frame-based scroll-scrub
3. `src/app/page.tsx` - Sync hero-to-demo transition
4. `src/components/ScrollReveal.tsx` - Text fade animations

## Acceptance Criteria
- [ ] Hero scroll animation works exactly as before
- [ ] Phone reaches center and seamlessly transitions to demo
- [ ] Frame scroll-scrub is smooth (no jitter)
- [ ] Text overlays appear at correct frame positions
- [ ] Mobile responsive
- [ ] Build succeeds
- [ ] No console errors
