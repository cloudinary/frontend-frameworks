(cd ./frameworks/react && npm run test)
&& (cd ./frameworks/angular && npm run test)
&& (cd ./frameworks/svelte && npm run test)
&& (cd ./e2e-tests && npm run start-server-and-test:react)

