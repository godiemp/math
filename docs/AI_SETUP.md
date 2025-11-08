# AI Tutor Setup Guide

## Overview
The Zen Mode AI tutor uses Anthropic's Claude API to provide personalized, conversational help to students.

## Setup Instructions

### 1. Get an Anthropic API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (it starts with `sk-ant-api...`)

### 2. Configure Environment Variables

1. Create a `.env.local` file in the project root (if it doesn't exist):
   ```bash
   cp .env.local.example .env.local
   ```

2. Add your API key to `.env.local`:
   ```bash
   ANTHROPIC_API_KEY=sk-ant-api-your-actual-key-here
   ```

3. **Important**: Never commit `.env.local` to git. It's already in `.gitignore`.

### 3. Restart Development Server

After adding the API key, restart your Next.js development server:

```bash
npm run dev
```

## Troubleshooting

### Error: "invalid x-api-key" (401)

**Cause**: The API key is not configured or is invalid.

**Solutions**:
1. Verify `.env.local` exists and contains `ANTHROPIC_API_KEY`
2. Check that the API key is valid and not expired
3. Restart the development server (`npm run dev`)
4. Clear Next.js cache: `rm -rf .next`

### Error: "API key no configurada"

**Cause**: The environment variable is not being loaded.

**Solutions**:
1. Ensure `.env.local` is in the project root (same directory as `package.json`)
2. Variable name must be exactly `ANTHROPIC_API_KEY`
3. No quotes needed around the value in `.env.local`
4. Restart the dev server

## Testing the AI Tutor

1. Start a quiz in Zen Mode
2. Answer questions (correctly or incorrectly)
3. Submit the quiz
4. Click "💬 Conversar con tu tutor IA" on any question
5. Send a message like "¿Por qué esta opción es incorrecta?"
6. You should receive a personalized response from Claude

## Cost Considerations

- Claude API charges per token (input + output)
- Typical conversation: ~1000-2000 tokens (~$0.01-0.03 per interaction)
- Monitor usage at [Anthropic Console](https://console.anthropic.com/)
- Set spending limits in your Anthropic account

## Model Information

- **Model**: Claude Sonnet 4.5 (`claude-sonnet-4-5-20250929`)
- **Max tokens per response**: 2048 (chat), 1024 (single help)
- **Features**:
  - Conversational memory (multi-turn chat)
  - Context-aware (knows the question, options, student's answer)
  - Pedagogical prompting (teaches, doesn't just give answers)
  - Gen-z friendly tutoring persona

## Production Deployment

For production (Vercel, Railway, etc.):

1. Add `ANTHROPIC_API_KEY` to your hosting platform's environment variables
2. Ensure the variable is available at build time and runtime
3. Consider rate limiting to prevent abuse
4. Monitor API usage and costs

## Security Notes

- API key should NEVER be exposed to the frontend
- All API calls go through Next.js API routes (server-side)
- Frontend never sees the API key
- Consider implementing user authentication to prevent abuse
