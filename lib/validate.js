// Shared by client form and server actions.
export const CATEGORIES = ["Idea", "Bug", "Praise", "Other"];

export function validate({ name, message, rating, category }) {
  const errors = {};
  const n = String(name ?? "").trim();
  const m = String(message ?? "").trim();
  const r = Number(rating);
  if (n.length < 2 || n.length > 50) errors.name = "Name must be 2-50 characters.";
  if (m.length < 5 || m.length > 500) errors.message = "Message must be 5-500 characters.";
  if (!Number.isInteger(r) || r < 1 || r > 5) errors.rating = "Rating must be 1-5.";
  if (!CATEGORIES.includes(category)) errors.category = "Pick a valid category.";
  return {
    errors,
    clean: { name: n, message: m, rating: r, category },
    valid: Object.keys(errors).length === 0,
  };
}
