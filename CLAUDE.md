# Gummi

## Dev Server
- Port: **54980** (not the default 3000)
- Run: `npx next dev --port 54980`

## CRITICAL: Never Launch Background Agents or Expensive Tasks Without Explicit Permission

**DO NOT** launch background agents, web search agents, or any task that consumes significant API/token usage without the user explicitly asking for it. This includes:
- Background `Agent` tool calls with `run_in_background: true`
- Web search agents spawned to look up external data (Unsplash IDs, Pexels photos, etc.)
- Any agent that would make many sequential API calls or web requests

This caused serious disruption by draining the user's API usage. It must never happen again.

If a task would require extensive external lookups or background work, **ask the user first** before doing it.
