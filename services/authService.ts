import { supabase } from "@/utils/supabase/client";
import { UserSession } from "@/lib/types";

export const fetchSessionMenu = async () => {
	const {
		data: { session },
		error,
	} = await supabase.auth.getSession();
	if (error) {
		console.error("Error fetching session:", error);
		return null;
	}
	return session;
};

export const fetchSession = async (): Promise<UserSession> => {
	const {
		data: { session },
		error,
	} = await supabase.auth.getSession();

	if (error) {
		console.error("Error fetching session:", error.message);
	}

	if (!session) {
		console.warn("No session found.");
		const userSessionNull: UserSession = {
			id: "",
			avatarURL: "",
			name: "",
			username: "",
			email: "",
		};
		return userSessionNull;
	}

	const user = session.user;

	const userSession: UserSession = {
		id: user.id,
		avatarURL: user.user_metadata?.avatar_url || "",
		name: user.user_metadata?.name || "",
		username: user.user_metadata?.user_name || "",
		email: user.email || "nomail@nomail.com",
	};

	return userSession;
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

	if (error) {
		throw new Error(error.message);
	}

	const session = await fetchSession();
	if (!session) {
		console.warn("No session found after sign-in.");
	}
};

export const signOut = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
};
