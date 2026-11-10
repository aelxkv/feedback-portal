"use client";
import { useState, useTransition, useCallback } from "react";
import FeedbackForm from "./FeedbackForm";
import { updateFeedback, deleteFeedback } from "./actions";

export default function FeedbackItem({ item }) {
  const [editing, setEditing] = useState(false);
  const [pending, start] = useTransition();
  const done = useCallback(() => setEditing(false), []);

  if (editing) {
    return (
      <li className="card">
        <FeedbackForm
          action={updateFeedback.bind(null, item.id)}
          initial={item}
          submitLabel="Save"
          onDone={done}
        />
        <button className="ghost" onClick={() => setEditing(false)}>Cancel</button>
      </li>
    );
  }

  return (
    <li className="card">
      <div className="meta">
        <strong>{item.name}</strong>
        <span className="tag">{item.category}</span>
        <span>{"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}</span>
      </div>
      <p>{item.message}</p>
      <div className="row">
        <button className="ghost" onClick={() => setEditing(true)}>Edit</button>
        <button
          className="danger"
          disabled={pending}
          onClick={() => {
            if (confirm("Delete this feedback?")) start(() => deleteFeedback(item.id));
          }}
        >
          {pending ? "Deleting…" : "Delete"}
        </button>
      </div>
    </li>
  );
}
