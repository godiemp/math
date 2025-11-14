'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { api } from '@/lib/api-client';
import { MarkdownViewer } from './MarkdownViewer';
import { useTranslations } from 'next-intl';

type MessageRole = 'user' | 'assistant';

interface Message {
  role: MessageRole;
  content: string;
}

interface LearnSubjectDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LearnSubjectDemo({ isOpen, onClose }: LearnSubjectDemoProps) {
  const t = useTranslations('landing.learnSubject');
  const [subject, setSubject] = useState('matemática');
  const [topic, setTopic] = useState('funciones lineales');
  const [level, setLevel] = useState('3° medio');
  const [goal, setGoal] = useState(t('defaultGoal'));
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const assistantMessageCount = useMemo(
    () => messages.filter(message => message.role === 'assistant').length,
    [messages]
  );

  const canStart = useMemo(() => subject.trim() !== '' && topic.trim() !== '', [subject, topic]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
  }, [isOpen]);

  const resetState = () => {
    setMessages([]);
    setInputValue('');
    setIsLoading(false);
    setHasStarted(false);
    setError(null);
    setSubject('matemática');
    setTopic('funciones lineales');
    setLevel('3° medio');
    setGoal(t('defaultGoal'));
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) {
      return;
    }

    const historyBefore = [...messages];
    const userMessage: Message = { role: 'user', content: trimmed };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<{
        success: boolean;
        response: string;
      }>('/api/subject-tutor/chat', {
        subject: subject.trim(),
        topic: topic.trim(),
        level: level.trim() || undefined,
        goal: goal.trim() || undefined,
        messages: historyBefore.map(({ role, content }) => ({ role, content })),
        userMessage: trimmed,
        language: 'es',
      });

      if (response.error || !response.data?.success) {
        const errorMessage = response.error?.error || t('errorGeneric');
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: `${t('errorPrefix')} ${errorMessage}` }
        ]);
        setError(errorMessage);
      } else {
        const assistantMessage: Message = { role: 'assistant', content: response.data.response };
        setMessages(prev => [...prev, assistantMessage]);
        setHasStarted(true);
        setError(null);
      }
    } catch (err) {
      console.error('Failed to fetch subject tutor response:', err);
      const errorMessage = t('errorGeneric');
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: `${t('errorPrefix')} ${errorMessage}` }
      ]);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = async () => {
    if (!canStart || isLoading || hasStarted) {
      return;
    }

    const intro = t('introMessage', {
      subject: subject.trim(),
      topic: topic.trim(),
      level: level.trim() || t('fallbackLevel'),
      goal: goal.trim() || t('fallbackGoal'),
    });

    await sendMessage(intro);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      return;
    }

    const toSend = inputValue;
    setInputValue('');
    await sendMessage(toSend);
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-4xl bg-white/95 dark:bg-slate-900/95 rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8 flex flex-col gap-6"
        onClick={event => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
              {t('demoTitle')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              {t('demoSubtitle')}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-500 hover:text-slate-800 transition-colors"
            aria-label={t('closeLabel')}
          >
            ×
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr),minmax(0,1.2fr)]">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                {t('subjectLabel')}
              </label>
              <input
                type="text"
                value={subject}
                onChange={event => setSubject(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white/70 dark:bg-slate-800/70 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder={t('subjectPlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                {t('topicLabel')}
              </label>
              <input
                type="text"
                value={topic}
                onChange={event => setTopic(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white/70 dark:bg-slate-800/70 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder={t('topicPlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                {t('levelLabel')}
              </label>
              <input
                type="text"
                value={level}
                onChange={event => setLevel(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white/70 dark:bg-slate-800/70 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder={t('levelPlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                {t('goalLabel')}
              </label>
              <textarea
                value={goal}
                onChange={event => setGoal(event.target.value)}
                className="w-full min-h-[96px] rounded-lg border border-slate-200 bg-white/70 dark:bg-slate-800/70 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder={t('goalPlaceholder')}
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleStart}
                disabled={!canStart || isLoading || hasStarted}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading && !hasStarted ? (
                  <span className="animate-spin">⏳</span>
                ) : null}
                {t('startLesson')}
              </button>
              <button
                onClick={resetState}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/60"
              >
                {t('resetLesson')}
              </button>
            </div>

            {error ? (
              <div className="rounded-xl border border-rose-200 bg-rose-50/70 px-3 py-2 text-sm text-rose-700">
                {error}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col rounded-3xl border border-slate-200 bg-white/60 dark:border-slate-700/60 dark:bg-slate-900/60 p-4 md:p-6">
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {messages.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/60 p-4 text-sm text-emerald-700">
                  {t('emptyState')}
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={message.role === 'user'
                      ? 'ml-auto max-w-[85%] rounded-2xl bg-emerald-500 text-white px-4 py-3 shadow-lg'
                      : 'max-w-[90%] rounded-2xl bg-white/90 dark:bg-slate-800/80 px-4 py-3 text-slate-800 dark:text-slate-100 shadow-lg shadow-slate-200/40 dark:shadow-black/20'}
                  >
                    {message.role === 'assistant' ? (
                      <div className="markdown-chat-message">
                        <MarkdownViewer content={message.content} />
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                    )}
                  </div>
                ))
              )}
              {isLoading ? (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="inline-flex h-2 w-2 animate-bounce rounded-full bg-emerald-500" />
                  <span>{t('loading')}</span>
                </div>
              ) : null}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={event => setInputValue(event.target.value)}
                placeholder={t('inputPlaceholder')}
                className="flex-1 rounded-full border border-slate-200 bg-white/80 dark:border-slate-700 dark:bg-slate-800/80 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                disabled={!hasStarted || isLoading}
              />
              <button
                type="submit"
                disabled={!hasStarted || isLoading || !inputValue.trim()}
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t('sendMessage')}
              </button>
            </form>
            {hasStarted && assistantMessageCount === 1 ? (
              <p className="mt-2 text-xs font-medium text-emerald-600">
                {t('successKickoff')}
              </p>
            ) : null}
            <p className="mt-2 text-xs text-slate-500">
              {t('disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
