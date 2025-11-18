# Branch Protection and Auto-Merge Configuration

This document explains how to configure branch protection rules to make E2E tests required for auto-merge.

## Required Status Checks

The following status checks are **required** to pass before any pull request can be merged (including auto-merge):

- **Run E2E Tests** - End-to-end tests that verify the entire application stack

## Setting Up Branch Protection

### Option 1: Using GitHub Web UI (Recommended)

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Branches**
3. Under "Branch protection rules", click **Add rule** or edit the existing rule for `main`/`master`
4. Configure the following settings:

   **Branch name pattern:** `main` (or `master`)

   ☑️ **Require a pull request before merging**
   - Required number of approvals before merging: 1
   - Dismiss stale pull request approvals when new commits are pushed

   ☑️ **Require status checks to pass before merging**
   - ☑️ Require branches to be up to date before merging
   - **Status checks that are required:**
     - `Run E2E Tests` (search for this in the status checks dropdown)

   ☑️ **Require conversation resolution before merging**

5. Click **Create** or **Save changes**

### Option 2: Using GitHub CLI

If you have the GitHub CLI (`gh`) installed, you can apply these settings using the configuration file:

```bash
# Apply branch protection settings
gh api repos/{owner}/{repo}/branches/main/protection \
  --method PUT \
  --field required_status_checks[strict]=true \
  --field required_status_checks[checks][][context]="Run E2E Tests" \
  --field required_pull_request_reviews[required_approving_review_count]=1 \
  --field required_pull_request_reviews[dismiss_stale_reviews]=true \
  --field required_conversation_resolution=true \
  --field enforce_admins=false
```

Replace `{owner}` and `{repo}` with your repository owner and name.

### Option 3: Using Probot Settings App

If your repository has the [Probot Settings](https://github.com/probot/settings) app installed, the `.github/settings.yml` file will be automatically applied when merged to the default branch.

## Enabling Auto-Merge

Once branch protection is configured, you can enable auto-merge on pull requests:

### Via GitHub Web UI:
1. Open your pull request
2. Click **Enable auto-merge** button
3. Select **Squash and merge** (or your preferred merge method)
4. The PR will automatically merge once all required checks pass and approvals are received

### Via GitHub CLI:
```bash
gh pr merge <PR_NUMBER> --auto --squash
```

### Via GitHub API:
```bash
gh api repos/{owner}/{repo}/pulls/<PR_NUMBER>/merge \
  --method PUT \
  --field merge_method=squash \
  --field auto_merge=true
```

## How It Works

1. When a pull request is created, the E2E tests workflow automatically runs
2. The workflow job "Run E2E Tests" must complete successfully
3. At least one approval is required
4. All conversations must be resolved
5. Once all requirements are met, the PR can be merged manually or will auto-merge if enabled

## Verifying Configuration

To verify that branch protection is correctly configured:

1. Go to **Settings** → **Branches** on GitHub
2. Check that the `main` branch has a protection rule
3. Verify that "Run E2E Tests" appears in the required status checks list

## Troubleshooting

### "Run E2E Tests" doesn't appear in status checks dropdown

- Make sure the E2E tests workflow has run at least once on a pull request
- Check that the workflow file `.github/workflows/e2e-tests.yml` exists
- Verify the job name in the workflow is exactly: `name: Run E2E Tests`

### Auto-merge is not working

- Verify all required status checks are passing
- Ensure the PR has the required number of approvals
- Check that all conversations are resolved
- Make sure branch protection rules are correctly configured

## Related Files

- `.github/workflows/e2e-tests.yml` - E2E tests workflow definition
- `.github/settings.yml` - Branch protection configuration (for Probot Settings app)
