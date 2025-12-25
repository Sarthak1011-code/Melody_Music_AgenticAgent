# Instructions to Push to GitHub

## Step 1: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it (e.g., "NyayaArtificial")
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Add Remote and Push

After creating the repository, GitHub will show you commands. Use these commands:

```bash
# Navigate to your project directory
cd /Users/sarthakkumar/Python1/NyayaArtificial

# Add the remote (replace YOUR_USERNAME and REPO_NAME with your actual values)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Or if you prefer SSH:
# git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Alternative: Using GitHub CLI

If you have GitHub CLI installed:

```bash
gh repo create NyayaArtificial --public --source=. --remote=origin --push
```

## Verification

After pushing, verify:
1. Go to your GitHub repository page
2. Check that all files are present
3. Verify that `.env`, `venv/`, and `logs/` are NOT in the repository (they should be gitignored)

## Important Security Reminders

✅ **Before pushing, verify:**
- No `.env` files are committed
- No API keys or secrets in code
- `venv/` directory is excluded
- `logs/` directory is excluded
- No credentials in any files

You can verify what will be pushed with:
```bash
git ls-files | grep -E "\.env|venv|logs|__pycache__"
```

If this command returns any results, those files should NOT be committed!

