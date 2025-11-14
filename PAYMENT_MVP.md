# MVP de Pagos - Trial Gratuito de 7 Días

Este documento explica el MVP de pagos implementado que permite a todos los usuarios acceder a un trial gratuito de 7 días sin necesidad de integración con MercadoPago.

## 📋 Resumen

- **Trial automático**: Todos los nuevos usuarios reciben 7 días gratis al registrarse
- **Plan semanal**: Nuevo plan de $2.900 CLP por semana (también con 7 días gratis)
- **Sin MercadoPago**: El flujo de pago está temporalmente desactivado y activa el trial directamente
- **7 días para desarrollar**: Esto te da 7 días para implementar la integración real de MercadoPago

## 🎯 Características Implementadas

### 1. Plan Semanal ($2.900 CLP)

Se agregó un nuevo plan con las siguientes características:

- **ID**: `weekly`
- **Precio**: $2.900 CLP
- **Duración**: 7 días
- **Trial**: 7 días gratis
- **Display Order**: 0 (aparece primero en la lista)

**Características incluidas:**
- ✅ 7 días gratis de prueba
- ✅ Acceso completo a todas las preguntas
- ✅ Sesiones de práctica en vivo
- ✅ Tutor AI con método socrático
- ✅ Analytics detallado de progreso
- ✅ Generación de preguntas personalizadas
- ✅ Sin límite de intentos
- ✅ Cancela cuando quieras
- ✅ Ideal para prueba rápida

### 2. Auto-Activación de Trial en Registro

**Archivo**: `backend/src/auth/services/authService.ts`

Cuando un usuario se registra:
1. Se crea su cuenta normalmente
2. **Automáticamente** se le activa un trial de 7 días del plan "weekly"
3. El usuario tiene acceso completo inmediatamente
4. No requiere pago ni tarjeta de crédito

```typescript
// Auto-activate 7-day trial for all new users (MVP)
try {
  await SubscriptionService.createSubscription({
    userId: user.id,
    planId: 'weekly',
    startTrial: true,
  });
  console.log(`✅ Auto-activated 7-day trial for new user: ${user.username}`);
} catch (error) {
  console.error('⚠️  Failed to auto-activate trial for new user:', error);
}
```

### 3. Flujo de Pago Simplificado (MVP)

**Archivo**: `backend/src/services/paymentService.ts`

El método `createPaymentPreference` ahora:
1. **En lugar de** crear una preferencia en MercadoPago
2. **Activa directamente** un trial de 7 días
3. Retorna un objeto con `mvpMode: true`

```typescript
return {
  mvpMode: true,
  subscription,
  trialDays: plan.trialDurationDays,
  message: `¡Prueba activada! Tienes ${plan.trialDurationDays} días de acceso completo gratis.`,
};
```

El código original de MercadoPago está **comentado** y listo para activarse cuando lo necesites.

### 4. UI Actualizada

**Archivo**: `app/pricing/page.tsx`

La página de pricing ahora:
- Muestra el plan semanal primero (display_order: 0)
- Maneja la respuesta del MVP mode
- Muestra un mensaje de éxito cuando se activa el trial
- Redirige al dashboard después de activar

```typescript
// MVP MODE: If backend returns mvpMode, it activated the trial directly
if (result.data?.data?.mvpMode) {
  if (result.data.data.alreadyHasSubscription) {
    toast.info(result.data.data.message || 'Ya tienes una suscripción activa');
  } else {
    toast.success(result.data.data.message || '¡Prueba activada! Disfruta 7 días gratis.');
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  }
  return;
}
```

## 🚀 Cómo Usar

### 1. Ejecutar el Seed de Planes

Primero, asegúrate de que tu base de datos PostgreSQL está corriendo:

```bash
# Iniciar PostgreSQL (método depende de tu sistema)
# Linux/Mac:
sudo service postgresql start

# O si usas Docker:
docker start postgres-container-name
```

Luego ejecuta el seed para crear el plan semanal:

```bash
cd backend
npm install  # Si no lo has hecho ya
npm run seed:plans
```

Esto creará/actualizará los planes en la base de datos, incluyendo el nuevo plan semanal.

### 2. Iniciar el Backend

```bash
cd backend
npm run dev
```

### 3. Iniciar el Frontend

```bash
cd ..  # Volver a la raíz
npm install  # Si no lo has hecho ya
npm run dev
```

### 4. Probar el Flujo

#### Opción A: Nuevo Usuario

1. Ve a `/register`
2. Crea una cuenta nueva
3. **Automáticamente** tendrás 7 días de acceso gratis
4. Ve al dashboard y verifica que tienes acceso premium

#### Opción B: Usuario Existente

1. Inicia sesión con tu cuenta
2. Ve a `/pricing`
3. Verás el **Plan Semanal** como primera opción
4. Haz clic en "Suscribirse"
5. Elige cualquier opción (ambas activan el trial por ahora)
6. Serás redirigido al dashboard con acceso completo

## 📊 Estructura de la Base de Datos

### Tabla: `plans`

```sql
id                   | weekly
name                 | Plan Semanal
description          | Suscripción semanal con acceso completo + 7 días gratis
price                | 2900.00
currency             | CLP
duration_days        | 7
trial_duration_days  | 7
is_active            | true
display_order        | 0
```

