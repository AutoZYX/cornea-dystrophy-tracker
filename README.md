# Cornea Dystrophy Log

公开角膜营养不良知识库、医院医生追踪、研究进展、术后护理清单和本地私密记录工具。

生产域名规划：`https://cornea.autozyx.com`

## Core Idea

This project separates two layers:

- Public knowledge base: source-linked, evidence-labeled, searchable medical information.
- Private local log: family history, next actions, transplant follow-up and symptoms stored in the browser by default.

The public site is educational. It is not a diagnosis tool, prescription tool, or surgical decision tool.

## Features

- Structured records for corneal dystrophy classification, genes, treatment, care, institutions, and research.
- Evidence fields for each source: source type, evidence level, verification date, and source status.
- Ask Cornea Dystrophy: model-backed Q&A over the public knowledge base with local search fallback.
- Local private record entry: family history, current status, next action, transplant follow-up, medication, IOP, astigmatism, red-flag symptoms.
- Export JSON and visit briefing Markdown.

## Development

```bash
pnpm install
pnpm dev
pnpm build
pnpm validate:data
```

## Medical Boundary

Redness, light sensitivity, visual loss, and pain after corneal transplantation are warning symptoms. Users should contact their ophthalmologist or urgent eye service promptly.

This project never asks users to upload medical records in v1. Personal data is stored locally in the browser unless users export it themselves.
