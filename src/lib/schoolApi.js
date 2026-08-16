import axios from "axios";
import {
  DUMMY_AVATAR_URL,
  mockSchoolPeopleSeed,
} from "../data/mockSchoolPeople";

const API_URL =
  "https://student-information-spring-react.onrender.com/api/student";
const ADMIN_API_URL = "https://library-springboot-react.onrender.com/library/admin";
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true";
const MOCK_STORAGE_KEY = "student-project-school-people";

const normalizePerson = (person) => ({
  ...person,
  imageUrl: DUMMY_AVATAR_URL,
});

const readMockPeople = () => {
  const storedPeople = localStorage.getItem(MOCK_STORAGE_KEY);

  if (storedPeople) {
    const parsedPeople = JSON.parse(storedPeople);
    const normalizedPeople = {
      students: (parsedPeople.students ?? mockSchoolPeopleSeed.students).map(
        normalizePerson,
      ),
      teachers: (parsedPeople.teachers ?? mockSchoolPeopleSeed.teachers).map(
        normalizePerson,
      ),
    };

    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(normalizedPeople));
    return normalizedPeople;
  }

  const normalizedSeed = {
    students: mockSchoolPeopleSeed.students.map(normalizePerson),
    teachers: mockSchoolPeopleSeed.teachers.map(normalizePerson),
  };

  localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(normalizedSeed));
  return normalizedSeed;
};

const writeMockPeople = (people) => {
  localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(people));
};

const getNextId = (people) =>
  people.reduce((maxId, person) => Math.max(maxId, Number(person.id) || 0), 0) +
  1;

const mapLegacyStudent = (student) => ({
  id: student.adminId,
  type: "students",
  name: student.adminName,
  email: student.adminEmail,
  imageUrl: student.adminImgUrl,
  phone: student.adminPhno,
  detail: "Student profile",
});

const mapToLegacyStudent = (personData) => ({
  adminName: personData.name,
  adminEmail: personData.email,
  adminImgUrl: personData.imageUrl,
  adminPhno: personData.phone,
});

const mapAdmin = (admin) => ({
  id: admin.adminId,
  type: "admins",
  name: admin.adminName,
  email: admin.email,
  imageUrl: admin.adminUrl,
  phone: admin.phone,
  detail: admin.address || "No address on file",
  address: admin.address,
  addressProof: admin.addressProof,
  addressProofType: admin.addressProofType,
});

const mapToAdmin = (personData) => ({
  adminName: personData.name,
  email: personData.email,
  phone: Number(personData.phone),
  adminUrl: personData.imageUrl,
  address: personData.address || null,
  addressProof: personData.addressProof || null,
  addressProofType: personData.addressProofType || null,
});

export const getPeople = async (type) => {
  if (type === "admins") {
    const res = await axios.get(`${ADMIN_API_URL}/get-all-admin`);
    return res.data.map(mapAdmin);
  }

  if (!USE_MOCK_DATA && type === "students") {
    const res = await axios.get(API_URL);
    return res.data.map(mapLegacyStudent);
  }

  return readMockPeople()[type] ?? [];
};

export const createPerson = async (type, personData) => {
  if (type === "admins") {
    const res = await axios.post(
      `${ADMIN_API_URL}/save-admin`,
      mapToAdmin(personData),
    );
    return mapAdmin(res.data);
  }

  if (!USE_MOCK_DATA && type === "students") {
    const res = await axios.post(API_URL, mapToLegacyStudent(personData));
    return mapLegacyStudent(res.data);
  }

  const people = readMockPeople();
  const currentPeople = people[type] ?? [];
  const createdPerson = {
    id: getNextId(currentPeople),
    type,
    ...personData,
    imageUrl: personData.imageUrl || DUMMY_AVATAR_URL,
  };

  writeMockPeople({
    ...people,
    [type]: [createdPerson, ...currentPeople],
  });

  return createdPerson;
};

export const updatePerson = async (type, id, personData) => {
  if (type === "admins") {
    const res = await axios.put(
      `${ADMIN_API_URL}/update-admin/${id}`,
      mapToAdmin(personData),
    );
    return mapAdmin(res.data);
  }

  const people = readMockPeople();
  const currentPeople = people[type] ?? [];
  const updatedPeople = currentPeople.map((person) =>
    person.id === id ? { ...person, ...personData, id } : person,
  );

  writeMockPeople({
    ...people,
    [type]: updatedPeople,
  });

  return updatedPeople.find((person) => person.id === id);
};

export const deletePerson = async (type, id) => {
  if (type === "admins") {
    await axios.delete(`${ADMIN_API_URL}/delete-admin/${id}`);
    return;
  }

  const people = readMockPeople();
  const currentPeople = people[type] ?? [];

  writeMockPeople({
    ...people,
    [type]: currentPeople.filter((person) => person.id !== id),
  });
};
