# Contributing Guide

Contributing to Vue-slices is fairly easy and makes for an awesome entry point in the OSS world!
This document shows you how to get started.

> Just looking for our To-Do list? 👉 [Click here](/TODO.MD)!

## General

1. Read [our sliceGuide](/CODING_GUIDELINES.md) first and make sure you're accustomed to how we write components
2. Our [pull-request template](/PULL_REQUEST_TEMPLATE.md) is also a great place to understand what we look for in contributions
3. Pick an issue from "to-do" board [here](/TODO.md), and let the contributors know that you're working on something!
4. Code in accordance with the [Coding Guidelines](/CODING_GUIDELINES.md) and [slice README template](/SLICE_README_TEMPLATE.md)
5. Propose a Pull Request (currently it's ok to propose it for master branch)
6. Wait for review and adjust your PR according to it.
7. Congrats! Your PR should now me merged in!

If you can't handle some parts of the issue feel free to ask in the comment.
It's absolutely OK if you can only handle styling/tests/whatever.

## Submitting changes

- Fork the repo
  - <https://github.com/fork>
- Check out a new branch based and name it to what you intend to do:
  - Example:
    ```
    $ git checkout -b BRANCH_NAME feature/fooBar
    ```
    If you get an error, you may need to fetch fooBar first by using
    ```
    $ git remote update && git fetch
    ```
  - Use one branch per fix / feature
- Commit your changes
  - Please provide a git message that explains what you've done
  - Commit to the forked repository
  - Example:
    ```
    $ git commit -am 'Add some fooBar'
    ```
- Push to the branch
  - Example:
    ```
    $ git push origin feature/fooBar
    ```
- Make a pull request
  - self review your code one more time (and run the linter!)
  - and make sure you send the PR to the _fooBar_ branch

If you follow these instructions, your PR will land pretty safely in the main repository!

In case of questions/difficulty, feel free to contact our contributors.
They'll be more than happy to guide you through our (fairly new) PR process!
