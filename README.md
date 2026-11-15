# Meditations — Marcus Aurelius

An interactive guide to **Marcus Aurelius' Meditations** (George Long translation, 1862, public domain), plus a daily Stoic practice.

## Features

- **147 passages** across all 12 books, with **92 key passages explained** in plain English
- Book-by-book summaries, section references (e.g. *Med. 4.49*) on new passages
- **16 symbols**: one engraved emblem per book plus four recurring images (River of Time, the Fire, the View from Above, the Dyed Cloth). Images stay hidden until you tap **◈ View symbol** or open the **Symbols** gallery, and load only on demand
- **6 themes**: Simple, Current, Night, MTRX™, Imperial, Olive Grove (saved per device)
- Search across passages *and* explanations, bookmarks, daily reflection with jump-to-context
- **Daily Practice**: 60-day reading cycle (quote, meaning, action, evening journal), progress calendar, and a 14-mood Emergency Toolkit
- Mobile-first: wrapping header, bottom-sheet theme picker and symbol viewer (swipe between symbols), 44px tap targets, safe-area aware

## Files

| File | Purpose |
| --- | --- |
| `index.html`, `app.js` | Reader |
| `data.js` | Original book data |
| `data-extra.js` | Added passages, explanations, symbols, notes |
| `practice.html`, `practice.js`, `practice-data.js` | Daily practice |
| `toolkit-extra.js` | Extra toolkit entry |
| `themes.css`, `theme.js` | Theme layer, symbol viewer and gallery (shared) |
| `img/symbols/` | Symbol images (`*.webp` full, `*-t.webp` thumbnails) |

## Live Site

**[Read the Meditations →](https://kevincecil11.github.io/meditations-marcus-aurelius/)**

## Credits

Text: George Long translation (1862), public domain. A few popular modern paraphrases from the original version are kept; one widely shared line that is not in the Meditations is flagged in the reader.
Symbol illustrations: AI-generated for this project (GPT Image).
Fonts: Inter, Lora, Nunito Sans, Cinzel, Cormorant Garamond (SIL OFL, Google Fonts); Tanker (ITF Free Font License, Fontshare).

---

Designed by **MTRX™** · Built by [Kevin Cecil](https://github.com/Kevincecil11) via MTRX Digital.
