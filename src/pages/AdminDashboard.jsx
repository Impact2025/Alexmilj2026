import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import * as adminService from '../services/adminService';
import {
  BarChart3,
  Activity,
  Video,
  PlusCircle,
  Shield,
  TrendingUp,
  Flame,
  Zap,
  PiggyBank,
  Target,
  Calendar,
  CheckCircle,
  Clock
} from 'lucide-react';

function AdminDashboard() {
  const { isAdmin } = useAuth();
  const { user, loading } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect if not admin
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="text-6xl mb-4">🏎️</div>
          <p className="text-dark-400">Laden...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overzicht', icon: BarChart3 },
    { id: 'activity', label: 'Activiteit', icon: Activity },
    { id: 'reviews', label: 'Reviews', icon: Video },
    { id: 'missions', label: 'Missies', icon: PlusCircle },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-amber-500" />
        <div>
          <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
          <p className="text-dark-400">Beheer en monitor de reis naar het miljoen</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${
              activeTab === id
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                : 'bg-dark-800/50 text-dark-400 hover:bg-dark-700/50 hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && <OverviewTab user={user} />}
        {activeTab === 'activity' && <ActivityTab user={user} />}
        {activeTab === 'reviews' && <ReviewsTab user={user} />}
        {activeTab === 'missions' && <MissionsTab user={user} />}
      </div>
    </div>
  );
}

