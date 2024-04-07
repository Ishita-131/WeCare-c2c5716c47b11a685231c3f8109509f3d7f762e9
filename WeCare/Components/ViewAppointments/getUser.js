import { supabase } from "../../supabase"

export async function getUser() {
    try {
        const {data:{user}} = await supabase.auth.getUser()
        return user.email
    } catch (error) {
        console.log(error);
    }
}