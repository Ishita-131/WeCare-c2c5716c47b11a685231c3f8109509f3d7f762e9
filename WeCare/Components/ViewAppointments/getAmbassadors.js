import { supabase } from "../../supabase";

export async function getAmbassadors() {
    try {
        let { data } = await supabase.from('ambassadors').select('*');
        return data; // Return the fetched data
    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error to be handled by the caller
    }
}
