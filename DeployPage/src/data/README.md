# Works Database Management (`works.json`)

This file is your local content database for the **Works** page. Modifying it will **only affect the Works page** and has zero impact on the Homepage.

---

## File Location
- **Data File**: [`src/data/works.json`](./works.json)
- **Images Directory**: `public/images/works/`

---

## How to Add a Project

1. Drop your project image into the `public/images/works/` folder (recommended size: `345x230` or any `3:2` / `1.5` aspect ratio image).
2. Open [`src/data/works.json`](./works.json) and add a new entry to the array:

```json
{
  "id": "my-new-project",
  "title": "BRAND NAME®",
  "location": "New York",
  "category": "Websites",
  "image": "/images/works/my-image.png",
  "badge": "AWARDED",
  "badgeBg": "#a87f2f",
  "subtitle": "Digital Experience",
  "year": "2025",
  "link": "#"
}
```

---

## Field Reference

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique identifier (e.g. `"my-project"`). |
| `title` | `string` | Project name displayed on the card and list view. |
| `location` | `string` | Country or city (e.g. `"LITHUANIA"`, `"Egypt"`, `"Italy"`). |
| `category` | `string` | Category (e.g. `"Websites"`, `"Branding"`, etc.). Filter tabs on the page automatically update with any categories used here! |
| `image` | `string` | Relative path to image inside `public/` (e.g. `"/images/works/my-image.png"`). |
| `badge` | `string \| null` | Pill badge text in the top-right of the card (e.g. `"AWARDED"`, `"IN THE WORKS"`, or `null` for none). |
| `badgeBg` | `string \| null` | Background color for badge (e.g. `"#a87f2f"` for warm gold, `"#171717"` for dark gray, or `null`). |
| `subtitle` | `string \| null` | Secondary description line under the title (e.g. `"Brand Development"`), or `null`. |
| `year` | `string` | Release year shown in the List view (e.g. `"2024"`). |
| `link` | `string` | URL or route link for future case study linking (e.g. `"#"`). |

---

## How to Remove or Reorder Projects
- **To Remove**: Simply delete the `{ ... }` object from `works.json`.
- **To Reorder**: Move the `{ ... }` object up or down in the array. The slider and list will reflect the exact order from top to bottom.
