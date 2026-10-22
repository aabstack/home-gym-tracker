# PROGRAM.md — Training Program & Seed Data

## Overview
- **Format:** 3-day full-body rotation, A / B / C (suggested Mon / Wed / Fri, with ≥ 48 h between sessions).
- **Goal:** hypertrophy and general strength within light-load constraints.
- **Effort:** finish sets at 1–3 reps in reserve (RIR). The last set of each exercise goes to RIR 0–1.
- **Tempo notation:** eccentric – bottom pause – concentric – top pause, in seconds.
- **Deload:** every 6th week, halve the sets and keep the same weights.
- **Load notes:** a pair of dumbbells is about 10 kg per hand; a single handle is about 18–20 kg. The yellow band adds roughly 2–7 kg of tension, so it's a finisher or assist tool, not a main load.

## Progression ladder
Move up one step at a time for an exercise, and only after hitting the top of the rep range on all sets at RIR 1–2:
1. Add reps up to the top of the range
2. Tempo: slow the eccentric to 4–5 s
3. Pause 2–3 s in the stretched position
4. 1.5 reps
5. Switch to unilateral with the single heavy dumbbell
6. Mechanical drop set on the last set
7. Rest-pause / myo-reps on the last set

## Canonical seed data
**Claude Code:** copy this JSON block verbatim into `src/data/program.seed.json`. Bump `seedVersion` whenever the program changes.

