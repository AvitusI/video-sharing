import { validateRequest } from "./auth";
import { useUserStore } from "@/store/userStore";

export const setUserStore = async () => {
    const { user } = await validateRequest();
    useUserStore.setState({ user });
}