/**
 * Debug script para ver el contenido de localStorage
 *
 * INSTRUCCIONES:
 * 1. Abre la consola del navegador (F12)
 * 2. Pega este código completo y presiona Enter
 * 3. Copia el output y compártelo
 */

console.log('=== DEBUG LOCALSTORAGE ===\n');

// M1 History
const m1History = localStorage.getItem('paes-history-M1');
const m1Data = m1History ? JSON.parse(m1History) : null;

console.log('📊 M1 HISTORY:');
if (m1Data) {
  console.log(`Total attempts: ${m1Data.length}`);
  console.log('Last 5 attempts:');
  m1Data.slice(0, 5).forEach((attempt, i) => {
    console.log(`  ${i + 1}. ${attempt.topic} - ${attempt.isCorrect ? '✓' : '✗'} - ${new Date(attempt.timestamp).toLocaleString()}`);
    console.log(`     QuizSessionId: ${attempt.quizSessionId || 'NO SESSION ID'}`);
  });

  // Check for duplicates
  const uniqueIds = new Set();
  const duplicates = [];
  m1Data.forEach(attempt => {
    const key = `${attempt.questionId}-${attempt.timestamp}`;
    if (uniqueIds.has(key)) {
      duplicates.push(attempt);
    } else {
      uniqueIds.add(key);
    }
  });

  if (duplicates.length > 0) {
    console.log(`⚠️ DUPLICATES FOUND: ${duplicates.length}`);
  } else {
    console.log('✓ No duplicates found');
  }
} else {
  console.log('  (empty)');
}

console.log('\n');

// M2 History
const m2History = localStorage.getItem('paes-history-M2');
const m2Data = m2History ? JSON.parse(m2History) : null;

console.log('📊 M2 HISTORY:');
if (m2Data) {
  console.log(`Total attempts: ${m2Data.length}`);
  console.log('Last 5 attempts:');
  m2Data.slice(0, 5).forEach((attempt, i) => {
    console.log(`  ${i + 1}. ${attempt.topic} - ${attempt.isCorrect ? '✓' : '✗'} - ${new Date(attempt.timestamp).toLocaleString()}`);
    console.log(`     QuizSessionId: ${attempt.quizSessionId || 'NO SESSION ID'}`);
  });

  // Check for duplicates
  const uniqueIds = new Set();
  const duplicates = [];
  m2Data.forEach(attempt => {
    const key = `${attempt.questionId}-${attempt.timestamp}`;
    if (uniqueIds.has(key)) {
      duplicates.push(attempt);
    } else {
      uniqueIds.add(key);
    }
  });

  if (duplicates.length > 0) {
    console.log(`⚠️ DUPLICATES FOUND: ${duplicates.length}`);
  } else {
    console.log('✓ No duplicates found');
  }
} else {
  console.log('  (empty)');
}

console.log('\n');

// Combined stats
const allAttempts = [
  ...(m1Data || []),
  ...(m2Data || [])
].sort((a, b) => b.timestamp - a.timestamp);

console.log('📈 COMBINED STATS:');
console.log(`Total attempts: ${allAttempts.length}`);
console.log(`Correct: ${allAttempts.filter(a => a.isCorrect).length}`);
console.log(`Incorrect: ${allAttempts.filter(a => !a.isCorrect).length}`);
console.log(`Accuracy: ${((allAttempts.filter(a => a.isCorrect).length / allAttempts.length) * 100).toFixed(1)}%`);

// Group by session
const sessionMap = new Map();
allAttempts.forEach(attempt => {
  const sessionKey = attempt.quizSessionId || new Date(attempt.timestamp).toISOString().split('T')[0];
  if (!sessionMap.has(sessionKey)) {
    sessionMap.set(sessionKey, {
      count: 0,
      correct: 0,
      topic: attempt.topic,
      date: new Date(attempt.timestamp).toISOString().split('T')[0]
    });
  }
  const session = sessionMap.get(sessionKey);
  session.count++;
  if (attempt.isCorrect) session.correct++;
});

console.log('\n📅 SESSIONS:');
const sessions = Array.from(sessionMap.entries()).slice(0, 5);
sessions.forEach(([sessionId, session], i) => {
  const score = Math.round((session.correct / session.count) * 100);
  console.log(`  ${i + 1}. ${session.topic} - ${session.date}`);
  console.log(`     ${session.correct}/${session.count} (${score}%)`);
  console.log(`     SessionId: ${sessionId}`);
});

console.log('\n=== END DEBUG ===');

// Export data to copy-paste
const debugData = {
  m1_count: m1Data?.length || 0,
  m2_count: m2Data?.length || 0,
  total_count: allAttempts.length,
  sessions_count: sessionMap.size,
  last_10_attempts: allAttempts.slice(0, 10).map(a => ({
    topic: a.topic,
    correct: a.isCorrect,
    timestamp: new Date(a.timestamp).toISOString(),
    sessionId: a.quizSessionId
  }))
};

console.log('\n📋 Copy this data:');
console.log(JSON.stringify(debugData, null, 2));
