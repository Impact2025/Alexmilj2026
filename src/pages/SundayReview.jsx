import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getMissionByWeek } from '../data/missions';
import { Video, CheckCircle, MessageSquare, Lightbulb, Zap, Camera, ThumbsUp } from 'lucide-react';

function SundayReview() {
  const { user, completeWeeklyVideo } = useApp();
  const [videoRecorded, setVideoRecorded] = useState(false);
  
  const currentMission = getMissionByWeek(user.currentWeek > 1 ? user.currentWeek - 1 : 1);
  const isSunday = new Date().getDay() === 0;

  const videoQuestions = [
    {
      icon: '📚',
      question: 'Wat heb je deze week geleerd?',
      hint: 'Welke nieuwe dingen weet je nu?'
    },
    {
      icon: '💪',
      question: 'Wat was het moeilijkste?',
      hint: 'Waar had je moeite mee?'
    },
    {
      icon: '🌟',
      question: 'Waar ben je het meest trots op?',
      hint: 'Wat ging echt goed?'
    },
    {
      icon: '🎯',
      question: 'Wat ga je volgende week anders doen?',
      hint: 'Wat kun je verbeteren?'
    },
  ];

  const videoTips = [
    'Kijk in de camera en spreek duidelijk',
    'Laat zien wat je gemaakt hebt deze week',
    'Wees eerlijk over wat moeilijk was',
    'Sluit af met waar je volgende week aan gaat werken',
  ];

  const handleRecordComplete = () => {
    setVideoRecorded(true);
    completeWeeklyVideo();
  };

  return (
    <div className="space-y-6 animate-slide-up max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="text-6xl mb-4">🎬</div>
        <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
          Zondag = Filmdag!
        </h1>
        <p className="text-dark-400">
          Tijd om terug te blikken en je wekelijkse video te maken
        </p>
        {!isSunday && (
          <div className="mt-3 inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full text-sm">
            <Video className="w-4 h-4" />
            Het is vandaag geen zondag, maar je kunt alvast voorbereiden!
          </div>
        )}
      </div>

      {/* Current Mission Recap */}
      {currentMission && (
        <div className="glass-card p-6 border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-white">Deze Week: {currentMission.title}</h3>
              <span className="text-xs text-indigo-400">Week {currentMission.week}</span>
            </div>
          </div>
          <p className="text-dark-400">{currentMission.description}</p>
        </div>
      )}

      {/* Video Questions */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span>📝</span> Praat in je video over:
        </h3>
        
        <div className="space-y-4">
          {videoQuestions.map((q, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-dark-800/50 rounded-xl">
              <div className="text-2xl">{q.icon}</div>
              <div>
                <div className="font-bold text-white">{i + 1}. {q.question}</div>
                <div className="text-dark-500 text-sm">{q.hint}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Tips */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          Tips voor een goede video
        </h3>
        
        <div className="space-y-3">
          {videoTips.map((tip, i) => (
            <div key={i} className="flex items-start gap-3 text-dark-300">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Week Summary */}
      <div className="glass-card p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-bold">Week Samenvatting</h3>
            <p className="text-dark-400 text-sm">Je voortgang deze week</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-amber-400 flex items-center gap-1">
              <Zap className="w-5 h-5" />
              +{currentMission?.xpReward || 0} XP
            </div>
            <div className="text-dark-500 text-xs">Te verdienen</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-dark-800/50 rounded-xl">
            <div className="text-2xl font-bold text-white">{user.streak}</div>
            <div className="text-dark-500 text-xs">Dagen Streak</div>
          </div>
          <div className="text-center p-3 bg-dark-800/50 rounded-xl">
            <div className="text-2xl font-bold text-white">{user.completedMissions.length}</div>
            <div className="text-dark-500 text-xs">Missies Klaar</div>
          </div>
          <div className="text-center p-3 bg-dark-800/50 rounded-xl">
            <div className="text-2xl font-bold text-white">{user.xp.toLocaleString()}</div>
            <div className="text-dark-500 text-xs">Totale XP</div>
          </div>
        </div>

        {/* Record Button */}
        {videoRecorded ? (
          <div className="flex items-center justify-center gap-3 py-4 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
            <ThumbsUp className="w-6 h-6 text-emerald-400" />
            <div>
              <div className="font-bold text-emerald-400">Video opgenomen!</div>
              <div className="text-dark-400 text-sm">+75 XP verdiend</div>
            </div>
          </div>
        ) : (
          <button 
            onClick={handleRecordComplete}
            className="w-full btn-primary py-4 flex items-center justify-center gap-3"
          >
            <Camera className="w-5 h-5" />
            <span>Video Opgenomen? Claim je XP!</span>
          </button>
        )}
      </div>

      {/* Upload Reminder */}
      <div className="text-center text-dark-500 text-sm">
        <p>💡 Vergeet niet je video te uploaden naar YouTube!</p>
        <p>Papa kan helpen met editen als dat nodig is.</p>
      </div>
    </div>
  );
}

export default SundayReview;
