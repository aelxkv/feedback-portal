"use server";
import { revalidatePath } from "next/cache";
import { validate } from "@/lib/validate";
import { addFeedback, updateFeedbackById, deleteFeedbackById } from "@/lib/store";

const read = (fd) => ({
  name: fd.get("name"),
  message: fd.get("message"),
  rating: fd.get("rating"),
  category: fd.get("category"),
});

export async function createFeedback(_prev, formData) {
  const values = read(formData);
  const { errors, clean, valid } = validate(values);
  if (!valid) return { ok: false, errors, values };
  addFeedback(clean);
  revalidatePath("/");
  return { ok: true, errors: {}, values: { name: "", message: "", rating: "5", category: "Idea" } };
}

export async function updateFeedback(id, _prev, formData) {
  const values = read(formData);
  const { errors, clean, valid } = validate(values);
  if (!valid) return { ok: false, errors, values };
  if (!updateFeedbackById(id, clean))
    return { ok: false, errors: { form: "Entry no longer exists." }, values };
  revalidatePath("/");
  return { ok: true, errors: {}, values };
}

export async function deleteFeedback(id) {
  deleteFeedbackById(id);
  revalidatePath("/");
}
