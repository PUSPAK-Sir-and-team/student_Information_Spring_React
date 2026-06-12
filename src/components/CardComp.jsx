import { useState } from "react";
import {
  HiAcademicCap,
  HiCheck,
  HiOutlineRefresh,
  HiPhotograph,
  HiUserAdd,
  HiUserGroup,
} from "react-icons/hi";
import { createPerson } from "../lib/schoolApi";
import { DUMMY_AVATAR_URL } from "../data/mockSchoolPeople";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const emptyForm = {
  name: "",
  email: "",
  imageUrl: "",
  phone: "",
  detail: "",
};

export function PersonForm() {
  const [activeType, setActiveType] = useState("students");
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("saving");

    try {
      const createdPerson = await createPerson(activeType, formData);
      console.log("Created:", createdPerson);
      setFormData(emptyForm);
      setStatus("saved");
    } catch (error) {
      console.error("Error creating:", error);
      setStatus("error");
    }
  };

  const roleLabel = activeType === "students" ? "student" : "teacher";
  const detailLabel = activeType === "students" ? "Class / grade" : "Subject";
  const detailPlaceholder =
    activeType === "students" ? "Grade 10 - Science" : "Mathematics";
  const hasPreview = formData.name || formData.email || formData.imageUrl;

  return (
    <section className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal-700">
            School profile
          </p>
          <h2 className="mt-2 text-3xl font-black text-zinc-950 dark:text-white sm:text-4xl">
            Add a {roleLabel}
          </h2>
        </div>

        {status === "saved" && (
          <div className="inline-flex items-center gap-2 rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-bold text-teal-800 dark:border-teal-900 dark:bg-teal-950/40 dark:text-teal-100">
            <HiCheck className="h-5 w-5" />
            Saved to the active data source
          </div>
        )}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <form
          className="rounded-md border border-zinc-200 bg-white p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-950"
          onSubmit={handleSubmit}
        >
          <div className="mb-5 grid grid-cols-2 gap-2 rounded-md bg-zinc-100 p-1 dark:bg-zinc-900">
            {[
              { type: "students", label: "Student", icon: HiUserGroup },
              { type: "teachers", label: "Teacher", icon: HiAcademicCap },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => {
                    setActiveType(item.type);
                    setStatus("idle");
                  }}
                  className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-bold transition ${
                    activeType === item.type
                      ? "bg-white text-zinc-950 shadow-sm dark:bg-zinc-700 dark:text-white"
                      : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                type="text"
                placeholder={
                  activeType === "students" ? "Aarav Sharma" : "Meera Nair"
                }
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder={
                  activeType === "students"
                    ? "student@school.edu"
                    : "teacher@school.edu"
                }
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="imageUrl">Profile image URL</Label>
              <div className="relative">
                <HiPhotograph className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder={DUMMY_AVATAR_URL}
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="9876543210"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="detail">{detailLabel}</Label>
              <Input
                id="detail"
                type="text"
                placeholder={detailPlaceholder}
                required
                value={formData.detail}
                onChange={handleChange}
              />
            </div>
          </div>

          {status === "error" && (
            <p className="mt-4 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">
              Could not create the {roleLabel}. Please check the data source and
              try again.
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button type="submit" disabled={status === "saving"}>
              <HiUserAdd className="h-5 w-5" />
              {status === "saving" ? "Saving..." : `Create ${roleLabel}`}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setFormData(emptyForm);
                setStatus("idle");
              }}
            >
              <HiOutlineRefresh className="h-5 w-5" />
              Reset
            </Button>
          </div>
        </form>

        <aside className="rounded-md border border-zinc-200 bg-zinc-950 p-5 text-white shadow-soft dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-300">
            Preview
          </p>
          <div className="mt-6 flex items-center gap-4">
            <img
              src={DUMMY_AVATAR_URL || formData.imageUrl}
              alt=""
              className="h-20 w-20 rounded-md object-cover ring-4 ring-white/10"
            />
            <div className="min-w-0">
              <h3 className="truncate text-2xl font-black">
                {formData.name ||
                  `${roleLabel[0].toUpperCase()}${roleLabel.slice(1)} name`}
              </h3>
              <p className="mt-1 truncate text-sm text-zinc-300 dark:text-zinc-300">
                {formData.email || "email@school.edu"}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3">
            <div className="rounded-md bg-white/10 p-3 dark:bg-white/10">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-400 dark:text-zinc-300">
                Phone
              </p>
              <p className="mt-1 font-semibold">
                {formData.phone || "Not added yet"}
              </p>
            </div>
            <div className="rounded-md bg-white/10 p-3 dark:bg-white/10">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-400 dark:text-zinc-300">
                {detailLabel}
              </p>
              <p className="mt-1 font-semibold">
                {formData.detail || "Not added yet"}
              </p>
            </div>
            <div className="rounded-md bg-white/10 p-3 dark:bg-white/10">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-400 dark:text-zinc-300">
                Role
              </p>
              <p className="mt-1 font-semibold capitalize">
                {hasPreview ? roleLabel : "Waiting for details"}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
