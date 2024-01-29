import { PlusCircledIcon } from "@radix-ui/react-icons"
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRef, MouseEventHandler } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FormValues, Role, RoleDropdownMenuPropsTyp } from "@/types";

const TeamRole: typeof Role = {
  Member: Role.Member,
  Leader: Role.Leader,
  Owner: Role.Owner,
  Analyst: Role.Analyst,
}

export default function InviteMembers() {

  const _i = useRef<number>(0)

  const inviteForm = useForm<FormValues>({
    defaultValues: {
      email: "",
    }
  })

  const inviteFormArr = useFieldArray({
    name: "members",
    control: inviteForm.control,
  })

  async function ivkOnInvite(formData: FormValues) {

    console.log(formData.members, "formData look like this rh.")
  }

  const ivkOnClickToAdd: MouseEventHandler = function (event) {
    event.preventDefault()
    inviteFormArr.append({
      email: inviteForm.getValues()?.email,
      role: "Member"
    })

    inviteForm.resetField("email", {
      keepDirty: true,
      keepTouched: true,
    })

    _i.current++


  }

  return (
    <div className="flex flex-col gap-4 mt-4 mx-2 sm:w-2/3 sm:mx-auto md:w-1/2">
      <Form {...inviteForm}>
        <form onSubmit={inviteForm.handleSubmit(ivkOnInvite)}>
          <Card className="rounded-md">
            <CardHeader>
              <CardTitle className="text-2xl">Invite Members to your team</CardTitle>
              <CardDescription>Enter their Email and select their Role here.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="min-h-[30vh] max-h-[30vh] overflow-y-auto rounded-md sm:min-h-[40vh] sm:max-h-[40vh]">
                {
                  inviteFormArr.fields.length > 0
                    ? <Table>
                      <TableHeader >
                        <TableRow >
                          <TableHead>SNo.</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead className="text-right pr-4">Role</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {
                          inviteFormArr.fields?.map((field, _i) => (
                            <TableRow key={field.id}>
                              <TableCell>{_i + 1}</TableCell>
                              <TableCell className="truncate max-w-[40vw]">{field.email}</TableCell>
                              <TableCell className="text-right">
                                <RoleDropDownMenu field={field} index={_i} ivkOnClickToChangeRole={inviteFormArr.update} />
                              </TableCell>
                            </TableRow>
                          ))
                        }
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell colSpan={3} className="font-light">
                            {
                              _i.current > 1 ? (`${_i.current} Members to invite.`) : (`${_i.current} Member to invite.`)
                            }
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                    : <span className="font-medium text-xl text-secondary text-gray-600">Invited members'll be displayed here.</span>
                }
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
                      <Input type="email" {...field} placeholder="Enter email to invite" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <Button variant="ghost" className="py-1 border-[#ffdb3d] hover:bg-yellow-300/30" onClick={ivkOnClickToAdd}>
              <PlusCircledIcon width={24} height={24} className="text-[#ffdb3d]" />
            </Button>
            <Button variant="ghost" className="py-1" type="submit">
              <PaperPlaneIcon width={24} height={24} className="text-[#317ecb]" />
            </Button>

          </div>

        </form>

      </Form>
    </div>
  )

}

/* 

 WORKFLOW: 
 1. we'll useFieldArray hook for this shit.
 2. so initially it will be a input field on to the display and then a table that contains rows + input field to populate it further.

 FIXME: 
  ✅ got to fix the state management of this component.
  
*/

function RoleDropDownMenu({ field, ivkOnClickToChangeRole, index }: RoleDropdownMenuPropsTyp) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-[1px] px-2 font-thin">
          {/* @ts-ignore */}
          {field.role}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-11">
        <DropdownMenuLabel>Select Role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {
          Object.keys(TeamRole).map((role, _i) => (
            <DropdownMenuCheckboxItem key={`${_i}th_item`} onCheckedChange={() => ivkOnClickToChangeRole(index, {
              // @ts-ignore
              email: field.email,
              role: role,
            })} >{role}</DropdownMenuCheckboxItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}