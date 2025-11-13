# Guía de Internacionalización (i18n)

Este proyecto usa `next-intl` para manejar las traducciones de la aplicación.

## Estructura

```
/messages/
  es-cl.json          # Traducciones para español de Chile
/i18n.ts              # Configuración de i18n
/middleware.ts        # Middleware de next-intl
```

## Archivo de traducciones

El archivo `/messages/es-cl.json` contiene todas las traducciones organizadas por secciones:

- `auth` - Autenticación (login, registro, recuperación de contraseña)
- `dashboard` - Panel principal
- `practice` - Práctica y ejercicios
- `studyBuddy` - Compañero de estudio AI
- `subscription` - Planes y suscripciones
- `progress` - Seguimiento de progreso
- `pricing` - Precios
- `contact` - Contacto
- `footer` - Pie de página
- `cookies` - Banner de cookies
- `paywall` - Mensajes de paywall
- `landing` - Página de inicio
- `operations` - Niveles de operaciones
- `common` - Textos comunes
- `curriculum` - Temario
- `profile` - Perfil de usuario

## Uso en Componentes

### Client Components

Para componentes del cliente (`'use client'`), usa el hook `useTranslations`:

```tsx
'use client';

import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('auth.login');

  return (
    <div>
      <h1>{t('title')}</h1>
      <button>{t('submit')}</button>
    </div>
  );
}
```

### Server Components

Para componentes del servidor, usa `getTranslations`:

```tsx
import { getTranslations } from 'next-intl/server';

export default async function MyServerComponent() {
  const t = await getTranslations('dashboard');

  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  );
}
```

### Traducciones con variables

Usa `{variable}` en el JSON para interpolación:

```json
{
  "greeting": "hola, {username}"
}
```

```tsx
const t = useTranslations('dashboard');
<p>{t('greeting', { username: 'Juan' })}</p>
// Resultado: "hola, Juan"
```

### Traducciones anidadas

Accede a traducciones anidadas con punto:

```json
{
  "auth": {
    "login": {
      "title": "iniciar sesión",
      "submit": "entrar"
    }
  }
}
```

```tsx
const t = useTranslations('auth.login');
<h1>{t('title')}</h1>  // "iniciar sesión"
<button>{t('submit')}</button>  // "entrar"
```

## Agregar nuevas traducciones

1. Abre `/messages/es-cl.json`
2. Agrega tu nueva clave en la sección correspondiente:

```json
{
  "mySection": {
    "newKey": "nuevo texto"
  }
}
```

3. Úsala en tu componente:

```tsx
const t = useTranslations('mySection');
<p>{t('newKey')}</p>
```

## Buenas prácticas

1. **Organiza por contexto**: Agrupa las traducciones por sección lógica (auth, dashboard, etc.)
2. **Nombres descriptivos**: Usa nombres de clave que describan el contenido, no su ubicación
3. **Consistencia**: Mantén el tono informal y cercano (Gen Z chileno)
4. **No hardcodear texto**: Siempre usa el sistema de traducciones, nunca texto directo en componentes

## Tono y Estilo (Gen Z Chile)

Las traducciones usan un tono:
- **Informal**: lowercase, casual, sin formalismos
- **Cercano**: tuteo (tú), directo
- **Motivacional**: pero real, sin exageraciones
- **Chileno**: "mate", "u", "preu"
- **Emojis**: moderados, para dar personalidad

## Ejemplos

❌ **Incorrecto** (formal, rígido):
```
"Por favor, ingrese sus credenciales para acceder al sistema"
```

✅ **Correcto** (informal, cercano):
```
"ingresa tu usuario y contraseña"
```

❌ **Incorrecto** (muy formal):
```
"Ha ocurrido un error en el proceso de autenticación"
```

✅ **Correcto** (directo):
```
"error al iniciar sesión"
```

## Soporte futuro para múltiples idiomas

El sistema está preparado para agregar más idiomas en el futuro:

1. Crea un nuevo archivo en `/messages/` (ej: `en.json`)
2. Actualiza `i18n.ts` para incluir el nuevo locale:
```ts
export const locales = ['es-cl', 'en'] as const;
```
3. Actualiza el middleware si necesitas routing por locale

Por ahora, solo usamos `es-cl` como locale por defecto.
