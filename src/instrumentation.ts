import * as Sentry from '@sentry/nextjs';

const instrumentationLoadedAt = performance.now();

export async function register() {
  const registerStartedAt = performance.now();
  let sentryConfigImportDurationMs: number | undefined;

  try {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
      const sentryConfigImportStartedAt = performance.now();
      await import('../sentry.server.config');
      sentryConfigImportDurationMs =
        performance.now() - sentryConfigImportStartedAt;
    }

    if (process.env.NEXT_RUNTIME === 'edge') {
      const sentryConfigImportStartedAt = performance.now();
      await import('../sentry.edge.config');
      sentryConfigImportDurationMs =
        performance.now() - sentryConfigImportStartedAt;
    }
  } finally {
    if (process.env.DEBUG_STARTUP_METRICS === 'true') {
      console.debug(
        '[startup-metrics]',
        JSON.stringify({
          runtime: process.env.NEXT_RUNTIME ?? 'unknown',
          runtimeElapsedMs: Number(performance.now().toFixed(2)),
          instrumentationToRegisterMs: Number(
            (registerStartedAt - instrumentationLoadedAt).toFixed(2)
          ),
          registerDurationMs: Number(
            (performance.now() - registerStartedAt).toFixed(2)
          ),
          sentryConfigImportDurationMs:
            sentryConfigImportDurationMs === undefined
              ? undefined
              : Number(sentryConfigImportDurationMs.toFixed(2)),
        })
      );
    }
  }
}

export const onRequestError = Sentry.captureRequestError;
