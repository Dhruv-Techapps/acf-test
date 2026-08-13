# acf-test

The test-bed page for Auto Clicker AutoFill, served at **test.getautoclicker.com**.

Two jobs:

1. **Testing** — the target page the extension's e2e suite drives.
2. **Demonstration** — the page used to show how a feature works, including the
   "try it yourself" examples in the docs.

New extension capabilities get a scenario added here to exercise them.

## What's here

A single hand-written `index.html` (~1000 lines) plus assets. No framework, no build step,
no CI.

```
index.html
assets/scripts/   color-modes.js  iframe.js  speed-test.js  xpath-formatter.js
assets/prism/     syntax highlighting
assets/styles/    favicons/       CNAME
```

Scenarios currently on the page:

| Section | Exercises |
| --- | --- |
| Practice form | ordinary inputs — name, email, password, address, select |
| Basic XPath / Advance XPath | selector resolution |
| `Contains()`, `Using OR & AND`, `starts-with(@attribute,value)` | XPath function support |
| Events (Click / Form) | click and form event dispatch |
| Random Number | value randomisation |
| Speed Test | timing and throughput |
| Shadow DOM | piercing shadow roots (`shadow-host`, `shadow-input`) |
| Content Editable | non-input editable targets |
| Embedded Frame | iframe traversal (`test-iframe`, `iframe-input`) |
| Event Recorder | the wizard's action recording |

## Element ids are a public contract

**The e2e suite selects on the ids in this file.** Renaming or removing one breaks tests in
a different repo, with no signal from this one — there is no CI here to catch it.

Rough coupling, by number of e2e spec files referencing each id:

```
last-name       12      inputEmail       6      speed-test    4
inline-script    3      content-editable 2      event-recorder 2
mrp              2      inputPassword    2      shadow-host   1
shadow-input     1      test-iframe      1      iframe-input  1
product-size     1
```

Before changing an id, grep `apps/acf-e2e` in the `auto-clicker-auto-fill` monorepo. Adding
new markup is safe; editing existing ids is not.

The docs also depend on this page — `<ExampleAutomation>` in `acf-docs` ships downloadable
sample automations that target `https://test.getautoclicker.com`.

## Several e2e specs run against the deployed site

`apps/acf-e2e` has specs that hardcode the live URL rather than a local copy:

```ts
const TEST_SITE_URL = 'https://test.getautoclicker.com';
```

(in `basic-form.spec.ts`, `position-finder.spec.ts`, `automation-loop.role.spec.ts`,
`automation-schedule.role.spec.ts`, `automation-monitor.role.spec.ts`.)

So **a change here has to be deployed before those tests exercise it.** Editing the page
locally and running e2e will test the old published page. Other specs use
`VITE_PUBLIC_URL` and can point at a local server instead.

## Adding a scenario

1. Add the markup to `index.html` with a **stable, descriptive id** — that id is what the
   tests will select on.
2. Add the matching spec in the monorepo under `apps/acf-e2e`.
3. Deploy, if the new spec uses the hardcoded live URL.
4. If the scenario is meant to demonstrate a documented feature, reference it from the
   relevant `acf-docs` page.

## Deploy

No workflows in this repo. `CNAME` and `index.html` sit at the repo root, so this is served
by **GitHub Pages from the repository root** — pushing to the default branch publishes.

This makes it the one exception to the "nothing auto-deploys" rule that holds across the
other ACF repos. The exact Pages source is configured in the repo settings on GitHub, not
in the tree, so confirm there if the behaviour ever looks different.
