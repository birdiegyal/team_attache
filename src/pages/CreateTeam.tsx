import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod"
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { DevTool } from "@hookform/devtools";


const CreateTeamSchema = zod.object({
    teamname: zod.string().max(100, { message: "teamName characters limit exceeds." }),
    roles: zod.string(),
})

type CreateTeamType = zod.infer<typeof CreateTeamSchema>

export default function CreateTeam() {

    const roles = useRef<string[]>([])

    const CreateTeamForm = useForm<CreateTeamType>({
        resolver: zodResolver(CreateTeamSchema),
        defaultValues: {
            teamname: "",
            roles: "",
        }
    })

    function ivkOnSubmit(formData: CreateTeamType | { teamname: string, roles: string[] }) {
        formData = {
            ...formData,
            roles: roles.current
        }
        console.log(formData)
    }

    return (
        <div className="flex flex-col gap-4 mt-4 mx-2 sm:w-2/3 sm:mx-auto md:w-1/2">
            <h1 className="text-2xl font-bold">Create Team</h1>
            <Form {...CreateTeamForm}>
                <form onSubmit={CreateTeamForm.handleSubmit(ivkOnSubmit)}>
                    
                    <FormField
                        name="teamname"
                        control={CreateTeamForm.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Choose a Team Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Team Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="roles"
                        control={CreateTeamForm.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Team Roles </FormLabel>
                                <div className="space-x-2">
                                    {
                                        roles.current.length > 0 && roles.current.map((role, index) => (
                                            <Badge variant={"secondary"} key={role + index}>{role}
                                                <CrossCircledIcon className="mx-1" onClick={(event) => {
                                                    if (event.type === "click") {
                                                        roles.current = roles.current.filter((role, currentIndex) => role && index !== currentIndex)
                                                        CreateTeamForm.trigger("roles")
                                                    }
                                                }} />
                                            </Badge>)
                                        )
                                    }
                                </div>
                                <FormControl>
                                    <Input type="text" placeholder="Enter Team Roles" {...field} onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                            roles.current.push(field.value)
                                            CreateTeamForm.resetField("roles", {
                                                keepDirty: true,
                                                keepTouched: true,
                                                defaultValue: "",
                                            })
                                            event.preventDefault()

                                        }
                                    }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="mt-2" type="submit">Create Team</Button>
                </form>
            </Form>
            <DevTool control={CreateTeamForm.control} />
        </div>
    )
}

/* 
 WORKFLOW: 
 1. lay down the ui for creating a team.
  TODO: 
  🎯 get the schema.
  🎯 plug in the useForm hook from react-hook-form.
  🎯 impl the form  NOTE:  we're not concerned with the visual aspect but the sizing and layout got to be on point.
  
 2. connect the ui with the logic.
  TODO: 
  🎯 impl appwrite api.
  🎯 queries
*/