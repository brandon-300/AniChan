# AGENT.md — Nexus Community Repository Rules

This file contains mandatory, durable instructions for every AI coding agent, automation, contributor, and sub-agent working in this repository. Read it before inspecting deeply, editing, running migrations, using connected tools, or committing changes. The owner's current implementation brief supplements this file; when instructions conflict, follow the latest explicit owner instruction and update this file/documentation accordingly.

## 1. Project identity and authority

- Repository: `https://github.com/brandon-300/AniChan`
- Main branch: `main`
- Public community name: **Nexus Community**
- Primary bot: Marin Kitagawa
- Primary bot ID: `marin`
- Runtime: TypeScript, Node.js, Baileys, Mongoose, Express
- Community model: one shared community with multiple independent WhatsApp Business character bots.

The owner authorizes use of any tools, MCP integrations, authenticated APIs, repository tools, shell tools and service connectors actually available to the agent. This includes GitHub, Cloudflare, MongoDB Atlas and Cloudinary when authenticated access is available.

If a tool or integration is unavailable, do not try to bypass authentication or waste time on broken mobile UI authorization flows. Continue with repository-only work, local mocks and documented integration contracts. State what could not be inspected or verified. Never pretend an unavailable connection worked.

The owner authorizes direct commits to `main`. Work directly on `main` when repository permissions allow. Do not create a branch merely by habit. Never force-push, rewrite history, delete branches or bypass branch protection. If protection prevents a direct commit, use a reviewable fallback and report the exact blocker.

Do not modify unrelated projects such as Anivora. The public Anivora repository may be inspected as an explicit reference for the admin authentication pattern, but do not copy its credentials, owner identity or unrelated implementation.

## 2. Non-negotiable existing-data protection

Existing users and community data are production-critical. Treat all connected data as valuable, even if a test/production boundary is unclear.

Never reset, truncate, drop, recreate, reseed-over, bulk-delete or casually rewrite MongoDB or D1 collections/tables.

Preserve, at minimum:
- MongoDB document `_id` values and existing logical user IDs.
- WhatsApp identities, PN/LID mappings and existing linked identities.
- Names, bios, dates of birth, ages and profile-image references.
- Registration states, completion flags and age-verification/lockout records.
- Wallets, bank balances, currencies, XP, levels, achievements and inventory.
- Card catalogue records, card IDs, owned-card records and ownership history.
- Guilds, guild memberships, auctions, trades, sales and marketplace state.
- Groups, group settings, scheduled tasks, AI conversations and message history.
- Website accounts, verification status, sessions, challenges, rate limits and admin audit history.

Schema changes must be additive and backward-compatible. Handle legacy documents with missing fields. Do not force existing active users through registration again.

Every migration must be documented, idempotent, dry-run capable, and have a backup/export and recovery plan before production writes. Report affected-record counts before execution. Never delete existing users or community assets as a cleanup side effect.

Do not delete old Cloudinary files, profile pictures, card art, generated assets or historical rendered-card files. Do not clear legacy MongoDB fields just because the new code no longer reads them.

Preserve the existing `.deluser` semantics. The admin dashboard's deletion action requires backend owner authorization, an exact target summary, explicit confirmation, audit logging and no unapproved cascading deletion. Do not automatically delete linked website accounts, owned cards or community history unless an explicit policy is added by the owner.

## 3. Tool, secret and service-access rules

- Use authenticated tools that are already available for the requested project resources.
- Inspect before modifying. Record resource names, bindings, schemas, indexes, counts and relevant relationships; redact private values.
- Never ask the owner to paste production secrets into source files, prompts, chat, logs or documentation.
- Never print, commit or log MongoDB URIs, Cloudinary API secrets, Cloudflare tokens, Google OAuth secrets, access tokens, cookies, private SSH keys or Baileys credentials.
- Use secret stores/environment variables for sensitive values. Documentation may name a required variable but must never contain its value.
- Cloudflare Worker/D1 writes, MongoDB writes and Cloudinary asset changes must be scoped to Nexus Community/AniChan and the owner's requested work.
- Production deployment is allowed only when an authenticated deployment tool is available, the target is confirmed, relevant tests pass and a rollback path exists. Do not change DNS, delete resources or replace an unrelated Worker/service.
- Before production data writes, run a dry run and ensure a recoverable backup/export exists. Do not execute destructive or irreversible data changes.
- If external access is absent, implement source code, local development configuration, mocks, migration scripts and exact manual setup documentation instead.

