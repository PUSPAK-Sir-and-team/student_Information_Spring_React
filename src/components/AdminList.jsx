import { useEffect, useMemo, useState } from "react";
import {
  HiAcademicCap,
  HiCheck,
  HiMail,
  HiPencil,
  HiPhone,
  HiSearch,
  HiShieldCheck,
  HiTrash,
  HiUserGroup,
  HiX,
} from "react-icons/hi";
import { Loader } from "./Loader";
import { deletePerson, getPeople, updatePerson } from "../lib/schoolApi";
import { DUMMY_AVATAR_URL } from "../data/mockSchoolPeople";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const addressProofTypes = ["Aadhar", "PAN", "Passport", "Voter ID"];

const roles = [
  {
    type: "students",
    label: "Students",
    singular: "Student",
    detailLabel: "Class",
    icon: HiUserGroup,
  },
  {
    type: "teachers",
    label: "Teachers",
    singular: "Teacher",
    detailLabel: "Subject",
    icon: HiAcademicCap,
  },
  {
    type: "admins",
    label: "Admins",
    singular: "Admin",
    detailLabel: "Address",
    icon: HiShieldCheck,
  },
];

const getRole = (type) => roles.find((role) => role.type === type) ?? roles[0];

export function SchoolBoard() {
  const [people, setPeople] = useState([]);
  const [activeType, setActiveType] = useState("students");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingPerson, setEditingPerson] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [editStatus, setEditStatus] = useState("idle");
  const [deletingId, setDeletingId] = useState(null);
  const activeRole = getRole(activeType);
  const ActiveRoleIcon = activeRole.icon;

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
      [
        person.name,
        person.email,
        person.phone,
        person.detail,
        person.addressProof,
        person.addressProofType,
      ]
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

  const openEdit = (person) => {
    setEditingPerson(person);
    setEditFormData({
      name: person.name ?? "",
      email: person.email ?? "",
      imageUrl: person.imageUrl ?? "",
      phone: person.phone ?? "",
      address: person.address ?? "",
      addressProof: person.addressProof ?? "",
      addressProofType: person.addressProofType ?? "",
    });
    setEditStatus("idle");
  };

  const closeEdit = () => {
    setEditingPerson(null);
    setEditFormData(null);
    setEditStatus("idle");
  };

  const handleEditChange = (event) => {
    const { id, value } = event.target;
    setEditFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    if (!editingPerson) return;

    setEditStatus("saving");
    try {
      const updated = await updatePerson(
        activeType,
        editingPerson.id,
        editFormData,
      );
      setPeople((current) =>
        current.map((person) =>
          person.id === editingPerson.id ? { ...person, ...updated } : person,
        ),
      );
      closeEdit();
    } catch (err) {
      console.error("Error updating person:", err);
      setEditStatus("error");
    }
  };

  const handleDelete = async (person) => {
    const confirmed = window.confirm(
      `Delete ${person.name}? This cannot be undone.`,
    );
    if (!confirmed) return;

    setDeletingId(person.id);
    try {
      await deletePerson(activeType, person.id);
      setPeople((current) => current.filter((p) => p.id !== person.id));
      setSelectedIds((current) => current.filter((id) => id !== person.id));
    } catch (err) {
      console.error("Error deleting person:", err);
      alert(`Could not delete ${person.name}. Please try again.`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-6 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal-700">
            School board
          </p>
          <h2 className="mt-2 text-3xl font-black text-zinc-950 dark:text-white sm:text-4xl">
            Students, teachers and admins
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
          <div className="grid grid-cols-3 gap-2 rounded-md bg-zinc-100 p-1 dark:bg-zinc-900">
            {roles.map((role) => (
              <button
                key={role.type}
                type="button"
                onClick={() => setActiveType(role.type)}
                className={`rounded-md px-4 py-2 text-sm font-bold transition ${
                  activeType === role.type
                    ? "bg-white text-zinc-950 shadow-sm dark:bg-zinc-700 dark:text-white"
                    : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                {role.label}
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
            <ActiveRoleIcon className="h-5 w-5 text-teal-700" />
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
                  <Checkbox
                    checked={hasSelectedAll}
                    onChange={toggleSelectedAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>{activeRole.detailLabel}</TableHead>
                {activeType === "admins" && <TableHead>Address proof</TableHead>}
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
                        onError={(event) => {
                          event.currentTarget.src = DUMMY_AVATAR_URL;
                        }}
                        className="h-11 w-11 rounded-md border border-zinc-200 object-cover dark:border-zinc-700"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-bold text-zinc-950 dark:text-white">
                          {person.name}
                        </p>
                        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                          {activeRole.singular} ID #{person.id}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                      {person.detail}
                    </span>
                  </TableCell>
                  {activeType === "admins" && (
                    <TableCell>
                      {person.addressProof ? (
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-zinc-700 dark:text-zinc-300">
                            {person.addressProof}
                          </p>
                          <p className="text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                            {person.addressProofType || "Unknown type"}
                          </p>
                        </div>
                      ) : (
                        <span className="text-sm font-semibold text-zinc-400">
                          Not submitted
                        </span>
                      )}
                    </TableCell>
                  )}
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
                    <div className="inline-flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Edit ${activeRole.singular.toLowerCase()}`}
                        disabled={activeType !== "admins"}
                        title={
                          activeType !== "admins"
                            ? "Editing is only available for admins right now"
                            : undefined
                        }
                        onClick={() => openEdit(person)}
                      >
                        <HiPencil className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Delete ${activeRole.singular.toLowerCase()}`}
                        disabled={
                          activeType !== "admins" || deletingId === person.id
                        }
                        title={
                          activeType !== "admins"
                            ? "Deleting is only available for admins right now"
                            : undefined
                        }
                        onClick={() => handleDelete(person)}
                      >
                        <HiTrash className="h-5 w-5 text-rose-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {!filteredPeople.length && (
                <TableRow>
                  <TableCell
                    colSpan={activeType === "admins" ? 7 : 6}
                    className="py-12 text-center"
                  >
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

      {editingPerson && editFormData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-md border border-zinc-200 bg-white p-5 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal-700">
                  Edit admin
                </p>
                <h3 className="mt-1 text-xl font-black text-zinc-950 dark:text-white">
                  {editingPerson.name}
                </h3>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close"
                onClick={closeEdit}
              >
                <HiX className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleEditSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editFormData.email}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="imageUrl">Profile image URL</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    value={editFormData.imageUrl}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={editFormData.phone}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    type="text"
                    value={editFormData.address}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addressProof">Address proof number</Label>
                  <Input
                    id="addressProof"
                    type="text"
                    value={editFormData.addressProof}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addressProofType">Address proof type</Label>
                  <select
                    id="addressProofType"
                    value={editFormData.addressProofType}
                    onChange={handleEditChange}
                    className="flex h-11 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-950 shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-teal-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                  >
                    <option value="">Select a proof type</option>
                    {addressProofTypes.map((proofType) => (
                      <option key={proofType} value={proofType}>
                        {proofType}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {editStatus === "error" && (
                <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">
                  Could not update this admin. Please check the data source
                  and try again.
                </p>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="submit" disabled={editStatus === "saving"}>
                  <HiCheck className="h-5 w-5" />
                  {editStatus === "saving" ? "Saving..." : "Save changes"}
                </Button>
                <Button type="button" variant="secondary" onClick={closeEdit}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
