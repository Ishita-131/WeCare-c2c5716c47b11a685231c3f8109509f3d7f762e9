import { supabase } from "../../supabase";

export async function UpdateUser({name}) {
    try {
        const {data, error} = await supabase.auth.updateUser({
            DisplayName: {name}
        })
    } catch (error) {
        console.log(error);
    }
}