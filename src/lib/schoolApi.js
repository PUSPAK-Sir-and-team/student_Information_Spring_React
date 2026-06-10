import axios from "axios";
import {
  DUMMY_AVATAR_URL,
  mockSchoolPeopleSeed,
} from "../data/mockSchoolPeople";

const API_URL =
  "https://student-information-spring-react.onrender.com/api/student";
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

export const getPeople = async (type) => {
  if (!USE_MOCK_DATA && type === "students") {
    const res = await axios.get(API_URL);
    return res.data.map(mapLegacyStudent);
  }

  return readMockPeople()[type] ?? [];
};

export const createPerson = async (type, personData) => {
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
