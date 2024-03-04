import { CrossCircledIcon } from "@radix-ui/react-icons";
import { PlusCircledIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod"
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { DevTool } from "@hookform/devtools";
import { createTeamMutation } from "@/lib/queries/queries";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@radix-ui/react-toast";
import { useNavigate } from "react-router-dom";
import useTeamsProvider from "@/contexts/TeamsProvider";

const CreateTeamSchema = zod.object({
    teamname: zod.string().max(100, { message: "teamName characters limit exceeds." }).min(1, { message: "team name couldn't be empty." }),
    roles: zod.string()
})

type CreateTeamType = zod.infer<typeof CreateTeamSchema>

export default function CreateTeam() {

    const navigate = useNavigate()
    const { toast } = useToast()
    const { updateCurrentTeamname: updateTeamname } = useTeamsProvider()
    const roles = useRef<string[]>([])

    const CreateTeamForm = useForm<CreateTeamType>({
        resolver: zodResolver(CreateTeamSchema),
        defaultValues: {
            teamname: "",
            roles: "",
        }
    })

    const { mutateAsync: createTeam, isPending: creatingTeam } = createTeamMutation()

    async function ivkOnSubmit(formData: CreateTeamType | { teamname: string, roles: string[] }) {

        formData = {
            ...formData,
            roles: roles.current
        }

        try {

            const res = await createTeam(formData)

            const TeamId = res?.$id || ""

            //  NOTE:  adding TeamId against the teamname inside the local storage.
            const Teamname = formData.teamname

            if (TeamId !== "" ) {
                localStorage.setItem(Teamname, TeamId)
            }

            updateTeamname(() => Teamname)
            
            toast({
                title: `${Teamname} created.`,
                description: "Invite your members now.",
                action: <ToastAction altText="Invite" onClick={() => navigate("/invitemembers")} className="border-2">👋</ToastAction>
            })

        } catch (error) {

            const Teamname = formData.teamname
            toast({
                title: `Couldn't create ${Teamname}.`,
                description: "Check your internet connection"
            })
            console.log(error)

        }

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
                                <div className="space-x-2 w-full horizontal-scroll-shadow">
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
                                        if (event.key === "Enter" && field.value) {
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

                    <Button className="mt-2 font-medium text-md" variant="outline" type="submit">
                        {
                            creatingTeam ? "Creating Team..." :
                                <>
                                    <PlusCircledIcon className="mr-1" />
                                    Create Team
                                </>
                        }
                    </Button>

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
  ✅ get the schema.
  ✅ plug in the useForm hook from react-hook-form.
  ✅ impl the form  NOTE:  we're not concerned with the visual aspect but the sizing and layout got to be on point.
  
 2. connect the ui with the logic.
  TODO: 
  ✅ impl appwrite api.
  ✅ queries

 3. update the teamId with the id returned from the res.
*/