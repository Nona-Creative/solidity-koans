Solidity Koans
===

### Before you start

Create your own Git branch, so that you can commit your progress, 
and so that you can checkout the ``solutions`` branch at any point. 

### Steps

1. Run ``npm install`` in the project folder

2. Run ``npm run init`` initialize the project

3. in ``terminal 1`` start required services (Make sure that you have [Docker](https://docs.docker.com/docker-for-mac/install/) installed):
    ```bash
    npm run services:buildup
    ```

4. in ``terminal 2`` run Solidity linter in watch mode:
    ```bash
    npm run lint:contracts:watch
    ```

5. in ``terminal 3`` run contract tests in watch mode:
    ```bash
    npm run test:contracts:watch
    ```

6. Follow the instructions in each test file (in the contracts folder).

### Solutions

To see solutions checkout the ``solutions`` branch.

### More

For all available commands run:
```bash
npm run help
```
