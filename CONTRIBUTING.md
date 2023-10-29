## Contributing to the project

We welcome contributions to this project. Before you get started, please read this document to learn about our development process, how to propose pull requests and improvements, and how to build and test your changes to the project.

## Development process overview

The project is maintained using the "fork and pull" model. To contribute, you will need to fork the project, commit changes to your fork, and then open a pull request (PR) with those changes from your fork to this project's master branch. Your PR will be reviewed by a maintainer, who will provide feedback. When your PR is approved, it will be merged into the project.

## Contributing code

### Getting started

1. Fork the project, clone your fork, and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone https://github.com/Axolem/react-native-ozow.git
    # Navigate to the newly cloned directory
    cd react-native-ozow
    # Assign the original repo to a remote called "upstream"
    git remote add upstream

   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout master
   git pull upstream master
   ```

3. Create a new topic branch (off the main project development branch) to contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Commit your changes in logical chunks. Please make your git commit message detailed and descriptive. If your PR is related to an issue in the issue tracker, please include the issue number in your commit message. Please also add your name to the AUTHORS file.

   ```bash
   git add .
   git commit -m "Your detailed description of your changes."
   ```

5. Test your changes.

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. Open a Pull Request with a clear title and description against the master branch. Please include the issue number in the PR title if applicable.

### Code review process

1. A maintainer will review your PR and provide feedback.

2. Once your PR has passed code review and tests, it will be merged into the project.

### Code style

Please follow the style guidelines for the project. If you use a text editor that supports editorconfig (e.g. Atom, VS Code, Sublime), the project's .editorconfig file will ensure that your code editor uses the correct indentation, etc. settings for the project.
