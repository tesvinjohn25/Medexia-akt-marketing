# Scrolly-Telling Landing Page - TODO List

## Phase 1: Video Edit (Forge/Claude Code)
| Step | Task | Status | Notes |
|------|------|--------|-------|
| 1.1 | Download raw video from Drive | ✅ DONE | 74MB, 76.5s duration |
| 1.2 | Apply EDL cuts and speed ramps | 🔄 IN PROGRESS | Using ffmpeg |
| 1.3 | Export edited video at 15fps | ⏳ PENDING | Target: ~55s duration |
| 1.4 | Extract frames to public/demo/frames_new/ | ⏳ PENDING | ~825 frames expected |
| 1.5 | Verify frame count and quality | ⏳ PENDING | Check 15fps output |

### EDL Breakdown for ffmpeg:
- 00:00-00:06: Keep (6s)
- 00:06-00:08: CUT (remove 2s)
- 00:08-00:18: Speed 400% (2.5s instead of 10s)
- 00:18-00:20: Keep (2s)
- 00:20-00:42: Keep (22s) - THE MOAT
- 00:42-00:48: CUT (remove 6s)
- 00:48-01:03: Keep (15s)
- 01:03-01:05: CUT (remove 2s)
- 01:05-01:09: Speed 300% (~1.3s instead of 4s)
- 01:09-01:12: Speed 200% (~1.5s instead of 3s)
- 01:12-end: Keep (remaining)

Expected total: ~55 seconds

## Phase 2: Hero Text Update (Forge/Claude Code)
| Step | Task | Status |
|------|------|--------|
| 2.1 | Update HeroNarration.tsx | ⏳ PENDING |
| 2.2 | Add tagline: "BUILT FOR THE 10-MINUTE GAP" | ⏳ PENDING |
| 2.3 | Main headline: "Stop Revising Blindly." | ⏳ PENDING |
| 2.4 | Subtext about high-yield vignettes | ⏳ PENDING |
| 2.5 | Scroll instruction: "↓ Scroll to take a test drive. No signup." | ⏳ PENDING |

## Phase 3: Scrolly-Telling Implementation (Forge/Claude Code)
| Step | Task | Status |
|------|------|--------|
| 3.1 | Implement scroll-scrub with new frames | ⏳ PENDING |
| 3.2 | Section 1: Dashboard text ("Stop Guessing. Start Passing.") | ⏳ PENDING |
| 3.3 | Section 2: Question text ("The 10-Minute Gap Revision") | ⏳ PENDING |
| 3.4 | Section 3: Moat text ("The Examiner's Playbook") | ⏳ PENDING |
| 3.5 | Section 4: AI Tutor text ("Your On-Demand Clinical Supervisor") | ⏳ PENDING |
| 3.6 | Section 5: History text ("Active Recall, Automated") | ⏳ PENDING |
| 3.7 | Fade in/out text animations | ⏳ PENDING |
| 3.8 | Mobile-responsive testing | ⏳ PENDING |
| 3.9 | Commit and push to scrolly-demo-prototype branch | ⏳ PENDING |

## Blockers
- None currently

## Agent Assignment
- **Forge (Claude Code)**: Video editing, frame extraction, component implementation
