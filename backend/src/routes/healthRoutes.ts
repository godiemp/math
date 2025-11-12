import { Router, Request, Response } from 'express';
import { pool } from '../config/database';
import Anthropic from '@anthropic-ai/sdk';

const router = Router();

/**
 * Basic liveness check
 * Fast endpoint that always returns 200 if the server is running
 * Used by load balancers and orchestrators to check if the service is alive
 */
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

/**
 * Detailed readiness check
 * Checks all critical dependencies before marking the service as ready
 * Returns 503 if any critical service is unavailable
 */
router.get('/health/ready', async (req: Request, res: Response) => {
  const checks: any = {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    status: 'healthy',
    services: {},
  };

  let isHealthy = true;

  // Check database connection
  try {
    const startTime = Date.now();
    await pool.query('SELECT 1');
    const responseTime = Date.now() - startTime;
    checks.services.database = {
      status: 'connected',
      responseTime: `${responseTime}ms`,
    };
  } catch (error: any) {
    checks.services.database = {
      status: 'disconnected',
      error: error.message,
    };
    isHealthy = false;
  }

  // Check Anthropic API (if configured)
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });

      // Simple test: Just check if the API key is valid by making a minimal request
      // We don't actually need to complete it, just verify authentication works
      const startTime = Date.now();

      // Note: Anthropic doesn't have a dedicated health endpoint
      // So we just verify the API key format and configuration
      if (process.env.ANTHROPIC_API_KEY.startsWith('sk-ant-')) {
        const responseTime = Date.now() - startTime;
        checks.services.anthropic = {
          status: 'configured',
          responseTime: `${responseTime}ms`,
        };
      } else {
        checks.services.anthropic = {
          status: 'misconfigured',
          error: 'Invalid API key format',
        };
        isHealthy = false;
      }
    } catch (error: any) {
      checks.services.anthropic = {
        status: 'error',
        error: error.message,
      };
      // Don't mark as unhealthy - Anthropic API issues shouldn't prevent the app from running
    }
  } else {
    checks.services.anthropic = {
      status: 'not_configured',
    };
  }

  // Check MercadoPago API (if configured)
  if (process.env.MERCADOPAGO_ACCESS_TOKEN) {
    try {
      // Just verify the token is configured
      // We don't make actual API calls to avoid unnecessary requests
      const tokenPrefix = process.env.MERCADOPAGO_ACCESS_TOKEN.substring(0, 5);
      checks.services.mercadopago = {
        status: 'configured',
        tokenPrefix,
      };
    } catch (error: any) {
      checks.services.mercadopago = {
        status: 'error',
        error: error.message,
      };
      // Don't mark as unhealthy - payment API issues shouldn't prevent the app from running
    }
  } else {
    checks.services.mercadopago = {
      status: 'not_configured',
    };
  }

  // Check Resend API (if configured)
  if (process.env.RESEND_API_KEY) {
    try {
      // Just verify the token is configured
      const keyPrefix = process.env.RESEND_API_KEY.substring(0, 5);
      checks.services.resend = {
        status: 'configured',
        keyPrefix,
      };
    } catch (error: any) {
      checks.services.resend = {
        status: 'error',
        error: error.message,
      };
      // Don't mark as unhealthy - email API issues shouldn't prevent the app from running
    }
  } else {
    checks.services.resend = {
      status: 'not_configured',
    };
  }

  // Check memory usage
  try {
    const memUsage = process.memoryUsage();
    const heapUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
    const heapTotalMB = Math.round(memUsage.heapTotal / 1024 / 1024);
    const rssMB = Math.round(memUsage.rss / 1024 / 1024);
    const heapPercentage = Math.round((memUsage.heapUsed / memUsage.heapTotal) * 100);

    checks.services.memory = {
      status: 'ok',
      heapUsed: `${heapUsedMB}MB`,
      heapTotal: `${heapTotalMB}MB`,
      heapPercentage: `${heapPercentage}%`,
      rss: `${rssMB}MB`,
    };

    // Warn if memory usage is high (>90%)
    if (heapPercentage > 90) {
      checks.services.memory.status = 'warning';
      checks.services.memory.message = 'High memory usage detected';
    }
  } catch (error: any) {
    checks.services.memory = {
      status: 'error',
      error: error.message,
    };
  }

  // Set overall status
  checks.status = isHealthy ? 'healthy' : 'unhealthy';

  // Return appropriate status code
  const statusCode = isHealthy ? 200 : 503;
  res.status(statusCode).json(checks);
});

/**
 * Metrics endpoint for monitoring tools (Prometheus, Datadog, etc.)
 * Returns operational metrics about the service
 */
router.get('/health/metrics', (req: Request, res: Response) => {
  try {
    const metrics = {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        heapUsed: process.memoryUsage().heapUsed,
        heapTotal: process.memoryUsage().heapTotal,
        external: process.memoryUsage().external,
        rss: process.memoryUsage().rss,
      },
      cpu: process.cpuUsage(),
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      platform: process.platform,
      pid: process.pid,
    };

    res.json(metrics);
  } catch (error: any) {
    res.status(500).json({
      error: 'Failed to collect metrics',
      message: error.message,
    });
  }
});

export default router;
