import { supabase } from "../../supabase";

export async function getUser() {
    try {
        const {user} = await supabase.auth.getUser()
        return user
    } catch (error) {

    }
}