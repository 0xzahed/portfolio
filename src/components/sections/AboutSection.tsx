import { getGitHubProfile } from "@/lib/github";
import { AboutStory } from "./AboutStory";

/** Server wrapper: fetches the real GitHub profile for the About identity rail. */
export async function AboutSection() {
  const profile = await getGitHubProfile();
  return <AboutStory profile={profile} />;
}
