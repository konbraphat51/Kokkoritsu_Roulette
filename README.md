# Kokkoritsu Roulette

[日本語版 README](./README.ja.md)

A roulette web app that picks one Japanese national or public university (国公立大学) at random.
Besides the plain uniform draw, it offers a **deviation-weighted mode** in which universities with a
higher entrance-exam deviation value (偏差値) are more likely to be drawn.

- Built with Vue 3 + TypeScript + Vite
- UI ships in Japanese by default, with a full English locale
- Deployable as a static site on GitHub Pages

## Features

| Feature | Description |
| --- | --- |
| Uniform mode | Every candidate has exactly the same probability |
| Deviation-weighted mode | Probability grows exponentially with the deviation value |
| Weighting strength slider | `0` reproduces the uniform draw, `10` is the strongest bias |
| Filters | Establishment type (national / public), region, deviation value range |
| Probability table | Shows the exact probability of every candidate under the current settings |
| Draw history | Keeps the last 10 results |
| Localization | Japanese (default) and English, remembered in `localStorage` |

## Getting started

```bash
pnpm install
pnpm dev        # start the dev server
pnpm test       # run unit tests
pnpm lint       # run ESLint
pnpm build      # type-check and build into dist/
pnpm preview    # preview the production build
```

Node.js 22 or newer and pnpm 10 are expected.

## How the weighting works

For a candidate pool, the deviation value `d` of each university is normalised against the pool:

```
normalised = (d - minDeviation) / (maxDeviation - minDeviation)
weight     = exp(strength * normalised)
probability = weight / sum(weights)
```

Properties that follow from this formula:

- The weight is strictly increasing in the deviation value, so a higher 偏差値 is never penalised.
- `strength = 0` makes every weight `1`, which is exactly the uniform draw. Both modes therefore
  share one code path.
- Normalising against the *current* pool keeps the bias meaningful after filtering: the contrast
  does not collapse when, say, only low-deviation universities remain.
- If every candidate has the same deviation value, all weights fall back to `1`.

Drawing itself is inverse-transform sampling over the cumulative weights
(`src/domain/picker.ts`). The spin animation only shuffles which name is displayed; the settled
result is drawn once from the real distribution, so the visuals cannot influence the odds.

## Project layout

```
src/
  components/   Granular presentational components (one concern each)
  composables/  Reactive state: spin driver, filter state, localized labels
  data/         University dataset and prefecture master
  domain/       Pure logic: filtering, weighting, picking (unit tested)
  locales/      Japanese and English message catalogues
  types/        Shared domain types
  utils/        Formatting helpers
```

The `domain/` layer is free of Vue imports so that it can be unit tested in isolation, and the
components depend on it only through composables.

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml), which
lints, tests, builds, and publishes `dist/` to GitHub Pages.

One-time repository setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The production base path is derived from the repository name in
[`vite.config.ts`](./vite.config.ts). If you fork or rename the repository, update
`repositoryName` there.

## Data disclaimer

The dataset covers national and public universities that run undergraduate entrance examinations;
graduate-only institutions (SOKENDAI, JAIST, NAIST, GRIPS) are excluded because they have no
entrance-exam deviation value to weight by.

Deviation values are **approximate faculty-average reference figures** compiled from publicly
published preparatory-school tables. They are not official statistics, they vary by faculty, subject
and year, and they must not be used for academic guidance. This site exists for entertainment.

To adjust the data, edit the row table in [`src/data/universities.ts`](./src/data/universities.ts);
every row is `[id, Japanese name, English name, type, prefecture code, deviation value]`.
