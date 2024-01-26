import { PlusCircledIcon } from "@radix-ui/react-icons"
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRef, MouseEventHandler } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Badge } from "@/components/ui/badge";

type FormValues = {
  members: {
    email: string;
    role?: string;
  }[];
};

export default function InviteMembers() {

  const _i = useRef<number>(0)

  const inviteForm = useForm<FormValues>({
    defaultValues: {
      members: [{
        email: "",
      }]
    }
  })

  const inviteFormArr = useFieldArray({
    name: "members",
    control: inviteForm.control,
  })

  async function ivkOnInvite(formData: FormValues) {
    console.log(formData, "formData look like this rh.")
  }

  const ivkOnClickToAdd: MouseEventHandler = function (event) {
    event.preventDefault()
    console.log(_i.current)
    console.log(inviteForm.getValues(), "from the invite button handlr")
    inviteFormArr.append({
      email: inviteForm.getValues()?.members[_i.current]?.email
    })
    _i.current++
    inviteForm.resetField(`members.${_i.current}.email`, {
      keepDirty: true,
      keepTouched: true,
    })
  }

  console.log(inviteFormArr.fields, "from the invitee")

  return (
    <div className="flex flex-col gap-4 mt-4 mx-2 sm:w-2/3 sm:mx-auto md:w-1/2">
      <Form {...inviteForm}>
        <form onSubmit={inviteForm.handleSubmit(ivkOnInvite)}>
          <div className="max-h-[50vh] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SNo.</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  inviteFormArr.fields?.map((field, _i) => (
                    <TableRow key={field.id}>
                      <TableCell>{_i + 1}</TableCell>
                      <TableCell>{field.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {field.role || "Member"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </div>

          <div className="flex px-2 space-x-2 mt-2 justify-center align-middle">
            <FormField
              name={`members[${_i.current}].email`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input type="email" {...field} placeholder="Enter email to invite" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <Button variant="outline" className="py-1" onClick={ivkOnClickToAdd}>
              <PlusCircledIcon width={24} height={24} className="text-[#adb5bd]" />
            </Button>
            <Button variant="outline" className="py-1" type="submit">
              <PaperPlaneIcon width={24} height={24} className="text-[#adb5bd]" />
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
  got to fix the state management of this component.
*/