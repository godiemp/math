# Claude Code Instructions

## Creating Pull Requests

When creating a PR, always include a **Preview** section with a direct link to the specific page you're working on.

### Preview URL Format

The Vercel preview URL follows this pattern:
```
https://math-git-{branch-sanitized}-godiemps-projects.vercel.app{path}
```

Where `{branch-sanitized}` is the branch name with `/` replaced by `-`.

### Example

For branch `godiemp/7mo-muestreo-lesson` working on a lesson at `/lessons/MA07-OA-05`:

```markdown
## Preview
[Ver lección MA07-OA-05](https://math-git-godiemp-7mo-muestreo-lesson-godiemps-projects.vercel.app/lessons/MA07-OA-05)
```

### PR Description Template

```markdown
## Summary
- [Brief description of changes]

## Preview
[Descriptive link text]({preview-url-with-specific-path})

## Test plan
- [How to verify the changes]
```

Always include the most relevant page path for testing the feature/fix you implemented.
