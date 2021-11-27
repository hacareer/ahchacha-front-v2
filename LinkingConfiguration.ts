import {ILinkingConfiguration} from './types/types';

const config: ILinkingConfiguration = {
  prefixes: [],
  config: {
    screens: {
      BottomTab: {
        screens: {
          Main: {
            path: 'main',
            parse: {
              key: () => 'main',
            },
          },
        },
      },
      Hospital: {
        screens: {
          Detail: {
            path: 'hospital/:hospitalID/detail',
            parse: {
              key: (hospitalID: number) => `hospital-detail-${hospitalID}`,
              id: (hospitalID: number) => hospitalID,
            },
          },
          Review: {
            path: 'hospital/:hospitalID/review',
            parse: {
              key: (hospitalID: number) => `hospital-review-${hospitalID}`,
              id: (hospitalID: number) => hospitalID,
            },
          },
        },
      },
      Calendar: {
        screens: {
          Detail: {
            path: 'calendar/detail',
            parse: {
              key: () => 'calendar-detail',
            },
          },
          AddAlarm: {
            path: 'calendar/alarm',
            parse: {
              key: () => 'calendar-alarm',
            },
          },
          AddSchedule: {
            path: 'calendar/schedule',
            parse: {
              key: () => 'calendar-schedule',
            },
          },
        },
      },
      School: {
        screens: {
          Write: {
            path: 'school/write',
            parse: {
              key: () => 'school-write',
            },
          },
        },
      },
      Register: {
        screens: {
          Main: {
            path: 'register/',
            parse: {
              key: () => 'register-main',
            },
          },
        },
      },
    },
  },
};
export default config;
