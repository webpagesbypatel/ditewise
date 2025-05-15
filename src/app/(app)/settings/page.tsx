import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Palette, ShieldCheck, UserCircle2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account, preferences, and application settings.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserCircle2 className="text-primary"/> Account Information</CardTitle>
          <CardDescription>Update your personal details and password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Current User Name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="user@example.com" />
          </div>
          <Button variant="outline" disabled>Change Password (Coming Soon)</Button>
           <Button disabled>Update Account</Button>
        </CardContent>
      </Card>
      
      <Separator />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell className="text-primary"/> Notification Preferences</CardTitle>
          <CardDescription>Control how you receive notifications from DietWise.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="meal-reminders" className="flex flex-col space-y-1">
              <span>Meal Reminders</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Get reminded about your upcoming meals.
              </span>
            </Label>
            <Switch id="meal-reminders" defaultChecked />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="logging-reminders" className="flex flex-col space-y-1">
              <span>Logging Reminders</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Gentle nudges to log your meals and track progress.
              </span>
            </Label>
            <Switch id="logging-reminders" />
          </div>
           <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="community-notifications" className="flex flex-col space-y-1">
              <span>Community Updates</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Notifications for new posts or replies in followed topics.
              </span>
            </Label>
            <Switch id="community-notifications" defaultChecked />
          </div>
           <Button disabled>Save Notification Settings</Button>
        </CardContent>
      </Card>

      <Separator />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Palette className="text-primary"/> Appearance</CardTitle>
          <CardDescription>Customize the look and feel of the application.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <p className="text-sm text-muted-foreground">Theme preferences (Light/Dark/System) can be changed using the toggle in the sidebar footer.</p>
           {/* More appearance settings could go here, e.g., font size, compact mode */}
        </CardContent>
      </Card>
      
      <Separator />
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldCheck className="text-primary"/> Privacy & Data</CardTitle>
          <CardDescription>Manage your data sharing and privacy settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="wearable-integration" className="flex flex-col space-y-1">
              <span>Wearable Device Integration</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Allow DietWise to sync data with your wearable devices.
              </span>
            </Label>
            <Switch id="wearable-integration" disabled />
          </div>
           <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="provider-sharing" className="flex flex-col space-y-1">
              <span>Share Data with Healthcare Provider</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Enable data sharing for clinical management (with consent).
              </span>
            </Label>
            <Switch id="provider-sharing" disabled />
          </div>
          <Button variant="outline" disabled>Manage Data Sharing (Coming Soon)</Button>
          <Button variant="destructive" disabled>Delete My Account (Coming Soon)</Button>
        </CardContent>
      </Card>

    </div>
  );
}
