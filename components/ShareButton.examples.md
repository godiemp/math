# ShareButton Component - Usage Examples

A reusable social sharing component for the PAES Math platform with support for multiple platforms and fallback mechanisms.

## Features

✅ **Web Share API Support** - Native mobile sharing when available
✅ **Multiple Platforms** - Twitter/X, Facebook, LinkedIn, WhatsApp, Copy Link
✅ **Two Display Modes** - Button with dropdown menu or inline icons
✅ **Toast Notifications** - User feedback for all actions
✅ **Fully Typed** - TypeScript support
✅ **Dark Mode** - Follows app theme
✅ **Responsive** - Works on desktop and mobile

---

## Installation

The component is already created at `/components/ShareButton.tsx` and uses existing dependencies:
- `lucide-react` (icons)
- `sonner` (toast notifications)
- Existing UI components (`Button`, `cn` utility)

---

## Basic Usage

### 1. Simple Share Button (Recommended)

```tsx
import { ShareButton } from '@/components/ShareButton';

function QuizResults() {
  return (
    <ShareButton
      shareData={{
        text: '¡Obtuve 18/20 en PAES Matemáticas M1! 📊',
        url: window.location.href,
        hashtags: ['PAESChile', 'Matemáticas']
      }}
    />
  );
}
```

**Result**: Shows a "Compartir" button that:
- On mobile: Opens native share sheet (iOS/Android)
- On desktop: Shows dropdown menu with platform options

---

### 2. Custom Button Text & Style

```tsx
<ShareButton
  shareData={{
    text: '¡Llevo 15 días de racha! 🔥',
    url: 'https://paes.cl/progress'
  }}
  buttonText="Compartir mi progreso"
  buttonVariant="primary"
  size="lg"
/>
```

---

### 3. Inline Icons (Menu Variant)

```tsx
<ShareButton
  variant="menu"
  shareData={{
    text: 'Completé el Ensayo PAES - Posición #5/50',
    url: window.location.href
  }}
  platforms={['twitter', 'whatsapp', 'copy']}
/>
```

**Result**: Shows inline social media icons instead of a button

---

### 4. Specific Platforms Only

```tsx
<ShareButton
  shareData={{
    text: '¡Dominé Álgebra! 🎓'
  }}
  platforms={['whatsapp', 'copy']} // Only WhatsApp and Copy Link
/>
```

---

## Integration Examples

### Example 1: Quiz Results Screen

Add to `/components/Quiz.tsx` after quiz completion:

```tsx
import { ShareButton, generateShareMessage } from '@/components/ShareButton';

// Inside Quiz component, after showing results:
{quizSubmitted && (
  <div className="mt-6 flex justify-center">
    <ShareButton
      shareData={generateShareMessage('quiz', {
        correct: score,
        total: questions.length,
        level: level,
        url: window.location.href
      })}
      buttonText="Compartir resultado"
      buttonVariant="secondary"
    />
  </div>
)}
```

---

### Example 2: Dashboard Streak Display

Add to `/app/dashboard/page.tsx` near the Streak component:

```tsx
import { ShareButton, generateShareMessage } from '@/components/ShareButton';

<div className="flex items-center gap-4">
  <Streak userId={user.id} />

  {user.currentStreak && user.currentStreak > 0 && (
    <ShareButton
      variant="menu"
      shareData={generateShareMessage('streak', {
        streak: user.currentStreak,
        url: window.location.href
      })}
      platforms={['twitter', 'whatsapp', 'copy']}
    />
  )}
</div>
```

---

### Example 3: Progress Page Stats

Add to `/app/progress/page.tsx`:

```tsx
<Card className="p-6">
  <div className="flex items-center justify-between">
    <div>
      <Heading level={3}>Mi Progreso</Heading>
      <Text>Has respondido {totalQuestions} preguntas</Text>
    </div>

    <ShareButton
      shareData={{
        text: `¡He respondido ${totalQuestions} preguntas de PAES Matemáticas con ${accuracy}% de precisión! 📈`,
        url: window.location.href,
        hashtags: ['PAESChile', 'Estudio']
      }}
      buttonText="Compartir"
      size="sm"
    />
  </div>
</Card>
```

---

### Example 4: Live Session Results

Add to `/app/live-practice/page.tsx` after session completion:

```tsx
{session.status === 'completed' && userRank && (
  <div className="mt-6 text-center">
    <Text className="text-2xl font-bold mb-4">
      Posición: #{userRank}/{session.participants.length}
    </Text>

    <ShareButton
      shareData={generateShareMessage('session', {
        position: userRank,
        total: session.participants.length,
        url: window.location.href
      })}
      buttonText="Compartir resultado"
      buttonVariant="primary"
    />
  </div>
)}
```

---

