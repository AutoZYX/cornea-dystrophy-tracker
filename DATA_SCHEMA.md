# Data Schema

The public knowledge base is defined in `lib/data.ts` and `lib/sources.ts`.

## Public Record Fields

- `id`: stable record identifier, e.g. `CD-TX-PK`
- `category`: overview, classification, gene, condition, diagnosis, treatment, care, institution, clinician, research, glossary
- `title`, `title_en`
- `summary`
- `key_points`
- `clinical_use`
- `limits`
- `tags`
- `source_ids`
- `evidence_level`: A, B, C, D
- `source_type`: official health, hospital official, peer reviewed, gene database, clinical trial, official news, secondary
- `source_status`: verified, blocked, paywalled, unverified
- `verified_at`
- `medical_caveat`: educational, doctor_confirm, urgent, research_only

## Evidence Levels

- A: official health source, hospital official patient material, GeneReviews, or peer-reviewed classification
- B: official hospital/news source or clinician-edited professional page
- C: company press release or trusted secondary source
- D: needs review

## Private Data

Private records are not part of the public database. They are stored in browser `localStorage` under `cornea-dystrophy-log-v1` and can be exported by the user.
