import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { teams } from "@/lib/appwrite/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


import * as z from "zod"

interface AcceptInvitationProps extends URLSearchParams {
  userId: string;
  membershipId: string;
  teamId: string;
  secret: string;
}

export default function AcceptInvitation() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [teamName, setTeamname] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("")

  const params = new Proxy(
    new URLSearchParams(window.location.search) as AcceptInvitationProps,
    {
      get: (searchParams, prop: string) => searchParams.get(prop),
    }
  );

  const [userId, membershipId, teamId, secret] = [
    params.userId,
    params.membershipId,
    params.teamId,
    params.secret,
  ];

  useEffect(() => {
    if (teamId) {
      console.log("inside the effect: ", teamId)
      teams.get(teamId).then(({ name }) => setTeamname(name));
      teams.getMembership(teamId, membershipId).then((membership) => setEmail(membership.userEmail))
    } // this way we couldnt access the team's unneccesary details that we get while teams.get(...)

  }, [teamId]);

  //  NOTE:  so we're going to get all the required info for accepting a team invite from the url | magic link sent to the email.
  async function ivkOnAccept() {
    try {
      const res = await teams.updateMembershipStatus(
        teamId,
        membershipId,
        userId,
        secret
      );
      if (res) {
        toast({
          title: "Invitation  Accepted. 🤝 ",
          description: `You're officially a part of ${teamName}.All the best for your journey. 💪`,
        });

        navigate("/userData");
      } else {
        toast({
          title: "Couldn't accept invitation! 😖",
          description: "Check your internet connection",
        });
      }
    } catch (error) {
      toast({
        title: "Couldn't accept invitation! 😖",
        description: "Check your internet connection",
      });
      setIsRegistered(true);
      console.error(error);
    }
  }

  async function ivkOnDecline() {
    try {
      const res = await teams.deleteMembership(teamId, membershipId);
      if (res) {
        toast({
          title: "Invitation  Declined. 👍 ",
          description: `Invitation for ${teamName} is declined by you.`,
        });

        navigate("/");
      } else {
        toast({
          title: "Couldn't accept decline the invitation! 😖",
          description: "Check your internet connection",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-8 mx-auto w-full flex justify-center items-center">
      {isRegistered ? (
        <Card className="px-1 mx-1 sm:w-1/2 lg:1/3">
          <CardHeader className="py-4">
            <CardTitle>Woah 😃, Team Invitation!</CardTitle>
            <CardDescription>{`You've been invited to be a part of ${teamName || "a new Team"
              }.`}</CardDescription>
          </CardHeader>
          <Separator className="mb-2" />
          <CardContent>
            Go ahead and make a move 🤾. The 🏀 is in your court.
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="x-center px-8 py-1 text-lg"
              onClick={ivkOnAccept}
            >
              Accept
            </Button>
            <Button
              variant="destructive"
              className="x-center px-8 py-1 text-lg"
              onClick={ivkOnDecline}
            >
              Decline
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="border rounded-md p-3 sm:w-1/2 lg:w-1/3 mx-auto flex justify-center items-center flex-col text-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogDescription className="my-5 text-xl">
              Oops!😔 You are not registered from this email. You are required
              to register yourself first
            </DialogDescription>
            <Separator className="mb-2" />

            <DialogTrigger asChild>
              <Button variant="outline">Register Here</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-full mx-auto">
              <DialogHeader>
                <DialogTitle>Register</DialogTitle>
                <DialogDescription>
                  To accept the invitation, you need to register first.
                </DialogDescription>
              </DialogHeader>
              <ProfileForm email={email} closeDialog={setOpen} />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}

const PasswordRecoverySchema = z.object({
  password: z.string()
})

function ProfileForm({ email, closeDialog }: { email: string, closeDialog: Function }) {

  console.log("email: ", email)
  const PasswordRecoveryForm = useForm({
    resolver: zodResolver(PasswordRecoverySchema),
    defaultValues: {
      password: "",
    }
  })

  async function onSubmit(formData: { password: string }) {
    console.log("email", email)
    console.log(formData)
    closeDialog(false)
  }

  return (
    <Form {...PasswordRecoveryForm}>
      <form className={"grid items-start gap-4"} onSubmit={PasswordRecoveryForm.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            defaultValue={email}
            disabled
          />
        </div>
        <FormField
          key={"password"}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
}
/* 
  WORKFLOW: 
 ✅ lay down the ui.
 connect with the appwrite api.

*/
