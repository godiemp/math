#!/bin/bash

# fetch-pipeline-errors.sh
# Fetches GitHub Actions pipeline errors for debugging

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check for GitHub token
if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${RED}Error: GITHUB_TOKEN not found in .env file${NC}"
    echo "Please create a .env file with your GitHub token:"
    echo "  GITHUB_TOKEN=your_token_here"
    echo ""
    echo "Get a token at: https://github.com/settings/tokens/new"
    echo "Required permissions: repo, actions:read"
    exit 1
fi

# Get repository info from git remote
REPO_URL=$(git remote get-url origin 2>/dev/null || echo "")
if [ -z "$REPO_URL" ]; then
    echo -e "${RED}Error: Not a git repository or no remote found${NC}"
    exit 1
fi

# Extract owner/repo from URL (handles both SSH and HTTPS)
REPO_FULL=$(echo "$REPO_URL" | sed -e 's/.*github.com[:/]\(.*\)\.git/\1/' -e 's/.*github.com[:/]\(.*\)/\1/')
REPO_OWNER=$(echo "$REPO_FULL" | cut -d'/' -f1)
REPO_NAME=$(echo "$REPO_FULL" | cut -d'/' -f2)

echo -e "${BLUE}Repository:${NC} $REPO_OWNER/$REPO_NAME"

# Parse command line arguments
SHOW_ALL=false
WORKFLOW_NAME=""
LIMIT=5

while [[ $# -gt 0 ]]; do
    case $1 in
        --all)
            SHOW_ALL=true
            shift
            ;;
        --workflow)
            WORKFLOW_NAME="$2"
            shift 2
            ;;
        --limit)
            LIMIT="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            echo "Usage: $0 [--all] [--workflow NAME] [--limit N]"
            exit 1
            ;;
    esac
done

# Get current branch if not showing all
if [ "$SHOW_ALL" = false ]; then
    CURRENT_BRANCH=$(git branch --show-current)
    echo -e "${BLUE}Branch:${NC} $CURRENT_BRANCH"
    BRANCH_FILTER="&branch=$CURRENT_BRANCH"
else
    BRANCH_FILTER=""
    echo -e "${BLUE}Mode:${NC} All branches"
fi

# Fetch workflow runs
API_URL="https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/runs?status=failure&per_page=$LIMIT$BRANCH_FILTER"

echo -e "\n${YELLOW}Fetching failed workflow runs...${NC}\n"

RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
                   -H "Accept: application/vnd.github.v3+json" \
                   "$API_URL")

# Check if we got valid JSON
if ! echo "$RESPONSE" | jq empty 2>/dev/null; then
    echo -e "${RED}Error: Invalid API response${NC}"
    echo "$RESPONSE"
    exit 1
fi

# Get total count
TOTAL_COUNT=$(echo "$RESPONSE" | jq '.total_count')

if [ "$TOTAL_COUNT" -eq 0 ]; then
    echo -e "${GREEN}No failed workflow runs found!${NC}"
    exit 0
fi

echo -e "${RED}Found $TOTAL_COUNT failed workflow run(s)${NC}\n"

# Process each workflow run
echo "$RESPONSE" | jq -r '.workflow_runs[] | @json' | while IFS= read -r run; do
    RUN_ID=$(echo "$run" | jq -r '.id')
    RUN_NAME=$(echo "$run" | jq -r '.name')
    RUN_NUMBER=$(echo "$run" | jq -r '.run_number')
    RUN_BRANCH=$(echo "$run" | jq -r '.head_branch')
    RUN_CREATED=$(echo "$run" | jq -r '.created_at')
    RUN_URL=$(echo "$run" | jq -r '.html_url')

    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${RED}✗${NC} Workflow: ${YELLOW}$RUN_NAME${NC} #$RUN_NUMBER"
    echo -e "  Branch: $RUN_BRANCH"
    echo -e "  Created: $RUN_CREATED"
    echo -e "  URL: $RUN_URL"
    echo ""

    # Fetch jobs for this run
    JOBS_URL="https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/runs/$RUN_ID/jobs"
    JOBS=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
                    -H "Accept: application/vnd.github.v3+json" \
                    "$JOBS_URL")

    # Process each failed job
    echo "$JOBS" | jq -r '.jobs[] | select(.conclusion == "failure") | @json' | while IFS= read -r job; do
        JOB_NAME=$(echo "$job" | jq -r '.name')

        echo -e "  ${RED}Failed Job:${NC} $JOB_NAME"
        echo ""

        # Get failed steps
        echo "$job" | jq -r '.steps[] | select(.conclusion == "failure") | @json' | while IFS= read -r step; do
            STEP_NAME=$(echo "$step" | jq -r '.name')
            STEP_NUMBER=$(echo "$step" | jq -r '.number')

            echo -e "    ${RED}Failed Step #$STEP_NUMBER:${NC} $STEP_NAME"
            echo ""
        done

        # Get logs URL
        LOGS_URL=$(echo "$job" | jq -r '.url' | sed 's/$/\/logs/')

        echo -e "    ${BLUE}Fetching logs...${NC}"

        # Download logs
        LOGS=$(curl -s -L -H "Authorization: token $GITHUB_TOKEN" \
                          -H "Accept: application/vnd.github.v3+json" \
                          "$LOGS_URL")

        # Display last 50 lines of logs (most relevant)
        echo ""
        echo -e "    ${YELLOW}--- Last 50 lines of logs ---${NC}"
        echo "$LOGS" | tail -50 | sed 's/^/    /'
        echo ""
    done

    echo ""
done

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}Tip:${NC} Use --all to see failures from all branches"
echo -e "${BLUE}Tip:${NC} Use --limit N to control number of runs shown (default: 5)"