## 4. Code and documentation style

The owner does not want comments or explanations inside code.

- Do not add explanatory comments, inline comments, block comments, docstrings or TODO/FIXME comments to application code, tests, scripts or configuration code.
- Put explanations, architecture decisions, rationale, setup, configuration, migrations, operating procedures and unresolved work in the appropriate Markdown documentation.
- When editing a source file, move useful explanatory comments from the edited section into relevant documentation and remove those explanations from the edited section.
- Do not perform blind repository-wide comment stripping. Preserve only machine-required directives where unavoidable and document their purpose.
- Prefer self-explanatory names, types, small modules, validation and tests.
- Do not use source comments as a substitute for tests or documentation.

## 5. Nexus Community branding

- Use `Nexus Community` as the public community name.
- Expose it through one central configuration setting such as `COMMUNITY_NAME`, defaulting to `Nexus Community`.
- Marin, Rias and all other characters retain their own individual names, identities and personalities.
- Do not rename a bot to Nexus.
- Do not physically rename MongoDB databases or collections merely because the public brand changes. The existing `anichan` database is the shared community source of truth unless a separately approved migration is created.
- Do not invent or register a domain. Use configured URLs and clearly marked development placeholders until a production domain is confirmed.

## 6. One community, multiple independent WhatsApp Business bots

This is not one bot account changing personalities and not one WhatsApp account pretending to be several characters.

Every enabled character bot must have its own:
- Stable `botId`.
- Dedicated WhatsApp Business phone number and corresponding account.
- Independent Baileys authentication credentials and persistent session directory.
- Socket, adapter, message queue/runtime identity and connection lifecycle.
- Reconnection logic, health state and logs.
- Character identity, display name, profile picture reference, menu artwork and menu configuration.
- Fixed AI character profile and AI conversation history.
- Bot-specific group settings where appropriate.

All enabled bots must run at the same time and independently. A failure, disconnect, authentication refresh or restart of one bot must not stop another bot.

Marin is the only initially enabled bot. Other bots remain disabled until their own phone numbers, credentials, sessions and explicit enablement are configured. Never invent phone numbers or pair accounts automatically.

The desired roster is:
Alya, Aqua, Asuna, Cynthia, Elaina, Emilia, Frieren, Kirari, Kurumi, Mai, Maomao, Marin, Megumin, Misty, Mita, Miyabi, Modeus, Nazuna, Nemona, Rem, Rias, Rimuru, Rin, Tatsumaki, Yuki and Yumeko.

All bots share one MongoDB community database and globally shared:
- User identities and canonical profiles.
- Wallets, bank balances, currencies and transfers.
- XP, levels, achievements and inventory.
- Card catalogue, card ownership and collection state.
- Auctions, trades, sales and marketplace data.
- Guilds, guild membership and shared guild resources.
- Leaderboards, events and other global community state.

Do not create per-bot user databases, wallet collections, card catalogues or guild systems.

Keep bot-specific data isolated by `botId` where appropriate: WhatsApp authentication, socket state, runtime telemetry, AI conversations, character context, message ledgers, deduplication state and bot-specific group settings.

Use one coordinated codebase and release. Use independently supervised bot processes or equivalent fault isolation. Do not let each bot start duplicate global jobs. Use a single scheduler owner or reliable distributed locking for global card drops, news, daily reports, events and maintenance. Bot-specific jobs must run only for the correct bot.

## 7. Owner-only WhatsApp direct messages

Only the configured owner may DM any bot.

- Detect direct/private chats before command dispatch, queues, AI wake-word detection, registration, media, linking or other side effects.
- Resolve supported Baileys PN/LID identity representations safely.
- Allow private chats only from the configured owner identity/identities.
- Silently ignore every non-owner private message. Do not reply, reveal the restriction, execute commands, call AI providers, start registration, issue link challenges or trigger other workflows.
- Apply the guard early enough that unauthorized DMs consume no expensive processing.
- Ordinary users may continue interacting with the bots in groups, subject to existing permissions and moderation.
- Group membership does not grant private-message access.
- The owner may DM every bot.

