import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MISSIONS } from '../data/missions';
import { BookOpen, Search, Calendar, Filter, CheckCircle, Clock, Edit2 } from 'lucide-react';
import { EditableAnswer } from '../components/EditableAnswer';

function Diary() {
  const { missionAnswers, loadAllAnswers, isMissionCompleted, saveStepAnswer } = useApp();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'inProgress'
  const [editingAnswer, setEditingAnswer] = useState(null); // { weekNumber, stepIndex } or null

  // Load all answers on mount
  useEffect(() => {
    loadAllAnswers().finally(() => setLoading(false));
  }, []);

  // Get missions with answers
  const getMissionsWithAnswers = () => {
    const weekNumbers = Object.keys(missionAnswers).map(Number).sort((a, b) => a - b);

    return weekNumbers.map(weekNumber => {
      const mission = MISSIONS.find(m => m.week === weekNumber);
      const answers = missionAnswers[weekNumber] || {};
      const isCompleted = isMissionCompleted(weekNumber);

      // Convert answers object to array with step text
      const answersArray = Object.keys(answers)
        .filter(stepIndex => answers[stepIndex]?.trim().length > 0)
        .map(stepIndex => ({
          stepIndex: parseInt(stepIndex),
          stepText: mission?.steps[stepIndex] || `Stap ${parseInt(stepIndex) + 1}`,
          answer: answers[stepIndex]
        }))
        .sort((a, b) => a.stepIndex - b.stepIndex);

      return {
        weekNumber,
        mission,
        answers: answersArray,
        isCompleted,
        hasAnswers: answersArray.length > 0
      };
    }).filter(item => item.hasAnswers);
  };

  // Filter missions
  const getFilteredMissions = () => {
    let missions = getMissionsWithAnswers();

    // Apply completion filter
    if (filter === 'completed') {
      missions = missions.filter(m => m.isCompleted);
    } else if (filter === 'inProgress') {
      missions = missions.filter(m => !m.isCompleted);
    }

    // Apply search filter
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      missions = missions.filter(m => {
        const titleMatch = m.mission?.title.toLowerCase().includes(query);
        const answerMatch = m.answers.some(a =>
          a.answer.toLowerCase().includes(query) ||
          a.stepText.toLowerCase().includes(query)
        );
        return titleMatch || answerMatch;
      });
    }

    return missions;
  };

  const filteredMissions = getFilteredMissions();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-amber-400" />
          <h1 className="text-2xl md:text-3xl font-black text-white">📖 Mijn Dagboek</h1>
        </div>
        <p className="text-dark-400">Al je antwoorden op de wekelijkse missies</p>
      </div>

      {/* Filters and Search */}
      <div className="glass-card p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Zoek in je antwoorden..."
            className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-amber-500 text-white'
                : 'bg-dark-800 text-dark-400 hover:bg-dark-700'
            }`}
          >
            <Filter className="w-3 h-3 inline mr-1" />
            Alles ({getMissionsWithAnswers().length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filter === 'completed'
                ? 'bg-emerald-500 text-white'
                : 'bg-dark-800 text-dark-400 hover:bg-dark-700'
            }`}
          >
            <CheckCircle className="w-3 h-3 inline mr-1" />
            Voltooid ({getMissionsWithAnswers().filter(m => m.isCompleted).length})
          </button>
          <button
            onClick={() => setFilter('inProgress')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filter === 'inProgress'
                ? 'bg-amber-500 text-white'
                : 'bg-dark-800 text-dark-400 hover:bg-dark-700'
            }`}
          >
            <Clock className="w-3 h-3 inline mr-1" />
            Bezig ({getMissionsWithAnswers().filter(m => !m.isCompleted).length})
          </button>
        </div>
      </div>

      {/* Results */}
      {filteredMissions.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <BookOpen className="w-16 h-16 text-dark-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">
            {searchQuery ? 'Geen resultaten gevonden' : 'Nog geen antwoorden'}
          </h3>
          <p className="text-dark-400">
            {searchQuery
              ? 'Probeer een andere zoekterm'
              : 'Begin met het invullen van je eerste missie antwoorden!'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMissions.map(({ weekNumber, mission, answers, isCompleted }) => (
            <div key={weekNumber} className="glass-card overflow-hidden">
              {/* Mission Header */}
              <div className={`p-4 border-l-4 ${
                isCompleted ? 'border-l-emerald-500 bg-emerald-500/5' : 'border-l-amber-500 bg-amber-500/5'
              }`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-dark-800 text-dark-400">
                        Week {weekNumber}
                      </span>
                      {isCompleted && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Voltooid
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-white">{mission?.title || `Week ${weekNumber}`}</h3>
                    {mission?.description && (
                      <p className="text-sm text-dark-400 mt-1">{mission.description}</p>
                    )}
                  </div>
                  <Calendar className="w-5 h-5 text-dark-500" />
                </div>
              </div>

              {/* Answers */}
              <div className="p-4 space-y-4">
                {answers.map(({ stepIndex, stepText, answer }) => (
                  <div key={stepIndex} className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        {stepIndex + 1}
                      </div>
                      <p className="text-sm text-dark-400 font-medium">{stepText}</p>
                    </div>
                    {editingAnswer?.weekNumber === weekNumber && editingAnswer?.stepIndex === stepIndex ? (
                      <div className="ml-7">
                        <EditableAnswer
                          weekNumber={weekNumber}
                          stepIndex={stepIndex}
                          stepText={null}
                          initialValue={answer}
                          onSave={async (newAnswer) => {
                            await saveStepAnswer(weekNumber, stepIndex, newAnswer);
                            setEditingAnswer(null);
                            await loadAllAnswers();
                          }}
                          mode="autosave"
                          onCancel={() => setEditingAnswer(null)}
                        />
                      </div>
                    ) : (
                      <div className="ml-7 p-3 bg-dark-800/50 rounded-lg border border-dark-700/50">
                        <p className="text-dark-200 text-sm whitespace-pre-wrap">{answer}</p>
                        <button
                          onClick={() => setEditingAnswer({ weekNumber, stepIndex })}
                          className="mt-2 text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                        >
                          <Edit2 className="w-3 h-3" /> Bewerken
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Footer */}
      {filteredMissions.length > 0 && (
        <div className="glass-card p-4 flex items-center justify-between text-sm">
          <span className="text-dark-400">
            Totaal {filteredMissions.reduce((sum, m) => sum + m.answers.length, 0)} antwoorden
          </span>
          <span className="text-dark-400">
            {filteredMissions.filter(m => m.isCompleted).length} missies voltooid
          </span>
        </div>
      )}
    </div>
  );
}

export default Diary;
