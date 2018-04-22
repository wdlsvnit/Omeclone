# Guidlines for Contribution


## 1. Technologies and languages used
  - NodeJS
  - ExpressJS
  - Socket.io
  - Semantic-ui
  - HTML5
  - CSS3
  - ECMAScript 6 Syntax

## 2. Opening an Issue
**I'm submitting a ...**  (check one with "x")
  - [ ] bug report
  - [ ] feature request

**Current behavior:**
<!-- Describe how the bug manifests. -->

**Expected behavior:**
<!-- Describe what the behavior would be without the bug. -->


##  3. Writing a good Commit message

**Commit Message Format**

Each commit message consists of a header, a body and an optional footer. The header has a special format that includes a type, a scope and a subject:
```
<type>: <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```  
**NOTE:** Good commit messages complete this sentence - "On merging, this will: _____ ."
### Types of commit messages:


- **build:** Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci:** Changes to CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **docs:** Documentation only changes
- **feat:** A new feature
- **fix:** A bug fix
- **perf:** A code change that improves performance
- **refactor:** A code change that neither fixes a bug nor adds a feature
- **style:** Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test:** Adding missing tests or correcting existing tests


### Subject

The subject contains succinct description of the change:
1. Separate subject from body with a blank line
2. Limit the subject line to 50 characters
3. Capitalize the subject line
4. Do not end the subject line with a period
5. Use the imperative mood in the subject line
6. Wrap the body at 72 characters
7. Use the body to explain what and why vs. how


### Footer (Optional)

Footer is used for citing issues that this commit closes (if any).

**For Example:**
```
fix: Summarize changes in around 50 characters or less. Write the issue no. in brackets (#123)

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body. The
blank line separating the summary from the body is critical (unless
you omit the body entirely); various tools like `log`, `shortlog`
and `rebase` can get confused if you run the two together.

Explain the problem that this commit is solving. Focus on why you
are making this change as opposed to how (the code explains that).
Are there side effects or other unintuitive consequences of this
change? Here's the place to explain them.

Further paragraphs come after blank lines.

 - Bullet points are okay, too.

 - Typically a hyphen or asterisk is used for the bullet, preceded
   by a single space, with blank lines in between, but conventions
   vary here.

If you use an issue tracker, put references to them at the bottom,
like this:

Resolves: #123
See also: #456, #789
```

Source: [Tim Pope](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)'s article.
