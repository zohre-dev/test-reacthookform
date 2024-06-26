"use server";

import { postFetch } from "@/utils/fetch";
import { FormState } from "@/utils/types";

async function signUp(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const name = formData.name;
  const password = formData.password;
  const email = formData.email;
  const phoneNumber = "09100000000";

  const res = await postFetch("/users", { name, password, email, phoneNumber });

  if (res.errors) {
    return {
      message: res.errors[0].message,
    };
  } else {
    console.log("hi zohre");
    console.log(prevState);
    return { message: "User registered" };
  }
}
export { signUp };
