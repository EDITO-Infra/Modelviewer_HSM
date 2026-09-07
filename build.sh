#!/usr/bin/env bash
set -e
echo "Building the project..."
SCRIPT_DIR="$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")"
pushd "$SCRIPT_DIR" >/dev/null

# Install uv if not available
if ! command -v uv >/dev/null; then
  echo "Installing uv..."
  curl -LsSf https://astral.sh/uv/install.sh | sh
  # Add uv to PATH (it installs to $HOME/.local/bin)
  export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"
  # Also source the env file if it exists
  if [ -f "$HOME/.local/bin/env" ]; then
    source "$HOME/.local/bin/env"
  fi
fi

# Ensure uv is in PATH (in case it was installed but PATH wasn't updated)
export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"

# Install Python dependencies with uv
if [ -f "pyproject.toml" ]; then
  echo "Installing Python dependencies with uv..."
  uv sync
fi

# Install Node.js if not available
if ! command -v node >/dev/null; then
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
  export NVM_DIR="$HOME/.nvm"
  . "$NVM_DIR/nvm.sh"
  nvm install 22
fi

# Build Node.js application with static export
npm ci
NODE_ENV=production npm run build

# Move files to root for deployment platform
if [ -f "out/model_viewer/habitat_suitability/embed.html" ]; then
  mv out/model_viewer/habitat_suitability/embed.html out/index.html
  mv out/model_viewer/habitat_suitability.html out/
  rm -rf out/model_viewer
fi

echo "Build completed successfully."
echo "Static files are in the 'out' directory, ready for deployment."
popd >/dev/null
