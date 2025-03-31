import { redirect } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';

export const actions = {
    new: async ({ request, locals: { supabase } }) => {
        let formData = await request.formData();
        let name = formData.get('name') as string;
        let grade = formData.get('grade') as string;
        let option = formData.get('option') as string;
        let signup_id = name + uuidv4();

        interface Options {
            selection: string;
        }

        let { error } = await supabase.from('prom').insert([
            {
                name: name,
                grade: grade,
                options: { selection: option } as Options,
                has_paid: false,
                payment_method: '',
                signup_id
            }
        ]);

        if (error) {
            console.error(error);
            redirect(303, '/prom/error');
        }

        redirect(303, '/prom/success?id=' + signup_id);
    }
};
