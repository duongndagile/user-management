# User Management Project

## How to Run the Project
1. **Clone the repository:**
  ```bash
  git clone https://github.com/duongndagile/user-management.git
  cd user-management
  ```

2. **Install dependencies:**
  ```bash
  yarn
  ```
3. **Start the development server:**
  ```bash
  yarn dev
  ```
4. **Open your browser:**
  Visit [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal) to view the app.

## Architectural Decisions & Trade-offs

### 1. **React + Vite + TypeScript**
- Chosen for fast development, type safety, and modern tooling.
- Vite provides instant HMR and a great DX for React projects.

### 2. **Component Structure**
- Components are split by responsibility: `UserTable` for desktop, `UserCard` for mobile, and shared logic in hooks.
- Pages are separated for PC and Mobile to optimize UX for each device.

### 3. **Data Fetching & State Management**
- Custom hooks (`useUsers`, `useInfiniteScroll`) manage API calls, pagination, and infinite scroll.
- Infinite scroll on mobile uses IntersectionObserver for performance and native feel.
- Retry logic ensures the UI is resilient to network errors, and already loaded data is preserved.

### 4. **API Consistency**
- Always uses a fixed `seed` for the Random User API to ensure consistent data across paginated/infinite requests.
- Handles edge cases: disables further loading when no more data or on error, and only retries on user action.

### 5. **UI/UX**
- TailwindCSS for rapid, responsive, and consistent styling.
- Prevents horizontal scroll on mobile for a clean experience.
- Loading and error states are clearly communicated to the user.

### Trade-offs
- No global state management (like Redux) to keep things simple; all state is local or via hooks.
- No SSR/SSG: This is a purely client-side SPA for demo and internal use.
- Error handling is basic (retry per page), but can be extended for more robust needs.

---

Feel free to reach out if you have questions or want to extend the project!
