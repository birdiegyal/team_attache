import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/contexts/AuthProvider";
import { useCreateUserSessionMutation } from "@/lib/queries/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

// => what my signin form looks like.
const formSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(8, { message: "password must be atleast 8 characters." }),
});

// => type of the formData we're dealing with
type signinFormData = z.infer<typeof formSchema>;

export default function Signin() {
    // keep it cuz we need to pass this to the form element.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { toast } = useToast();
    const navigate = useNavigate();

    const { checkUserAuth } = useUserContext();
    const { mutateAsync: createEmailSession, isPending: isCreating } =
        useCreateUserSessionMutation();

    async function onSubmit(formData: signinFormData) {
        const session = await createEmailSession(formData);

        if (!session) {
            toast({
                title: "Oops, login snag!😫",
                description:
                    "There seems to be a hiccup with your username or password. Please double-check and try again.",
            });
            return null;
        }

        let userAuthStatus = await checkUserAuth();

        if (userAuthStatus) {
            toast({
                title: "💥 Boom! You're Logged In! 💥",
                description: "Get ready to make a whole lotta money💰!",
            });
            form.reset;
            navigate("/");
        } else {
            toast({
                title: "Oops, login snag!😫",
                description:
                    "There seems to be a hiccup with your username or password. Please double-check and try again.",
            });
            return null;
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-[80%] sm:w-[35%]"
            >
                <FormField
                    key={"email"}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Email</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    key={"password"}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    variant="outline"
                    className="mt-4 mx-auto font-bold text-xl"
                    type="submit"
                >
                    {isCreating ? "Signing..." : "Signin"}
                </Button>

                <p className="mt-2 text-sm font-thin">
                    Don't 've an Account?
                    <Link
                        to="/signup"
                        className="text-green-600 text-xl ml-2 underline font-semibold"
                    >
                        Signup
                    </Link>
                </p>
            </form>
        </Form>
    );
}

/* 
 WORKFLOW: 
 ✅ create a form schema for validation using zod.
 ✅ define your form using useForm hook from react-hook-form.
 ✅ lay down your tsx using shad-cn components.
 ✅ handle submit using onSubmit in your form defination and put it on appwrite cloud.
*/
