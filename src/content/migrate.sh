#!/usr/bin/env bash
set -euo pipefail

for f in *.md; do
  # Skip if no matches
  [[ -e "$f" ]] || continue

  # Strip extension
  name="${f%.md}"
  dir="$name"

  if [[ -d "$dir" ]]; then
    echo "Skipping '$f' → directory '$dir' already exists"
    continue
  fi

  mkdir -p "$dir"
  mv "$f" "$dir/index.md"
  echo "Moved '$f' → '$dir/index.md'"
done
