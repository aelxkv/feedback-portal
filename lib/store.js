// In-memory store. Survives hot reload via globalThis.
// Resets on server restart / serverless cold start. Swap for a DB for real persistence.
const SEED_NAME = "YOUR_UID"; // TODO: replace with your uid

const g = globalThis;
if (!g.__feedback) {
  g.__feedback = [
    {
      id: "seed-1",
      name: SEED_NAME,
      message: "Hello from the Feedback Portal! This is the default sample entry.",
      rating: 5,
      category: "Praise",
      createdAt: Date.now(),
    },
  ];
}

export const listFeedback = () => [...g.__feedback].sort((a, b) => b.createdAt - a.createdAt);

export function addFeedback(data) {
  g.__feedback.push({ id: crypto.randomUUID(), createdAt: Date.now(), ...data });
}

export function updateFeedbackById(id, data) {
  const i = g.__feedback.findIndex((f) => f.id === id);
  if (i === -1) return false;
  g.__feedback[i] = { ...g.__feedback[i], ...data };
  return true;
}

export function deleteFeedbackById(id) {
  const before = g.__feedback.length;
  g.__feedback = g.__feedback.filter((f) => f.id !== id);
  return g.__feedback.length < before;
}
