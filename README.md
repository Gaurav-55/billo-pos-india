# Billo POS (67)

Build "Billo" — a multi-tenant point-of-sale / billing web app for small

local businesses in India, starting niche: restaurants and cafés.

MULTI-TENANCY

Every business that signs up gets its own isolated data: menu, bills,

settings. A signed-in user belongs to one business. Use your default

backend/auth integration for this — one database, every table scoped

to a business.

CORE DATA

- Business: name, address (multi-line), phone, FSSAI number, footer

  text, currency symbol, tax settings (on/off, list of components like

  "CGST 2.5%"), bill number config, token number config (these are

  SEPARATE counters — token number must NOT be assumed to equal bill

  number, even though for now they can increment together)

- Menu item: name, price, optional variant/add-on list

- Bill: business, optional customer name, date/time, order type

  (Dine In or Takeaway — NOT a table system, no table numbers/map/

  reservations), cashier name (plain text for now, no login-linked

  cashier yet), bill number, token number, list of line items (name,

  qty, unit price, line amount), discount amount, tax amount, grand

  total, status (saved / printed / print_failed)

MONEY MATH

All amounts must be computed and stored as integer paise (1 rupee =

100 paise), never floating-point rupees, to avoid rounding errors.

Amount = qty × unit price, rounded at the paisa boundary.

CORE SCREENS, IN THIS ORDER

1. Sign up / log in, creates a business on first signup

2. Business settings: edit name, address, phone, FSSAI, footer text,

   tax components, bill/token numbering config

3. Menu management: add/edit/delete items and prices

4. POS billing screen: tap items to add to the current bill, adjust

   qty, toggle Dine In / Takeaway, optional customer name (must work

   fine with no name entered), optional flat discount, live-computed

   subtotal/tax/grand total

5. Receipt preview before saving: styled to look like a real 80mm

   thermal receipt — centered bold business name, address, phone,

   FSSAI, dashed dividers, item table with Item/Qty/Price/Amount

   columns that stay aligned even with long item names (wrap the name,

   never break the columns), Total Qty + Sub Total, discount line if

   any, tax lines if any, bold Grand Total, centered footer. Save the

   bill to the database BEFORE attempting to print — a print failure

   must never lose or duplicate a bill.

6. Print via the browser print dialog styled for an 80mm receipt

   width (real ESC/POS thermal printer integration is out of scope

   for this browser app — just make the on-screen/print-CSS version

   accurate)

7. Orders history: list past bills, with a Reprint button that reuses

   the saved bill data (does not create a new bill)

EXPLICITLY DO NOT BUILD

- Table management (no table numbers, table map, occupancy,

  reservations) — order type is only Dine In or Takeaway

- Employee login/permissions system — cashier is just a text field

  for now

Ask me before generating the whole app at once — start with signup +

business settings and confirm it works before moving to the next

screen.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://billo-pos-india.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/83a1d7ba-07ef-49a1-b123-6b4960b464cd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
