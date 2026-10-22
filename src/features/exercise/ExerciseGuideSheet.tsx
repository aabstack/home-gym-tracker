import { format } from 'date-fns';
import { Icon } from '../../components/Icon';
import { Sheet } from '../../components/Sheet';
import type { HistoryEntry } from '../../data/repo';
import type { Exercise, SessionItem } from '../../data/types';
import { formatLoad, formatPrescription, formatRir, tempoToWords } from '../../domain/format';
import { topSet } from '../../domain/stats';
import { demoSearchUrl, programTempo } from './demos';
import { ExerciseAnimation } from './ExerciseAnimation';

export function ExerciseGuideSheet({
  exercise,
  item,
  history,
  onClose,
}: {
  exercise: Exercise | null;
  item?: Pick<SessionItem, 'sets' | 'repMin' | 'repMax' | 'tempo' | 'restSec'>;
  history?: HistoryEntry[];
  onClose: () => void;
}) {
  return (
    <Sheet open={exercise !== null} onClose={onClose} title={exercise?.name ?? ''}>
      {exercise && (
        <div className="flex flex-col gap-4">
          <ExerciseAnimation
            key={exercise.id}
            exerciseId={exercise.id}
            name={exercise.name}
            tempo={item?.tempo ?? programTempo(exercise.id)}
          />
          <WatchDemo name={exercise.name} />
          <div>
            <p className="text-muted">{exercise.targets.join(' · ')}</p>
            {item && (
              <>
                <p className="num mt-1">{formatPrescription(item, exercise.perSide)}</p>
                <p className="mt-1 text-label text-muted">Tempo: {tempoToWords(item.tempo)}</p>
              </>
            )}
            {exercise.perSide && <p className="mt-1 text-label text-muted">Reps are per side.</p>}
          </div>
          <GuideSection title="Setup" text={exercise.setup} />
          <GuideSection title="Execution" text={exercise.execution} />
          <GuideSection title="Progression" text={exercise.progression} />
          <section>
            <h3 className="mb-1 text-label font-semibold uppercase tracking-wide text-muted">
              Recent top sets
            </h3>
            {history && history.length > 0 ? (
              <ul className="divide-y divide-line rounded-2xl bg-raised px-3">
                {history.slice(0, 5).map((h) => {
                  const t = topSet(h.sets);
                  return (
                    <li key={h.session.id} className="num flex justify-between py-2">
                      <span className="text-muted">{format(h.session.startedAt, 'EEE d MMM')}</span>
                      {t && (
                        <span>
                          {formatLoad(t, exercise.loadType)} × {t.reps}{' '}
                          <span className="text-muted">@ RIR {formatRir(t.rir)}</span>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-muted">No history yet.</p>
            )}
          </section>
        </div>
      )}
    </Sheet>
  );
}

function GuideSection({ title, text }: { title: string; text: string }) {
  return (
    <section>
      <h3 className="mb-1 text-label font-semibold uppercase tracking-wide text-muted">{title}</h3>
      <p>{text}</p>
    </section>
  );
}

function WatchDemo({ name }: { name: string }) {
  const online = typeof navigator === 'undefined' || navigator.onLine !== false;
  return (
    <div className="rounded-2xl border border-line p-3">
      <p className="text-label text-muted">
        The drawing shows the basic movement and the tempo. For proper form and technique, watch a
        video demo before your first set.
      </p>
      {online ? (
        <a
          href={demoSearchUrl(name)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-raised px-4 font-semibold"
        >
          <Icon name="play" size={18} className="text-danger" /> Watch demo
          <Icon name="external" size={16} className="text-muted" />
        </a>
      ) : (
        <p className="mt-2 flex min-h-12 items-center justify-center rounded-2xl bg-raised px-4 text-label text-muted">
          You're offline. Connect to the internet to watch a demo.
        </p>
      )}
      <p className="mt-1 text-center text-[12px] text-muted">Opens YouTube · needs internet</p>
    </div>
  );
}
