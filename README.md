# Lea Ademilola — personal site

One page, static HTML/CSS/JS. No build step, no frameworks, no server.

## Files

- `index.html` — the entire page (all text lives here)
- `styles.css` — all styling
- `script.js` — small extras: mobile menu, larger-text toggle, copy-email button
- `lea-headshot.jpg` — your headshot (hero + link previews)
- `lea-about.jpg` — the auditorium photo (About Me section)
- `favicon.svg` — the LA monogram that shows in the browser tab
- `.nojekyll` — tells GitHub Pages to serve the files exactly as-is
- `.gitignore` — keeps macOS clutter (`.DS_Store`) out of the repo

Everything works if `script.js` never loads. Nothing depends on it.

## Preview it now

Double-click `index.html`. It opens in your browser and works straight off your
hard drive. The copy-email button stays hidden on `file://` (browsers only allow
clipboard access over https) — it appears once the site is live.

## Publish to GitHub Pages

1. Create a new **public** repository on GitHub.
   - Name it `<your-username>.github.io` to get the address
     `https://<your-username>.github.io`
   - Any other name gives you `https://<your-username>.github.io/<repo-name>/`
2. Upload every file in this folder into the repo. Drag and drop in the GitHub
   web uploader is fine — no command line needed. Make sure `.nojekyll` comes
   along (hidden files: press <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>.</kbd> in
   Finder to see it).
3. In the repo, go to **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**, branch `main`,
   folder `/ (root)`. Click **Save**.
5. Wait about a minute and reload that settings page. The live URL appears at
   the top.

## After it goes live

Two small things worth doing once you know your address:

1. In `index.html`, find the `og:image` line near the top and change
   `lea-headshot.jpg` to the full address, for example
   `https://yourname.github.io/lea-headshot.jpg`. Without the full address,
   LinkedIn will not show your photo when someone shares the link.
2. Text yourself the link and open it on a phone. Check that the email buttons
   open your mail app with the subject line filled in.

## Things still marked for you

Search `index.html` for `ADD:` (three places, all in the Background cards).
They are optional details only you can supply: graduation year, certification
years, and dates for each role. They are HTML comments, so visitors never see
them.

## Custom domain (optional, later)

**Settings → Pages → Custom domain** — enter the domain, then add the DNS
records GitHub shows you at your registrar. Leave **Enforce HTTPS** checked.

## Editing the text

Open `index.html` in any text editor. Section comments mark each block:

```
<!-- ============ ABOUT ============ -->
```

The email address appears in four places — search for `coachlea.ai@gmail.com`
if it ever changes.

## Your photos

Two image files live in this folder and are already wired in:

| File | Where it appears |
|---|---|
| `lea-headshot.jpg` | Hero (top of the page), and the preview image when someone shares the link |
| `lea-about.jpg` | About Me section only |

Both were prepared from the originals in your Downloads folder:

- The headshot was cropped square and centered on your face (900×900, 174 KB) so
  it sits correctly in the circular frame.
- The About photo was converted from PNG to JPEG (953×533, 116 KB, down from
  844 KB) so the page stays fast on a phone.

**To swap either one:** replace the file with a new one using the same name, and
refresh. Keep the headshot square and the About photo wide (16:9), or the frames
will crop them oddly. If either file is ever missing, the page quietly falls back
to a drawing instead of showing a broken image.

## The illustrations

Every drawing on the page (the three people in the hero, the portrait, the
little scenes on each card, the envelope) is hand-written SVG inside
`index.html`. No image files, nothing to download, and they stay sharp at any
size. Their colors come from the `ILLUSTRATION PALETTE` block near the top of
`styles.css` — change a color there and it updates everywhere it's used.

Those palette rules use plain hex values rather than the `var(--token)` names
used elsewhere. That's deliberate: some thumbnail generators and in-app
browsers don't resolve CSS variables inside SVG and render the shapes black.
If you change a brand color, update it in both places.

## Brand colors

Defined once at the top of `styles.css`:

| Token | Value | Use |
|---|---|---|
| `--navy` | `#1B2740` | Dark sections, headlines, primary button |
| `--sage` | `#93C08C` | Accents on dark backgrounds only |
| `--sage-deep` | `#3D6B3D` | Sage-toned **text** on light backgrounds |
| `--kraft` | `#E6C79B` | Accents on dark backgrounds only |
| `--kraft-deep` | `#8A6224` | Tan-toned **text** on light backgrounds |
| `--paper` | `#F3F1EA` | Page background |

The light sage and tan don't have enough contrast for text on the pale
background, which is why there are `-deep` versions. If you swap colors, keep
that split or small text becomes hard to read.
