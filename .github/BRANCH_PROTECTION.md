# Branch Protection Configuration

## Required Status Checks

This repository requires the following status checks to pass before merging PRs:

- **Run E2E Tests** - End-to-end tests must pass

## Setup Instructions

### Option 1: Using GitHub Web UI

1. Go to repository **Settings** > **Branches**
2. Click **Add rule** under "Branch protection rules"
3. Enter `main` (or your default branch name) as the branch name pattern
4. Enable **Require status checks to pass before merging**
5. Search for and select **Run E2E Tests**
6. Enable **Require branches to be up to date before merging**
7. Optionally enable **Require conversation resolution before merging**
8. Click **Create** or **Save changes**

### Option 2: Using GitHub CLI

Run the following command from the repository root:

```bash
gh api repos/{owner}/{repo}/branches/main/protection \
  --method PUT \
  --field required_status_checks[strict]=true \
  --field required_status_checks[contexts][]=Run\ E2E\ Tests \
  --field enforce_admins=false \
  --field required_pull_request_reviews=null \
  --field restrictions=null \
  --field allow_force_pushes=false \
  --field allow_deletions=false \
  --field required_conversation_resolution=true
```

Replace `{owner}` and `{repo}` with your repository details.

### Option 3: Using the API with curl

```bash
curl -X PUT \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/{owner}/{repo}/branches/main/protection \
  -d @.github/branch-protection.json
```

## Configuration Details

The branch protection configuration requires:

- ✅ E2E tests must pass
- ✅ Branches must be up to date before merging
- ✅ Conversations must be resolved before merging
- ❌ No test retries (retries disabled in playwright.config.ts)

## Verification

After setup, you can verify the configuration with:

```bash
gh api repos/{owner}/{repo}/branches/main/protection
```
