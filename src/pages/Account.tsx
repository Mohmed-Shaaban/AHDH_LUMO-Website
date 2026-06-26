import { useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Camera, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { UpdateProfilePayload } from "@/types";
import { useDeleteProfilePicture, useProfile, useUpdateProfile, useUploadProfilePicture } from "@/features/profile/useProfile";
import axiosInstance from "@/services/axiosInstance";


// ─── Constants ────────────────────────────────────────────────────────────────

const DATE_FORMATS = ["DD/MM/YY", "MM/DD/YY", "YY/MM/DD"] as const;
const TIME_FORMATS = [
  { label: "12 Hour", value: "12" },
  { label: "24 Hour", value: "24" },
] as const;

const WEEK_DAYS = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];

const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "Arabic", value: "ar" },
  { label: "French", value: "fr" },
  { label: "Spanish", value: "es" },
];

const DEFAULT_VALUES: UpdateProfilePayload = {
  firstName: "",
  lastName: "",
  about: "",
  timezone: "UTC",
  dateFormat: "DD/MM/YY",
  timeFormat: "12",
  weekStartOn: "monday",
  language: "en",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function AccountPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Server state
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const uploadPicture = useUploadProfilePicture();
  const deletePicture = useDeleteProfilePicture();

console.log(profile)
  // ── React Hook Form
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<UpdateProfilePayload>({ defaultValues: DEFAULT_VALUES });

  // Populate form once profile loads (or re-loads after save)
  useEffect(() => {
    if (!profile) return;
    reset({
      firstName: profile.firstName ?? "",
      lastName: profile.lastName ?? "",
      about: profile.about ?? "",
      timezone: profile.timezone ?? "UTC",
      dateFormat: "DD/MM/YY",
      timeFormat: "12",
      weekStartOn: "monday",
      language: "en",
    });
  }, [profile, reset]);

  // ── Submit
  const onSubmit = async (data: UpdateProfilePayload) => {
    try {
      await updateProfile.mutateAsync(data);
      toast.success("Account updated successfully");
      // reset dirty state to the new saved values
      reset(data);
    } catch {
      toast.error("Failed to update account. Please try again.");
    }
  };

  // ── Picture handlers
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadPicture.mutateAsync(file);
      toast.success("Profile picture updated");
    } catch {
      toast.error("Failed to upload picture. Please try again.");
    }
    e.target.value = "";
  };

  const handleDeletePicture = async () => {
    try {
      await deletePicture.mutateAsync();
      toast.success("Profile picture removed");
    } catch {
      toast.error("Failed to remove picture. Please try again.");
    }
  };

  const isPictureLoading = uploadPicture.isPending || deletePicture.isPending;

  // ── Loading state
  if (isPictureLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-10  w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const avatarSrc = profile?.profilePicture
    ? profile.profilePicture.startsWith("/")
      ? `${import.meta.env.VITE_API_BASE_URL}${profile.profilePicture}`
      : profile.profilePicture
    : undefined;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" max-w-5xl mx-auto space-y-6 p-6 flex-1 "
    >
      {/* ── Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Account</h1>
        <div className="flex gap-2">
          {isDirty && (
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={!isDirty || isSubmitting}>
            {isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isDirty ? "Save Changes" : "Edit Account"}
          </Button>
        </div>
      </div>

      {/* ── Profile card */}
      <div className="rounded-xl border bg-card p-6">
        <div className="flex gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="relative h-24 w-24 overflow-hidden rounded-full bg-muted ">
              {avatarSrc ? (
                <img
                  src={import.meta.env.VITE_API_URL+profile?.profilePicture}
                  alt="Profile"
                  className="h-full w-full object-cover "
                />
              ) : (
                <img
                  src={'/Default_pfp.svg'}
                  alt="Profile"
                  className="h-full w-full object-cover "
                />
              )}
              {isPictureLoading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleDeletePicture}
              disabled={isPictureLoading}
              title="Remove picture"
              className="absolute -left-2 top-1/2 -translate-y-1/2 rounded-full border bg-background p-1.5 shadow-sm hover:bg-muted disabled:opacity-50"
            >
              <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isPictureLoading}
              title="Upload picture"
              className="absolute -right-2 top-1/2 -translate-y-1/2 rounded-full border bg-background p-1.5 shadow-sm hover:bg-muted disabled:opacity-50"
            >
              <Camera className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Fields */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" {...register("firstName")} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" {...register("lastName")} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input value={profile?.email ?? ""} disabled />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="about">About</Label>
              <Textarea
                id="about"
                rows={4}
                className="resize-none"
                {...register("about")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Preferences card */}
      <div className="rounded-xl border bg-card p-6 space-y-5">
        <div className="grid grid-cols-2 gap-6">
          {/* Date Format */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Date Format</Label>
            <Controller
              name="dateFormat"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-4"
                >
                  {DATE_FORMATS.map((fmt) => (
                    <div key={fmt} className="flex items-center gap-1.5">
                      <RadioGroupItem value={fmt} id={`date-${fmt}`} />
                      <Label
                        htmlFor={`date-${fmt}`}
                        className="font-normal cursor-pointer"
                      >
                        {fmt}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
          </div>

          {/* Time Format */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Time Format</Label>
            <Controller
              name="timeFormat"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-4"
                >
                  {TIME_FORMATS.map(({ label, value }) => (
                    <div key={value} className="flex items-center gap-1.5">
                      <RadioGroupItem value={value} id={`time-${value}`} />
                      <Label
                        htmlFor={`time-${value}`}
                        className="font-normal cursor-pointer"
                      >
                        {label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
          </div>
        </div>

        {/* Week Start / Language */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <Label>Week Start On</Label>
            <Controller
              name="weekStartOn"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {WEEK_DAYS.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Language</Label>
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </div>

      {/* ── Security card */}
      <div className="rounded-xl border bg-card divide-y">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <p className="font-medium">Change Password</p>
            <p className="text-sm text-muted-foreground">
              Change the password for your account
            </p>
          </div>
          <Button type="button" variant="link" className="text-primary">
            Change Password
          </Button>
        </div>

        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <p className="font-medium">Two Factor Authentication</p>
            <p className="text-sm text-muted-foreground">
              Require an authentication code when you log in with an email and
              password
            </p>
          </div>
          <Button type="button" variant="link" className="text-primary">
            Enable
          </Button>
        </div>
      </div>

      {/* ── Log out */}
      <div className="flex justify-end">
        <Button
          type="button"
          variant="destructive"
          className="rounded-full px-8"
          onClick={() => {
            // wire up your auth logout here
          }}
        >
          Log Out
        </Button>
      </div>
    </form>
  );
}