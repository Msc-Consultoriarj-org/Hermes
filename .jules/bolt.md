## 2024-07-25 - Refactor Inline Styles to CSS Modules

**Learning:** Refactoring inline styles to CSS Modules in React components is a low-risk, high-impact performance optimization. It prevents the creation of new style objects on every render, reducing JavaScript execution time and garbage collection pressure. This is a simple and effective way to improve the rendering performance of a component.

**Action:** When profiling React components, always check for the use of inline styles, especially in components that re-render frequently. Prioritize refactoring them to CSS Modules or a similar CSS-in-JS solution that avoids runtime style creation.
