'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Button, Card, Badge, Heading, Text, Navbar, NavbarLink, Modal } from '@/components/ui';
import { QuizHistoryResponse } from '@/lib/types';
import { api } from '@/lib/api-client';
import { useTranslations } from 'next-intl';

interface ProfileStats {
  totalQuestions: number;
  correctAnswers: number;
  m1Questions: number;
  m2Questions: number;
  accuracy: number;
}

interface UpdateProfileResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    username: string;
    email: string;
    displayName: string;
    role: string;
    createdAt: number;
  };
}

function ProfilePageContent() {
  const t = useTranslations('profile');
  const { user, refreshUser, isPaidUser } = useAuth();
  const [stats, setStats] = useState<ProfileStats>({
    totalQuestions: 0,
    correctAnswers: 0,
    m1Questions: 0,
    m2Questions: 0,
    accuracy: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editForm, setEditForm] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    targetLevel: user?.targetLevel || 'M1_AND_M2' as 'M1_ONLY' | 'M1_AND_M2',
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [editError, setEditError] = useState<string>('');

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Fetch quiz history to calculate stats
        const [m1Response, m2Response] = await Promise.all([
          api.get<QuizHistoryResponse>('/api/quiz/history?level=M1'),
          api.get<QuizHistoryResponse>('/api/quiz/history?level=M2'),
        ]);

        const m1History = m1Response.data?.history || [];
        const m2History = m2Response.data?.history || [];

        const m1Correct = m1History.filter(a => a.isCorrect).length;
        const m2Correct = m2History.filter(a => a.isCorrect).length;
        const totalCorrect = m1Correct + m2Correct;
        const totalQuestions = m1History.length + m2History.length;

        setStats({
          totalQuestions,
          correctAnswers: totalCorrect,
          m1Questions: m1History.length,
          m2Questions: m2History.length,
          accuracy: totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0,
        });
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  useEffect(() => {
    if (user) {
      setEditForm({
        displayName: user.displayName || '',
        email: user.email || '',
        targetLevel: user.targetLevel || 'M1_AND_M2',
      });
    }
  }, [user]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getSubscriptionBadge = () => {
    if (!user?.subscription) {
      return <Badge variant="neutral">{t('subscriptionSection.none')}</Badge>;
    }

    switch (user.subscription.status) {
      case 'active':
        return <Badge variant="success">{t('subscriptionSection.active')}</Badge>;
      case 'trial':
        return <Badge variant="info">{t('subscriptionSection.trial')}</Badge>;
      case 'expired':
        return <Badge variant="danger">{t('subscriptionSection.expired')}</Badge>;
      case 'cancelled':
        return <Badge variant="warning">{t('subscriptionSection.canceled')}</Badge>;
      default:
        return <Badge variant="neutral">{t('subscriptionSection.unknown')}</Badge>;
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setEditError('');

    try {
      const response = await api.put<UpdateProfileResponse>('/api/user/profile', editForm);

      if (response.error) {
        // API returned an error response
        setEditError(response.error.error || t('error'));
        return;
      }

      if (response.data?.success) {
        // Refresh user data
        await refreshUser();
        setIsEditModalOpen(false);
      } else {
        // Unexpected response format
        setEditError(response.data?.message || t('error'));
      }
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      setEditError(t('error'));
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#000000] font-[system-ui,-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Segoe_UI',sans-serif]">
      {/* Navbar */}
      <Navbar>
        <NavbarLink href="/dashboard">
          {t('navigation.backHome')}
        </NavbarLink>
      </Navbar>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <Heading level={1} size="lg">
            {t('title')}
          </Heading>
          <Button onClick={() => setIsEditModalOpen(true)}>
            {t('header.edit')}
          </Button>
        </div>

        {/* User Information Card */}
        <Card className="p-8 mb-6">
          <div className="flex items-start gap-6">
            {/* Avatar Circle */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0A84FF] to-[#5E5CE6] flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
              {user.displayName.charAt(0).toUpperCase()}
            </div>

            {/* User Details */}
            <div className="flex-1">
              <Heading level={2} size="sm" className="mb-2">
                {user.displayName}
              </Heading>
              <Text size="sm" variant="secondary" className="mb-3">
                @{user.username}
              </Text>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Text size="sm" variant="secondary">{t('info.email')}</Text>
                  <Text size="sm">{user.email}</Text>
                </div>
                <div className="flex items-center gap-2">
                  <Text size="sm" variant="secondary">{t('info.role')}</Text>
                  <Badge variant={user.role === 'admin' ? 'info' : 'neutral'}>
                    {user.role === 'admin' ? t('role.admin') : t('role.student')}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Text size="sm" variant="secondary">{t('info.memberSince')}</Text>
                  <Text size="sm">{formatDate(user.createdAt)}</Text>
                </div>
                <div className="flex items-center gap-2">
                  <Text size="sm" variant="secondary">{t('info.targetLevel')}</Text>
                  <Badge variant={user.targetLevel === 'M1_ONLY' ? 'info' : 'success'}>
                    {user.targetLevel === 'M1_ONLY' ? t('onlyM1') : t('m1AndM2')}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Subscription Card */}
        <Card className="p-6 mb-6">
          <Heading level={3} size="xs" className="mb-4">
            {t('subscriptionSection.title')}
          </Heading>

          {isPaidUser ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Text size="sm" variant="secondary">{t('subscriptionSection.state')}</Text>
                {user.subscription ? getSubscriptionBadge() : <Badge variant="success">{t('subscriptionSection.active')}</Badge>}
              </div>

              {user.subscription?.startedAt && (
                <div className="flex items-center justify-between">
                  <Text size="sm" variant="secondary">{t('subscriptionSection.startDate')}</Text>
                  <Text size="sm">{formatDate(user.subscription.startedAt)}</Text>
                </div>
              )}

              {user.subscription?.expiresAt && (
                <div className="flex items-center justify-between">
                  <Text size="sm" variant="secondary">{t('subscriptionSection.expirationDate')}</Text>
                  <Text size="sm">{formatDate(user.subscription.expiresAt)}</Text>
                </div>
              )}

              {user.subscription?.trialEndsAt && user.subscription.status === 'trial' && (
                <div className="flex items-center justify-between">
                  <Text size="sm" variant="secondary">{t('subscriptionSection.trialUntil')}</Text>
                  <Text size="sm">{formatDate(user.subscription.trialEndsAt)}</Text>
                </div>
              )}

              {user.subscription && (
                <div className="flex items-center justify-between">
                  <Text size="sm" variant="secondary">{t('subscriptionSection.autoRenew')}</Text>
                  <Badge variant={user.subscription.autoRenew ? 'success' : 'warning'}>
                    {user.subscription.autoRenew ? t('subscriptionSection.enabled') : t('subscriptionSection.disabled')}
                  </Badge>
                </div>
              )}

              {user.subscription?.status === 'expired' && (
                <div className="mt-4">
                  <Button asChild className="w-full">
                    <Link href="/pricing">
                      {t('subscriptionSection.renew')}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <Text size="sm" variant="secondary" className="mb-4">
                {t('subscriptionSection.noActive')}
              </Text>
              <Button asChild>
                <Link href="/pricing">
                  {t('subscriptionSection.viewPlans')}
                </Link>
              </Button>
            </div>
          )}
        </Card>

        {/* Streaks Card */}
        <Card className="p-6 mb-6">
          <Heading level={3} size="xs" className="mb-4">
            {t('streaks.practice')}
          </Heading>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-[#0A84FF]/5 dark:bg-[#0A84FF]/10 rounded-xl border border-[#0A84FF]/20">
              <Heading level={4} size="lg" className="text-[#0A84FF] mb-1">
                {user.currentStreak || 0}
              </Heading>
              <Text size="xs" variant="secondary">
                {t('currentStreak')}
              </Text>
            </div>

            <div className="text-center p-4 bg-[#5E5CE6]/5 dark:bg-[#5E5CE6]/10 rounded-xl border border-[#5E5CE6]/20">
              <Heading level={4} size="lg" className="text-[#5E5CE6] mb-1">
                {user.longestStreak || 0}
              </Heading>
              <Text size="xs" variant="secondary">
                {t('bestStreak')}
              </Text>
            </div>
          </div>

          {user.lastPracticeDate && (
            <div className="mt-4 text-center">
              <Text size="xs" variant="secondary">
                {t('streaks.lastPractice')} {new Date(user.lastPracticeDate).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </Text>
            </div>
          )}
        </Card>

        {/* Statistics Card */}
        <Card className="p-6 mb-6">
          <Heading level={3} size="xs" className="mb-4">
            {t('stats.title')}
          </Heading>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-[#0A84FF]/30 border-t-[#0A84FF] rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Text size="sm" variant="secondary">{t('stats.totalQuestions')}</Text>
                <Text size="sm" className="font-semibold">{stats.totalQuestions}</Text>
              </div>

              <div className="flex items-center justify-between">
                <Text size="sm" variant="secondary">{t('stats.correctAnswers')}</Text>
                <Text size="sm" className="font-semibold">{stats.correctAnswers}</Text>
              </div>

              <div className="flex items-center justify-between">
                <Text size="sm" variant="secondary">{t('stats.generalAccuracy')}</Text>
                <Badge variant={
                  stats.accuracy >= 80 ? 'success' :
                  stats.accuracy >= 60 ? 'warning' :
                  stats.accuracy >= 40 ? 'neutral' : 'danger'
                }>
                  {stats.accuracy}%
                </Badge>
              </div>

              <div className="pt-4 border-t border-black/[0.12] dark:border-white/[0.16]">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-[#0A84FF]/5 dark:bg-[#0A84FF]/10 rounded-xl">
                    <Text size="lg" className="font-bold text-[#0A84FF] mb-1">
                      {stats.m1Questions}
                    </Text>
                    <Text size="xs" variant="secondary">
                      {t('stats.questionsM1')}
                    </Text>
                  </div>

                  <div className="text-center p-3 bg-[#5E5CE6]/5 dark:bg-[#5E5CE6]/10 rounded-xl">
                    <Text size="lg" className="font-bold text-[#5E5CE6] mb-1">
                      {stats.m2Questions}
                    </Text>
                    <Text size="xs" variant="secondary">
                      {t('stats.questionsM2')}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <Heading level={3} size="xs" className="mb-4">
            {t('quickActionsSection.title')}
          </Heading>

          <div className="grid sm:grid-cols-2 gap-3">
            <Button asChild variant="primary">
              <Link href="/progress">
                {t('quickActionsSection.viewProgress')}
              </Link>
            </Button>

            <Button asChild variant="secondary">
              <Link href="/practice/m1">
                {t('quickActionsSection.practiceM1')}
              </Link>
            </Button>

            {user?.targetLevel !== 'M1_ONLY' && (
              <Button asChild variant="secondary">
                <Link href="/practice/m2">
                  {t('quickActionsSection.practiceM2')}
                </Link>
              </Button>
            )}

            <Button asChild variant="ghost">
              <Link href="/payments/history">
                {t('quickActionsSection.paymentHistory')}
              </Link>
            </Button>
          </div>
        </Card>
      </main>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditError('');
        }}
        title={t('edit.modal.title')}
        maxWidth="md"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium mb-2">
              {t('edit.modal.displayName')}
            </label>
            <input
              id="displayName"
              type="text"
              value={editForm.displayName}
              onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
              className="w-full h-11 px-3 rounded-xl text-[15px] bg-white dark:bg-[#121212] text-black dark:text-white border border-black/[0.12] dark:border-white/[0.16] focus:outline-none focus:ring-3 focus:ring-[#0A84FF]/50 focus:border-[#0A84FF] transition-all duration-[180ms]"
              placeholder={t('edit.modal.displayNamePlaceholder')}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {t('email')}
            </label>
            <input
              id="email"
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              className="w-full h-11 px-3 rounded-xl text-[15px] bg-white dark:bg-[#121212] text-black dark:text-white border border-black/[0.12] dark:border-white/[0.16] focus:outline-none focus:ring-3 focus:ring-[#0A84FF]/50 focus:border-[#0A84FF] transition-all duration-[180ms]"
              placeholder={t('edit.modal.emailPlaceholder')}
            />
          </div>

          <div>
            <label htmlFor="targetLevel" className="block text-sm font-medium mb-2">
              {t('edit.modal.targetLevelQuestion')}
            </label>
            <select
              id="targetLevel"
              value={editForm.targetLevel}
              onChange={(e) => setEditForm({ ...editForm, targetLevel: e.target.value as 'M1_ONLY' | 'M1_AND_M2' })}
              className="w-full h-11 px-3 rounded-xl text-[15px] bg-white dark:bg-[#121212] text-black dark:text-white border border-black/[0.12] dark:border-white/[0.16] focus:outline-none focus:ring-3 focus:ring-[#0A84FF]/50 focus:border-[#0A84FF] transition-all duration-[180ms]"
            >
              <option value="M1_AND_M2">{t('edit.modal.m1AndM2Option')}</option>
              <option value="M1_ONLY">{t('edit.modal.m1OnlyOption')}</option>
            </select>
            <Text size="xs" variant="secondary" className="mt-2">
              {t('edit.modal.m1Description')}
            </Text>
          </div>

          {editError && (
            <div className="bg-[#FF453A]/10 border border-[#FF453A]/30 rounded-xl p-3">
              <Text size="sm" className="text-[#FF453A]">
                {editError}
              </Text>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              variant="ghost"
              onClick={() => {
                setIsEditModalOpen(false);
                setEditError('');
              }}
              className="flex-1"
            >
              {t('edit.modal.cancel')}
            </Button>
            <Button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="flex-1"
            >
              {isSaving ? t('edit.modal.saving') : t('edit.modal.saveChanges')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePageContent />
    </ProtectedRoute>
  );
}
