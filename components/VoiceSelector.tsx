'use client';

type Voice = 'scholarly' | 'devotional' | 'practical';

interface VoiceSelectorProps {
    selectedVoice: Voice;
    onChange: (voice: Voice) => void;
}

export function VoiceSelector({ selectedVoice, onChange }: VoiceSelectorProps) {
    return (
        <div className="flex gap-3 mb-8" role="tablist" aria-label="Content voice selector">
            <button
                onClick={() => onChange('scholarly')}
                role="tab"
                aria-pressed={selectedVoice === 'scholarly'}
                aria-label="Scholarly voice - Academic analysis with word studies and cross-references"
                className={`px-6 py-3 rounded-xl font-medium transition-all ${selectedVoice === 'scholarly'
                    ? 'blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-dark-surface text-primary-dark dark:text-gray-300 hover:bg-grace dark:hover:bg-gray-700'
                    }`}
            >
                📚 Scholarly
            </button>

            <button
                onClick={() => onChange('devotional')}
                role="tab"
                aria-pressed={selectedVoice === 'devotional'}
                aria-label="Devotional voice - Heart-centered reflections and prayer prompts"
                className={`px-6 py-3 rounded-xl font-medium transition-all ${selectedVoice === 'devotional'
                    ? 'blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-dark-surface text-primary-dark dark:text-gray-300 hover:bg-grace dark:hover:bg-gray-700'
                    }`}
            >
                🙏 Devotional
            </button>

            <button
                onClick={() => onChange('practical')}
                role="tab"
                aria-pressed={selectedVoice === 'practical'}
                aria-label="Practical voice - Action steps and real-life applications"
                className={`px-6 py-3 rounded-xl font-medium transition-all ${selectedVoice === 'practical'
                    ? 'blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-dark-surface text-primary-dark dark:text-gray-300 hover:bg-grace dark:hover:bg-gray-700'
                    }`}
            >
                💡 Practical
            </button>
        </div>
    );
}
