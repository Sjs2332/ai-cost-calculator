# ⚙️ Text-to-CAD  
### Generate real parametric CAD models from natural language

🎥 **Demo:**  
https://github.com/Sjs2332/Text-to-.step/blob/main/text_to_step_generator_demo.mp4

![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-61dafb)
![Python](https://img.shields.io/badge/Python-3.11-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.125-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## What this is

**Text-to-CAD** converts natural language into **true parametric CAD models** (STEP/STL).  
Not meshes. Not approximations. Real B-Rep solids generated directly in FreeCAD.

Type:  
> “A 100mm x 60mm mounting bracket with 4 M5 holes”  

Get:  
A fully editable, dimensioned CAD part in under a minute.

## Why it exists

Most “text-to-3D” tools generate meshes.  
Engineers need **parametric solids** they can actually modify and manufacture.

Text-to-CAD solves this by:
- Generating native FreeCAD Python (not STL hallucinations)
- Extracting dimensions as constraints
- Retrying automatically on geometry failures

## Core features

**Native B-Rep generation**  
Generates real parametric solids via FreeCAD kernel execution.

**Two-stage LLM pipeline**  
Prompt → structured spec → FreeCAD Python → geometry validation.

**Self-correcting**  
Automatically retries on failed geometry (~80% success on complex parts).

**Parametric control**  
Dimensions become editable constraints without regenerating.

**Iterative design**  
Conversation context allows incremental edits to existing parts.

**Zero-install**  
Runs fully in browser. No CAD software on client.

**Secure execution**  
All code runs in isolated Docker containers with no network access.

## Architecture

Built like a real production system, not a demo.

**Frontend**  
Next.js 16 + React 19 + React Three Fiber for real-time 3D preview.

**Backend**  
FastAPI with Gemini-based two-stage generation pipeline.

**Execution layer**  
FreeCAD Python runs inside Docker:
- no network
- 1 CPU, 512MB RAM
- read-only filesystem
- non-root user

**Security model**  
Ephemeral containers. No persistence. No server-side key storage.

## Quick start

```bash
# Clone
git clone <repo-url>
cd Text-to-.step

# Run
bash start.sh      # macOS / Linux
.\start.ps1       # Windows
```

Open: http://localhost:3000/app  
Paste your Google Gemini API key.

## Tech stack

**Core**  
TypeScript, Node.js, Python 3.11

**Frontend**  
Next.js 16, React 19, Three.js, React Three Fiber

**Backend**  
FastAPI, Google Gemini, FreeCAD

**Infra**  
Docker (isolated execution)

**UI**  
TailwindCSS, Radix UI, Lucide

## License

MIT