Website registration/account linking must not require ordinary users to DM any bot. Use a secure group-based proof-of-control challenge and website confirmation. Challenges must be short-lived, single-use, bound to the authenticated website account, rate-limited and verified against the actual WhatsApp sender identity observed in the group. Handle PN/LID mapping safely and prevent duplicate account links.

## 8. Website and account integration

The website is separate from the bot's Express API. The inspected Cloudflare Worker was named `anichan-website`, used D1 database `anichan-website-auth` and a `DB` binding. Verify live names and topology with available tools before relying on them.

The website's authentication/session data may live in Cloudflare D1. The existing MongoDB `anichan` database remains canonical for WhatsApp community profiles and shared community data. Do not confuse the D1 database with MongoDB's separate `anichan_site` database.

The website account must be securely linked to the actual WhatsApp identity before profile edits are allowed. Avoid duplicate user profiles or independent conflicting profile copies.

### Public website routes

Support these website destinations:
- Nexus Community homepage.
- Registration/login.
- User profile and profile editor.
- Bot waiting list (`.addbot`).
- Support (`.support`).
- Community page (`.community`).
- Feedback (`.feedback`).
- Issue/report form (`.report`).

If the live site's source is absent from the repository, inspect the live Worker/Pages resources using available authenticated tools. If unavailable, create a repo-owned website project and document the deployment path. Never claim it has replaced the live website unless it has actually been deployed and verified.

### Profile migration

Move profile editing to the website:
- `.setname`
- `.setdob`
- `.bio` and `.setbio` alias
- `.setpic`
- `.removepic`

Keep `.reg` active in WhatsApp. It starts/resumes registration and directs the user to the website to complete it.

Keep `.edit` active. It must return only the current caller's own website profile-editing URL. It must not show profile data, editing instructions or a generic homepage. The link must not expose passwords, session tokens or unrestricted credentials.

Keep `.profile` as a read-only WhatsApp command.

The existing registration process requires name, date of birth, bio and profile picture. Preserve the existing minimum-age rule, age-verification/lockout policy and the four completion flags unless the owner explicitly changes them. The website must synchronize the canonical MongoDB fields and registration state correctly. Existing active users must not be forced to register again.

Reconcile website fields (`display_name`, ISO date strings, avatar data) with MongoDB fields (`name`, `dob`, `profile.picUrl`, `profile.picPublicId`, `registration`). Do not store large base64 images in MongoDB. Use existing Cloudinary integration for dynamic profile-picture uploads where appropriate; replace assets safely and do not orphan/delete current user images accidentally.

Do not disable WhatsApp profile-edit handlers until the corresponding website workflow, account linking, synchronization and local integration tests are complete. Once parity is verified, remove public dispatch for the profile-edit commands while preserving their underlying data models and necessary internal services.

`.setage` must no longer be a public profile-editing command. Preserve necessary controlled owner correction functionality through admin operations if appropriate.

## 9. Website redirect commands

- `.addbot` sends the configured website bot waiting-list URL. The form collects the applicant's WhatsApp group invite link and explains that bots are intended for groups mainly focused on anime, manga, otaku culture or closely related content. Submission is a waiting-list request, not automatic bot allocation. Do not invent approval rules or allocation guarantees.
- `.support` sends the configured support website URL.
- `.community` sends the configured community website URL.
- `.feedback` redirects to the website feedback page instead of collecting feedback in WhatsApp.
- `.report` is a distinct real command that redirects to the website issue/report page.

Use configurable URL settings. Do not hardcode an unconfirmed domain.

## 10. Owner admin dashboard — Anivora authentication pattern

Move these owner-only commands to the website admin dashboard:
- `.stats`
- `.users`
- `.deluser`

The dashboard must reproduce the security pattern used in the public Anivora source repository: `https://github.com/brandon-300/Anivora`.

Reference files:
- `support-site/lib/admin-worker.mjs`
- `support-site/lib/admin-sessions.mjs`
- `support-site/lib/admin-signin-script.mjs`
- `backend/src/adminIdentity.mjs`
- `backend/config/admin-owner.mjs`

