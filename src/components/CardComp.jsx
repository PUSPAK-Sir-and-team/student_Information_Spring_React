import axios from "axios";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";

export function CardComp() {
  const [formData, setFormData] = useState({
    adminName: "",
    adminEmail: "",
    adminImgUrl: "",
    adminPhno: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://student-information-spring-react.onrender.com/api/student",
        formData,
      );
      console.log("Created:", res.data);
    } catch (error) {
      console.error("Error creating:", error);
    }
  };
  return (
    <div className="flex-1 flex items-center bg-gray-600">
      <form
        className="flex w-full max-w-md flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1">Your Name</Label>
          </div>
          <TextInput
            id="adminName"
            type="text"
            placeholder="Your Name"
            value={formData.adminName}
            onChange={handleChange}
            required
          />
        </div>{" "}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1">Your email</Label>
          </div>
          <TextInput
            id="adminEmail"
            type="email"
            placeholder="name@flowbite.com"
            value={formData.adminEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1">Your ImageURL</Label>
          </div>
          <TextInput
            id="adminImgUrl"
            type="text"
            placeholder="name@flowbite.com"
            value={formData.adminImgUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">PhoneNo</Label>
          </div>
          <TextInput
            id="adminPhno"
            type="text"
            required
            value={formData.adminPhno}
            onChange={handleChange}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
