import { render, screen } from '@testing-library/react';
import { programSeed } from '../../data/seed';
import {
  BONES,
  buildSkeleton,
  dist,
  resolveTarget,
  shoulderOf,
  timelineLength,
} from '../../domain/figure';
import { bendsFor, demoSearchUrl, DEMOS, programTempo, timelineFor } from './demos';
import { ExerciseAnimation } from './ExerciseAnimation';

const ARM = BONES.upperArm + BONES.forearm;
const LEG = BONES.thigh + BONES.shin;
/** How far a hand/foot target may sit beyond reach (the IK then straightens the limb). */
const SLACK = 1.5;

describe('exercise demos', () => {
  it.each(programSeed.exercises.map((e) => [e.id]))('%s has a valid animation', (id) => {
    const demo = DEMOS[id];
    expect(demo).toBeDefined();

    const steps = timelineFor(demo, programTempo(id));
    expect(timelineLength(steps)).toBeGreaterThan(1);
    for (const s of steps) {
      expect(demo.poses[s.from]).toBeDefined();
      expect(demo.poses[s.to]).toBeDefined();
    }

    for (const [name, pose] of Object.entries(demo.poses)) {
      const sk = buildSkeleton(pose, bendsFor(demo));
      for (const p of Object.values(sk))
        expect(Number.isFinite(p[0]) && Number.isFinite(p[1])).toBe(true);
      const sh = shoulderOf(pose);
      const reach = (t: typeof pose.handN | undefined, from: readonly [number, number]) =>
        t === undefined ? 0 : dist(from, resolveTarget(t, pose.hip, sh));
      expect(reach(pose.handN, sh), `${id}.${name} near hand`).toBeLessThan(ARM + SLACK);
      expect(reach(pose.handF, sh), `${id}.${name} far hand`).toBeLessThan(ARM + SLACK);
      expect(reach(pose.footN, pose.hip), `${id}.${name} near foot`).toBeLessThan(LEG + SLACK);
      expect(reach(pose.footF, pose.hip), `${id}.${name} far foot`).toBeLessThan(LEG + SLACK);
    }
  });

  it('uses the program tempo, with a 1.5-rep custom sequence for the goblet squat', () => {
    expect(programTempo('bulgarian_split_squat')).toBe('3-1-1-0');
    expect(programTempo('unknown')).toBe('2-0-1-0');
    const goblet = timelineFor(DEMOS.heels_elevated_goblet_squat, '3-1-1-0');
    expect(goblet.map((s) => s.to)).toEqual(['end', 'end', 'half', 'end', 'start']);
    expect(goblet[0].from).toBe('start');
  });

  it('builds a YouTube search link without the "(1.5 reps)" suffix', () => {
    const url = demoSearchUrl('Heels-Elevated Goblet Squat (1.5 reps)');
    expect(url.startsWith('https://www.youtube.com/results?search_query=')).toBe(true);
    expect(decodeURIComponent(url)).toContain('Heels-Elevated Goblet Squat exercise proper form');
    expect(decodeURIComponent(url)).not.toContain('1.5');
  });

  it('renders the animation with a phase label', () => {
    render(<ExerciseAnimation exerciseId="flat_db_press" name="Flat DB Press" tempo="3-1-1-0" />);
    expect(screen.getByRole('button', { name: /Flat DB Press animation/ })).toBeInTheDocument();
    expect(screen.getByText('Lower')).toBeInTheDocument();
  });

  it('renders nothing for an exercise without a demo', () => {
    const { container } = render(
      <ExerciseAnimation exerciseId="nope" name="Nope" tempo="2-0-1-0" />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
