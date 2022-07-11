import { PlaywrightTestConfig, devices } from '@playwright/test';

const baseURL = 'https://quarx-ui.github.io/quarx/storybook/main/';
const deviceScaleFactor = 2;

const config: PlaywrightTestConfig = {
    timeout: 60000,
    testDir: './',
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                deviceScaleFactor,
            },
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                deviceScaleFactor,
            },
        },
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
                deviceScaleFactor,
            },
        },
    ],
    webServer: {
        reuseExistingServer: true,
        port: 6013,
        command: 'yarn run e2e:serve',
    },
    use: {
        baseURL,
    },
    testMatch: /.*test\.pw\.(js|ts)/,
};

export default config;
