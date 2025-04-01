import { redirect } from '@sveltejs/kit';

export const load = async ({ url }): Promise<{ id: string; cost: string }> => {
    let id = url.searchParams.get('id');
    let cost = url.searchParams.get('cost');
    if (!id || !cost) {
        redirect(302, '/prom');
    }

    return { id, cost };
};
