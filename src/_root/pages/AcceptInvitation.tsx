import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { teams } from "@/lib/appwrite/config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import {
  FormValues,
  Role,
  RoleDropdownMenuPropsTyp,
  TeamsContextTyp,
} from "@/types";

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
      teams.get(teamId).then(({ name }) => setTeamname(name));
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

        navigate("/");
      } else {
        toast({
          title: "Couldn't accept invitation! 😖",
          description: "Check your internet connection",
        });
      }
    } catch (error) {
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
            <CardDescription>{`You've been invited to be a part of ${
              teamName || "a new Team"
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
              <ProfileForm />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          defaultValue="chimanshu458@gmail.com"
          disabled
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="username" defaultValue="" />
      </div>
      <Button type="submit">Register</Button>
    </form>
  );
}
/* 
  WORKFLOW: 
 ✅ lay down the ui.
 connect with the appwrite api.

*/
