"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "@/utils/formSchema"; //ghaleb
import { Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useFormState } from "react-dom";
import { Input, InputProps } from "antd";
import { signUp } from "@/actions/auth";
import { FormState } from "@/utils/types";
import React, { useRef, forwardRef, useEffect, FunctionComponent } from "react";

export default function Register() {
  // const [state, formAction] = useFormState<FormState, FormData>(signUp, {
  const [state, formAction] = useFormState(signUp, {
    message: "",
  });
  const form = useForm<z.output<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });

  const {
    register,
    control,
    formState: { errors },
  } = form;
  async function onSubmit(data: z.output<typeof schema>) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("password", data.password);
    formData.append("email", data.email);
    await signUp({ message: "" }, formData);
  }

  return (
    <div>
      <h1>Register Form</h1>
      {state?.message !== "" && <div>{state.message}</div>}
      <form action={formAction} onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <Controller
            control={control}
            {...register("name")}
            render={({ field }) => <Input {...field} placeholder="Name" />}
          />
          {errors.name?.message && <p>{errors.name.message}</p>}
        </div>
        <div>
          <Controller
            control={control}
            name="password"
            render={({ field }) => <Input {...field} placeholder="Password" />}
          />
        </div>
        <div>
          <Controller
            control={control}
            {...register("email")}
            name="email"
            render={({ field }) => <Input {...field} placeholder="Email" />}
          />
          {errors.email?.message && <p>{errors.email.message}</p>}
        </div>
        <button type="submit">
          <span>Submit</span>
        </button>
      </form>
      {/* <DevTool control={control} /> */}
    </div>
  );
}
