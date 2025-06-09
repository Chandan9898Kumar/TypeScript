### Git Commit Message Best Practices.

**Commit Message Structure**

```js
<type>(<scope>): <short summary>

<body>

<footer>
```

`NOTE :` The scope is an optional part of the commit message that indicates which part of the codebase is affected by the commit. It's enclosed in parentheses after the type and before the colon.

Example :

```js

feat(comments): add delete functionality for nested comments
fix(auth): resolve token expiration issue
refactor(user-profile): simplify state management
docs(README): update installation instructions
style(dashboard): apply consistent formatting
test(api): add integration tests for comment endpoints

```

### Types

1. feat: A new feature

2. fix: A bug fix

3. docs: Documentation changes

4. style: Code style changes (formatting, missing semi-colons, etc)

5. refactor: Code changes that neither fix bugs nor add features

6. perf: Performance improvements

7. test: Adding or correcting tests

8. chore: Changes to build process, auxiliary tools, libraries

### Examples

1. Feature Addition

```js
feat(comments): add nested comment deletion functionality

Implement recursive function to remove comments by ID from any nesting level.
Ensures proper state updates when deleting nested comments.

```

### Bug Fix

```js
fix(comments): fix nested comment deletion not working for deep nesting

The previous implementation only removed direct replies but failed to check
nested replies recursively. This fix ensures comments are removed at any depth.


```

### Refactoring

```js
refactor(comments): simplify comment deletion logic

Replace complex nested loops with recursive function for better readability
and maintainability.

```

### Documentation

```js
docs(readme): update installation instructions

Add TypeScript configuration details and update dependency versions.
```

### Style Changes

```js
style(components): apply consistent formatting to comment components

Fix indentation and apply consistent naming conventions.

```

### Performance Improvement

```js
perf(rendering): optimize comment tree rendering

Implement memoization for comment components to prevent unnecessary re-renders.
Reduces render time by 40% for large comment trees.

```

### Testing

```js

test(comments): add unit tests for comment deletion

Cover edge cases including empty replies and deeply nested comments.

```

### Chore

```js
chore(deps): update React to v18.2.0

Update React and related dependencies to latest versions.


```
