import { useTranslation } from "react-i18next"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useDispatch } from "react-redux"
import ShowToastify from "@/utils/ShowToastify"
import { useNavigate } from "react-router-dom"
import GoogleIcon from "@/components/common/icons/GoogleIcon"
import { loginAction } from "@/redux/auth/slice"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { routerPaths } from "@/routes/path"
import { FormInput } from "@/components/common/custom_input/CustomInput"
import { Separator } from "@/components/ui/separator"
const BACKEND_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formSchema = z.object({
    username: z.string().min(2, {
      message: t("login.invalidUsername"),
    }),
    password: z.string().min(6, {
      message: t("login.invalidPassword")
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })


  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(loginAction({
      data: values,
      onSuccess: () => {
        ShowToastify.showSuccessToast(t("login.success"))
        navigate(routerPaths.PROFILE);
      },
      onError: () => {
        ShowToastify.showErrorToast(t("login.error"))
      }
    }));
  }

  const googleAuth = () => {
    window.open(`${BACKEND_URL}/passport/google`, "_self");
  }

  return (
    <div
      className='sm:w-full lg:w-2/4 m-auto border-2 p-3 rounded-md dark:border-rose-400'>
      <h1 className="text-lg mb-3 w-full text-center">{t("login.title")}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="float-start mb-6">{t("login.username")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("login.usernamePlaceholder")} {...field} className="dark:border-rose-200" />
                </FormControl>
                <FormMessage className="text-start text-xs dark:text-rose-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="float-start mb-6">{t("login.password")}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder={t("login.passwordPlaceholder")} {...field} className="dark:border-rose-200" />
                </FormControl>
                <FormMessage className="text-start text-xs dark:text-rose-600" />
              </FormItem>
            )}
          /> */}
          <FormInput
            control={form.control}
            type="text"
            label={t("login.username")}
            fieldName="username"
            placeholder={t("login.usernamePlaceholder")}
          // className="float-start mb-6"
          // classNameInput="dark:border-rose-200"
          />
          <FormInput
            control={form.control}
            type="password"
            label={t("login.password")}
            fieldName="password"
            placeholder={t("login.usernamePlaceholder")}
          // className="float-start mb-6"
          // classNameInput="dark:border-rose-200"
          />
          <div className="flex justify-center my-2">
            <Button type="submit" variant={"outline"}
              className="dark:bg-red-400 bg-slate-400 ">
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <Separator className="bg-rose-500" />
      <div className="flex justify-center my-2">
        <Button
          type="button"
          variant={"outline"}
          onClick={() => { googleAuth() }}
          className="m-auto dark:bg-red-400 bg-white my-2 text-rose-500 dark:text-white">
          <GoogleIcon /> <span className="ml-2">Sign in with Google</span>
        </Button>
      </div>

    </div>
  )
}

export default Login