```json
{
  "seedVersion": 1,
  "warmup": [
    { "id": "wu_pass_through", "name": "Band pass-throughs", "detail": "Wide grip, overhead to behind the hips", "dose": "×10" },
    { "id": "wu_pull_apart", "name": "Band pull-aparts", "detail": "Arms straight, squeeze shoulder blades", "dose": "×15" },
    { "id": "wu_scap_pullup", "name": "Scapular pull-ups", "detail": "Hang from rack bar, move shoulder blades only, arms straight", "dose": "×8" },
    { "id": "wu_wgs", "name": "World's greatest stretch", "detail": "Lunge, elbow to instep, rotate open", "dose": "×3 / side" },
    { "id": "wu_squat_bridge", "name": "Bodyweight squat + glute bridge", "detail": "Controlled, full range", "dose": "×10 each" },
    { "id": "wu_ramp", "name": "Ramp-up set", "detail": "One light set of the first exercise at ~50% effort", "dose": "×1 set" }
  ],
  "exercises": [
    {
      "id": "pull_up",
      "name": "Pull-Ups",
      "targets": ["Lats", "Biceps"],
      "pattern": "vertical_pull",
      "loadType": "assisted",
      "perSide": false,
      "setup": "Use the rack pull-up bar with an overhand grip slightly wider than your shoulders. If you need help, loop the yellow band over the bar and put one knee or foot in the loop.",
      "execution": "Pull your shoulder blades down first, then drive your elbows toward your back pockets until your chin clears the bar. Lower for 3 seconds to a full dead hang without letting your shoulders shrug up.",
      "progression": "Add reps up to 4×8. Then hold a dumbbell between your feet, starting at about 5 kg. Then add a 2-second hold at the top."
    },
    {
      "id": "bulgarian_split_squat",
      "name": "DB Bulgarian Split Squat",
      "targets": ["Quads", "Glutes"],
      "pattern": "knee",
      "loadType": "dumbbell",
      "perSide": true,
      "setup": "Set the bench flat. Rest the laces of your rear foot on the pad, with your front foot about 2–3 feet in front of the bench. Hold one heavy dumbbell (18–20 kg) in goblet position, or two 10 kg dumbbells at your sides.",
      "execution": "Drop your back knee straight down, keeping your front shin fairly vertical for quads or leaning your torso forward for glutes. Pause 1 second at the bottom, then drive through your whole front foot.",
      "progression": "Add a 4-second lowering. Then do 1.5 reps (go down, come halfway up, go back down, then stand fully). Then finish the last set with a mechanical drop set: dumbbells to bodyweight, and keep going until form slips."
    },
    {
      "id": "incline_db_press",
      "name": "Incline DB Press",
      "targets": ["Chest", "Front Delts", "Triceps"],
      "pattern": "horizontal_push",
      "loadType": "dumbbell",
      "perSide": false,
      "setup": "Set the bench to a 30° incline. Rest the dumbbells on your knees, then kick them up as you lie back.",
      "execution": "Lower with your elbows at about 45–60° from your torso until you feel a deep chest stretch. Press up in a slight arc and squeeze your upper chest without clanking the dumbbells together.",
      "progression": "Add a 2-second pause at the bottom, then do 1.5 reps. You can also loop the band across your back and hold the ends with the dumbbells, so tension increases near lockout."
    },
    {
      "id": "sl_db_rdl",
      "name": "Single-Leg DB Romanian Deadlift",
      "targets": ["Hamstrings", "Glutes"],
      "pattern": "hip",
      "loadType": "dumbbell",
      "perSide": true,
      "setup": "Hold one heavy dumbbell in the hand opposite your standing leg. Lightly touch the rack upright with your free hand for balance if needed.",
      "execution": "Push your hips back as your free leg rises behind you, keeping your hips square to the floor and a soft bend in your standing knee. Lower until you feel a strong hamstring stretch, which usually puts the dumbbell around mid-shin, then drive your hips forward to stand.",
      "progression": "Remove the hand support. Then add a 3-second hold at the bottom. Then do 1.5 reps."
    },
    {
      "id": "sa_db_row",
      "name": "Single-Arm Bench-Supported DB Row",
      "targets": ["Lats", "Mid-Back"],
      "pattern": "horizontal_pull",
      "loadType": "dumbbell",
      "perSide": true,
      "setup": "Set the bench flat. Put the same-side knee and hand on the bench, with your other foot planted wide. Use your heaviest single dumbbell.",
      "execution": "Let the dumbbell hang until your shoulder blade is fully stretched forward. Row the dumbbell toward your hip (not your armpit) and hold the top for 1 second.",
      "progression": "Add a 4-second lowering. Then add a 2-second squeeze at the top. Then finish the last set with a few partial reps in the stretched position."
    },
    {
      "id": "band_pallof_press",
      "name": "Band Pallof Press",
      "targets": ["Core"],
      "pattern": "core",
      "loadType": "band",
      "perSide": true,
      "setup": "Loop the band around the rack upright at chest height, using a J-hook to stop it sliding. Stand side-on to the rack, far enough away that the band is under tension.",
      "execution": "Brace your core and press your hands straight out from your chest, resisting the pull to twist. Hold 2 seconds with arms extended, then bring your hands back slowly.",
      "progression": "Step farther from the rack. Then switch to a half-kneeling stance. Then extend the hold to 5 seconds."
    },
    {
      "id": "chin_up",
      "name": "Chin-Ups",
      "targets": ["Lats", "Biceps"],
      "pattern": "vertical_pull",
      "loadType": "assisted",
      "perSide": false,
      "setup": "Use an underhand grip at shoulder width on the rack bar. Use the band for assistance if needed.",
      "execution": "Pull your shoulder blades down, then pull your chest toward the bar while keeping your ribs down. Hold your chin over the bar for 1 second, then lower for 3 seconds to a full hang.",
      "progression": "Add reps to 3×10. Then hold a dumbbell between your feet. Then switch to 5-second lowerings."
    },
    {
      "id": "heels_elevated_goblet_squat",
      "name": "Heels-Elevated Goblet Squat (1.5 reps)",
      "targets": ["Quads"],
      "pattern": "knee",
      "loadType": "dumbbell",
      "perSide": false,
      "setup": "Rest your heels on the handles of two dumbbells laid flat, or on the edge of a stable surface. Hold one heavy dumbbell vertically against your chest.",
      "execution": "Sit straight down with your knees travelling forward over your toes. Come halfway up, go back down to the bottom, then stand fully. That counts as one rep.",
      "progression": "Add a 2-second pause at the bottom. Then loop the band under your feet and over your shoulders for extra tension at the top. Then finish the last set as a rest-pause (3 short mini-sets with 15 seconds between)."
    },
    {
      "id": "flat_db_press",
      "name": "Flat DB Press",
      "targets": ["Chest", "Triceps"],
      "pattern": "horizontal_push",
      "loadType": "dumbbell",
      "perSide": false,
      "setup": "Set the bench flat. Tuck your shoulder blades together and keep your feet planted.",
      "execution": "Lower the dumbbells to just outside chest level, with your forearms vertical, and pause 1 second in the stretch. Press up and finish with your elbows soft rather than locked.",
      "progression": "Use a mechanical drop set: flat press to failure, then 15 seconds of rest, then push-ups to failure. The incline-to-flat swap from Day A also works here."
    },
    {
      "id": "sl_db_hip_thrust",
      "name": "Single-Leg DB Hip Thrust",
      "targets": ["Glutes"],
      "pattern": "hip",
      "loadType": "dumbbell",
      "perSide": true,
      "setup": "Rest your upper back (just below the shoulder blades) across the long side of the flat bench. Place a dumbbell on the working hip and hold it with one hand.",
      "execution": "Drive through the heel of your working leg and tuck your chin and ribs as your hips rise. Hold the top for 2 seconds with your glute fully contracted, then lower under control.",
      "progression": "Add a 3-second lowering. Then add a band across your hips, anchored under the dumbbell handles or your feet. Then do 1.5 reps at the top half."
    },
    {
      "id": "seated_db_shoulder_press",
      "name": "Seated DB Shoulder Press",
      "targets": ["Delts", "Triceps"],
      "pattern": "vertical_push",
      "loadType": "dumbbell",
      "perSide": false,
      "setup": "Set the bench to its highest incline (about 80–85°). Start with the dumbbells at ear level, palms facing slightly in.",
      "execution": "Press up and slightly in, keeping your ribs down so your back doesn't arch. Lower for 3 seconds to below ear level for a full stretch.",
      "progression": "Switch to one arm at a time with your single heavy dumbbell. Then add a pause at the bottom. Then finish with lateral raises as a drop set."
    },
    {
      "id": "band_face_pull",
      "name": "Band Face Pull",
      "targets": ["Rear Delts", "Rotator Cuff"],
      "pattern": "shoulder_health",
      "loadType": "band",
      "perSide": false,
      "setup": "Anchor the band on the rack upright at face height.",
      "execution": "Pull toward your forehead, splitting your hands apart and rotating your knuckles back so your arms end in a 'double biceps' position. Hold 2 seconds and keep your shoulder blades back.",
      "progression": "Step farther from the anchor. Then do 1.5 reps. Then work up to 30-rep sets."
    },
    {
      "id": "eccentric_pull_up",
      "name": "Eccentric-Emphasis Pull-Ups",
      "targets": ["Lats"],
      "pattern": "vertical_pull",
      "loadType": "assisted",
      "perSide": false,
      "setup": "Use the rack bar with an overhand grip. Jump or use the band to get your chin above the bar.",
      "execution": "Lower yourself for a slow 5 seconds, staying tight all the way down. Perform any full reps you can, then switch to jump-assisted reps.",
      "progression": "Once you can do strict reps, extend the lowering to 8 seconds. Then add a dumbbell between your feet."
    },
    {
      "id": "sl_box_squat",
      "name": "Single-Leg Box Squat to Bench",
      "targets": ["Quads", "Glutes"],
      "pattern": "knee",
      "loadType": "dumbbell",
      "perSide": true,
      "setup": "Set the flat bench behind you. Hold a light dumbbell (5–10 kg) at arm's length in front of you as a counterbalance.",
      "execution": "On one leg, sit back under control until you lightly touch the bench, without dropping your weight onto it. Pause briefly, then stand by pushing through your whole foot.",
      "progression": "Use a lower target (set the bench lower or stack a pad on the floor). Then hold the dumbbell at your chest. Then progress toward a full pistol squat."
    },
    {
      "id": "decline_push_up",
      "name": "Decline Push-Up (feet on bench)",
      "targets": ["Upper Chest", "Front Delts", "Triceps"],
      "pattern": "horizontal_push",
      "loadType": "bodyweight",
      "perSide": false,
      "setup": "Put your feet on the flat bench, with your hands slightly wider than your shoulders. Grip the dumbbell handles if you want a deeper range.",
      "execution": "Lower your chest to the floor (or below handle level) with your elbows at about 45°. Push up while keeping your body in a straight line from heels to head.",
      "progression": "Raise the incline of the bench for a steeper angle. Then hold the band across your back. Then add pauses and 1.5 reps."
    },
    {
      "id": "sl_hamstring_bridge",
      "name": "Single-Leg Hamstring Bridge (heel on bench)",
      "targets": ["Hamstrings", "Glutes"],
      "pattern": "hip",
      "loadType": "dumbbell",
      "perSide": true,
      "setup": "Lie on your back with one heel on the flat bench and your knee bent about 90°. Rest a dumbbell on your hips.",
      "execution": "Drive your heel down into the bench and lift your hips until your body forms a straight line from knee to shoulder. Hold 1 second, then lower for 3 seconds.",
      "progression": "Straighten your knee more for more hamstring work. Then add a band across your hips. Then build toward 20 reps per leg."
    },
    {
      "id": "incline_prone_db_row",
      "name": "Incline Prone DB Row",
      "targets": ["Mid-Back", "Rear Delts"],
      "pattern": "horizontal_pull",
      "loadType": "dumbbell",
      "perSide": false,
      "setup": "Set the bench to about 30–45°. Lie chest-down with your chin just past the top of the pad and a dumbbell in each hand.",
      "execution": "Let your shoulders round forward in the stretch, then pull your elbows back and wide until your shoulder blades meet. Hold 2 seconds at the top.",
      "progression": "Add a 4-second lowering. Then try a Y-raise variation. Then finish with partial reps in the stretched position."
    },
    {
      "id": "incline_db_curl",
      "name": "Incline DB Curl",
      "targets": ["Biceps"],
      "pattern": "arms",
      "loadType": "dumbbell",
      "perSide": false,
      "setup": "Set the bench to 45–60° so your arms hang behind your torso, with a dumbbell in each hand.",
      "execution": "Curl while keeping your elbows fixed and pointing down. Lower for 3 seconds to a full stretch.",
      "progression": "Hold 1.5 seconds in the stretch at the bottom. Then finish with a band drop set. Then do 21s (7 bottom-half reps, 7 top-half reps, 7 full reps)."
    },
    {
      "id": "overhead_db_triceps_ext",
      "name": "Overhead DB Triceps Extension",
      "targets": ["Triceps"],
      "pattern": "arms",
      "loadType": "dumbbell",
      "perSide": false,
      "setup": "Sit at the highest bench incline and hold one dumbbell with both hands overhead.",
      "execution": "Lower the dumbbell behind your head to a deep stretch, keeping your elbows pointing forward. Extend fully without flaring your elbows.",
      "progression": "Hold 1.5 seconds in the stretch. Then finish with a band drop set. Then switch to single-arm extensions."
    }
  ],
  "days": [
    {
      "id": "A",
      "name": "Full-Body A",
      "focus": "Strength-hypertrophy, unilateral load focus",
      "order": 1,
      "items": [
        { "exerciseId": "pull_up", "sets": 4, "repMin": 5, "repMax": 8, "restSec": 120, "tempo": "3-0-1-0" },
        { "exerciseId": "bulgarian_split_squat", "sets": 3, "repMin": 8, "repMax": 12, "restSec": 90, "tempo": "3-1-1-0" },
        { "exerciseId": "incline_db_press", "sets": 3, "repMin": 10, "repMax": 15, "restSec": 90, "tempo": "3-1-1-0" },
        { "exerciseId": "sl_db_rdl", "sets": 3, "repMin": 10, "repMax": 12, "restSec": 75, "tempo": "3-1-1-0" },
        { "exerciseId": "sa_db_row", "sets": 3, "repMin": 10, "repMax": 12, "restSec": 60, "tempo": "2-0-1-1" },
        { "exerciseId": "band_pallof_press", "sets": 2, "repMin": 12, "repMax": 12, "restSec": 45, "tempo": "2-2-1-0" }
      ]
    },
    {
      "id": "B",
      "name": "Full-Body B",
      "focus": "Metabolic hypertrophy, time under tension",
      "order": 2,
      "items": [
        { "exerciseId": "chin_up", "sets": 3, "repMin": 6, "repMax": 10, "restSec": 90, "tempo": "3-0-1-1" },
        { "exerciseId": "heels_elevated_goblet_squat", "sets": 3, "repMin": 10, "repMax": 15, "restSec": 90, "tempo": "3-1-1-0" },
        { "exerciseId": "flat_db_press", "sets": 3, "repMin": 12, "repMax": 15, "restSec": 75, "tempo": "3-1-1-0" },
        { "exerciseId": "sl_db_hip_thrust", "sets": 3, "repMin": 12, "repMax": 15, "restSec": 60, "tempo": "2-0-1-2" },
        { "exerciseId": "seated_db_shoulder_press", "sets": 3, "repMin": 10, "repMax": 15, "restSec": 75, "tempo": "3-0-1-0" },
        { "exerciseId": "band_face_pull", "sets": 2, "repMin": 20, "repMax": 20, "restSec": 45, "tempo": "2-0-1-2" }
      ]
    },
    {
      "id": "C",
      "name": "Full-Body C",
      "focus": "Leverage and single-leg emphasis",
      "order": 3,
      "items": [
        { "exerciseId": "eccentric_pull_up", "sets": 3, "repMin": 4, "repMax": 6, "restSec": 120, "tempo": "5-0-1-0" },
        { "exerciseId": "sl_box_squat", "sets": 3, "repMin": 8, "repMax": 12, "restSec": 90, "tempo": "3-1-1-0" },
        { "exerciseId": "decline_push_up", "sets": 3, "repMin": 10, "repMax": 20, "restSec": 75, "tempo": "3-1-1-0" },
        { "exerciseId": "sl_hamstring_bridge", "sets": 3, "repMin": 10, "repMax": 15, "restSec": 60, "tempo": "3-0-1-1" },
        { "exerciseId": "incline_prone_db_row", "sets": 3, "repMin": 12, "repMax": 15, "restSec": 60, "tempo": "2-0-1-2" },
        { "exerciseId": "incline_db_curl", "sets": 3, "repMin": 12, "repMax": 15, "restSec": 0, "tempo": "3-0-1-0", "supersetGroup": "C-arms" },
        { "exerciseId": "overhead_db_triceps_ext", "sets": 3, "repMin": 12, "repMax": 15, "restSec": 60, "tempo": "3-0-1-0", "supersetGroup": "C-arms" }
      ]
    }
  ],
  "progressionLadder": [
    { "id": "reps", "label": "Add reps to top of range" },
    { "id": "tempo", "label": "Tempo: 4–5 s eccentric" },
    { "id": "pause", "label": "Pause 2–3 s in stretch" },
    { "id": "1.5 reps", "label": "1.5 reps" },
    { "id": "unilateral", "label": "Switch to unilateral" },
    { "id": "drop set", "label": "Mechanical drop set on last set" },
    { "id": "rest-pause", "label": "Rest-pause last set" }
  ],
  "defaults": {
    "dumbbellWeightsKg": [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20],
    "deloadEveryNWeeks": 6,
    "defaultRir": 2
  }
}
```

## Notes for the app
- For `perSide` exercises, `repMin`/`repMax` are **per side**.
- In a superset, `restSec: 0` on the first exercise means you go straight to the second exercise with no rest. The rest timer runs after the second exercise.
- The Pallof press and face pull have fixed targets (`repMin` = `repMax`). Their progression is technique and stance, not load, so the engine should go straight to the ladder or exercise-specific progression text.
- For assisted pull-up variations, a set logged with `bandAssist: true` doesn't count toward "hit target" for adding load; the first suggestion is always to remove the band.
