import * as yup from 'yup';

export const ProfileSchema = yup.object({
    name: yup.string().required("Name is Required"),
    age: yup.number().min(18, "Age must be greater than 18").max(100, "Age must be less than 100").required("Age is Required"),
    email: yup.string().email("Invalid email").required("Email is Required"),
    profilePicture: yup.string().required("Profile Picture is Required"),
});
