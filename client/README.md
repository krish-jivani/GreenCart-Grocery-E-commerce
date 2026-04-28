# GreenCart UI

A responsive grocery e-commerce frontend built with React, Vite, Tailwind CSS, and React Router. The app includes a customer shopping experience and a seller dashboard, powered by context state and mock data.

## Description

GreenCart is a frontend-focused project that demonstrates an end-to-end e-commerce flow:

- Browse categories and products
- Search and view product details
- Manage cart and checkout
- Track orders
- Manage products and orders from a seller panel

This phase is intentionally backend-free and uses local dummy data for rapid UI and UX development.

## Key Features

- Customer storefront with banner, categories, best sellers, and product listing
- Debounced product search with responsive layouts
- Product details page with quantity/cart actions
- Cart flow with quantity updates, address selection, and payment mode
- My Orders page with order status indicators
- Protected routes for cart, address, and orders
- Seller dashboard with:
- Add product
- Product list and delete action
- Order list and status updates
- Admin/seller navigation improvements:
- Logging in with `admin@gmail.com` redirects directly to seller dashboard
- Seller users can switch between website and dashboard from both sides

## Tech Stack

- React 19
- Vite 7
- React Router DOM 7
- Tailwind CSS 4
- React Hot Toast

## Project Structure

```text
src/
  assets/          Static assets and dummy data
  component/       Reusable UI components
  context/         App-wide state and actions
  hooks/           Custom hooks
  pages/           Customer-facing pages
  pages/seller/    Seller dashboard pages and layout
```

## Run Locally

1. Install dependencies

```bash
npm install
```

2. Start dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview production build

```bash
npm run preview
```

## Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` creates production build in `dist/`
- `npm run preview` previews the production build
- `npm run lint` runs ESLint checks

## Routes

Customer routes:

- `/`
- `/products`
- `/products/:category`
- `/products/:category/:id`
- `/contact`

Protected customer routes:

- `/cart`
- `/add-address`
- `/my-orders`

Seller routes:

- `/seller`
- `/seller/dashboard`
- `/seller/add-product`
- `/seller/product-list`
- `/seller/orders`

## Mock Authentication Notes

- No backend auth is connected yet
- User session is handled in frontend state
- Seller access is enabled for emails containing `seller`
- `admin@gmail.com` is treated as admin and redirected to seller dashboard after login

## Data Layer

- Product, address, and initial order data come from local assets
- Runtime changes are stored in React context state
- State resets on browser refresh in current phase


## Future Improvements

- Integrate backend APIs and real authentication
- Persist cart/orders/addresses to database
- Add real payment gateway integration
- Add role-based auth from backend
- Improve accessibility and test coverage
