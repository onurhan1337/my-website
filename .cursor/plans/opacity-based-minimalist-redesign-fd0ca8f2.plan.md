<!-- fd0ca8f2-0f20-494f-b287-470074432751 d02dfe63-7962-4293-9e6c-34ae47dde709 -->
# Opacity-based Minimalist Design Refactor

## Design System Changes

### 1. Update CSS Variables (globals.css)

Replace color-based text hierarchy with opacity-based approach:

- Remove `--muted-foreground`, `--secondary-foreground`, `--accent-foreground` color definitions
- Keep only base `--foreground` and `--background` colors
- Update border colors to use foreground with low opacity (10-15%)
- Apply consistent opacity values: 100% (primary), 70% (secondary), 50% (tertiary), 40% (subtle)

Key sections to update:

```38:78:app/globals.css
:root {
  --background: 240 5% 96%;
  --foreground: 240 10% 3.9%;
  // Simplify color system
}
```



```80:114:app/globals.css
.dark {
  --background: 240 10% 4%;
  --foreground: 0 0% 98%;
  // Simplify dark mode colors
}
```

### 2. Component Updates

**Header (components/header.tsx)**

- Line 43: Change `opacity-60` to `opacity-70` for job title
- Line 55: Remove hover color change, keep opacity transition
- Update non-active nav items to use `opacity-70`

**Blog Card (components/blog-card.tsx)**

- Line 10-11: Use `opacity-70` for summary text
- Line 14: Use `opacity-50` for metadata (date/reading time)
- Remove underline decoration colors, keep simple underline

**Thought Card (components/thought-card.tsx)**

- Lines 22-26: Already uses `opacity-50` for labels - keep consistent

**Social Buttons (components/social.tsx)**

- Line 16: Simplify border to `border-foreground/10`
- Keep hover background with subtle opacity

**Pagination (components/pagination.tsx)**

- Line 58: Replace `text-muted-foreground` with `opacity-70`
- Line 87: Update disabled state to use opacity

**Table of Contents (components/table-of-contents.tsx)**

- Line 32: Replace `text-muted-foreground hover:text-foreground` with opacity transitions
- Line 73: Same opacity approach for links

**Work Page (app/work/page.tsx)**

- Lines 22-23: Update time elements to use `opacity-70`

**About Page (app/(about)/page.tsx)**

- Update text colors to use base foreground with opacity

### 3. Layout Improvements for Minimalism

**Spacing & Breathing Room**

- Increase whitespace in Container component padding
- Reduce visual clutter in blog cards by removing decorative underlines
- Simplify separator lines to use `border-foreground/10`

**Typography Hierarchy**

- Ensure consistent font weights: regular (400), medium (500), semibold (600)
- Remove unnecessary font weight variations
- Use opacity for hierarchy instead of weight changes where appropriate

**Visual Elements**

- Simplify borders throughout: `border-foreground/10` for light borders
- Remove decorative elements like wavy underlines (line 26 in about page)
- Keep selection color but reduce intensity

**Component Simplification**

- Blog cards: Remove decoration color from underlines
- Social buttons: Simplify hover states
- Pagination: Minimal button styling with opacity
- Remove unnecessary shadows from buttons

## Implementation Order

1. Update global CSS variables and base styles
2. Update utility components (container, buttons)
3. Update page components (header, cards, pagination)
4. Update page layouts (about, work, blog, thoughts)
5. Test both light and dark modes
6. Fine-tune opacity values if needed

## Files to Modify

- `app/globals.css` - Core design system
- `components/header.tsx` - Navigation
- `components/blog-card.tsx` - Blog listing
- `components/thought-card.tsx` - Thoughts display
- `components/social.tsx` - Social links
- `components/pagination.tsx` - Blog pagination
- `components/thoughts-pagination.tsx` - Thoughts pagination
- `components/table-of-contents.tsx` - TOC component
- `components/ui/button.tsx` - Button variants
- `components/shared/container.tsx` - Layout container
- `app/(about)/page.tsx` - About page
- `app/work/page.tsx` - Work page

The result will be a cleaner, more minimalistic design that uses opacity to create visual hierarchy while maintaining excellent readability and a cohesive aesthetic.