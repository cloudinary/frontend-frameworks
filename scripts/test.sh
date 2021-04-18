(cd ./frameworks/react && npm run test) &&
(cd ./frameworks/angular && npm run test) &&
(cd ./frameworks/vue/vue3 && npm run test) &&
(cd ./frameworks/svelte && npm run test) &&
(cd ./e2e-tests && npm run start-server-and-test:react)
# Uncomment this when Vue sdk is expected to pass e2e tests
# (cd ./e2e-tests && npm run start-server-and-test:vue)

