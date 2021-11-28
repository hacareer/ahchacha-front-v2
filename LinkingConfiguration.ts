import {ILinkingConfiguration} from './types/types';

const config: ILinkingConfiguration = {
  prefixes: ['ahchacha://'],
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
      Clinic: {
        screens: {
          Detail: {
            path: 'clinic/:clinicID/detail',
            parse: {
              key: (clinicID: number) => `clinic-detail-${clinicID}`,
              id: (clinicID: number) => clinicID,
            },
          },
          Review: {
            path: 'clinic/:clinicID/review',
            parse: {
              key: (clinicID: number) => `clinic-review-${clinicID}`,
              id: (clinicID: number) => clinicID,
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
