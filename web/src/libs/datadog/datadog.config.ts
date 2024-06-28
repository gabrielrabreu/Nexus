import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  applicationId: import.meta.env.VITE_DATADOG_APPLICATION_ID,
  clientToken: import.meta.env.VITE_DATADOG_CLIENT_TOKEN,
  site: 'us5.datadoghq.com',
  service: 'web',
  env: 'local',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'mask-user-input',
});

datadogLogs.init({
  clientToken: import.meta.env.VITE_DATADOG_CLIENT_TOKEN,
  site: 'us5.datadoghq.com',
  service: 'web',
  env: 'local',
  sessionSampleRate: 100,
  forwardErrorsToLogs: true,
});

export default datadogLogs;