Reproduce the security properties, not Anivora's owner email, client IDs, credentials, secrets or branding.

Required properties:
- Google Sign-In.
- Server-side ID-token signature and claim validation.
- Explicit server-side owner email allowlist.
- Nonce verification.
- Secure, HttpOnly, SameSite=Strict session cookies.
- Server-side session records storing hashed token identifiers, not raw credentials.
- Session revocation and explicit logout.
- Ten-minute inactivity timeout and one-hour maximum lifetime unless the owner later changes policy.
- Origin/CSRF protections on state-changing routes.
- Backend authorization on every privileged endpoint.
- No public admin registration.

Dashboard features:
- `.stats`: real community statistics, preserving the useful existing metrics and not fabricating data.
- `.users`: searchable/paginated user list and relevant live bot/group information. The existing command can use live WhatsApp group membership; MongoDB alone is insufficient. Use a safe runtime/API integration and never fabricate presence when a bot is offline.
- `.deluser`: target-specific confirmation, impact summary, backend owner authorization and audit record. Preserve existing deletion semantics; do not cascade-delete cards or website accounts without a separate approved policy.

Preserve scheduled daily statistics delivery if it is a separate feature from the interactive `.stats` command.

## 11. Command audit and feature policy

Audit every command handler in `src/commands/` and nested folders, dynamic loading, aliases, `src/index.ts` dispatcher, permissions, menu references, tests and documentation.

Classify every command as:
1. Fully implemented.
2. Partially implemented or mismatched.
3. Not implemented.
4. Disabled by owner (source preserved, inactive).
5. Permanently removed by owner.
6. Awaiting owner specification (do not guess behaviour).

List implemented commands not shown in the uploaded target menu and preserve them unless explicitly disabled or permanently removed.

### Disable and isolate; preserve source

- `.voice` and its dedicated active voice workflow.
- Sticker functionality: `.sticker`/`.s`, `.take`, `.stickerimport`, `.stickeranalyze`, AI-selected sticker replies, sticker delivery, sticker-catalogue loading/import/analysis and sticker runtime initialization.

Do not initialize disabled sticker modules or consume AI/Cloudinary resources for disabled functionality.

Keep `.tts`, `.toimg`, `.tovid`, `.tomp3`, `.tovn`, ordinary media conversion and unrelated emoji reactions unless a proven shared dependency requires a documented adjustment. Do not silently expand the owner's disablement scope.

### Permanently remove

- `.persona` as a user-facing command.
- `.addcard`
- `.bulkadd`
- `.delcard`
- `.editcard`
- `.reloadcards`
- `.cardstats`
- `.backfillimages`
- `.upgradeimages`
- `.mergecards`
- `.stealimage`
- `.autoexpand`
- `.diagcard`
- `.repairlinks`
- `.purgeorphans`

Removing these commands must not remove normal card catalogue, card display, ownership, collections, claims, auctions, trading or marketplace functionality. Removing `.persona` does not remove internal character configuration or persona loading used by each bot's fixed identity.

### Already removed; do not reintroduce

- `.cg`
- `.perplexity`
- Pokémon commands, including `.pmenu` and Pokémon command functionality.

### Unknown commands

A command name is not a specification. Do not infer the intended behaviour of missing commands. Do not add placeholder commands or guessed mechanics. Keep unknown commands out of the active menu and document them as awaiting owner specification.

Examples identified in the screenshot audit include `.heist`, `.rob`, `.shame`, `.myshame`, `.bj`, `.rr`, `.darkjoke`, `.shootmeme`, `.coolmeme`, `.sadmeme`, `.triggered`, `.couplepp`, `.shazam`, `.ocr`, `.tldr`, `.carbon`, `.astk`, `.gelbooru`, `.petshop` and `.petbuy`. Re-audit spelling and source. The agent must not guess behaviour for any of these or other undefined commands.

## 12. Menu artwork and bot identity

The menu image must be independent of the WhatsApp Business profile picture.

