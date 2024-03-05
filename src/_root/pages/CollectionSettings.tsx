import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "@/types";
import { Button } from "@/components/ui/button";

const operation_types = ["write", "update", "delete", "read"] as const;
const TeamRole: typeof Role = {
  Member: Role.Member,
  Leader: Role.Leader,
  Owner: Role.Owner,
  Analyst: Role.Analyst,
};

const FormSchema = z.object({
  operation_types: z
    .array(z.string())
    .refine((operation_type) => operation_type.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});

export const CollectionSettings = () => {
  const formLeader = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      operation_types: ["read"],
    },
  });
  const formMember = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      operation_types: ["read"],
    },
  });
  const formOwner = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      operation_types: ["read"],
    },
  });
  const formAnalyst = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      operation_types: ["read"],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
  return (
    <div className="flex flex-col gap-4 mt-4 mx-2 sm:w-2/3 sm:mx-auto md:w-1/2">
      <Card className="rounded-md">
        <CardHeader>
          <CardTitle className="text-2xl">Collection Settings</CardTitle>
          <CardDescription>
            You can configure settings and permission of the collection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[30vh] max-h-[30vh] overflow-y-auto rounded-md sm:min-h-[40vh] sm:max-h-[40vh]">
            <CardTitle>Select Permission</CardTitle>
            <div className="flex justify-between items-center">
              <div>
                <CardDescription className="my-2 text-md">
                  Leader
                </CardDescription>
                <Form {...formLeader}>
                  <form
                    onSubmit={formLeader.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={formLeader.control}
                      name="operation_types"
                      render={() => (
                        <FormItem>
                          {operation_types.map((operation_type) => (
                            <FormField
                              key={operation_type}
                              control={formLeader.control}
                              name="operation_types"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={operation_type}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          operation_type
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                operation_type,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== operation_type
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {operation_type}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
              <div>
                <CardDescription className="my-2 text-md">
                  Member
                </CardDescription>
                <Form {...formMember}>
                  <form
                    onSubmit={formMember.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={formMember.control}
                      name="operation_types"
                      render={() => (
                        <FormItem>
                          {operation_types.map((operation_type) => (
                            <FormField
                              key={operation_type}
                              control={formMember.control}
                              name="operation_types"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={operation_type}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          operation_type
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                operation_type,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== operation_type
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {operation_type}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>

              <div>
                <CardDescription className="my-2 text-md">
                  Analyst
                </CardDescription>
                <Form {...formOwner}>
                  <form
                    onSubmit={formOwner.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={formOwner.control}
                      name="operation_types"
                      render={() => (
                        <FormItem>
                          {operation_types.map((operation_type) => (
                            <FormField
                              key={operation_type}
                              control={formOwner.control}
                              name="operation_types"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={operation_type}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          operation_type
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                operation_type,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== operation_type
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {operation_type}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
              <div>
                <CardDescription className="my-2 text-md">
                  Analyst
                </CardDescription>
                <Form {...formAnalyst}>
                  <form
                    onSubmit={formAnalyst.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={formAnalyst.control}
                      name="operation_types"
                      render={() => (
                        <FormItem>
                          {operation_types.map((operation_type) => (
                            <FormField
                              key={operation_type}
                              control={formAnalyst.control}
                              name="operation_types"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={operation_type}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          operation_type
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                operation_type,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== operation_type
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {operation_type}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </div>
            <Button type="submit">Grant Privileges</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