// Overview Tab
function OverviewTab({ user }) {
  const stats = [
    { label: 'Totale XP', value: user.xp.toLocaleString(), icon: Zap, color: 'amber' },
    { label: 'Huidige Streak', value: user.streak, icon: Flame, color: 'orange' },
    { label: 'Voltooid', value: `${user.completedMissions?.length || 0}/${52}`, icon: CheckCircle, color: 'green' },
    { label: 'Gespaard', value: `€${user.savedMoney.toFixed(2)}`, icon: PiggyBank, color: 'emerald' },
    { label: 'Verdiend', value: `€${user.earnedMoney.toFixed(2)}`, icon: TrendingUp, color: 'blue' },
    { label: 'Huidige Week', value: user.currentWeek, icon: Calendar, color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-${stat.color}-500/20`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
              </div>
              <div>
                <p className="text-xs text-dark-400">{stat.label}</p>
                <p className="text-xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Summary */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-4">Recente Voortgang</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-white">Laatste ochtendritueel</span>
            </div>
            <span className="text-dark-400">
              {user.lastMorningRitual
                ? new Date(user.lastMorningRitual).toLocaleDateString('nl-NL')
                : 'Nog niet voltooid'}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-blue-500" />
              <span className="text-white">Voltooide missies</span>
            </div>
            <span className="text-dark-400">
              {user.completedMissions?.length || 0} missies
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-purple-500" />
              <span className="text-white">Lid sinds</span>
            </div>
            <span className="text-dark-400">
              {new Date(user.createdAt).toLocaleDateString('nl-NL')}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-4">Totale Voortgang</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-dark-400">Voltooide Missies</span>
            <span className="text-white font-bold">
              {Math.round((user.completedMissions?.length || 0) / 52 * 100)}%
            </span>
          </div>
          <div className="h-4 bg-dark-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-1000"
              style={{ width: `${(user.completedMissions?.length || 0) / 52 * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Activity Log Tab
function ActivityTab({ user }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dbUser, syncMode } = useApp();

  useEffect(() => {
    const loadActivities = async () => {
      if (syncMode === 'cloud' && dbUser) {
        const result = await adminService.getUserActivityLog(dbUser.id);
        if (result.success) {
          setActivities(result.data);
        }
      } else {
        // Local mode - create mock data from user state
        const mockActivities = [];
        if (user.lastMorningRitual) {
          mockActivities.push({
            type: 'ritual',
            date: user.lastMorningRitual,
            xp: 25,
            details: {}
          });
        }
        user.completedMissions?.forEach((weekNum, index) => {
          mockActivities.push({
            type: 'mission',
            date: new Date(Date.now() - (index * 7 * 24 * 60 * 60 * 1000)), // Mock dates
            xp: 100 + (weekNum * 10),
            details: { weekNumber: weekNum }
          });
        });
        setActivities(mockActivities);
      }
      setLoading(false);
    };

    loadActivities();
  }, [dbUser, syncMode, user]);

  if (loading) {
    return (
      <div className="glass-card p-6">
        <p className="text-dark-400 text-center py-8">Laden...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold text-white mb-4">Activiteitenlog</h3>
      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {activities.length === 0 ? (
          <p className="text-dark-400 text-center py-8">Nog geen activiteiten</p>
        ) : (
          activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-dark-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                {activity.type === 'mission' ? (
                  <Target className="w-5 h-5 text-blue-500" />
                ) : (
                  <Flame className="w-5 h-5 text-orange-500" />
                )}
                <div>
                  <p className="text-white font-medium">
                    {activity.type === 'mission'
                      ? `Week ${activity.details.weekNumber} Missie Voltooid`
                      : 'Ochtendritueel Voltooid'}
                  </p>
                  <p className="text-sm text-dark-400">
                    {new Date(activity.date).toLocaleDateString('nl-NL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  {activity.details.focus && (
                    <p className="text-xs text-dark-500 mt-1">
                      Focus: {activity.details.focus}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-amber-400 font-bold">+{activity.xp} XP</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Reviews Tab
function ReviewsTab({ user }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const { dbUser, syncMode } = useApp();

  useEffect(() => {
    const loadReviews = async () => {
      if (syncMode === 'cloud' && dbUser) {
        const result = await adminService.getUserSundayReviews(dbUser.id);
        if (result.success) {
          setReviews(result.data);
        }
      }
      setLoading(false);
    };

    loadReviews();
  }, [dbUser, syncMode]);

  const handleSubmitFeedback = async () => {
    if (selectedReview && feedback) {
      const result = await adminService.addReviewFeedback(
        selectedReview.id,
        feedback,
        rating
      );
      if (result.success) {
        // Refresh reviews
        const refreshResult = await adminService.getUserSundayReviews(dbUser.id);
        if (refreshResult.success) {
          setReviews(refreshResult.data);
        }
        setSelectedReview(null);
        setFeedback('');
        setRating(0);
      }
    }
  };

  if (loading) {
    return (
      <div className="glass-card p-6">
        <p className="text-dark-400 text-center py-8">Laden...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-4">Sunday Reviews</h3>
        <div className="space-y-3">
          {reviews.length === 0 ? (
            <p className="text-dark-400 text-center py-8">
              Nog geen Sunday reviews
            </p>
          ) : (
            reviews.map((review, index) => (
              <div
                key={index}
                className="p-4 bg-dark-800/50 rounded-lg hover:bg-dark-800 transition-colors cursor-pointer"
                onClick={() => setSelectedReview(review)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">
                    Week {review.weekNumber}
                  </h4>
                  <span className="text-xs text-dark-400">
                    {new Date(review.submittedAt).toLocaleDateString('nl-NL')}
                  </span>
                </div>
                {review.videoUrl && (
                  <div className="flex items-center gap-2 text-sm text-blue-400">
                    <Video className="w-4 h-4" />
                    <span>Video ingediend</span>
                  </div>
                )}
                {review.adminFeedback && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>Beoordeeld</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Feedback Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="glass-card p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Week {selectedReview.weekNumber} Review
            </h3>

            {/* Video */}
            {selectedReview.videoUrl && (
              <div className="mb-4">
                <iframe
                  width="100%"
                  height="315"
                  src={selectedReview.videoUrl.replace('watch?v=', 'embed/')}
                  title="Sunday Review"
                  className="rounded-lg"
                  allowFullScreen
                />
              </div>
            )}

            {/* Notes */}
            {selectedReview.notes && (
              <div className="mb-4 p-4 bg-dark-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">Notities:</h4>
                <p className="text-dark-300">{selectedReview.notes}</p>
              </div>
            )}

            {/* Existing Feedback */}
            {selectedReview.adminFeedback && (
              <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <h4 className="text-green-400 font-medium mb-2">
                  Jouw feedback:
                </h4>
                <p className="text-white">{selectedReview.adminFeedback}</p>
                {selectedReview.adminRating && (
                  <div className="mt-2 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < selectedReview.adminRating ? 'text-amber-400' : 'text-dark-600'}>
                        ⭐
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Add/Edit Feedback Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Rating (1-5 sterren)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-2xl transition-transform hover:scale-110"
                    >
                      <span className={star <= rating ? 'text-amber-400' : 'text-dark-600'}>
                        ⭐
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Jouw feedback
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Schrijf je feedback hier..."
                  className="input-field min-h-[120px] resize-none"
                  rows={5}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSubmitFeedback}
                  disabled={!feedback}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Feedback Opslaan
                </button>
                <button
                  onClick={() => {
                    setSelectedReview(null);
                    setFeedback('');
                    setRating(0);
                  }}
                  className="btn-secondary"
                >
                  Sluiten
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Missions Management Tab
function MissionsTab({ user }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [customMission, setCustomMission] = useState({
    title: '',
    description: '',
    xpReward: 100,
    category: 'actie',
    dueDate: ''
  });

  const handleAddMission = () => {
    // This would save to database
    console.log('Adding custom mission:', customMission);
    setShowAddForm(false);
    setCustomMission({
      title: '',
      description: '',
      xpReward: 100,
      category: 'actie',
      dueDate: ''
    });
  };

  return (
    <div className="space-y-4">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Missie Beheer</h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Nieuwe Missie
          </button>
        </div>

        {/* Add Mission Form */}
        {showAddForm && (
          <div className="mb-6 p-4 bg-dark-800/50 rounded-lg">
            <h4 className="text-white font-medium mb-4">Nieuwe Custom Missie</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Titel
                </label>
                <input
                  type="text"
                  value={customMission.title}
                  onChange={(e) => setCustomMission({ ...customMission, title: e.target.value })}
                  placeholder="Bijv: Extra Coding Challenge"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Beschrijving
                </label>
                <textarea
                  value={customMission.description}
                  onChange={(e) => setCustomMission({ ...customMission, description: e.target.value })}
                  placeholder="Wat moet er worden gedaan?"
                  className="input-field min-h-[100px]"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    XP Beloning
                  </label>
                  <input
                    type="number"
                    value={customMission.xpReward}
                    onChange={(e) => setCustomMission({ ...customMission, xpReward: parseInt(e.target.value) })}
                    className="input-field"
                    min="0"
                    max="1000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Categorie
                  </label>
                  <select
                    value={customMission.category}
                    onChange={(e) => setCustomMission({ ...customMission, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="mindset">Mindset</option>
                    <option value="geld">Geld</option>
                    <option value="skills">Skills</option>
                    <option value="actie">Actie</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Deadline (optioneel)
                </label>
                <input
                  type="date"
                  value={customMission.dueDate}
                  onChange={(e) => setCustomMission({ ...customMission, dueDate: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddMission}
                  disabled={!customMission.title || !customMission.description}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Missie Toevoegen
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="btn-secondary"
                >
                  Annuleren
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mission Stats */}
        <div className="space-y-3">
          <div className="p-4 bg-dark-800/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Voltooide Missies</h4>
                <p className="text-sm text-dark-400">
                  Week 1-52 overzicht
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-amber-400">
                  {user.completedMissions?.length || 0}
                </p>
                <p className="text-xs text-dark-400">van 52</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-dark-800/50 rounded-lg">
            <h4 className="text-white font-medium mb-3">Voortgang per Categorie</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-400">Mindset</span>
                <span className="text-dark-400">~{Math.floor((user.completedMissions?.length || 0) * 0.25)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-400">Geld</span>
                <span className="text-dark-400">~{Math.floor((user.completedMissions?.length || 0) * 0.25)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-400">Skills</span>
                <span className="text-dark-400">~{Math.floor((user.completedMissions?.length || 0) * 0.25)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-orange-400">Actie</span>
                <span className="text-dark-400">~{Math.floor((user.completedMissions?.length || 0) * 0.25)}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h4 className="text-blue-400 font-medium mb-2">💡 Pro Tip</h4>
            <p className="text-sm text-dark-300">
              Custom missies zijn perfect voor speciale uitdagingen of bonusopdrachten buiten het standaard programma!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
