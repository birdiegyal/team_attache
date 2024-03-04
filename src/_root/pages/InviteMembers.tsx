import { ChevronDownIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRef, MouseEventHandler } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FormValues,
  Role,
  RoleDropdownMenuPropsTyp,
  TeamsContextTyp,
} from "@/types";
import {
  getTeamsForCurrentUSer,
  inviteTeamMembersMutation,
} from "@/lib/queries/queries";
import useTeamsProvider from "@/contexts/TeamsProvider";
import { DevTool } from "@hookform/devtools";
import { useToast } from "@/components/ui/use-toast";

const TeamRole: typeof Role = {
  Member: Role.Member,
  Leader: Role.Leader,
  Owner: Role.Owner,
  Analyst: Role.Analyst,
};

export default function InviteMembers() {
  const {
    currentTeamId: TeamId,
    currentTeamname: Teamname,
    Teams,
    updateCurrentTeamname,
    updateTeams,
  } = useTeamsProvider();
  const { toast } = useToast();
  const _i = useRef<number>(0);
  const inviteForm = useForm<FormValues>({
    defaultValues: { email: "" },
    mode: "onTouched",
    reValidateMode: "onChange",
  });
  const inviteFormArr = useFieldArray({
    name: "members",
    control: inviteForm.control,
  });

  const { data, isLoading: isGettingTeams } = getTeamsForCurrentUSer();
  if (data) {
    // @ts-ignore
    updateTeams(() => data);
  }

  const { mutateAsync: inviteTeamMembers, isPending: isInviting } =
    inviteTeamMembersMutation();

  async function ivkOnInvite(formData: FormValues) {
    console.log(formData.members, "formData look like this rh.");

    const members = new Set(formData.members);
    console.log(`TeamId: ${TeamId}.`);

    try {
      const res = await inviteTeamMembers({
        members,
        TeamId: TeamId,
      });

      if (res[0].status === "fulfilled") {
        toast({
          title: "Team members Invited 🎉",
          description: `Invitation email📩 is sent to all them Members to join ${Teamname}.`,
        });
      } else throw Error;

      console.log(res);
    } catch (error) {
      toast({
        title: "Couldn't invite team members ❌.",
        description: "Check your internet connection.",
      });

      console.log(error);
    }
  }

  const ivkOnClickToAdd: MouseEventHandler = function (event) {
    event.preventDefault();
    inviteFormArr.append({
      email: inviteForm.getValues()?.email,
      roles: "Member",
    });

    inviteForm.resetField("email", {
      keepDirty: true,
      keepTouched: true,
    });

    _i.current++;
  };

  return (
    <div className="flex flex-col gap-4 mt-4 mx-2 sm:w-2/3 sm:mx-auto md:w-1/2">
      <Form {...inviteForm}>
        <form onSubmit={inviteForm.handleSubmit(ivkOnInvite)}>
          <Card className="rounded-md">
            <CardHeader>
              <CardTitle className="text-2xl">
                {`Invite Members to your ${Teamname || "Team"}.`}
              </CardTitle>
              <CardDescription>
                Enter their Email and select their Role here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="min-h-[30vh] max-h-[30vh] overflow-y-auto rounded-md sm:min-h-[40vh] sm:max-h-[40vh]">
                {inviteFormArr.fields.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SNo.</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right pr-4">Role</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inviteFormArr.fields?.map((field, _i) => {
                        return (
                          <TableRow key={field.id}>
                            <TableCell>{_i + 1}</TableCell>
                            <TableCell className="truncate max-w-[40vw]">
                              {field.email}
                            </TableCell>
                            <TableCell className="text-right">
                              <RoleDropDownMenu
                                field={field}
                                index={_i}
                                ivkOnClickToChangeRole={inviteFormArr.update}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3} className="font-light">
                          {_i.current > 1
                            ? `${_i.current} Members to invite.`
                            : `${_i.current} Member to invite.`}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                ) : (
                  <div className="flex flex-col gap-3 justify-center">
                    <span className="font-medium text-xl text-secondary text-gray-600 text-center">
                      Invited members'll be displayed here.
                    </span>
                    <TeamDropDownMenu
                      Teams={Teams}
                      updateCurrentTeamname={updateCurrentTeamname}
                      isGettingTeams={isGettingTeams}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-2 mt-2 justify-center align-middle">
            <FormField
              name="email"
              render={({ field }) => {
                return (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        placeholder="Enter email to invite"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button
              variant="ghost"
              className="py-1 border-[#ffdb3d] hover:bg-yellow-300/30"
              onClick={ivkOnClickToAdd}
              disabled={isInviting}
            >
              <PlusCircledIcon
                width={24}
                height={24}
                className="text-[#ffdb3d]"
              />
            </Button>
            <Button variant="ghost" className="py-1" type="submit">
              {isInviting ? (
                <ReloadIcon
                  width={24}
                  height={24}
                  className="animate-spin text-[#317ecb]"
                />
              ) : (
                <PaperPlaneIcon
                  width={24}
                  height={24}
                  className="text-[#317ecb]"
                />
              )}
            </Button>
          </div>
        </form>
      </Form>
      <DevTool control={inviteForm.control} />
    </div>
  );
}

/* 

 WORKFLOW: 
 1. we'll useFieldArray hook for this shit.
 2. so initially it will be a input field on to the display and then a table that contains rows + input field to populate it further.

 FIXME: 
  ✅ got to fix the state management of this component.
  
*/

function RoleDropDownMenu({
  field,
  ivkOnClickToChangeRole,
  index,
}: RoleDropdownMenuPropsTyp) {
  console.log(field);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-[1px] px-2 font-light">
          {/* @ts-ignore */}
          {field.role ? field.role : "No Role"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-11">
        <DropdownMenuLabel>Select Role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.keys(TeamRole).map((role, _i) => (
          <DropdownMenuCheckboxItem
            key={`${_i}th_item`}
            onCheckedChange={() =>
              ivkOnClickToChangeRole(index, {
                // @ts-ignore
                email: field.email,
                role: role,
                fieldId: field.id,
              })
            }
          >
            {role}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TeamDropDownMenu({
  Teams,
  updateCurrentTeamname,
  isGettingTeams,
}: Pick<TeamsContextTyp, "Teams" | "updateCurrentTeamname"> & {
  isGettingTeams: boolean;
}) {
  console.log("team selected", Teams.teams);
  const { toast } = useToast();
  function ivkOnClickToChangeTeam(teamname: string) {
    updateCurrentTeamname(() => teamname);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isGettingTeams ? (
          <span className="block text-center mt-2 font-extrabold text-2xl text-muted-foreground animate-pulse">
            Loading...
          </span>
        ) : (
          <p className="px-2 text-lg text-wrap underline underline-offset-2  flex justify-start items-center">
            Select your Team 🫂 to Invite Members
            <Button variant="outline" size="icon" className="h-6 w-6 mx-3 mt-2">
              <ChevronDownIcon className="h-3 w-3" />
            </Button>
          </p>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-11">
        <DropdownMenuLabel>Select Team</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Teams.teams.map((team, _i) => (
          <DropdownMenuCheckboxItem
            key={`${_i}th_item`}
            onClick={() => {
              toast({
                title: `${team.name} selcted`,
              });
            }}
            onCheckedChange={() => ivkOnClickToChangeTeam(team.name)}
          >
            {team.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
