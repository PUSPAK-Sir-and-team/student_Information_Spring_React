import { useEffect, useMemo, useState } from "react";
import {
  HiAcademicCap,
  HiMail,
  HiPencil,
  HiPhone,
  HiSearch,
  HiUserGroup,
} from "react-icons/hi";
import { Loader } from "./Loader";
import { getPeople } from "../lib/schoolApi";
import { DUMMY_AVATAR_URL } from "../data/mockSchoolPeople";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function SchoolBoard() {
  const [people, setPeople] = useState([]);
  const [activeType, setActiveType] = useState("students");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const loadPeople = async () => {
      setLoading(true);
      try {
        const data = await getPeople(activeType);
        setPeople(data);
        setSelectedIds([]);
        console.log("Fetched people:", data);
      } catch (err) {
        console.error("Error fetching people:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, [activeType]);

  const filteredPeople = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return people;
    }

    return people.filter((person) =>
      [person.name, person.email, person.phone, person.detail]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedQuery)),
    );
  }, [people, query]);

  const visibleIds = filteredPeople.map((person) => person.id);
  const hasSelectedAll =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));

  const toggleSelected = (personId) => {
    setSelectedIds((currentIds) =>
      currentIds.includes(personId)
        ? currentIds.filter((id) => id !== personId)
        : [...currentIds, personId],
    );
  };

  const toggleSelectedAll = () => {
    setSelectedIds((currentIds) => {
      if (hasSelectedAll) {
        return currentIds.filter((id) => !visibleIds.includes(id));
      }

      return Array.from(new Set([...currentIds, ...visibleIds]));
    });
  };

  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-6 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal-700">
            School board
          </p>
          <h2 className="mt-2 text-3xl font-black text-zinc-950 dark:text-white sm:text-4xl">
            Students and teachers
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-zinc-200 bg-white px-4 py-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Current role
            </p>
            <p className="mt-1 text-2xl font-black capitalize text-zinc-950 dark:text-white">
              {activeType}
            </p>
          </div>
          <div className="rounded-md border border-teal-200 bg-teal-50 px-4 py-3 shadow-sm dark:border-teal-900 dark:bg-teal-950/40">
            <p className="text-xs font-bold uppercase tracking-wide text-teal-700">
              Selected
            </p>
            <p className="mt-1 text-2xl font-black text-teal-950 dark:text-teal-100">
              {selectedIds.length}
            </p>
          </div>
          <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 shadow-sm dark:border-amber-900 dark:bg-amber-950/40">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
              View
            </p>
            <p className="mt-1 text-2xl font-black text-amber-950 dark:text-amber-100">
              {filteredPeople.length}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-md border border-zinc-200 bg-white shadow-soft dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col gap-3 border-b border-zinc-100 p-4 dark:border-zinc-800 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid grid-cols-2 gap-2 rounded-md bg-zinc-100 p-1 dark:bg-zinc-900">
            {["students", "teachers"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setActiveType(type)}
                className={`rounded-md px-4 py-2 text-sm font-bold capitalize transition ${
                  activeType === type
                    ? "bg-white text-zinc-950 shadow-sm dark:bg-zinc-700 dark:text-white"
                    : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="relative w-full md:max-w-sm">
            <HiSearch className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-zinc-400" />
            <Input
              type="search"
              placeholder="Search name, email, phone, class, or subject"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="pl-10"
            />
          </div>

          <Button variant="secondary" size="sm">
            {activeType === "students" ? (
              <HiUserGroup className="h-5 w-5 text-teal-700" />
            ) : (
              <HiAcademicCap className="h-5 w-5 text-teal-700" />
            )}
            {selectedIds.length
              ? `${selectedIds.length} selected`
              : "No rows selected"}
          </Button>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox checked={hasSelectedAll} onChange={toggleSelectedAll} />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>{activeType === "students" ? "Class" : "Subject"}</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPeople.map((person) => (
                <TableRow
                  key={person.id}
                  className={
                    selectedIds.includes(person.id)
                      ? "bg-teal-50/80 dark:bg-teal-950/40"
                      : undefined
                  }
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(person.id)}
                      onChange={() => toggleSelected(person.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={person.imageUrl || DUMMY_AVATAR_URL}
                        alt=""
                        className="h-11 w-11 rounded-md border border-zinc-200 object-cover dark:border-zinc-700"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-bold text-zinc-950 dark:text-white">
                          {person.name}
                        </p>
                        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                          {activeType === "students" ? "Student" : "Teacher"} ID #
                          {person.id}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                      {person.detail}
                    </span>
                  </TableCell>
                  <TableCell>
                    <a
                      href={`mailto:${person.email}`}
                      className="inline-flex items-center gap-2 font-semibold text-zinc-700 transition hover:text-teal-700 dark:text-zinc-300 dark:hover:text-teal-300"
                    >
                      <HiMail className="h-4 w-4" />
                      {person.email}
                    </a>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-2 font-semibold text-zinc-700 dark:text-zinc-300">
                      <HiPhone className="h-4 w-4 text-zinc-400" />
                      {person.phone}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Edit ${activeType === "students" ? "student" : "teacher"}`}
                    >
                      <HiPencil className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {!filteredPeople.length && (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center">
                    <p className="font-bold text-zinc-950 dark:text-white">
                      No {activeType} found
                    </p>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      Try another search term or add a new profile.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
}