### Example 5: Skill Achievement

Add to `/components/SkillsDisplay.tsx` when a skill is mastered:

```tsx
{skill.mastered && (
  <ShareButton
    variant="menu"
    shareData={generateShareMessage('skill', {
      skillName: skill.name,
      url: window.location.href
    })}
    platforms={['twitter', 'copy']}
    className="ml-auto"
  />
)}
```

---

## Helper Function: `generateShareMessage`

Pre-configured message templates for common scenarios:

```tsx
// Quiz result
generateShareMessage('quiz', {
  correct: 18,
  total: 20,
  level: 'M1',
  url: 'https://paes.cl/quiz/123'
});
// Returns: "¡Obtuve 18/20 en PAES Matemáticas M1! 📊"

// Streak
generateShareMessage('streak', {
  streak: 15,
  url: 'https://paes.cl'
});
// Returns: "¡Llevo 15 días de racha en PAES Matemáticas! 🔥"

// Skill mastery
generateShareMessage('skill', {
  skillName: 'Ecuaciones Cuadráticas',
  url: 'https://paes.cl/skills'
});
// Returns: "¡Dominé la habilidad 'Ecuaciones Cuadráticas' en PAES Matemáticas! 🎓"

// Live session
generateShareMessage('session', {
  position: 5,
  total: 50,
  url: 'https://paes.cl/session/456'
});
// Returns: "Completé el Ensayo PAES - Posición #5/50 🏆"
```

---

## Advanced Usage

### Custom Share Data with All Options

```tsx
<ShareButton
  shareData={{
    title: 'Mi Progreso PAES',           // Optional: Used in Web Share API
    text: 'Custom message here',          // Required: Main share text
    url: 'https://paes.cl/custom',        // Optional: Defaults to current URL
    hashtags: ['PAES', 'Matemáticas']     // Optional: Twitter hashtags
  }}
  platforms={['twitter', 'facebook', 'linkedin', 'whatsapp', 'copy']}
  variant="button"
  buttonText="Share"
  buttonVariant="primary"
  size="md"
  className="custom-class"
/>
```

---

## Props API

### `ShareButtonProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shareData` | `ShareData` | **required** | Content to share |
| `platforms` | `SharePlatform[]` | `['twitter', 'facebook', 'whatsapp', 'copy']` | Platforms to show |
| `variant` | `'button' \| 'menu'` | `'button'` | Display mode |
| `buttonText` | `string` | `'Compartir'` | Button label (button variant only) |
| `buttonVariant` | `'primary' \| 'ghost' \| 'secondary'` | `'ghost'` | Button style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `className` | `string` | `undefined` | Custom CSS classes |

### `ShareData`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | No | Page title (Web Share API only) |
| `text` | `string` | **Yes** | Message to share |
| `url` | `string` | No | URL to share (defaults to current page) |
| `hashtags` | `string[]` | No | Twitter hashtags (without #) |

### `SharePlatform`

Available platforms: `'twitter' | 'facebook' | 'linkedin' | 'whatsapp' | 'copy'`

---

## Toast Notifications

The component automatically shows toast feedback:

- ✅ **Success**: "¡Enlace copiado al portapapeles!"
- ✅ **Success**: "Compartiendo en Twitter/X"
- ❌ **Error**: "Error al copiar el enlace"

Uses existing `sonner` toast system from the app.

---

## Browser Support

- **Web Share API** (Mobile): iOS Safari 12.2+, Android Chrome 61+
- **Fallback Menu** (Desktop): All modern browsers
- **Clipboard API**: All modern browsers

---

## Platform-Specific Behavior

### Twitter/X
- Includes text, URL, and hashtags
- Opens in 600x400 popup window

### Facebook
- Includes URL and optional quote text
- Opens in 600x400 popup window

### LinkedIn
- Shares URL only (LinkedIn doesn't support pre-filled text)
- Opens in 600x400 popup window

### WhatsApp
- Combines text and URL in message
- Opens WhatsApp Web or app

### Copy Link
- Copies URL to clipboard
- Shows success toast

---

## Accessibility

- All buttons have proper `title` attributes
- Keyboard navigable
- Screen reader friendly
- High contrast in dark mode

---

## Tips

1. **Keep text concise** - Social platforms have character limits
2. **Always include a URL** - Makes sharing more valuable
3. **Use emojis sparingly** - They work well but don't overdo it
4. **Test on mobile** - Web Share API provides better UX on mobile
5. **Match your brand** - Use appropriate button variants

---

## Next Steps

Consider adding:
- Share analytics tracking (count shares by platform)
- Custom OG meta tags for better social previews
- Shareable achievement badges with images
- User referral links with unique codes

---

## Questions or Issues?

Check the component source code: `/components/ShareButton.tsx`
