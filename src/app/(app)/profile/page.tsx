import { ProfileForm } from "@/components/forms/profile-form";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
        <p className="text-muted-foreground">
          Manage your health information and dietary preferences.
        </p>
      </header>
      <ProfileForm />
    </div>
  );
}
