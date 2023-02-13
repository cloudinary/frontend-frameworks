expect.extend({
    toEqualAnalyticsToken(received: string, expected: string) {
        if (!received) {
            return {
                pass: false,
                message: () => `Expected ${received} to be a valid string`
            }
        }
        const parts = received.split(`?_a=`);
        if (parts.length === 1) {
            return {
                pass: false,
                message: () => `Expected ${received} to be have an analytics token`
            }
        }
        const token = parts[1];
        if (token === expected) {
            return {
                pass: true,
                message: () => `Expected ${received} not to be a valid ISO date string`,
            }
        } else {
            return {
                pass: false,
                message: () => `Expected ${token} to equal ${expected}`
            }
        }
    },
});
