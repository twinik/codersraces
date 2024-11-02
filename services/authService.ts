import { supabase } from "@/utils/supabase/client";

export const fetchSession = async () => {
	const {
		data: { session },
	} = await supabase.auth.getSession();
	return session;
};

export const onAuthStateChange = (callback: (session: any) => void) => {
	const {
		data: { subscription },
	} = supabase.auth.onAuthStateChange((_, session) => {
		callback(session);
	});
	return subscription;
};

export const signInWithGitHub = async () => {
	const { error } = await supabase.auth.signInWithOAuth({
		provider: "github",
	});
	if (error) throw new Error(error.message);
};

export const signOut = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
};