### Tabla: `subscriptions`

Cuando un usuario se registra o "paga":

```sql
user_id              | <user_id>
plan_id              | weekly
status               | trial
started_at           | <timestamp>
expires_at           | <timestamp + 7 days>
trial_ends_at        | <timestamp + 7 days>
auto_renew           | true
```

## 🔧 Cambios Realizados

### Backend

1. **`backend/src/scripts/seed-plans.ts`**
   - ✅ Agregado plan `weekly` con precio $2.900 CLP
   - ✅ Actualizado display_order de otros planes

2. **`backend/src/auth/services/authService.ts`**
   - ✅ Importado `SubscriptionService`
   - ✅ Auto-activación de trial en registro (líneas 96-108)

3. **`backend/src/services/paymentService.ts`**
   - ✅ Modificado `createPaymentPreference` para modo MVP
   - ✅ Código original de MercadoPago comentado
   - ✅ Retorna `mvpMode: true` cuando activa trial

### Frontend

1. **`app/pricing/page.tsx`**
   - ✅ Manejo de respuesta MVP mode (líneas 112-123)
   - ✅ Agregado soporte para "semana" en `formatDuration`
   - ✅ Mensajes de éxito y redirección

## 🎨 Cómo Se Ve

### Página de Pricing

```
┌─────────────────────────────────────────────────┐
│  Elige tu Plan                                  │
│  Comienza con 7 días gratis                    │
└─────────────────────────────────────────────────┘

┌────────────────┐  ┌────────────────┐
│ Plan Semanal   │  │ Plan Estudiante│
│ ⭐ Recomendado │  │                │
│                │  │                │
│ $2.900         │  │ $8.000         │
│ por semana     │  │ por mes        │
│                │  │                │
│ 🎁 7 días gratis│ │ 🎁 7 días gratis│
│                │  │                │
│ ✓ Acceso total │  │ ✓ Acceso total │
│ ✓ Tutor AI     │  │ ✓ Tutor AI     │
│ ✓ Sin límites  │  │ ✓ Sin límites  │
│                │  │                │
│ [Suscribirse]  │  │ [Suscribirse]  │
└────────────────┘  └────────────────┘
```

### Flujo de Usuario

```
Registro → Trial Activado → Dashboard (Acceso Premium)
   ↓
Automático
7 días gratis

O

Login → /pricing → Elegir Plan → Trial Activado → Dashboard
                                      ↓
                                 Automático
                              (Sin pago real)
```

## 🔄 Migración a Producción

Cuando estés listo para activar MercadoPago:

### 1. Backend (`backend/src/services/paymentService.ts`)

```typescript
// Comentar el código MVP (líneas 32-71)
// Descomentar el código de producción (líneas 77-161)
```

### 2. Variables de Entorno

Asegúrate de tener:

```bash
MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxx (token de producción)
BACKEND_URL=https://tu-dominio.com
FRONTEND_URL=https://tu-dominio.com
```

### 3. Configurar Webhook

1. Ve a tu cuenta de MercadoPago
2. Configura el webhook a: `https://tu-dominio.com/api/payments/webhook`
3. Activa notificaciones para eventos de "payment"

### 4. Probar en Sandbox

Antes de producción, prueba en sandbox:

```bash
MERCADOPAGO_ACCESS_TOKEN=TEST-xxx
```

Usa las [tarjetas de prueba de MercadoPago](https://www.mercadopago.com.ar/developers/es/docs/your-integrations/test/cards)

## 📝 Notas Importantes

1. **Trial Automático**: TODOS los nuevos usuarios obtienen 7 días gratis automáticamente
2. **Sin Tarjeta**: No se requiere tarjeta de crédito para el trial
3. **Un Trial por Usuario**: Un usuario no puede tener múltiples trials activos
4. **Expiración**: Después de 7 días, el trial expira y el usuario pierde acceso
5. **Renovación**: Por ahora no hay renovación automática (se implementará con MercadoPago)

## 🐛 Troubleshooting

### El plan semanal no aparece

```bash
# Verificar que el seed se ejecutó correctamente
cd backend
npm run seed:plans
```

### Los usuarios no obtienen trial al registrarse

1. Verifica que el plan 'weekly' existe en la BD
2. Revisa los logs del backend durante el registro
3. Verifica que no haya errores en la consola

### Error al "pagar"

- El backend debería activar el trial automáticamente
- Revisa los logs para ver errores
- Verifica que el usuario no tenga ya una suscripción activa

## 📚 Próximos Pasos

1. ✅ **MVP Completo** - Todos los usuarios obtienen 7 días gratis
2. ⏳ **Desarrollar Integración Real** - Descomentar código de MercadoPago
3. ⏳ **Configurar Webhook** - Para recibir confirmaciones de pago
4. ⏳ **Probar en Sandbox** - Con tarjetas de prueba
5. ⏳ **Ir a Producción** - Con tokens reales de MercadoPago
6. ⏳ **Implementar Renovación** - Sistema de suscripciones recurrentes

## 🎉 Resumen

Este MVP te permite:
- Lanzar inmediatamente con trials de 7 días
- Captar usuarios sin fricción (no requiere pago)
- Tener 7 días para desarrollar la integración real de pagos
- Validar el producto antes de cobrar

**¡Todo listo para lanzar!** 🚀
