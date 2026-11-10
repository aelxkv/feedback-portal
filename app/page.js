import { listFeedback } from "@/lib/store";
import FeedbackForm from "./FeedbackForm";
import FeedbackItem from "./FeedbackItem";
import { createFeedback } from "./actions";

export const dynamic = "force-dynamic";

export default function Page() {
  const items = listFeedback();
  return (
    <main>
      <h1>Feedback Portal</h1>
      <section className="card">
        <h2>Leave feedback</h2>
        <FeedbackForm
          action={createFeedback}
          initial={{ name: "", message: "", rating: "5", category: "Idea" }}
          submitLabel="Submit"
        />
      </section>
      <h2>All feedback ({items.length})</h2>
      <ul className="list">
        {items.map((i) => <FeedbackItem key={i.id} item={i} />)}
        {items.length === 0 && <p>No feedback yet.</p>}
      </ul>
    </main>
  );
}
