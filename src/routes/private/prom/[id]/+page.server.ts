export const load = async ({ locals: { supabase }, params: { id } }) => {
    const { data, error } = await supabase
        .from('prom')
        .select('id, name, grade, options, has_paid, payment_method, signup_id')
        .eq('id', id)
        .single();

    if (error) {
        return {
            status: 500,
            body: { error: error.message }
        };
    }

    return {
        prom: data as {
            id: string;
            name: string;
            grade: string;
            options: { guestName?: string };
            has_paid: boolean;
            payment_method: string;
            signup_id: string;
        }
    };
};
