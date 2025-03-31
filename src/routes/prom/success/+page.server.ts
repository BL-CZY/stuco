import { redirect } from '@sveltejs/kit';

export const load = async ({ url }): Promise<{ id: string }> => {
    let id = url.searchParams.get('id');
    if (!id) {
        redirect(302, '/prom');
    }

    return { id };
};
