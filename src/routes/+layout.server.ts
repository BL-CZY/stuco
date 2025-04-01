import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ depends, locals: { safeGetSession }, cookies }) => {
    depends('supabase:auth');
    const { session } = await safeGetSession();
    return {
        session,
        cookies: cookies.getAll()
    };
};
