import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { toast } from "@/components/ui/use-toast";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Role } from "@/types";
import { getTeamMembership } from "@/lib/queries/queries";
import useTeamsProvider from "@/contexts/TeamsProvider";


const operation_types = ["write", "update", "delete", "read"] as const;

const TeamRole: typeof Role = {
    Member: Role.Member,
    Leader: Role.Leader,
    Owner: Role.Owner,
    Analyst: Role.Analyst,
}

const FormSchema = z.object({
    operation_types: z
        .array(z.string())
        .refine((operation_type) => operation_type.some((item) => item), {
            message: "You have to select at least one item.",
        }),
    selectRole: z.enum([Role.Analyst, Role.Leader, Role.Member, Role.Owner]),
})


export default function Settings() {

    const formState = useRef({})
    // const [prevVals, setPrevVals] = useState<string[]>([])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            operation_types: ["read"]
        },
    });

    const { currentTeamId } = useTeamsProvider()

    // const teamMembers = Array.from({ length: 50 }).map(
    //     (_, i, a) => `v1.2.0-betaajskdfhksdh.${a.length - i}`
    // ); //  TODO:  got to replace them by team members.

    const { data: teamMembers, isLoading: isGettingTeamMembers } = getTeamMembership(currentTeamId)

    async function ivkOnSubmit(formData: z.infer<typeof FormSchema>) {

        console.log("formState", formState)

    }

    return (
        <div className="flex gap-4 justify-start space-y-4 px-4 ">
            <div className="h-screen py-8 w-1/3">
                {/* TODO:  members of current team re listed here. */}
                {
                    isGettingTeamMembers
                        ? <p className="font-bold text-2xl sm:text-4xl animate-pulse">Loading...</p>
                        : <ScrollArea className="h-[100%] rounded-md">
                            <div className="px-4 relative">
                                <h4 className="mb-4 text-lg font-medium leading-none sticky top-0 py-4 bg-background ">
                                    Team members
                                </h4>

                                {teamMembers?.memberships.map((tag) => (
                                    <>
                                        <div key={tag.$id} className="text-sm">
                                            {tag.userEmail}
                                        </div>
                                        <Separator className="my-2" />
                                    </>
                                ))}
                            </div>
                        </ScrollArea>
                }
            </div>
            <div className="py-6 rounded-md w-full px-8 border">
                {/* TODO:  settings to provide privileges re display here for administration purpose. */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(ivkOnSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="selectRole"
                            render={({ field }) => {

                                function ivkOnRoleChange(Role: string) {

                                    // console.log(form.getValues())
                                    const prevRole = field.value
                                    // setPrevVals(form.getValues("operation_types"))

                                    // console.log(prevVals)
                                    if (prevRole !== undefined) {
                                        formState.current = {
                                            ...formState.current,
                                            [prevRole]: form.getValues("operation_types"),
                                            // [prevRole]: prevVals,
                                        }
                                    }
                                    field.onChange(Role)
                                    console.log(formState)

                                    if (Object.keys(formState.current).includes(Role)) {
                                        // @ts-ignore
                                        form.setValue("operation_types", formState.current[Role])
                                    } else {
                                        form.setValue("operation_types", ["read"])
                                    }
                                    // form.reset()
                                }

                                return (
                                    <FormItem className="w-[40%]">
                                        <FormLabel>Role</FormLabel>
                                        <Select onValueChange={ivkOnRoleChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role to configure its privileges" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={TeamRole.Analyst}>{TeamRole.Analyst}</SelectItem>
                                                <SelectItem value={TeamRole.Leader}>{TeamRole.Leader}</SelectItem>
                                                <SelectItem value={TeamRole.Member}>{TeamRole.Member}</SelectItem>
                                                <SelectItem value={TeamRole.Owner}>{TeamRole.Owner}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            you can create more Roles here.
                                            {/* TODO:  got to add a link to create roles in here. */}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }} />
                        <FormField
                            control={form.control}
                            name="operation_types"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Privileges</FormLabel>
                                        <FormDescription>
                                            Select the privileges you want to grant for Role.
                                        </FormDescription>
                                    </div>
                                    {operation_types.map((operation_type) => (
                                        <FormField
                                            key={operation_type}
                                            control={form.control}
                                            name="operation_types"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={operation_type}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(operation_type)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([
                                                                            ...field.value,
                                                                            operation_type,
                                                                        ])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== operation_type
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">
                            Grant Privileges
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

/*

  WORKFLOW: 
  1. lay down the ui.
  2. connect with the api
*/
