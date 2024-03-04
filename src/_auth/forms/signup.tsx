import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    useCreateUserAcMutation,
    useCreateUserSessionMutation,
} from "@/lib/queries/queries";
import { Link, useNavigate } from "react-router-dom";
import { ToastAction } from "@/components/ui/toast";
import { useUserContext } from "@/contexts/AuthProvider";

// => whats my formData looks like and how to know whether its valid or not.
const formSchema = z.object({
    username: z.string().min(5, { message: "username is required." }),
    email: z.string().email(),
    password: z
        .string()
        .min(8, { message: "password must be atleast 8 characters." }),

});

// => how the whole form management works.
/* 
 NOTE: 
 zodResolver is a f() that helps us to integrate zod with react-form-hook.
*/

type userFormData = z.infer<typeof formSchema>;

export default function Signup() {
    const navigate = useNavigate();

    const form = useForm<userFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",            
        },
    });

    // use this toast f() to provide the description of the message you want to notify.
    const { toast } = useToast();

    const { mutateAsync: createUserAc, isPending: isCreatingUser } =
        useCreateUserAcMutation();
    const { mutateAsync: createEmailSession, isPending: isCreatingSession } =
        useCreateUserSessionMutation();
    const { checkUserAuth } = useUserContext();

    async function onSubmit(formData: userFormData) {
        /* 
             WORKFLOW: 
             1. we gon init a variable named ac and populate depending on the location prop.
             2. then make ac go throught all of the checkpoints globally.
            */

        const ac = await createUserAc({
                ...formData,
            });
        


        if (!ac) {
            toast({
                title: "🚨 Something went wrong!!",
                description:
                    "make sure you re connected to internet and 've entered correct info.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });

        }

        // since we've created an Ac, next we got to signin into the newly created Ac.
        const session = await createEmailSession({
            email: formData.email,
            password: formData.password,
        });

        if (!session) {
            toast({
                title: "🚨 Something went wrong!!",
                description:
                    "make sure you re connected to internet and 've entered correct info.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });

            return null;
        }

        let userAuthStatus = await checkUserAuth();

        if (userAuthStatus) {
            toast({
                title: "User Account created 😃",
                description: "Go ahead and create offers ⭐ to attract more customers.",
                action: (
                    <ToastAction altText="Create an offer">Create an Offer</ToastAction>
                ),
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
                    key={"username"}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Username</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
                    {isCreatingUser || isCreatingSession ? "Creating..." : "Signup"}
                </Button>
                <p className="mt-2 text-sm font-thin">
                    Already 've got a Merchant Account?
                    <Link
                        to="/signin"
                        className="text-green-600 text-xl ml-2 underline font-semibold"
                    >
                        Signin
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
