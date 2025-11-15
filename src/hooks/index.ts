import { getUserProfile } from "../api/services";
import { useFetch } from "./useFetch";

export const useUserProfile = () => useFetch(getUserProfile);