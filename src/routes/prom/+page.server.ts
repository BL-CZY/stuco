import { redirect } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';

export const actions = {
    new: async ({ request, locals: { supabase } }) => {
        let formData = await request.formData();
        let name = formData.get('name') as string | null;
        let grade = formData.get('grade') as string | null;
        let hasGuest = formData.get('hasGuest') as string | null;
        let signup_id = name + uuidv4();

        interface Options {
            guestName: string | null;
        }

        let options = {} as Options;
        if (hasGuest) {
            let guestName = formData.get('guestName') as string | null;
            options.guestName = guestName;
        }

        let { error } = await supabase.from('prom').insert([
            {
                name: name,
                grade: grade,
                options,
                has_paid: false,
                payment_method: '',
                signup_id
            }
        ]);

        if (error) {
            console.error(error);
            redirect(303, '/prom/error');
        }

        redirect(303, '/prom/success?id=' + signup_id + '&cost=' + (grade === 'Sec 4' ? 30 : 36));
    }
};