- Every bot has its own `menuImageUrl` and its own WhatsApp profile-picture configuration/reference.
- The menu generator uses only the configured menu image.
- Never fall back to the WhatsApp profile picture if menu art is missing.
- If menu artwork is missing or cannot be loaded, send a text-only menu.
- Per-bot names, prefix, theme, menu content, welcome messages and character-specific presentation must resolve from that bot's profile.

## 13. Separate GitHub static asset repository

The owner wants a separate public GitHub asset repository following the pattern used by `https://github.com/brandon-300/Anivora-Assets`.

Suggested name: `Nexus-Community-Assets`. Do not invent its URL or assume it already exists. If it exists and authenticated access is available, inspect it. Otherwise prepare the application integration, versioned manifest and publication instructions without overwriting unrelated repositories.

Use the asset repository for static card artwork, character artwork, menu images, logos and banners. Use stable card/asset IDs, compressed WebP where appropriate, manifest versioning, URL validation, sensible fallbacks and immutable/versioned asset URLs where practical.

MongoDB stores image URLs and metadata, not binary image contents. Changing artwork must not change card IDs or ownership.

Cloudinary is still appropriate for dynamic user profile pictures, generated uploads or image transformations where needed. It is not required for every static card image. Inspect Cloudinary quota/asset use when authenticated access exists. Never delete existing files to free quota as a side effect.

Public availability does not grant redistribution rights. Document artwork licensing/permission expectations.

## 14. Remove Chromium/Puppeteer card rendering

Permanently remove the card-image rendering functionality that uses Chromium/Puppeteer.

- Inspect `src/utils/cardRenderer.ts`, all imports/call sites, card models/cache fields, scripts, tests and package references.
- Remove the decorative rendered-PNG card pipeline and card-specific cache reads/writes.
- Keep normal card display working with original catalogue artwork and card metadata, with suitable existing fallbacks.
- Do not delete old Cloudinary images or old MongoDB fields such as rendered cache metadata. Ignore legacy fields in the new active flow until a separately approved cleanup.
- Trace all Puppeteer/Chromium usage. Remove dependencies and executable-path configuration if they are only required by the card renderer. If another retained feature uses a browser, preserve that feature and document the remaining dependency accurately.
- The production card workflow must not launch Chromium or Puppeteer.

## 15. Tests, documentation and delivery

Run the existing typecheck, build, tests and CI, adding tests for:
- Command registration, aliases, menu parity and feature disablement/removal.
- `.reg`, `.edit`, profile linking and profile synchronization.
- Owner-only direct-message guard for every bot.
- Independent WhatsApp sessions, sockets and reconnection isolation.
- Shared wallets/cards/guilds across bots.
- AI history isolation by `botId`.
- Scheduler single ownership/locking.
- Website owner authentication and admin authorization.
- `.addbot`, `.support`, `.community`, `.feedback` and `.report` URL behaviour.
- Menu image separation and text-only fallback.
- Static asset manifest validation and missing-image fallback.
- Card display without Chromium/Puppeteer.
- Migration dry-run/idempotency/backward compatibility with legacy users.

Do not weaken or delete existing tests just to pass a build.

Maintain appropriate documentation, including:
- `README.md`
- `docs/architecture.md`
- `docs/bot-registry.md`
- `docs/commands-audit.md`
- `docs/website-integration.md`
- `docs/admin-dashboard.md`
- `docs/deployment.md`
- `docs/static-assets.md`
- `docs/card-rendering-removal.md`
- `docs/data-migrations.md`
- `docs/decisions.md`

At completion report:
- Baseline commit and commits made.
- Actual GitHub/Cloudflare/MongoDB/Cloudinary tool access used.
- Resources inspected and any modifications made to them.
- Files added, modified and removed.
- Command counts by status and commands outside the target menu that were preserved.
- Disabled features and their isolation boundaries.
- Permanently removed commands.
- Chromium/Puppeteer call sites removed and any unrelated remaining browser dependency.
- Website routes, API contracts and admin authentication changes.
- New configuration variable names only; never secret values.
- Database migrations, dry-run counts, backups and recovery procedures.
- Exact typecheck/build/test/CI outcomes.
- What remains unverified and all manual owner actions.

These rules apply to every future agent working on the repository.
